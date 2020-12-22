<template>
  <div>
    <main>

      <div class="layout">
        <div class="menuBar">
          <a href="#" class="logo">Collectors</a>
          <input class="menuButton" type="checkbox" id="menuButton">
          <label class="burgerBarsIcon" for="menuButton">
          <span class="barsIcon"></span>
          </label>
        <!--  öä -->
          <ul class="menu">
            <li class="item desktop">
              <a href="#">Home</a>
            </li>
            <li class="item desktop">
              <a href="#">About</a>
            </li>
            <li class="item buttonNav">
              <a href="#">Help</a>
            </li>
            <li class="item buttonNav secondary">
              <a href="#">Chat</a>
            </li>
          </ul>
        </div>


        <div class="otherPlayers">
          <h3>Stats</h3>
          <h4>Placement in current round:</h4>
            {{buyPlacement}}
            <br>
            {{chosenPlacementCost}}
        </div>

      <div>{{players}}</div>
      <br>
      <div>Mitt ID är {{this.$store.state.playerId}}</div>
      <br>
      <br>
      {{buyPlacement}} {{chosenPlacementCost}}
      <br>
      {{round}}
      <div class="buttons">
        <button @click="skipThisRound">
          {{ labels.skipThisRound }}
        </button>
      </div>
      <!--<CollectorsBuyActions v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :itemsOnSale="itemsOnSale"
        :marketValues="marketValues"
        :placement="buyPlacement"
        @buyCard="buyCard($event)"
        @placeBottle="placeBottle('buy', $event)"/>

      <CollectorsStartAuction v-if="players[playerId]"
        :labels="labels"
        :player="players[playerId]"
        :auctionCards="auctionCards"
        :marketValues="marketValues"
        :placement="auctionPlacement"
        @startAuction="startAuction($event)"
        @placeBottle="placeBottle('auction', $event)"/>
-->

        <div class="Items">
          <h3>Items</h3>
        </div>


        <div class="Skills">
          <h3>Skills</h3>
          <br>
          <CollectorsBuySkill v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :skillsOnSale="skillsOnSale"
            :placement="skillPlacement"
            @buySkill="buySkill($event)"
            @placeBottle="placeBottle('skill',$event)"/>
        </div>

        <div class="cardsOnSale">
          <!--<h3>Köp dina kort här</h3>-->
          <br>
          <CollectorsBuyActions v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :itemsOnSale="itemsOnSale"
            :marketValues="marketValues"
            :placement="buyPlacement"
            @buyCard="buyCard($event)"
            @placeBottle="placeBottle('buy', $event)"/>
        </div>

        <div class="playerView" >
          <button href="#" class = "openPlayerviewGridButton" @click="expandPlayerviewGrid()">Expand</button>
          <h3>Playerview</h3>
          <div class="myHand">
            <h4>My Hand</h4>
            <div class="cardslots" v-if="players[playerId]">
              <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
            </div>
          </div>

          <div class="myItems">
            <h4>My Items</h4>
            <div class="cardslots" v-if="players[playerId]">
              <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
            </div>
          </div>

          <div class="mySkills">
            <h4>My Skills</h4>
            <div class="cardslots" v-if="players[playerId]">
              <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
            </div>
          </div>
          <div class="buttons">
            <button @click="drawCard">
              {{ labels.draw }}
            </button>
          </div>
          <div class="overlayPlayerView" id = "expandPlayerview">
            <a href="#" class="closePlayerviewGridButton" @click="minimizePlayerviewGrid()">&times;</a>
            <div class="myHandOverlay">
              <h4>My Hand</h4>
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
              </div>
            </div>

            <div class="myItemsOverlay">
              <h4>My Items</h4>
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
              </div>
            </div>

            <div class="mySkillsOverlay">
              <h4>My Skills</h4>
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
              </div>
            </div>
            <div class="buttons">
              <button @click="drawCard">
                {{ labels.draw }}
              </button>
            </div>
            <button href="#" class = "playerboardGridButton" @click="minimizePlayerviewGrid()"> Minimize </button>
          </div>

        </div>

        <div class="Auction">
          <button href="#" class = "openAuctionGridButton" @click="expandAuctionGrid()">Expand</button>
          <h3>Current auction</h3>
          <br>
          <CollectorsStartAuction v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :auctionCards="auctionCards"
            :marketValues="marketValues"
            :placement="auctionPlacement"
            @startAuction="startAuction($event)"
            @placeBottle="placeBottle('auction', $event)"/>

            <br>
            <div class="auctionWrapper">
              <div class="currentAuctionWrapper">
                Current auction

                <div class="cardslots">
                  <CollectorsCard v-for="(card, index) in currentAuction" :card="card" :key="index"/>
                </div>
              </div>
              <h3 v-if="players[playerId].myBiddingTurn">YOUR TURN</h3>
              <div class="currentBidWrapper">
                <p> Current Bid </p>
                <h3> {{ currentBid }} Coins </h3>
                <button @click="raiseBid">Raise Bid By 1 Coin</button>
                <button @click="skipThisBidding">Give Up Bidding</button>
              </div>
            </div>
            <br>
            <div v-bind:class="bidWinnerWrapper">
              Choose where you want to put your won Auction-card
              <br>
                <!-- <button class="placeholder">This is just a placeholder button</button> -->
                <button @click="placeAuctionCardInItems">Place your newly won Auction-card in Items</button>
                <button @click="placeAuctionCardInSkills">Place your newly won Auction-card in Skills</button>
                <!-- <button @click="placeAuctionCardInRaiseValue">Place your newly won Auction-card in Raise Value</button> -->
            </div>
            <br>
            <CollectorsMarket v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="marketPlacement"
            @placeBottle="placeBottle('market',$event)"
            @changeTwoMarket="changeTwoMarket()"/>

          <div class="overlayAuction" id = "expandAuction">
            <a href="#" class="closeAuctionGridButton" @click="minimizeAuctionGrid()">&times;</a>

            <div class="CollectorsStartAuctionOverlay">
              <CollectorsStartAuction v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :auctionCards="auctionCards"
                :marketValues="marketValues"
                :placement="auctionPlacement"
                @startAuction="startAuction($event)"
                @placeBottle="placeBottle('auction', $event)"/>
            </div>


              <div class="auctionWrapper">
                <div class="currentAuctionWrapper">
                  Current auction

                  <div class="cardslots">
                    <CollectorsCard v-for="(card, index) in currentAuction" :card="card" :key="index"/>
                  </div>
                </div>
                <h3 v-if="players[playerId].myBiddingTurn">YOUR TURN</h3>
                <div class="currentBidWrapper">
                  <p> Current Bid </p>
                  <h3> {{ currentBid }} Coins </h3>
                  <button @click="raiseBid">Raise Bid By 1 Coin</button>
                  <button @click="skipThisBidding">Give Up Bidding</button>
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


              <div class="CollectorsMarketOverlay">
                <CollectorsMarket v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :placement="marketPlacement"
                @placeBottle="placeBottle('market',$event)"
                @changeTwoMarket="changeTwoMarket()"/>
              </div>


              <button href="#" class = "playerboardGridButton" @click="minimizeAuctionGrid()"> Minimize </button>
            </div>
          </div>






<!--
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
-->



    </div>

    </main>
    PLAYERS
    {{players}}
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
</template>


<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from '@/components/CollectorsCard.vue'
import CollectorsBuyActions from '@/components/CollectorsBuyActions.vue'
import CollectorsStartAuction from '@/components/CollectorsStartAuction.vue'
import CollectorsBuySkill from '@/components/CollectorsBuySkill.vue'
import CollectorsMarket from '@/components/CollectorsMarket.vue'

export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsStartAuction,
    CollectorsBuySkill,
    CollectorsMarket
  },
  data: function () {
    return {
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
      playerid: 0,
      currentAuction: [],

      currentBid: 0,
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
        console.log("currentAuction = " + this.currentAuction);
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
        if(this.players[this.playerId].myBiddingTurn === true){
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
  }.bind(this));

    this.$store.state.socket.on('turnChanged',function(d){
      console.log(d.players);
      this.players=d.players;
      console.log(this.players);
    }.bind(this));

    this.$store.state.socket.on('roundChanged', function(d){
      this.round=d.round;
    }.bind(this));


  },
  methods: {
    selectAll: function (n) {
      n.target.select();
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
        console.log("market i placeBottle");
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
      console.log("changeTurn")
      for(let id in this.players){
        console.log("forfor")
        totalBottles+=this.players[id].energyBottles;
      }
      console.log(totalBottles)
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
        console.log("hit kommer vi")
        this.$store.state.socket.emit('collectorsSkipThisRound', {
          roomId: this.$route.params.id,
          playerId: this.playerId
        }
      );
      }
    },


    marketBottle: function(action, cost=0, twoMarket){
      console.log("marketBottle")
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
      if(this.players[this.playerId].myTurn === false){
        console.log("buyCard säger myturn är false")
        return
      }
      this.isPlacedList.item=false;
      console.log("buyCard", card);
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
      );

    }
  },
  /*  startAuction: function (card){
      this.isPlacedList.auction=false;
      this.$store.state.socket.emit('collectorsStartAuction', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost
        }
      );
    },*/

    /*start för knapp tyck för att expanda de olika rutorna*/
    expandPlayerviewGrid: function(){
      document.getElementById('expandPlayerview').style.width = "100%";
    },

    minimizePlayerviewGrid: function(){
      document.getElementById('expandPlayerview').style.width = "0%";
    },

    expandAuctionGrid: function(){
      document.getElementById('expandAuction').style.width = "100%"
    },

    minimizeAuctionGrid: function(){
      document.getElementById('expandAuction').style.width = "0%";
    },
  /*slut för knapp tyck för att expanda de olika rutorna*/

    raiseBid: function (){
      if(this.players[this.playerId].myBiddingTurn === true && this.players[this.playerId].bidSkipper === false){
          console.log("inne i raiseBid i Collectors.vue")
          this.$store.state.socket.emit('collectorsRaiseBid', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          currentBid: this.currentBid
        }
      );
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
        currentAuctionCard: this.currentAuction
        }
      );
    },
    placeAuctionCardInSkills: function (){
        this.$store.state.socket.emit('collectorsPlaceInSkills', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        currentAuctionCard: this.currentAuction
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
}
</script>
<style scoped>
  header {
    user-select: none;
    position: fixed;
    width:100%;
    pointer-events: none;
  }
  main {
    width:95%;
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

  /*här börjar css för navbar öä*/
  .menuBar{
    background-color: black;
    box-shadow: 1px 1px 4px 0 rgba(0,0,0,0.1);
    position: relative;
    z-index: 6;
  }

  .menuBar a{
    color: black;
  }

  .menuBar ul{
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: white;
  }

  .menuBar ul a{
    display: block;
    padding: 10px 20px;
    border-right: 1px solid #aaa;
    text-decoration: none;
  }

  .menuBar ul a:hover{
    background-color: grey;
    pointer: cursor;
  }

  .menuBar .logo{
    float: left;
    display: block;
    font-size: 2em;
    padding: 10px 20px;
    background: white;
    border-radius: 50em;


  }
  .menuBar .menu{
    clear: both;
    max-height: 0;
    transition: max-height .2s ease-out;
  }

  .menuBar .burgerBarsIcon{
    padding: 28px 20px;
    position: relative;
    float: right;
    cursor: pointer;
  }

  .menuBar .burgerBarsIcon .barsIcon{
    background: grey;
    display: block;
    height: 2px;
    width: 18px;
    position: relative;
    transition: background .2s ease-out;
  }

  .menuBar .burgerBarsIcon .barsIcon:before{
    background: grey;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: all .5s ease-out;
    top: 5px;
  }

  .menuBar .burgerBarsIcon .barsIcon:after{
    background: grey;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: all .5s ease-out;
    top: -5px;
  }

  .menuBar .menuButton{
    display: none;
  }

  .menuBar .menuButton:checked ~ .menu{
    max-height: 240px;
  }

  /*.menuBar .menuButton:not(:checked) ~ .menu{
    display: none;
  }*/

  .menuBar .menuButton:checked ~ .burgerBarsIcon .barsIcon{
    background: transparent;
  }

  .menuBar .menuButton:checked ~ .burgerBarsIcon .barsIcon:before{
    transform: rotate(-225deg);
    top: 0;
  }

  .menuBar .menuButton:checked ~ .burgerBarsIcon .barsIcon:after{
    transform: rotate(225deg);
    top: 0;
  }
  /*mobile menu end*/
  /*Tablet menu start*/
  @media all and (min-width:48em){

    .menuBar li{
    float: left;
    }
    .menuBar ul {
      border-radius:50em;
    }

    .menuBar li a{
      padding: 20px 30px;
    }

    .menuBar .menu{
      justify-content: center;
      clear: none;
      float: right;
      max-height: 0;
    }

    .menuBar .burgerBarsIcon{
      display: none;
    }

    .menuBar .logo{
      flex: 1;
    }

    .menuBar .item {
      display: none;
    }

    .menuBar ul li:nth-of-type(3){
      width: auto;
      order: 1;
      display: block;
      max-height:240px;
      background: SeaShell;
    }

    .menuBar ul li:nth-of-type(4){
      width: auto;
      order: 2;
      display: block;
      max-height:240px;
      align-items: center;
      background: SeaShell;
    }

    /*.menuBar .buttonNav .secondary{
      border:0;
    }*/

    .menuBar .burgerBarsIcon{
      order: 3;
      display: block;
    }

    .menuBar .menuButton:not(:checked) ~ .menu{
      max-height: 240px;
    }

    .menuBar .menuButton:checked ~ .menu li:nth-of-type(-n+4){
      clear: both;
      height: auto;
      width: auto;
      display: inline-flex;
      flex: right;
      transform: scale(1.2);
    }
  }
  /*Tablet menu end*/
  /*Dekstop menu start*/
@media all and (min-width:915px){

  .menuBar ul li:nth-of-type(-n+4){
    width: auto;
    display: block;
    max-height:240px;
  }

  .menuBar .burgerBarsIcon{
    display: none;
  }
}
  /*Dekstop menu end*/
  /*här slutar css för navbar*/

  .overlayPlayerView{
    position: fixed;
    width: 0%;
    height:100%;
    top: 0;
    right: 0;
    background: rgba(0,0,0,.7);
    overflow-x: hidden;
    z-index: 10;
    transition: all 0.5s;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 0px;
    grid-template-areas:
    "myHandOverlay myItemsOverlay mySkillsOverlay";
  }
  .myHandOverlay{
    border-radius: 1em;
    grid-area: myHandOverlay;
    border: 5px dotted #fff;
  }

  .myItemsOverlay{
    border-radius: 1em;
    grid-area: myItemsOverlay;
    border: 5px dotted #fff;
  }

  .mySkillsOverlay{
    border-radius: 1em;
    grid-area: mySkillsOverlay;
    border: 5px dotted #fff;
  }

  .playerView button{
    float: right;
    margin: 20px;
  }

  .overlayPlayerView__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .overlayPlayerView a{
    paddin: 10px;
    color: white;
    display: block;
  }

  .overlayPlayerView .closePlayerviewGridButton{
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
  }

  .overlayAuction{
    position: fixed;
    width: 0%;
    height:100%;
    top: 0;
    right: 0;
    background: rgba(0,0,0,.7);
    overflow-x: hidden;
    z-index: 10;
    transition: all 0.5s;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 0px 0px;
    grid-template-areas:
    "CollectorsStartAuctionOverlay auctionWrapper"
    "CollectorsStartAuctionOverlay CollectorsMarketOverlay";
  }

  .CollectorsStartAuctionOverlay{
    border-radius: 1em;
    grid-area: CollectorsStartAuctionOverlay;
    border: 5px dotted #fff;
  }

  .overlayAuction .auctionWrapper{
    border-radius: 1em;
    grid-area: auctionWrapper;
    border: 5px dotted #fff;
  }



  .CollectorsMarketOverlay{
    border-radius: 1em;
    grid-area: CollectorsMarketOverlay;
    border: 5px dotted #fff;
  }

  .Auction button{
    float: right;
    margin: 20px;
  }

  .overlayAuction__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }

  .overlayAuction a{
    paddin: 10px;
    color: white;
    display: block;
  }

  .overlayAuction .closeAuctionGridButton{
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
  }


/*layout för spelet*/
  .layout{
    z-index:3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);/* 1fr 1fr;*/
    grid-template-rows: auto 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
    "menuBar menuBar otherPlayers"
    "Auction Items otherPlayers"
    "Auction Skills playerView"
    "Auction cardsOnSale playerView";
  }
  .menuBar{
    border-radius: 1em;
    grid-area: menuBar;
    border: 5px solid #fff;
    background-color: black;
  }
  .otherPlayers{
    border-radius: 1em;
    grid-area: otherPlayers;
    border: 5px solid #fff;
    background-color: RoyalBlue;
  }
  .Auction{
    border-radius: 1em;
    grid-area: Auction;
    border: 5px solid #fff;
    background-color: PaleVioletRed;
  }
  .Items{
    border-radius: 1em;
    grid-area: Items;
    border: 5px solid #fff;
    background-color: Red;
  }
  .Skills{
    border-radius: 1em;
    grid-area: Skills;
    border: 5px solid #fff;
    background-color: Green;
  }

  .cardsOnSale{
    border-radius: 1em;
    grid-area: cardsOnSale;
    border: 5px solid #fff;
    background-color: Black;
  }
  .playerView{
    border-radius: 1em;
    grid-area: playerView;
    border: 5px solid #fff;
    background-color: RoyalBlue;
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

/*adjust to screen sizes*/
  /*@media screen and (max-width: 800px) {*/
  @media screen all and (min-width: 48em){
    main {
      /*width:60em;*/

    }


  }
</style>
