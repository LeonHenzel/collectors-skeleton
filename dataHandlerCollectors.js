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
  room.playerList=[];
  room.round=1;
  room.lang = lang;
  room.playerNumber=0;
  room.deck = this.createDeck(lang);
  room.playerCount = playerCount;
  if(playerCount===4){
  room.itemsOnSale = room.deck.splice(0, 5);
  room.skillsOnSale = room.deck.splice(0, 5);
  }
  if(playerCount===3){
  room.itemsOnSale = room.deck.splice(0, 4);
  room.skillsOnSale = room.deck.splice(0, 4);
  }
  if(playerCount===2){
  room.itemsOnSale = room.deck.splice(0, 3);
  room.skillsOnSale = room.deck.splice(0,3);
  }
  room.auctionCards = room.deck.splice(0, 4);
  room.currentAuction = [];
  room.market = {
    movie: 0,
    technology: 0,
    fastaval: 0,
    music: 0,
    figures:0};
  room.twoMarket=false;
  room.twoMarketCounter=0;
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
  room.marketPlacement = [ {cost:0, playerId: null, numberOfChangedMarkets: 2},
                           {cost:2, playerId: null,numberOfChangedMarkets: 2},
                           {cost:0, playerId: null,numberOfChangedMarkets: 1} ];
  room.workerPlacement = [{cost:0, playerId: null,action: "quarter"},
                          {cost:-1, playerId: null, action: "recycle"},
                          {cost:1, playerId: null, action: "twoCards"},
                          {cost:0, playerId: null, action: "cardsAndfirstPlayer"},
                          {cost:0, playerId: null, action: "cardAndIncome"}];
  room.quarterTiles = [{cost: -1, playerId: null, action: "quarter"},
                        {cost: -2, playerId: null, action: "quarter"},
                      {cost: -3, playerId: null, action: "quarter"}];
  this.rooms[roomId] = room;

  room.messages = [];

  room.currentBid = -1;
  room.bidSkippersCount = 0; // När detta blir playerCount - 1 så avslutas the bidding.
  room.bidWinnerWrapper = "bidWinnerWrapperInvisible";
  room.isPlacedList= {item: false,
                 skill: false,
                 auction: false,
                 market: false,
                 getIncome: false,
                 getIncome2: false
               };
  room.discardTwo=false;
  room.discardCount=0;

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
                                 itemsByNumber:{
                                   movie: 0,
                                   technology: 0,
                                   fastaval: 0,
                                   music: 0,
                                   figures:0},
                                 items: [],
                                 income: [],
                                 incomeByNumber:0,
                                 randomVal: Math.random(),
                                 secret: [],
                                 playerName: "",
                                 energyBottles: 2,
                                 maxEnergyBottles:2,
                                 myTurn: true,
                                 myBiddingTurn: false,
                                 bidSkipper: false,
                                 playerNumberInList: room.playerNumber,
                                 maxAuctionAffordance: 0,
                                 firstPlayerToken: false,
                                 hasChoosenIncome: true,
                                 incomeToChoose: 0,
                                 auctionIncome:0,
                                 workerIncome:0,
                                 workerCard:0,
                                 skillVP:{VPAll:0,
                                 VPmovie:0,
                                 VPtechnology:0,
                                 VPfastaval: 0,
                                 VPmusic: 0,
                                 VPfigures:0}};

      }
      else{
      room.players[playerId] = { hand: [],
                                 money: 1,
                                 points: 0,
                                 skills: [],
                                 itemsByNumber:{
                                   movie: 0,
                                   technology: 0,
                                   fastaval: 0,
                                   music: 0,
                                   figures:0},
                                 items: [],
                                 income: [],
                                 incomeByNumber:0,
                                 secret: [],
                                 playerName: "",
                                 randomVal: Math.random(),
                                 energyBottles: 2,
                                 maxEnergyBottles:2,
                                 myTurn: false,
                                 myBiddingTurn: false,
                                 bidSkipper: false,
                                 playerNumberInList: room.playerNumber,
                                 maxAuctionAffordance: 0,
                                 firstPlayerToken: false,
                                 hasChoosenIncome: true,
                                 incomeToChoose: 0,
                                 auctionIncome:0,
                                 workerIncome:0,
                                 workerCard:0,
                                 skillVP:{VPAll:0,
                                 VPmovie:0,
                                 VPtechnology:0,
                                 VPfastaval: 0,
                                 VPmusic: 0,
                                 VPfigures:0}};

      }

      room.playerList.push(room.players[playerId]);
      room.playerNumber+=1;
      if (room.players[playerId].playerNumberInList===1){
        room.players[playerId].firstPlayerToken=true;
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
    room.isPlacedList.item=false;
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
    Data.prototype.raiseItem(c, room, playerId);
    room.players[playerId].money -= cost;
    // Turn-base- function
    Data.prototype.calculatePoints(room,playerId);
}
}


/*Denna funtion ändrar vilkens spelares tur som det är och tar även hänsyn till om
spelarna har flaskor kvar eller inte då detta görs. Om en spelare inte har flaskor kvar hoppas
denna över*/
Data.prototype.changeTurn=function(roomId,playerId){
  //console.log('change turn');
  let room = this.rooms[roomId];
  let player=room.players[playerId];
  player.myTurn=false;
  let playerNumber=player.playerNumberInList;
  for(let i=playerNumber+1;i<room.playerCount;i+=1){
    if(room.playerList[i].energyBottles!==0){
      room.playerList[i].myTurn=true;
      return
    }
  }
  for(let i=0;i<playerNumber+1;i+=1){
    if(room.playerList[i].energyBottles!==0){
      room.playerList[i].myTurn=true;
      return
    }
  }
}

Data.prototype.discardTwoTrue=function(roomId){
  let room = this.rooms[roomId];
  if(typeof room !== "undefined"){
    room.discardTwo=true;
  }
}

Data.prototype.workerQuarter=function(roomId,playerId,cost){
  let room = this.rooms[roomId];
  if(typeof room !== 'undefined'){

    let player = room.players[playerId];
    Data.prototype.workerCard(player,room);
    Data.prototype.workerIncome(player);
    room.workerPlacement[0].playerId=player.playerName;
    room.isPlacedList.getIncome=true;
    player.money-=cost;
    if(room.discardTwo===true){
      if(room.discardCount===0){
        room.discardCount=1;
        player.energyBottles-=1;
      }
      else{
        room.discardTwo=false;
        room.discardCount=0;
      }
    }
  }
}

Data.prototype.workerCard=function(player, room){
  for(let i=0;i<player.workerCard;i+=1){
    let card = room.deck.pop();
    player.hand.push(card);
  }
}

Data.prototype.workerIncome=function(player){
  for(let i=0;i<player.workerIncome;i+=1){
    player.money+=2;
}
}

Data.prototype.raiseIncome=function(roomId,playerId,card){
  let room=this.rooms[roomId];
  console.log("raiseIncome data")
  if(typeof room!=="undefined"){
    let player=room.players[playerId];
    Data.prototype.discardACard(player,card);
    player.incomeByNumber+=1;
    player.income.push(card);
    room.isPlacedList.getIncome=false;
    if(room.isPlacedList.getIncome2===true){
      let card = room.deck.pop();
      player.hand.push(card);
      room.isPlacedList.getIncome2=false;
    }
  }

}

Data.prototype.workers=function(roomId,playerId,cost,action){
  let room=this.rooms[roomId];
  if(typeof room!=="undefined"){
    let player=room.players[playerId];
    Data.prototype.workerIncome(player);
    Data.prototype.workerCard(player, room);
    if(action==="quarter"){
      Data.prototype.fouthQuarter(cost,player);
    }
    else if (action==="recycle") {
      Data.prototype.recycle(cost,player);
    }
    else if (action==="twoCards"){
      Data.prototype.drawTwoCards(cost,player,room);
      room.workerPlacement[2].playerId=player.playerName;
    }
    else if (action==="cardsAndfirstPlayer"){
      Data.prototype.cardAndfirstPlayer(cost,player,room);
      room.workerPlacement[3].playerId=player.playerName;
    }
    else if (action==="cardAndIncome"){
      room.workerPlacement[4].playerId=player.playerName;
      room.isPlacedList.getIncome=true;
      room.isPlacedList.getIncome2=true;
      player.energyBottles-=1;
    }
  }
}



Data.prototype.fouthQuarter=function(cost,player){
  player.energyBottles-=1;
  player.maxEnergyBottles-=1;
  player.money-=cost;
}

Data.prototype.recycle=function(cost, player){
  player.energyBottles-=1;
  player.maxEnergyBottles-=1;
  player.money-=cost;
}

Data.prototype.drawTwoCards=function(cost, player,room){
  let card = room.deck.pop();
  player.hand.push(card);
  let card2 = room.deck.pop();
  player.hand.push(card2);
  player.money-=cost;
  player.energyBottles-=1;
}

Data.prototype.cardAndfirstPlayer=function(cost,player,room){
  let card = room.deck.pop();
  player.hand.push(card);
  for(let i=0; i<room.playerList.length;i+=1){
    room.playerList[i].firstPlayerToken=false;
  }
  player.firstPlayerToken=true;
  player.money-=cost;
  player.energyBottles-=1;
}



Data.prototype.discardACard=function(player, card){
  console.log("discard")
  for(let i=0;i<player.hand.length;i+=1){
    if(player.hand[i].x===card.x && player.hand[i].y===card.y){
      console.log("discard IF")
      player.hand.splice(i,1);
      return
    }
  }
}


Data.prototype.startIncome=function(roomId){
  let room=this.rooms[roomId];
  if(typeof room !== 'undefined'){
    for(let i=0;i<room.playerCount;i+=1){
        room.playerList[i].myTurn=false;
        room.playerList[i].hasChoosenIncome=false;


          if(room.playerList[i].maxEnergyBottles<2){
            room.playerList[i].incomeToChoose=3;
          }
          else{
            room.playerList[i].incomeToChoose=5-room.playerList[i].maxEnergyBottles;
          }

    }
  }
}

Data.prototype.getIncome=function(oneCard,oneIncome,twoIncome,roomId,playerId){
  let room=this.rooms[roomId];
  if(typeof room !== 'undefined'){
    let player=room.players[playerId];
    if(oneCard){
      let card = room.deck.pop();
      player.hand.push(card);
    }
    if(oneIncome){
      player.money+=1;
    }
    if(twoIncome){
      player.money+=2;
    }
    player.money+=player.incomeByNumber;
    player.hasChoosenIncome=true;
  }
}




Data.prototype.changeRound=function(roomId){

  let room = this.rooms[roomId];
  Data.prototype.raisSkillEndOfRound(room);
  Data.prototype.raisAuctionEndOfRound(room);
  Data.prototype.getRidOfSkill(room);
  Data.prototype.getRidOfAuction(room);
  Data.prototype.getAllpoints(room);
  if(room.round===1){
    Data.prototype.endGame(room);
  }
  else{
  Data.prototype.reFillSkills(room);
  Data.prototype.reFillItems(room);
  Data.prototype.reFillAuction(room);
  Data.prototype.getBottlesBack(room);
  Data.prototype.changeQuarterPlacement(room);
  Data.prototype.resetPlacements(room);
  Data.prototype.changeTurnBetweenRound(room);

  room.round+=1;
}
}

Data.prototype.endGame=function(room){
  for(let i=0;i<room.playerList.length;i+=1){
    room.playerList[i].myTurn=false;
    room.playerList[i].points+=Data.prototype.endGamePoints(room.playerList[i],room);
  }
}

Data.prototype.endGamePoints=function(player,room){
  let moneyPoints=Math.floor(player.money/2);
  let secretPoints=0;
  console.log("playerMoney",player.money)
  console.log("moneyPoints",moneyPoints);
  /*if(player.secret[0].item==="fastaval"){
    secretPoints=room.market.fastaval;
  }
  else if(player.secret[0].item==="movie"){
    secretPoints=room.market.movie;
  }
  else if(player.secret[0].item==="music"){
    secretPoints=room.market.music;
  }
  else if(player.secret[0].item==="technology"){
    secretPoints=room.market.technology;
  }
  else if(player.secret[0].item==="figures"){
    secretPoints=room.market.figures;
  }*/
  return moneyPoints //+secretPoints;
}

Data.prototype.changeQuarterPlacement=function(room){
  room.workerPlacement[0]=room.quarterTiles[room.round-1];
}

Data.prototype.setChoosenIncomeToFalse=function(room){
  room.incomePhase=false;
  for(let i=0;i<room.playerCount;i+=1){
    room.playerList[i].hasChoosenIncome=false;
  }
}


Data.prototype.changeTurnBetweenRound=function(room){
  for(let i=0;i<room.playerCount;i+=1){
    if(room.playerList[i].firstPlayerToken===true){
      room.playerList[i].myTurn=true;
    }
  }
  for(let i=0;i<room.playerCount;i+=1){
    if(room.playerList[i].firstPlayerToken===true){
      room.playerList[i].firstPlayerToken=false;
      if(i===room.playerCount-1){
        console.log("sist i listan");
        room.playerList[0].firstPlayerToken=true;
        return
      }
      else{
        console.log("inte sist")
        room.playerList[i+1].firstPlayerToken=true;
        return
      }
    }
  }
}


Data.prototype.resetPlacements=function(room){
  Data.prototype.resetSpecificplacement(room,"buy");
  Data.prototype.resetSpecificplacement(room,"skill");
  Data.prototype.resetSpecificplacement(room,"market");
  Data.prototype.resetSpecificplacement(room,"auction");
  Data.prototype.resetSpecificplacement(room,"worker");
}





Data.prototype.resetSpecificplacement=function(room,action){
  let activePlacement=[];
  console.log(action);
  if(action==="buy"){
    activePlacement=room.buyPlacement;
  }
  else if (action==="skill") {
    activePlacement=room.skillPlacement;
  }
  else if (action==="auction"){
    activePlacement=room.auctionPlacement;
  }
  else if( action==="market"){
    activePlacement=room.marketPlacement;
  }
  else if( action==="worker"){
    activePlacement=room.workerPlacement;
    console.log(activePlacement)
  }
  for (let i=0;i<activePlacement.length;i+=1){
    activePlacement[i].playerId=null;
  }
}



Data.prototype.getBottlesBack=function(room){
  for(let i=0;i<room.playerCount;i+=1){
    room.playerList[i].energyBottles=room.playerList[i].maxEnergyBottles;
  }
}

Data.prototype.reFillAuction=function(room){
  for(let i=0;i<room.auctionCards.length;i+=1){
    if((room.auctionCards[i]).item===undefined){
        Data.prototype.getCardsToReFillAuction(room, i);
    }
}
}

Data.prototype.getCardsToReFillAuction=function(room, index){
  for (let i=index;i<room.auctionCards.length;i+=1){
    //console.log("     Kolla potentiell påfyllnad, varv",i);
    if(room.auctionCards[i].item!==undefined){
      //console.log("    Kolla poteniell påfylland IF");
      room.auctionCards[index]=room.auctionCards[i];
      room.auctionCards[i]={};
      return
    }
  }
  //console.log("         Sista utvägen");
  room.auctionCards[index]=room.deck[0];
  room.deck.splice(0,1);
}



Data.prototype.reFillItems=function(room){
  //console.log("items till en början:")
  //console.log(room.itemsOnSale);
  for(let i=0;i<room.itemsOnSale.length;i+=1){
    //console.log("kolla item, varv", i);
    if((room.itemsOnSale[i]).item===undefined){
      //console.log("Kolla item IF");
      Data.prototype.getCardsToReFillItem(room, i);
    }
}
}

Data.prototype.getCardsToReFillItem=function(room,index){
  for (let i=index;i<room.itemsOnSale.length;i+=1){
    //console.log("     Kolla potentiell påfyllnad, varv",i);
    if(room.itemsOnSale[i].item!==undefined){
      //console.log("    Kolla poteniell påfylland IF");
      room.itemsOnSale[index]=room.itemsOnSale[i];
      room.itemsOnSale[i]={};
      return
    }
  }
  //console.log("         Sista utvägen");
  room.itemsOnSale[index]=room.deck[0];
  room.deck.splice(0,1);
}

Data.prototype.getCardsToReFillItem=function(room,index){
  for (let i=index;i<room.itemsOnSale.length;i+=1){
    //console.log("     Kolla potentiell påfyllnad, varv",i);
    if(room.itemsOnSale[i].item!==undefined){
      //console.log("    Kolla poteniell påfylland IF");
      room.itemsOnSale[index]=room.itemsOnSale[i];
      room.itemsOnSale[i]={};
      return
    }
  }
  //console.log("         Sista utvägen");
  room.itemsOnSale[index]=room.deck[0];
  room.deck.splice(0,1);
}

Data.prototype.reFillSkills=function(room){
  for(let i=0;i<room.skillsOnSale.length;i+=1){
    if((room.skillsOnSale[i]).item===undefined){
        Data.prototype.getCardsToReFillSill(room, i);
    }
  }
}


Data.prototype.getCardsToReFillSill=function(room, index){
  //console.log("Fyll på kort", index);
  for(let i=index;i<room.skillsOnSale.length;i+=1){
    //console.log("  Kolla skill, varv", i);
    if(room.skillsOnSale[i].item!==undefined){
      //console.log("  Kolla skill inne i IF");
      room.skillsOnSale[index]=room.skillsOnSale[i];
      room.skillsOnSale[i]={};
      return
    }
  }
  for (let i=0;i<room.itemsOnSale.length;i+=1){
    //console.log("    Kolla item,  varv", i);
    if(room.itemsOnSale[i].item!==undefined){
      //console.log("    Kolla item inne i IF");
      room.skillsOnSale[index]=room.itemsOnSale[i];
      room.itemsOnSale[i]={};
      return
    }
  }
  //console.log("        Sista utvägen");
  room.skillsOnSale[index]=room.deck[0];
  room.deck.splice(0,1);
}


Data.prototype.raisSkillEndOfRound=function(room){
  for(let i=0; i<room.skillsOnSale.length;i +=1){
    if(room.skillsOnSale[i].item!== undefined){
      let card=room.skillsOnSale[i];
      if(card.market==='movie'){
        room.market.movie+=1;
      }
      else if(card.market==='music'){
        room.market.music+=1;
      }
      else if(card.market==='technology'){
        room.market.technology+=1;
      }
      else if(card.market==='fastaval'){
        room.market.fastaval+=1;
      }
      else if(card.market==='figures'){
        room.market.figures+=1;
      }
      break
    }
  }
}

Data.prototype.raisAuctionEndOfRound=function(room){
  for(let i=0; i<room.auctionCards.length;i +=1){
    if(room.auctionCards[i].item!== undefined){
      let card=room.auctionCards[i];
      if(card.market==='movie'){
        room.market.movie+=1;
      }
      else if(card.market==='music'){
        room.market.music+=1;
      }
      else if(card.market==='technology'){
        room.market.technology+=1;
      }
      else if(card.market==='fastaval'){
        room.market.fastaval+=1;
      }
      else if(card.market==='figures'){
        room.market.figures+=1;
      }
      break
    }
  }
}



Data.prototype.calculatePoints=function(room, playerId){
  let player = room.players[playerId];
  let itemPoints=Data.prototype.getPointsFromItem(room,player);
  let skillPoints=Data.prototype.getPointsFromSkill(player);
  player.points=itemPoints+skillPoints;
}

Data.prototype.getPointsFromItem=function(room,player){
  let points=0;
  points=room.market.music*player.itemsByNumber.music;
  points+=room.market.fastaval*player.itemsByNumber.fastaval;
  points+=room.market.movie*player.itemsByNumber.movie;
  points+=room.market.figures*player.itemsByNumber.figures;
  points+=room.market.technology*player.itemsByNumber.technology;
  return points;
}

Data.prototype.getPointsFromSkill=function(player){
  let points=0;
  points=player.skillVP.VPmovie*player.itemsByNumber.movie;
  points+=player.skillVP.VPmusic*player.itemsByNumber.music;
  points+=player.skillVP.VPfastaval*player.itemsByNumber.fastaval;
  points+=player.skillVP.VPfigures*player.itemsByNumber.figures;
  points+=player.skillVP.VPtechnology*player.itemsByNumber.technology;
  if(Data.prototype.gotAllItems(player)){
    points+=player.skillVP.VPAll*5;
  }
  return points;
}

Data.prototype.gotAllItems=function(player){
  if(player.itemsByNumber.movie===0){
    return false;
  }
  if(player.itemsByNumber.music===0){
    return false;
  }
  if(player.itemsByNumber.fastaval===0){
    return false;
  }
  if(player.itemsByNumber.figures===0){
    return false;
  }
  if(player.itemsByNumber.technology===0){
    return false;
  }
  return true;
}

Data.prototype.raiseItem= function(card, room, playerId){

  if(card[0].item==='movie'){
    room.players[playerId].itemsByNumber.movie+=1;
  }
  if(card[0].item==='music'){
    room.players[playerId].itemsByNumber.music+=1;
  }
  if(card[0].item==='technology'){
    room.players[playerId].itemsByNumber.technology+=1;
  }
  if(card[0].item==='fastaval'){
    room.players[playerId].itemsByNumber.fastaval+=1;
  }
  if(card[0].item==='figures'){
    room.players[playerId].itemsByNumber.figures+=1;
  }
  console.log(room.players[playerId].itemsByNumber);
}

Data.prototype.buySkill=function (roomId,playerId,card,cost){
  let room = this.rooms[roomId];
  if(typeof room !== 'undefined'){
    let c = null;
    room.isPlacedList.skill=false;
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
  Data.prototype.skillChanges(room.players[playerId],card);
  room.players[playerId].skills.push(...c);
  room.players[playerId].money -= cost;
  Data.prototype.calculatePoints(room,playerId);
  }

}

Data.prototype.skillChanges=function(player,card){
  console.log("skillchange")
  console.log(player)
  console.log(card)
  if(card.skill==="bottle"){
    console.log("if bottle")
    Data.prototype.getBottle(player);
  }
  else if (card.skill==="auctionIncome") {
    console.log("if auctionIncome")
    player.auctionIncome+=1;
  }
  else if (card.skill==="workerIncome") {
    console.log("if workerIncome")
    player.workerIncome+=1;
  }
  else if (card.skill==="workerCard")  {
    console.log("if workerCard")
    player.workerCard+=1;
  }
  else{
    console.log("if skillVP")
    Data.prototype.skillVP(player,card);
  }
}


Data.prototype.skillVP=function(player,card){
  if(card.skill==="VP-all"){
    player.skillVP.VPAll+=1;
  }
  else if (card.skill==="VP-movie") {
    player.skillVP.VPmovie+=1;
  }
  else if (card.skill==="VP-technology") {
    player.skillVP.VPtechnology+=1;
  }
  else if (card.skill==="VP-fastaval") {
    player.skillVP.VPfastaval+=1;
  }
  else if (card.skill==="VP-music") {
    player.skillVP.VPmusic+=1;
  }
  else if (card.skill==="VP-figures") {
    player.skillVP.VPfigures+=1;
  }
}

Data.prototype.getBottle=function(player){
  console.log("playerBottle");
  player.energyBottles+=1;
  if(player.maxEnergyBottles!==5){
    player.maxEnergyBottles+=1;
  }
}

Data.prototype.placeBottle = function (roomId, playerId, action, cost,twoMarket) {

  let room = this.rooms[roomId];

  if (typeof room !== 'undefined') {
    let activePlacement = [];
    if (action === "buy") {
      activePlacement = room.buyPlacement;
      room.isPlacedList.item=true;
    }
    else if (action === "skill") {
      activePlacement = room.skillPlacement;
      room.isPlacedList.skill=true;
    }
    else if (action === "auction") {
      activePlacement = room.auctionPlacement;
      room.isPlacedList.auction=true;
    }
    else if (action === "market") {
      Data.prototype.placeMarketBottle(room,playerId,cost,twoMarket);
      return
    }
    room.players[playerId].energyBottles -= 1;
    for(let i = 0; i < activePlacement.length; i += 1) {
        if( activePlacement[i].cost === cost &&
            activePlacement[i].playerId === null ) {
          activePlacement[i].playerId = playerId;
          break;
        }
    }
  }
}

Data.prototype.placeMarketBottle=function(room,playerId,cost){
  if(room.twoMarket===true){
    if(room.twoMarketCounter===0){
      room.players[playerId].energyBottles -= 1;
    }
  }
  else{
    room.players[playerId].energyBottles -= 1;
  }
  room.isPlacedList.market=true;
  let activePlacement = [];
  let numberOfChangedMarkets=1;
  if(room.twoMarket===true){
    numberOfChangedMarkets=2;
  }
  activePlacement=room.marketPlacement;
  for(let i = 0; i < activePlacement.length; i += 1){

  if( activePlacement[i].cost === cost &&
      activePlacement[i].playerId === null &&
      activePlacement[i].numberOfChangedMarkets===numberOfChangedMarkets) {
    activePlacement[i].playerId = playerId;
}
}
}

/* auction */
Data.prototype.startAuction = function (roomId, playerId, card, cost) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    let c = null;
    room.isPlacedList.auction=false;
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
    room.players[playerId].money -= cost; //hejsan



        // När en auction start så måste en kreditupplysning göras på varje spelare. I collectors.vue ska jag ha en variabel som är maxAffordance för varje spelare
    // detta ska vara lika med spelarens pengar + värdet av kortet på handen (korten är värda 1 eller 2 (2 om skill innehåller ngt med VP)).
    var eachPlayer;
    var eachCard;
    for(eachPlayer in room.players){

      // extra reset av variabler för att undvika fel
      room.players[eachPlayer].bidSkipper = false;
      room.players[eachPlayer].myBiddingTurn = false;

     // console.log(room.players[eachPlayer].hand)
      room.players[eachPlayer].maxAuctionAffordance = room.players[eachPlayer].money;
      for(eachCard in room.players[eachPlayer].hand){
        //console.log("för spelare med spelarId "+ room.players[eachPlayer] +" så är Kort nr " + eachCard + "s skill är " + room.players[eachPlayer].hand[eachCard].skill)
        if(room.players[eachPlayer].hand[eachCard].skill === 'VP-all' || room.players[eachPlayer].hand[eachCard].skill === 'VP-music' || room.players[eachPlayer].hand[eachCard].skill === 'VP-movie' || room.players[eachPlayer].hand[eachCard].skill === 'VP-fastaval' || room.players[eachPlayer].hand[eachCard].skill === 'VP-figures' || room.players[eachPlayer].hand[eachCard].skill === 'VP-technology'){
          room.players[eachPlayer].maxAuctionAffordance += 2;
        }
        else{
          room.players[eachPlayer].maxAuctionAffordance += 1;
        }
      }
      //console.log("room.players[eachPlayer].maxAuctionAffordance = " + room.players[eachPlayer].maxAuctionAffordance)
    }
    Data.prototype.auctionIncome(room);
    room.currentBid = 0;

    // Den som auktionerar ut får börja bidda.
    room.players[playerId].myBiddingTurn = true;

  }
}

Data.prototype.auctionIncome=function(room){
  for(let id in room.players){
    console.log(id)
    room.players[id].money+=room.players[id].auctionIncome;
  }
}






Data.prototype.changeTwoMarket=function(roomId){
  let room = this.rooms[roomId];
  room.twoMarket=true;
}



Data.prototype.raiseMarket=function(roomId, playerId, card, cost,action){
  let room = this.rooms[roomId];
  room.isPlacedList.market=false;
  if(room.twoMarket===true){
    if(room.twoMarketCounter===0){
      room.twoMarketCounter=1
    }
    else{
      room.twoMarket=false;
      room.twoMarketCounter=0;
    }
  }
  if (typeof room !== 'undefined'){
    if(card.market==='movie'){
      room.market.movie+=1;
    }
    if(card.market==='music'){
      room.market.music+=1;
    }
    if(card.market==='technology'){
      room.market.technology+=1;
    }
    if(card.market==='fastaval'){
      room.market.fastaval+=1;
    }
    if(card.market==='figures'){
      room.market.figures+=1;
    }
    room.players[playerId].money -= cost;
  }
  if(action==='skill'){
    Data.prototype.getRidOfSkill(room);
  }
  else if (action==='auction') {
    Data.prototype.getRidOfAuction(room);
  }
  else if(action==='hand'){
    Data.prototype.getRidOfHand(card,room,playerId);
  }
Data.prototype.getAllpoints(room);
}


Data.prototype.getAllpoints=function(room){
  for(let id in room.players){
    Data.prototype.calculatePoints(room,id);
  }
}



Data.prototype.getRidOfSkill= function(room){
  for(let i=0; i<room.skillsOnSale.length;i +=1){
    if(room.skillsOnSale[i].item!== undefined){
      room.skillsOnSale.splice(i,1, {});
      break;
    }
  }


}

Data.prototype.getRidOfAuction= function(room){
  for(let i=0; i<room.auctionCards.length;i +=1){
    if(room.auctionCards[i].item!== undefined){
      room.auctionCards.splice(i,1, {});
      break;

    }
  }
}





Data.prototype.raiseBid = function (roomId, playerId, currentBid) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.currentBid = currentBid + 1;

    room.players[playerId].myBiddingTurn = false;
          //avgör nästa persons tur

     // var indexOfCurrentPlayer = Object.keys(room.players).indexOf(playerId);

      // if playercount = 2
      if(room.playerCount === 2){
        // if the current player is the last player in the list
        if(Object.keys(room.players).indexOf(playerId) === 1){
          // then it's the player ones biddingturn. Both needs to have bidSkipper === false since room.bidSkippersCount !== room.playerCount-1
          room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
        }
        // if the current player is not the last player in the list
        else{
          // then it's player 2:s biddingTurn
          room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
        }
      }


      // if playercount = 3
      else if(room.playerCount === 3){
        // if the current player is the first player in the list

        if(Object.keys(room.players).indexOf(playerId) === 0){
          if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
        }
        // if the current player is the second player in the list
        else if(Object.keys(room.players).indexOf(playerId) === 1){
          if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
        }
        // if the current player is the last player in the list
        else if(Object.keys(room.players).indexOf(playerId) === 2){
          if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
        }
      }

      // if playercount = 4
      else if(room.playerCount === 4){
        // if the current player is the first player in the list
        if(Object.keys(room.players).indexOf(playerId) === 0){
          if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
        }
        // if the current player is the second player in the list
        if(Object.keys(room.players).indexOf(playerId) === 1){
          if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
        }
        // if the current player is the third player in the list
        if(Object.keys(room.players).indexOf(playerId) === 2){
          if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
        }
        // if the current player is the last player in the list
        else if(Object.keys(room.players).indexOf(playerId) === 3){
          if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
        }
      }
  }
}

Data.prototype.skipBidding = function (roomId, playerId, currentBid, currentAuctionCard, bidWinnerWrapper) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.players[playerId].bidSkipper = true;
    room.players[playerId].myBiddingTurn = false;

    room.bidSkippersCount += 1;
    if(room.bidSkippersCount === room.playerCount-1){
      // bidding ends för det finns bara en kvar i bidding och kortet går till den spelare som
      // har bidSkipper===false  --- We have a winner
      var aPlayer;
      for(aPlayer in room.players){
        room.players[aPlayer].maxAuctionAffordance = 0;

        if(room.players[aPlayer].bidSkipper === false){
          // currentAuctionCard ska läggas till i antingen aPlayers items, skills eller raise market value,
          // beroende på vad han väljer.
          console.log(aPlayer + " won the bidding of " + currentAuctionCard + "  och current bid är " + currentBid)

          // reseting variables
        //  room.players[aPlayer].myBiddingTurn = false; väntar med detta så jag kan göra så att bara den som vinner får knapparna. Sen gör jag när man klickar på en knapp att myBiddingTurn = false, och såklart så att knapparna försvinner. gör även alla bidskipper till false!
          // room.players[aPlayer].bidSkipper = true;
          room.bidSkippersCount = 0;

          room.currentBid = -1;

          room.bidWinnerWrapper = "bidWinnerWrapperVisible"
        }
      }
    }
   // else{

      //avgör nästa persons tur

      // var indexOfCurrentPlayer = Object.keys(room.players).indexOf(playerId);

      // if playercount = 2
      if(room.playerCount === 2){
        // if the current player is the last player in the list
        if(Object.keys(room.players).indexOf(playerId) === 1){
          // then it's the player ones biddingturn. Both needs to have bidSkipper === false since room.bidSkippersCount !== room.playerCount-1
          room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
        }
        // if the current player is not the last player in the list
        else{
          // then it's player 2:s biddingTurn
          room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
        }
      }


      // if playercount = 3
      else if(room.playerCount === 3){
        // if the current player is the first player in the list
        if(Object.keys(room.players).indexOf(playerId) === 0){
          if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
        }
        // if the current player is the second player in the list
        else if(Object.keys(room.players).indexOf(playerId) === 1){
          if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
        }
        // if the current player is the last player in the list
        else if(Object.keys(room.players).indexOf(playerId) === 2){
          if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
        }
      }

      // if playercount = 4
      else if(room.playerCount === 4){
        // if the current player is the first player in the list
        if(Object.keys(room.players).indexOf(playerId) === 0){
          if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
        }
        // if the current player is the second player in the list
        if(Object.keys(room.players).indexOf(playerId) === 1){
          if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
        }
        // if the current player is the third player in the list
        if(Object.keys(room.players).indexOf(playerId) === 2){
          if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
        }
        // if the current player is the last player in the list
        else if(Object.keys(room.players).indexOf(playerId) === 3){
          if(room.players[Object.keys(room.players)[0]].bidSkipper === false){
            room.players[Object.keys(room.players)[0]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[1]].bidSkipper === false){
            room.players[Object.keys(room.players)[1]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[2]].bidSkipper === false){
            room.players[Object.keys(room.players)[2]].myBiddingTurn = true;
          }
          else if(room.players[Object.keys(room.players)[3]].bidSkipper === false){
            room.players[Object.keys(room.players)[3]].myBiddingTurn = true;
          }
        }
      }

  }
}

Data.prototype.placeInItems = function (roomId, playerId, currentAuctionCard, moneyPayment, winningPlayerHand) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {

    room.players[playerId].items.push(...currentAuctionCard);
    room.players[playerId].myBiddingTurn = false;
    room.players[playerId].money -= moneyPayment;
    Data.prototype.raiseItem(currentAuctionCard, room, playerId);
    //room.players[playerId].money -= cardCost;

    //room.players = players;
    room.players[playerId].hand = winningPlayerHand;

    room.currentAuction = [];
    room.currentBid = -1;
    room.bidWinnerWrapper = "bidWinnerWrapperInvisible";
  }
}

Data.prototype.placeInSkills = function (roomId, playerId, currentAuctionCard, moneyPayment, winningPlayerHand) {
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {

    room.players[playerId].skills.push(...currentAuctionCard);
    room.players[playerId].myBiddingTurn = false;
    room.players[playerId].money -= moneyPayment;
    Data.prototype.skillChanges(room.players[playerId],currentAuctionCard[0])
    //room.players[playerId].money -= cardCost;

    room.players[playerId].hand = winningPlayerHand;

    room.currentAuction = [];
    room.currentBid = -1;
    room.bidWinnerWrapper = "bidWinnerWrapperInvisible";
  }
}


Data.prototype.getRidOfHand= function(card,room,playerId){
  for (let i = 0; i < room.players[playerId].hand.length; i += 1) {
    // since card comes from the client, it is NOT the same object (reference)
    // so we need to compare properties for determining equality
    if (room.players[playerId].hand[i].x === card.x &&
        room.players[playerId].hand[i].y === card.y) {
        room.players[playerId].hand.splice(i,1);
      break;
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
             marketPlacement: room.marketPlacement,
             workerPlacement: room.workerPlacement}
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

/*Data.prototype.getMarketValues = function(roomId){
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
}*/

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


/*Data.prototype.getMessage = function(roomId, playerId){
  let room = this.rooms[roomId];
  let player = this.players[playerId];
  if (typeof room !== 'undefined' && typeof player !== 'undefined'){
    if()
  }
}*/
Data.prototype.addMessage = function(roomId, playerId, message, playerName){
  console.log(playerName, " from dataHandler")
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    room.messages.push({message: message, playerId: playerId, playerName: playerName})
    console.log(room.messages, "hejhej")
  }
}

Data.prototype.getMessages = function(roomId){
  console.log(this.rooms)
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.messages;
  }

  else {
    console.log('room undefined in getMessages')
    return [];
  }
}

Data.prototype.setPlayerName = function(roomId, playerId, playerName){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined'){
    room.players[playerId].playerName =  playerName;
    console.log(playerName, "from DH")
  }
}



Data.prototype.getCurrentBid = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.currentBid;
  }
  else return [];
}


Data.prototype.getBidSkippersCount = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.bidSkippersCount;
  }
  else return [];
}

Data.prototype.getBidWinnerWrapper = function(roomId){
  let room = this.rooms[roomId];
  if (typeof room !== 'undefined') {
    return room.bidWinnerWrapper;
  }
  else return [];
}




module.exports = Data;
