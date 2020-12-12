'use strict';

let csv = require("csvtojson");

let collectorsDeck = "collectors-cards";
let languages = ["en", "se"];
/* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.rooms = {};
}


/***********************************************
For performance reasons, methods are added to the
prototype of the Data object/class
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
***********************************************/

/*
  Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({checkType: true})
    .fromFile("./data/" + table + ".csv")
    .then((jsonObj) => {
      this.data[table] = jsonObj;
    });
};

Data.prototype.initializeData = function() {
  console.log("Starting to build data tables");
  for (let i in languages) {
    this.initializeTable(collectorsDeck);
  }
}

Data.prototype.getUILabels = function (roomId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let lang = room.lang;
    var ui = require("./data/collectors-" + lang + ".json");
    return ui;
  }
  else return {};
}

Data.prototype.createRoom = function(roomId, playerCount, lang="en") {
  let room = {};
  room.players = {};
  room.lang = lang;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  room.auctionCards = room.deck.splice(0, 4);
  room.currentAuction = [];
  room.market = [];
  room.buyPlacement = [ {cost:1, playerId: null},
                        {cost:1, playerId: null},
                        {cost:2, playerId: null},
                        {cost:2, playerId: null},
                        {cost:3, playerId: null} ];
  room.skillPlacement = [ {cost:0, playerId: null},
                          {cost:0, playerId: null},
                          {cost:0, playerId: null},
                          {cost:1, playerId: null},
                          {cost:1, playerId: null} ];
  room.auctionPlacement = [ {cost:-2, playerId: null},
                            {cost:-1, playerId: null},
                            {cost:0, playerId: null},
                            {cost:0, playerId: null} ];
  room.marketPlacement = [ {cost:0, playerId: null},
                           {cost:-2, playerId: null},
                           {cost:0, playerId: null} ];
  this.rooms[roomId] = room;
  room.currentBid = 0;
  room.bidSkippersCount = 0; // När detta blir playerCount - 1 så avslutas the bidding. 
  room.bidders = [];
}

Data.prototype.createDeck = function() {
  // we want a copy of the deck array, not a reference to it so we use the
  // spread operator (...) to copy the items. Note that this is a shallow copy
  // so it is not generalizable to all copy problems
  let deck = [...this.data[collectorsDeck]];
  return shuffle(deck);
}

Data.prototype.joinGame = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    if (typeof room.players[playerId] !== 'undefined') {
      console.log("Player", playerId, "joined again with info", room.players[playerId]);
      return true;
    }
    else if (Object.keys(room.players).length < room.playerCount) {
      console.log("Player", playerId, "joined for the first time");
      if(Object.keys(room.players).length < 1){
      room.players[playerId] = { hand: [], 
                                 money: 1,
                                 points: 0,
                                 skills: [],
                                 items: [],
                                 income: [],
                                 secret: [],
                                 energyBottles: 2,
                                 myTurn: true,
                                 myBiddingTurn: false,
                                 bidSkipper: false };
      }
      else{
      room.players[playerId] = { hand: [], 
                                 money: 1,
                                 points: 0,
                                 skills: [],
                                 items: [],
                                 income: [],
                                 secret: [],
                                 energyBottles: 2,
                                 myTurn: false,
                                 myBiddingTurn: false,
                                 bidSkipper: false };
      }
      return true;
    }
    console.log("Player", playerId, "was declined due to player limit");
  }
  return false;
}

Data.prototype.getPlayers = function (id) {
  let room = this.rooms[id]
  if (typeof room !== 'undefined') {
    return room.players;
  }
  else return {};
}

Data.prototype.updatePoints = function (roomId, player, points) {
  let room = this.rooms[roomId]
  if (typeof room !== 'undefined') {
    room.points[player] += points;
    return room.points;
  }
  else return {};
}

/* returns players after a new card is drawn */
Data.prototype.drawCard = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let card = room.deck.pop();
    room.players[playerId].hand.push(card);
    return room.players;
  }
  else return [];
}

Data.prototype.skipThisRound = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
        // Turn-base- function
        var aPlayer
        for(aPlayer in room.players){
    
          if(room.players[aPlayer].myTurn === true){
    
            if(Object.keys(room.players).indexOf(aPlayer) === room.playerCount - 1){
              room.players[aPlayer].myTurn = false;
              room.players[Object.keys(room.players)[0]].myTurn = true;
              break;
            }
            else{
              room.players[aPlayer].myTurn = false;
    
              // Följande är en black box. Men jag kan förklara:
              // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är
    
              // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är nästa gång, 
              // förutsatt att spelaren vars tur det är inte är den sista spelaren. 
    
              // Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1] = playerId:t av den spelare
              // vars tur det är nästa gång
    
              // room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]] = 
              // room.players[playerId:t av den spelare vars tur det är nästa gång]
              room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]].myTurn = true;
              break;
          } 
          }
        }
    return room.players;
  }
  else return [];
}

/* moves card from itemsOnSale to a player's hand */
Data.prototype.buyCard = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.itemsOnSale.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.itemsOnSale[i].x === card.x && 
          room.itemsOnSale[i].y === card.y) {
        c = room.itemsOnSale.splice(i,1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x && 
          room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i,1);
        break;
      }
    }
    room.players[playerId].items.push(...c);
    room.players[playerId].money -= cost;



    // Turn-base- function
    var aPlayer
    for(aPlayer in room.players){

      if(room.players[aPlayer].myTurn === true){

        if(Object.keys(room.players).indexOf(aPlayer) === room.playerCount - 1){
          room.players[aPlayer].myTurn = false;
          room.players[Object.keys(room.players)[0]].myTurn = true;
          break;
        }
        else{
          room.players[aPlayer].myTurn = false;

          // Följande är en black box. Men jag kan förklara:
          // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är

          // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är nästa gång, 
          // förutsatt att spelaren vars tur det är inte är den sista spelaren. 

          // Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1] = playerId:t av den spelare
          // vars tur det är nästa gång

          // room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]] = 
          // room.players[playerId:t av den spelare vars tur det är nästa gång]
          room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]].myTurn = true;
          break;
      } 
      }
    }

  }
}

Data.prototype.buySkill=function (roomId,playerId,card,cost){
  let room = this.rooms[roomId];
  if(typeof room !== 'undefined'){
    let c = null;
    //Check if the card is on the
    for (let i = 0; i < room.skillsOnSale.length; i += 1){
      if (room.skillsOnSale[i].x === card.x &&
          room.skillsOnSale[i].y === card.y) {
        c = room.skillsOnSale.splice(i,1, {});
        break;
    }
  }
  for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
    // since card comes from the client, it is NOT the same object (reference)
    // so we need to compare properties for determining equality
    if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
      c = room.players[playerId].hand.splice(i,1);
      break;
    }
  }
  room.players[playerId].skills.push(...c);
  room.players[playerId].money -= cost;
  }

  // Turn-base- function
  var aPlayer
  for(aPlayer in room.players){

    if(room.players[aPlayer].myTurn === true){

      if(Object.keys(room.players).indexOf(aPlayer) === room.playerCount - 1){
          room.players[aPlayer].myTurn = false;
          room.players[Object.keys(room.players)[0]].myTurn = true;
          break;
      }
      else{
          room.players[aPlayer].myTurn = false;

          // Följande är en black box. Men jag kan förklara:
          // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är

          // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är nästa gång, 
          // förutsatt att spelaren vars tur det är inte är den sista spelaren. 

          // Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1] = playerId:t av den spelare
          // vars tur det är nästa gång

          // room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]] = 
          // room.players[playerId:t av den spelare vars tur det är nästa gång]
          room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]].myTurn = true;
          break;
      } 
    }
  }


}

Data.prototype.placeBottle = function (roomId, playerId, action, cost) {
  let room = this.rooms[roomId];
  room.players[playerId].energyBottles -= 1;
  if (typeof room !== 'undefined') {
    let activePlacement = [];
    if (action === "buy") {
      activePlacement = room.buyPlacement;
    }
    else if (action === "skill") {
      activePlacement = room.skillPlacement;
    }
    else if (action === "auction") {
      activePlacement = room.auctionPlacement;
    }
    else if (action === "market") {
      activePlacement = room.marketPlacement;
    }
    for(let i = 0; i < activePlacement.length; i += 1) {
        if( activePlacement[i].cost === cost && 
            activePlacement[i].playerId === null ) {
          activePlacement[i].playerId = playerId;
          break;
        }
    }
  }
}

/* auction */
Data.prototype.startAuction = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    /// check first if the card is among the items on sale
    for (let i = 0; i < room.auctionCards.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.auctionCards[i].x === card.x && 
          room.auctionCards[i].y === card.y) {
        c = room.auctionCards.splice(i,1, {});
        break;
      }
    }
    // ...then check if it is in the hand. It cannot be in both so it's safe
    for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
      // since card comes from the client, it is NOT the same object (reference)
      // so we need to compare properties for determining equality      
      if (room.players[playerId].hand[i].x === card.x && 
          room.players[playerId].hand[i].y === card.y) {
        c = room.players[playerId].hand.splice(i,1);
        break;
      }
    }
    room.currentAuction = c;
    room.players[playerId].money -= cost;


    
  }

  // Turn-base- function
  var aPlayer
  for(aPlayer in room.players){
    if(room.players[aPlayer].myTurn === true){
  
      if(Object.keys(room.players).indexOf(aPlayer) === room.playerCount - 1){
          room.players[aPlayer].myTurn = false;
          room.players[Object.keys(room.players)[0]].myTurn = true;
          break;
      }
      else{
          room.players[aPlayer].myTurn = false;
  
          // Följande är en black box. Men jag kan förklara:
          // aPlayer = ett player Id
          // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är

          // Object.keys(room.players).indexOf(aPlayer) = index av den spelare vars tur det är nästa gång, 
          // förutsatt att spelaren vars tur det är inte är den sista spelaren. 
  
          // Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1] = playerId:t av den 
          // spelare vars tur det är nästa gång
  
          // room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]] = 
          // room.players[playerId:t av den spelare vars tur det är nästa gång]
          room.players[Object.keys(room.players)[Object.keys(room.players).indexOf(aPlayer) + 1]].myTurn = true;
          break;
      } 
    }
  }

  // Den som auktionerar ut får börja bidda. 
  room.players[playerId].myBiddingTurn = true;
}

Data.prototype.raiseBid = function (roomId, playerId, currentBid) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.currentBid = currentBid + 1;

    // Now player with playerId is part of the bidding
    if(room.bidders.includes(playerId)){
      break;
    }
    else{
      room.bidders.push(playerId)
    }
  }
}

Data.prototype.skipBidding = function (roomId, playerId, currentBid, currentAuctionCard) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].bidSkipper = true;
    room.bidSkippersCount += 1;
    if(room.bidSkippersCount === room.playerCount-1){
      // bidding ends för det finns bara en kvar i bidding och kortet går till den spelare som 
      // har bidSkipper===false
      var aPlayer;
      for(aPlayer in room.players){
        if(room.players[aPlayer].bidSkipper === false){
          // currentAuctionCard ska läggas till i antingen aPlayers items, skills eller raise market value,
          // beroende på vad han väljer. 
          console.log(aPlayer + " won the bidding of " + currentAuctionCard)
        }
      }
    }
    else{
      //avgör nästa persons tur

      var indexOfCurrentPlayer = Object.keys(room.players).indexOf(playerId);

      // if playercount = 2
      if(room.playerCount === 2){
        // if the current player is the last player in the list
        if(Object.keys(room.players).indexOf(aPlayer) === 1){
          // then it's the player ones biddingturn. Both needs to have bidSkipper === false since room.bidSkippersCount !== room.playerCount-1
          Object.keys(room.players)[0].myBiddingTurn = true;
        }

        // if the current player is not the last player in the list
        else{
          // then it's player 2:s biddingTurn
          Object.keys(room.players)[1].myBiddingTurn = true;
        }
      }


      // if playercount = 3
      else if(room.playerCount === 3){
        // if the current player is the last player in the list
        if(Object.keys(room.players).indexOf(aPlayer) === 2){
          if(Object.keys(room.players)[0].bidSkipper === false){
            Object.keys(room.players)[0].myBiddingTurn = true;
          }
          else if(Object.keys(room.players)[1].bidSkipper === false){
            Object.keys(room.players)[1].myBiddingTurn = true;
          }
      }


      // if playercount = 4





      // if the current player is the last player in the list
      if(Object.keys(room.players).indexOf(aPlayer) === room.playerCount - 1){
        if(Object.keys(room.players)[0].bidSkipper === false){
          Object.keys(room.players)[0].myBiddingTurn = true;
        }
        else if(Object.keys(room.players)[1].bidSkipper === false){
          Object.keys(room.players)[1].myBiddingTurn = true;
        }
        else if(Object.keys(room.players)[2].bidSkipper === false){
          Object.keys(room.players)[2].myBiddingTurn = true;
        }
      }
      //if the current player is not the last player in the list and the next person hasn't given up the bidding...
      else if(room.players[Object.keys(room.players)[indexOfCurrentPlayer + 1]].bidSkipper === false){
        // then it is his/her turn
        room.players[Object.keys(room.players)[indexOfCurrentPlayer + 1]].myBiddingTurn = true;
      }
      //if the current player is not the last player in the list and the next person has given up the bidding but the second next person hasn't given up the bidding...
      else if(room.players[Object.keys(room.players)[indexOfCurrentPlayer + 2]].bidSkipper === false)
    }
  }
}


/* returns the hand of the player */
Data.prototype.getCards = function (roomId, playerId) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let i = room.players.map(d => d.playerId).indexOf(playerId)
    return room.players[i].hand;
  }
  else return [];
}

Data.prototype.getPlacements = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return { buyPlacement: room.buyPlacement,
             skillPlacement: room.skillPlacement,
             auctionPlacement: room.auctionPlacement,
             marketPlacement: room.marketPlacement }
  }
  else return {};
}

Data.prototype.getItemsOnSale = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.itemsOnSale;
  }
  else return [];
}

Data.prototype.getCurrentAuctionCard = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.currentAuction;
  }
  else return [];
}

Data.prototype.getMarketValues = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.market.reduce(function(acc, curr) {
      acc[curr.market] += 1;
    }, 
    { fastaval: 0, 
      movie: 0, 
      technology: 0, 
      figures: 0, 
      music: 0 });
  }
  else return [];
}

Data.prototype.getSkillsOnSale = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.skillsOnSale;
  }
  else return [];
}

Data.prototype.getAuctionCards = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.auctionCards;
  }
  else return [];
}

Data.prototype.getCurrentBid = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.currentBid;
  }
  else return [];
}







module.exports = Data;



