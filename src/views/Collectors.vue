<template>
  <div>
    <main>
      <div class="layout">
        <div class="menuBar">
          Menu
        </div>

        <div class="otherPlayers">
          Stats
          <br>
            {{buyPlacement}}
            <br>
            {{chosenPlacementCost}}
        </div>

        <div class="Items">
          Items

        </div>

        <div class="Skills">
          Skills
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
          Köp dina kort här
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
          <div class="overlayPlayerView" id = "expand">
            <a href="#" class="closeGridButton" @click="minimizeGrid()">&times;</a>
            <div class="myHand">
              My Hand
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
              </div>
            </div>

            <div class="myItems">
              My Items
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
              </div>
            </div>

            <div class="mySkills">
              My Skills
              <div class="cardslots" v-if="players[playerId]">
                <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
              </div>
            </div>
            <div class="buttons">
              <button @click="drawCard">
                {{ labels.draw }}
              </button>
            </div>
            <button href="#" class = "playerboardGridButton" @click="minimizeGrid()"> Minimize </button>
          </div>
        <button href="#" class = "openGridButton" @click="expandGrid()">Expand</button>
        </div>

        <div class="Auction">
          Current auction
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
          <div class="cardslots">
            <CollectorsCard v-for="(card, index) in currentAuction" :card="card" :key="index"/>
          </div>
        </div>
      </div>
    </main>
    {{players}}
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

export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsStartAuction,
    CollectorsBuySkill
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
                     auction: false
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
      currentAuction: []
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

    this.$store.state.socket.on('collectorsCardBought',
      function(d) {
        console.log(d.playerId, "bought a card");
        this.players = d.players;
        this.itemsOnSale = d.itemsOnSale;
      }.bind(this)
    );

    this.$store.state.socket.on('collectorsSkillBought',
      function(d){
        console.log(d.playerId, "bought a Skill");
        this.players=d.players;
        this.skillsOnSale=d.skillsOnSale;
      }.bind(this)
    );

    this.$store.state.socket.on('auctionStarted',
      function(d) {
        console.log(d.playerId, "started an auction");
        this.players = d.players;
        this.auctionCards = d.auctionCards;
        this.currentAuction = d.currentAuction;
        console.log("currentAuction = " + this.currentAuction)
      }.bind(this)
    );
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
      if(action === "buy"){
        this.isPlacedList.item = true
      }
      else if(action === "skill"){
        this.isPlacedList.skill = true
      }
      else if(action === "auction"){
        this.isPlacedList.auction = true
      }
      this.chosenPlacementCost = cost;
      this.$store.state.socket.emit('collectorsPlaceBottle', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          action: action,
          cost: cost,
        }
      );
    },
    doAction: function(card){
      if(this.isPlacedList.item===true){
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
    },
    drawCard: function () {
      this.$store.state.socket.emit('collectorsDrawCard', {
          roomId: this.$route.params.id,
          playerId: this.playerId
        }
      );
    },
    buyCard: function (card) {
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
        this.isPlacedList.skill=false;
        console.log("buySkill", card);
        this.$store.state.socket.emit('collectorsBuySkill', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost
        }
      );
    },
    startAuction: function (card){
      this.isPlacedList.auction=false;
      this.$store.state.socket.emit('collectorsStartAuction', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card,
          cost: this.chosenPlacementCost
        }
      );
    },
    expandGrid: function(){
      document.getElementById('expand').style.width = "100%";
    },
    minimizeGrid: function(){
      document.getElementById('expand').style.width = "0%";
    }
  },
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
  .overlayPlayerView{
    position: fixed;
    width: 0%;
    height:100%;
    top: 0;
    right: 0;
    background: rgba(0,0,0,.7);
    overflow-x: hidden;
    z-index: 5;
    transition: all 0.5s;
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

  .overlayPlayerView .closeGridButton{
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
  }

  .layout{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr 1fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
    "menuBar menuBar otherPlayers"
    "Auction Items otherPlayers"
    "Auction Skills playerView"
    "Auction cardsOnSale playerView";
  }
  .menuBar{
    grid-area: menuBar;
    border: 5px solid #fff;
    background-color: Gold;
  }
  .otherPlayers{
    grid-area: otherPlayers;
    border: 5px solid #fff;
    background-color: RoyalBlue;
  }
  .Auction{
    grid-area: Auction;
    border: 5px solid #fff;
    background-color: PaleVioletRed;
  }
  .Items{
    grid-area: Items;
    border: 5px solid #fff;
    background-color: Red;
  }
  .Skills{
    grid-area: Skills;
    border: 5px solid #fff;
    background-color: Green;
  }
  .cardsOnSale{
    grid-area: cardsOnSale;
    border: 5px solid #fff;
    background-color: Black;
  }
  .playerView{
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

  @media screen and (max-width: 800px) {
    main {
      width:90vw;
    }
  }
</style>
