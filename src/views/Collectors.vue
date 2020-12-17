<template>
  <div>
  <form class="nameEnter" v-if="players[playerId].playerName===''">
    <textarea placeholder="Enter name" id="nameArea" v-model="playerName"></textarea>
    <button type="submit" @click="submitName"></button>
  </form>

  <div id="megaWrapper" v-if="players[playerId].playerName!==''">
    <main>
      <div class="bajs" v-for="player in players" :key="player">
        {{player.playerName}}
      </div>
    <CollectorsChat :messages="messages" :playerId="playerId" :playerName="players[playerId].playerName" @sendMessage = "sendMessage($event)"/>

      <div>{{players}}</div>
      <br>
      <div>My ID is {{this.$store.state.playerId}}</div>
      <br>
      <br>

      {{buyPlacement}} {{chosenPlacementCost}}
      <br>
      <br>
      It is currently round {{round}}
      <br>
      <br>
      <div class="buttons">
        <button @click="skipThisRound">
          {{ labels.skipThisRound }}
        </button>
      </div>

      <CollectorsBuyActions v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :itemsOnSale="itemsOnSale"
        :marketValues="marketValues"
        :placement="buyPlacement"
        @buyCard="buyCard($event)"
        @placeBottle="placeBottle('buy', $event)"/>

      <CollectorsWorkers v-if="players[playerId]"/>

      <CollectorsStartAuction v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :auctionCards="auctionCards"
        :marketValues="marketValues"
        :placement="auctionPlacement"
        @startAuction="startAuction($event)"
        @placeBottle="placeBottle('auction', $event)"/>



      <CollectorsBuySkill v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :skillsOnSale="skillsOnSale"
        :placement="skillPlacement"
        @buySkill="buySkill($event)"
        @placeBottle="placeBottle('skill',$event)"/>

        <CollectorsMarket v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :placement="marketPlacement"
        @placeBottle="placeBottle('market',$event)"
        @changeTwoMarket="changeTwoMarket()"/>



      <div class="buttons">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>
      My Hand
      <div class="cardslots" v-if="players[playerId]">
        <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
      </div>
      My Items
      <div class="cardslots" v-if="players[playerId]">
        <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
      </div>
      My Skills
      <div class="cardslots" v-if="players[playerId]">
        <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
      </div>

      <div class="auctionWrapper">
        <div class="currentAuctionWrapper">
          Current auction
          <div class="cardslots">
            <CollectorsCard v-for="(card, index) in currentAuction" :card="card" :key="index"/>
          </div>
        </div>
        <!-- Får error om jag inte kör denna extra div runt h3:n -->
        <div v-if="players[playerId]">
          <div v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'">
            <h3 v-if="players[playerId].myBiddingTurn">YOUR TURN</h3>
            <h3 v-if="players[playerId].maxAuctionAffordance <= this.currentBid">You cannot afford to raise the bid.</h3>
          </div>
        </div>
        <div class="currentBidWrapper">
          <p> Current Bid </p>
          <h3 v-if="this.currentBid !== -1"> {{ currentBid }} Coins </h3>
          <h3 v-if="this.currentBid === -1"> No current auction </h3>
          <button v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'" @click="raiseBid">Raise Bid By 1 Coin</button>
          <button v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'" @click="skipThisBidding">Give Up Bidding</button>
        </div>
      </div>

      <div v-bind:class="bidWinnerWrapper">
        Choose where you want to put your won Auction-card
        <br>
          <!-- <button class="placeholder">This is just a placeholder button</button> -->
          <button @click="placeAuctionCardInItems">Place your newly won Auction-card in Items</button>
          <button @click="placeAuctionCardInSkills">Place your newly won Auction-card in Skills</button>
          <!-- <button @click="placeAuctionCardInRaiseValue">Place your newly won Auction-card in Raise Value</button> -->
      </div>
      <br>

    </main>
    PLAYERS
    {{players}}
    <br>
    MARKET
    {{marketValues}}

    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>
    <footer>
        <p>
          {{ labels.invite }}
          <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">
        </p>
    </footer>
  </div>
  </div>
</template>


<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from '@/components/CollectorsCard.vue'
import CollectorsBuyActions from '@/components/CollectorsBuyActions.vue'

import CollectorsChat from '@/components/CollectorsChat.vue'

import CollectorsWorkers from '@/components/CollectorsWorkers.vue'

import CollectorsStartAuction from '@/components/CollectorsStartAuction.vue'
import CollectorsBuySkill from '@/components/CollectorsBuySkill.vue'
import CollectorsMarket from '@/components/CollectorsMarket.vue'


export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsChat,
    CollectorsStartAuction,
    CollectorsBuySkill,
    CollectorsMarket,
    CollectorsWorkers

  },
  data: function () {
    return {
      playerName: "",
      fixedPlayerName:"",
      gotSubmitted: false,
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      maxSizes: { x: 0,
                  y: 0 },
      labels: {},
      players: {},
      // playerId: {
      //   hand: [],
      //   money: 1,
      //   points: 0,
      //   skills: [],
      //   items: [],
      //   income: [],
      //   secret: []
      // }
      isPlacedList: {item: false,
                     skill: false,
                     auction: false,
                     market: false
                    },
      buyPlacement: [],
      skillPlacement: [],
      auctionPlacement: [],
      marketPlacement: [],
      chosenPlacementCost: null,
      marketValues: { fastaval: 0,
                     movie: 0,
                     technology: 0,
                     figures: 0,
                     music: 0 },
      itemsOnSale: [],
      skillsOnSale: [],
      auctionCards: [],

      messages: [],


      playerid: 0,
      currentAuction: [],

      currentBid: -1,
      bidWinnerWrapper: "bidWinnerWrapperInvisible",
      twoMarket: false,

      twoMarketCounter:0,
      round: 0


    }
  },
  computed: {
    playerId: function() { return this.$store.state.playerId}
  },
  watch: {
    players: function(newP, oldP) {
      console.log(newP, oldP)
      for (let p in this.players) {
        for(let c = 0; c < this.players[p].hand.length; c += 1) {
          if (typeof this.players[p].hand[c].item !== "undefined")
          this.$set(this.players[p].hand[c], "available", false);
        }
      }
    }
  },
  created: function () {
    this.$store.commit('SET_PLAYER_ID', this.$route.query.id)
    //TODO! Fix this ugly hack
    //background: https://github.com/quasarframework/quasar/issues/5672
    const newRoute = this.$route.params.id + "?id=" + this.playerId;
    if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
      this.$router.push(newRoute);

    this.$store.state.socket.emit('collectorsLoaded',
      { roomId: this.$route.params.id,
        playerId: this.playerId } );

    this.$store.state.socket.on('collectorsInitialize',
      function(d) {
        this.labels = d.labels;
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        this.marketValues = d.marketValues;
        this.skillsOnSale = d.skillsOnSale;
        this.auctionCards = d.auctionCards;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
        this.round=d.round;
      }.bind(this));

    this.$store.state.socket.on('collectorsBottlePlaced',
      function(d) {
        this.buyPlacement = d.buyPlacement;
        this.skillPlacement = d.skillPlacement;
        this.marketPlacement = d.marketPlacement;
        this.auctionPlacement = d.auctionPlacement;
      }.bind(this));

    this.$store.state.socket.on('collectorsPointsUpdated', (d) => this.points = d );

    this.$store.state.socket.on('collectorsCardDrawn',
      function(d) {
          //this has been refactored to not single out one player's cards
          //better to update the state of all cards
          this.players = d;
      }.bind(this)
    );

    this.$store.state.socket.on('collectorsRoundSkipped',
      function(d) {
          this.players = d;
      }.bind(this)
    );



    this.$store.state.socket.on('collectorsCardBought',
      function(d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
        if(this.players[this.playerId].myTurn===true){
        this.changeTurn();
      }
      }.bind(this)
    );


    this.$store.state.socket.on('collectorsUpdateMessages',
      function(d) {
        console.log(this.players[this.playerId].playerName, "player name is attribute")
        this.messages = d.messages;
      }.bind(this)
    );


    this.$store.state.socket.on('collectorsSkillBought',
      function(d){
        console.log(d.playerId, "bought a Skill");
        this.players=d.players;
        this.skillsOnSale=d.skillsOnSale;
        if(this.players[this.playerId].myTurn===true){
        this.changeTurn();
      }
      }.bind(this)
    );

    this.$store.state.socket.on('auctionStarted',
      function(d) {
        console.log(d.playerId, "started an auction");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.currentAuction = d.currentAuction;
        this.currentBid = d.currentBid;
        if(this.players[this.playerId].myTurn===true){
        this.changeTurn();
      }
      }.bind(this)

    );
    this.$store.state.socket.on('bidRaised',
      function(d) {
        this.currentBid = d.currentBid;
        this.players = d.players;
      }.bind(this)
    );
    this.$store.state.socket.on('bidSkipped',
      function(d) {
        this.currentAuction = d.currentAuction;
        this.players = d.players;
        this.currentBid = d.currentBid;
        if(this.players[this.playerId].myBiddingTurn === true){
          for (let i = 0; i < this.players[this.playerId].hand.length; i += 1) {
            this.$set(this.players[this.playerId].hand[i], "available", true);
            console.log(this.players[this.playerId].hand[i]); //funkar ej
          }
          this.bidWinnerWrapper = d.bidWinnerWrapper;
        }
      }.bind(this)
    );
    this.$store.state.socket.on('auctionCardPlacedInItems',
      function(d) {
        this.currentBid = d.currentBid;
        this.players = d.players;
        this.currentAuction = d.currentAuction
        if(this.players[this.playerId].bidSkipper === false){
          this.bidWinnerWrapper = d.bidWinnerWrapper;
        }
      }.bind(this)
    );
    this.$store.state.socket.on('auctionCardPlacedInSkills',
      function(d) {
        this.currentBid = d.currentBid;
        this.players = d.players;
        this.currentAuction = d.currentAuction
        if(this.players[this.playerId].bidSkipper === false){
          this.bidWinnerWrapper = d.bidWinnerWrapper;
        }
      }.bind(this)
    );

    this.$store.state.socket.on('ValueRaised', function(d){
      console.log(d.playerId, "raised the market");
      this.players=d.players;
      this.marketValues=d.marketValues;
      this.skillsOnSale=d.skillsOnSale;
      this.auctionCards=d.auctionCards;
      if (this.twoMarket===true){
        if(this.twoMarketCounter===0){
          console.log("kör market en gång till")
          this.twoMarketCounter +=1;
          this.placeBottle('market',0);
        }
        else{
          this.twoMarketCounter=0;
          this.twoMarket=false;
        }

      }

      if(this.players[this.playerId].myTurn===true&&this.twoMarket===false){
      this.changeTurn();
    }

    }.bind(this)
  );


  this.$store.state.socket.on('nameSet',function(d){
    this.players = d.players;
    this.playerName = d.playerName;
    console.log(this.playerName, "from listnener in view")
  }.bind(this)
);




    this.$store.state.socket.on('turnChanged',function(d){
      this.players=d.players;
    }.bind(this));

    this.$store.state.socket.on('roundChanged', function(d){
      this.round=d.round;
    }.bind(this));



  },
  methods: {
    selectAll: function (n) {
      n.target.select();

    },
    submitName: function(){
      this.fixedPlayerName = this.playerName;
      this.gotSubmitted = true;
      this.$store.state.socket.emit('sendPlayerName', {roomId: this.$route.params.id,
         playerId: this.playerId,
          playerName: this.playerName});
      console.log(this.playerName, "from submitName")
    },

/* Vad har vi gjort här med placeBottle och doAction? Jo, problemet var att när man klickade på en auctionknapp
och ville aktionera ut ngt man hade på handen så lades det i item och inte i currentAuction. Det löstes genom att
skicka @doAction till vår egen doAction, och denna skickar vidare till rätt funktion beroende på vad som placeBottle
har gjort true eller false. Om man börjar auction så ska auction vara true och allt annat false tex. */
    placeBottle: function (action, cost) {
      if(this.players[this.playerId].myTurn === false || this.players[this.playerId].energyBottles === 0){
        return
      }
      else if(action === "buy"){
        this.isPlacedList.item = true
      }
      else if(action === "skill"){
        this.isPlacedList.skill = true
      }
      else if(action === "auction"){
        this.isPlacedList.auction = true
      }
      else if(action ==="market"){
        this.isPlacedList.market = true;
        this.chosenPlacementCost = cost;
        this.marketBottle(action, cost, this.twoMarket);
        return
      }
      this.chosenPlacementCost =cost ;

      this.$store.state.socket.emit('collectorsPlaceBottle', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          action: action,
          cost: cost,
        }
      );
    },

    changeTurn: function(){
      let totalBottles=0;
      for(let id in this.players){
        totalBottles+=this.players[id].energyBottles;
      }
      if(totalBottles!==0){
          this.$store.state.socket.emit('collectorsChangeTurn',{
          roomId: this.$route.params.id,
          playerId: this.playerId
        });
      }
      else{
        this.$store.state.socket.emit('collectorsChangeRound',{
          roomId: this.$route.params.id,
          playerId: this.playerId
        });
      }
    },

    doAction: function(card){
      if(this.players[this.playerId].myTurn === false){
        return
      }
      else if(this.isPlacedList.item===true){
        this.isPlacedList.item=false;
        this.buyCard(card);
      }
      else if(this.isPlacedList.skill===true){
        this.isPlacedList.skill=false;
        this.buySkill(card);
      }
      else if(this.isPlacedList.auction===true){
        this.isPlacedList.auction=false;
        this.startAuction(card);
      }
      else if(this.isPlacedList.market===true){
        this.raiseMarket(card,'hand');
        this.isPlacedList.market=false;
      }
    },
    // drawCard kommer inte behållas på detta vis
    drawCard: function () {
      if(this.players[this.playerId].myTurn === false){
        return
      }
      this.$store.state.socket.emit('collectorsDrawCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId
        }
      );
    },

    skipThisRound: function() {
      if(this.players[this.playerId].myTurn === false){
        console.log("skip this round säger myturn är false")
        return
      }
      else{
        this.$store.state.socket.emit('collectorsSkipThisRound', {
          roomId: this.$route.params.id,
          playerId: this.playerId
        }
      );
      }
    },


    marketBottle: function(action, cost=0, twoMarket){
      for (let i = 0; i < this.players[this.playerId].hand.length; i += 1){
        this.$set(this.players[this.playerId].hand[i], 'available', true);
        //console.log(this.players[this.playerId].hand[i],"handen i marketbottle")
      }
      for (let i = 0; i < this.skillsOnSale.length; i += 1){
        if(this.skillsOnSale[i].item !== undefined){
          this.$set(this.skillsOnSale[i], 'available', true);
          break
        }
      }
      for (let i = 0; i < this.auctionCards.length; i += 1){
        if(this.auctionCards[i].item !== undefined){
          this.$set(this.auctionCards[i], 'available', true);
          break
      }
    }
    if(this.twoMarketCounter===0){
    this.$store.state.socket.emit('collectorsPlaceBottle', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        action: action,
        cost: cost,
        twoMarket: twoMarket
      }
      );
    }


  },

    marketBottleDone: function (){
      for (let i = 0; i < this.players[this.playerId].hand.length; i += 1){
        this.$set(this.players[this.playerId].hand[i], 'available', false);
      }
      for (let i = 0; i < this.skillsOnSale.length; i += 1){
        if(this.skillsOnSale[i] !== 'undefined'){
          //this.$set(this.skillsOnSale[i], 'available', false);
          //this.skillsOnSale[i].availableAction=true;
          break
        }
      }
      for (let i = 0; i < this.auctionCards.length; i += 1){
        if(this.auctionCards[i] !== 'undefined'){
          this.$set(this.auctionCards[i], 'available', false);
          break
      }
    }
    },


    buyCard: function (card) {
      console.log("this.marketValues[card.market] = " + this.marketValues[card.market])
      if(this.players[this.playerId].myTurn === false){
        console.log("buyCard säger myturn är false")
        return
      }
      this.isPlacedList.item=false;
      this.$store.state.socket.emit('collectorsBuyCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.marketValues[card.market] + this.chosenPlacementCost
        }
      );
    },
    buySkill: function (card){

       if(this.players[this.playerId].myTurn === false){
        console.log("buySkill säger myturn är false")
        return
      }
        this.isPlacedList.skill=false;
        if(this.isPlacedList.market===true){
          this.raiseMarket(card,'skill');
          this.isPlacedList.market=false;

        }
        else {
          this.$store.state.socket.emit('collectorsBuySkill', {
            roomId: this.$route.params.id,
            playerId: this.playerId,
            card: card,
            cost: this.chosenPlacementCost
        }
          );
        }

    },
    startAuction: function (card){

      if(this.players[this.playerId].myTurn === false){
        console.log("startAuction säger myturn är false")
        return
      }


      if(this.isPlacedList.market===true){
        this.raiseMarket(card,'auction');
        this.isPlacedList.market=false;
      }
        else{
          this.isPlacedList.auction=false;
          this.$store.state.socket.emit('collectorsStartAuction', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost
        }
      );}
    },
     sendMessage: function(msg) {
      this.$store.state.socket.emit('collectorsSendMessage', {msg: msg, playerId: this.playerId, roomId: this.$route.params.id, playerName: this.players[this.playerId].playerName});
      console.log(this.players[this.playerId].playerName ,"från sendmessage emit")
    },

    raiseBid: function (){
      if(this.players[this.playerId].myBiddingTurn === true && this.players[this.playerId].bidSkipper === false){
          if(this.players[this.playerId].maxAuctionAffordance <= this.currentBid){
            console.log("du har inte råd att höja budet")
          }
          else{
          this.$store.state.socket.emit('collectorsRaiseBid', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          currentBid: this.currentBid
          });
          }
      }
    },
    skipThisBidding: function (){
      if(this.players[this.playerId].myBiddingTurn === true && this.players[this.playerId].bidSkipper === false){
        this.$store.state.socket.emit('collectorsSkipBidding', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        currentBid: this.currentBid,
        currentAuctionCard: this.currentAuction,
        bidWinnerWrapper: this.bidWinnerWrapper
        }
      );
      }
    },
    placeAuctionCardInItems: function (){
        this.$store.state.socket.emit('collectorsPlaceInItems', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        currentAuctionCard: this.currentAuction,
        //cardCost: this.marketValues[this.currentAuction[0].market]
        }
      );
    },
    placeAuctionCardInSkills: function (){
        this.$store.state.socket.emit('collectorsPlaceInSkills', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        currentAuctionCard: this.currentAuction,
        //cardCost: this.marketValues[this.currentAuction[0].market]
        }
      );
    },
  raiseMarket: function(card,action){
    if(this.players[this.playerId].myTurn === false){
      return
    }
    console.log('raiseMarket i Collectors')
    this.$store.state.socket.emit('collectorsRaiseValue', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        card: card,
        cost: this.chosenPlacementCost,
        action: action
  });
  this.marketBottleDone();
},
  changeTwoMarket: function(){
    this.twoMarket=true;
    this.twoMarketCounter=0;
  }
}
};


</script>
<style scoped>
  header {
    user-select: none;
    position: fixed;
    width:100%;
    pointer-events: none;
  }
  main {
    user-select: none;
  }
  footer {
    margin-top: 5em auto;
  }
  footer a {
    text-decoration: none;
    border-bottom: 2px dotted ivory;
  }
  footer a:visited {
    color:ivory;
  }
  .cardslots {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    grid-template-rows: repeat(auto-fill, 180px);
  }
  .cardslots div {
    transform: scale(0.5)translate(-50%,-50%);
    transition:0.2s;
    transition-timing-function: ease-out;
    z-index: 0;
  }
  .cardslots div:hover {
    transform: scale(1)translate(-25%,0);
    z-index: 1;
  }

  .auctionWrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .currentBidWrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .currentBidWrapper p {
    margin: 0;
  }

  .bidWinnerWrapperInvisible {
    display: none;
  }

  .bidWinnerWrapperVisible {
    display: block;
  }

  @media screen and (max-width: 800px) {
    main {
      width:90vw;
    }
  }
</style>
