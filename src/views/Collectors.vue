<template>

  <div>

  <div v-if="players[playerId].playerName===''">
  <form class="nameEnter">
    <h1>{{labels.entername}}</h1>
    <textarea placeholder="Enter name" id="nameArea" v-model="playerName" v-on:keyup.enter="submitName"></textarea>
    <button type="submit" @click="submitName">Submit</button>
    </form>
    <p class="foter">
          {{ labels.invite }}
          <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">
        </p>
</div>



  <div id="megaWrapper" v-if="players[playerId].playerName!==''">
    <main>

      <div class="startgamewrapper">
      <div>
        <CollectorsStartGame v-if="!allPlayersReady"
        :labels="labels"
        :player="players[playerId]"
        :allPlayers="players"
        @isReady="isReady()"
        @secretCardChoosen="secretCardChoosen($event)"/>
      </div>
      </div>




    <div class="layout">

      <div class="bigWrapper">
        <div class="menuBar">

          <a href="#" class="logo">Collectors</a>
          <input class="menuButton" type="checkbox" id="menuButton">
          <label class="burgerBarsIcon" for="menuButton">
          <span class="barsIcon"></span>
          </label>

            <CollectorsChat :messages="messages" :playerId="playerId" :playerName="players[playerId].playerName" @sendMessage = "sendMessage($event)"/>


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

        <div class="gameBoardWrapper">
          <div class="Items">
            <div class="cardsOnSale">
              <CollectorsBuyActions v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :itemsOnSale="itemsOnSale"
                :marketValues="marketValues"
                :placement="buyPlacement"
                :isPlacedList="isPlacedList"
                @buyCard="buyCard($event)"
                @placeBottle="placeBottle('buy', $event)"/>
            </div>
          </div>

          <div class="incomeWrapper" v-if="!players[playerId].hasChoosenIncome">
            <CollectorsIncome
            :labels="labels"
            :player="players[playerId]"
            @income="income($event)"/>
          </div>

          <div class="Skills">
            <CollectorsBuySkill v-if="players[playerId]"
              :labels="labels"
              :player="players[playerId]"
              :skillsOnSale="skillsOnSale"
              :placement="skillPlacement"
              :isPlacedList="isPlacedList"
              @buySkill="buySkill($event)"
              @placeBottle="placeBottle('skill',$event)"/>
          </div>

          <div class="tempWorker">
            <CollectorsWorkers v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="workerPlacement"
            :round="round"
            @placeWorker="placeWorker($event)"
            @setDiscardTwoTrue="setDiscardTwoTrue()"/>
          </div>

          <div class="marketWrapper">
            <CollectorsMarket v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="marketPlacement"
            :marketValues="marketValues"
            @placeBottle="placeBottle('market',$event)"
            @changeTwoMarket="changeTwoMarket()"/>
          </div>



          <!-- här börjar auction -->
          <div class="Auction">
            <!-- detta är vad som synns i overview.  -->
            <div class="frontAuction">
              <button href="#" class = "openButton openAuctionGridButton" @click="expandAuctionGrid()">
                <img src="https://www.freeiconspng.com/thumbs/gavel-icon/gavel-icon-1.png"  height="40px" width="30px">
                Auction
              </button>
              <br>
              <CollectorsStartAuction v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :auctionCards="auctionCards"
                :marketValues="marketValues"
                :placement="auctionPlacement"
                :isPlacedList="isPlacedList"
                @startAuction="startAuction($event)"
                @placeBottle="placeBottle('auction', $event)"/>

            </div>




            <div class="overlayAuction" id = "expandAuction">
              <a href="#" class="closeAuctionGridButton" @click="minimizeAuctionGrid()">&times;</a>
              <!--<div class="completeAuctionDiv">-->
                <div class="auctionWrapper">
                  <h1>Current Auction</h1>
                    <div class="cardslots">
                      <CollectorsCard v-for="(card, index) in currentAuction" :card="card" :key="index"/>
                    </div>

                  <!-- Får error om jag inte kör denna extra div runt h3:n -->
                  <div v-if="players[playerId]">
                    <div v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'">
                      <h3 v-if="players[playerId].myBiddingTurn">YOUR TURN</h3>
                      <h3 v-if="players[playerId].maxAuctionAffordance <= this.currentBid">You cannot afford to raise the bid.</h3>
                    </div>
                  </div>
                  <div class="currentBidWrapper">
                    <div class="currentBidTextWrapper">
                      <p> Current Bid </p>
                      <h3 v-if="this.currentBid !== -1"> {{ currentBid }} Coins </h3>
                      <h3 v-if="this.currentBid === -1"> No current auction </h3>
                    </div>
                    <div class="raiseBidButtonWrapper">
                      <button  class="raiseBidButton" id="raiseBidButton" v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'" @click="raiseBid">Raise Bid By 1 Coin</button>
                    </div>
                    <div class="forfeitBidButtonWrapper">
                      <button class="forfeitBidButton" id="forfeitBidButton" v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'" @click="skipThisBidding">Forfeit Bidding</button>
                    </div>
                  </div>
                </div>


                <div v-bind:class="bidWinnerWrapper">
                    <br>
                    <h3>Congratulations! You won the bidding.</h3>
                    <br>
                    <h4>Här är min hand yo </h4>
                    <div class="cardslots" v-if="players[playerId]">
                      <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
                    </div>

                    <br>
                    <h4>Payment</h4>
                    <br>
                    Click cards in your hand to use them as payment
                    <br>
                    These cards will be used as payment:
                    <div id="auctionPaymentCardslot" v-if="bidWinnerWrapper === 'bidWinnerWrapperVisible'">
                      <CollectorsAuctionPayment v-if="players[playerId]"
                        :labels="labels"
                        :player="players[playerId]"
                        :auctionPayment="auctionPayment"
                        @doAction="doAction($event)"/>
                    </div>
                    <br>
                    Your payment is {{moneyPayment}} coin(s) and the chosen cards
                    <br>
                    <br>
                    Confirm payment and choose where you want to put your won Auction-card
                    <br>
                    <div>
                      <button @click="placeAuctionCardInItems">Place your newly won card in Items</button>
                      <button @click="placeAuctionCardInSkills">Place your newly won card in Skills</button>
                      <button @click="placeAuctionCardInMarket">Place your newly won card in raise market</button>
                    </div>
                </div>
              <!--</div>-->

            </div>
          </div>

          <!-- här slutar auction-->


        </div>




          <div class="playerInfo">

            <div id="theOtherPlayers">
              <CollectorsOtherPlayers v-if="players[playerId]"
                :playerList="playerList" />
            </div>

            <div id="mePlayer">
                <div class="myStatus">
                  <div class="myStatusContent">
                    <h2>My Status</h2>

                    <div class="myStatusComponent">
                    <CollectorsMePlayer v-if="players[playerId]"
                      :player="players[playerId]" />
                    </div>

                    <button href="#" class ="openPlayerviewGridButton" @click="expandPlayerviewGrid()">
                      <img src="https://image.flaticon.com/icons/png/512/30/30565.png">
                      <span>Expand My Status</span>
                    </button>



                    <div class="myCards">
                      <div class="myHand">
                          <h2>My Hand</h2>
                          <div class="cardslots" id="meCards" v-if="players[playerId]">
                            <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
                          </div>
                      </div>

                      <div class="itemsAndSkills">
                          <div class="myItems">
                              <h2>My Items</h2>
                              <div class="cardslots" id="meCards" v-if="players[playerId]">
                                <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
                              </div>
                        </div>

                        <div>
                          <div class="mySkills">
                            <h2>My Skills</h2>
                              <div class="cardslots" id="meCards" v-if="players[playerId]">
                                <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="overlayPlayerView" id = "expandPlayerview">
                  <div class="overlayPlayerView_content">
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
            </div>
          </div>


      </div>

    </div>



    </main>


    <br>

    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>

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
import CollectorsAuctionPayment from '@/components/CollectorsAuctionPayment.vue'
import CollectorsIncome from '@/components/CollectorsIncome.vue'
import CollectorsStartGame from '@/components/CollectorsStartGame.vue'
import CollectorsOtherPlayers from '@/components/CollectorsOtherPlayers.vue'
import CollectorsMePlayer from '@/components/CollectorsMePlayer.vue'



export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    CollectorsBuyActions,
    CollectorsChat,
    CollectorsStartAuction,
    CollectorsBuySkill,
    CollectorsMarket,
    CollectorsAuctionPayment,
    CollectorsIncome,
    CollectorsWorkers,
    CollectorsStartGame,
    CollectorsOtherPlayers,
    CollectorsMePlayer

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
      workerPlacement: [],
      quarterTiles: [],
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
      currentBid: -1,
      currentAuction: [],
      auctionPayment: [],
      cardPayment: 0,
      moneyPayment: 0,
      winningbid: 0,
      bidWinnerWrapper: "bidWinnerWrapperInvisible",
      twoMarket: false,

      twoMarketCounter:0,
      round: 0,
      discardTwo: false,
      allPlayersIn: false,
      allPlayersReady: false,
      playerList: [],
      playerCount: 0


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
          /*if (typeof this.players[p].hand[c].item !== "undefined")
          this.$set(this.players[p].hand[c], "available", false);*/
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
        this.workerPlacement= d.placements.workerPlacement;
        this.round=d.round;
        this.incomePhase=d.incomePhase;
        this.twoMarket=d.twoMarket;
        this.twoMarketCounter=d.twoMarketCounter;
        this.isPlacedList=d.isPlacedList;
        this.discardTwo=d.discardTwo;
        this.allPlayersIn=d.allPlayersIn;
        this.allPlayersReady=d.allPlayersReady;
        this.playerCount=d.playerCount;
        this.sortPlayerList();

      }.bind(this));



    this.$store.state.socket.on('collectorsBottlePlaced',
      function(d) {
        this.players = d.players;
        console.log(this.players[this.playerId].hand);
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
        this.isPlacedList = d.isPlacedList;
        this.skillsOnSale=d.skillsOnSale;
        this.auctionCards=d.auctionCards;
        this.itemsOnSale=d.itemsOnSale;
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
        this.isPlacedList=d.isPlacedList;
        if(this.players[this.playerId].myTurn===true){
        this.changeTurn();
      }
      }.bind(this)
    );


    this.$store.state.socket.on('collectorsUpdateMessages',
      function(d) {
        //console.log(this.players[this.playerId].playerName, "player name is attribute")
        this.messages = d.messages;
      }.bind(this)
    );


    this.$store.state.socket.on('collectorsSkillBought',
      function(d){
        console.log(d.playerId, "bought a Skill");
        this.players=d.players;
        this.skillsOnSale=d.skillsOnSale;
        this.isPlacedList=d.isPlacedList;
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
        this.isPlacedList=d.isPlacedList;
        console.log("currentAuction = " + this.currentAuction);

        this.expandAuctionGrid();

      }.bind(this)
    );

    this.$store.state.socket.on('bidRaised',
      function(d) {
        this.currentBid = d.currentBid;
        this.winningBid = d.currentBid;
        this.moneyPayment = d.currentBid;
        this.players = d.players;
      }.bind(this)
    );
    this.$store.state.socket.on('bidSkipped',
      function(d) {
        this.currentAuction = d.currentAuction;
        this.players = d.players;
        this.currentBid = d.currentBid;
        if(this.players[this.playerId].myBiddingTurn === true){
          // for (let i = 0; i < this.players[this.playerId].hand.length; i += 1){
          //   this.$set(this.players[this.playerId].hand[i], 'available', true);  //detta funkar. handen blir true. ändå händer inget. uppdatera??? måste det vara myturn för att det ska funka?
          // }
          for (let i = 0; i < this.players[this.playerId].hand.length; i += 1){
            this.$set(this.players[this.playerId].hand[i], 'available', true);
            //console.log(this.players[this.playerId].hand[i],"handen i marketbottle")
          }

          // for (let i = 0; i < this.skillsOnSale.length; i += 1){
          //   if(this.skillsOnSale[i].item !== undefined){
          //   this.$set(this.skillsOnSale[i], 'available', true);
          // }
          // }
          // for (let i = 0; i < this.auctionCards.length; i += 1){
          // if(this.auctionCards[i].item !== undefined){
          // this.$set(this.auctionCards[i], 'available', true);
          // }
          // }
          this.bidWinnerWrapper = d.bidWinnerWrapper;
        }
      }.bind(this)
    );
    this.$store.state.socket.on('auctionCardPlacedInItems',
      function(d) {
        this.currentBid = d.currentBid;
        this.players = d.players;
        this.currentAuction = d.currentAuction;
        this.auctionPayment = [];
        if(this.players[this.playerId].bidSkipper === false){
          this.bidWinnerWrapper = d.bidWinnerWrapper;
        }
        if(this.players[this.playerId].iStartedAuction===true){
        this.changeTurn();
        }
      }.bind(this)
    );
    this.$store.state.socket.on('auctionCardPlacedInSkills',
      function(d) {
        this.currentBid = d.currentBid;
        this.players = d.players;
        this.currentAuction = d.currentAuction;
        this.auctionPayment = [];
        if(this.players[this.playerId].bidSkipper === false){
          this.bidWinnerWrapper = d.bidWinnerWrapper;
        }
        if(this.players[this.playerId].iStartedAuction === true){
          this.changeTurn();
        }
      }.bind(this));

    this.$store.state.socket.on('auctionCardPlacedInMarket', function(d){
      this.currentBid = d.currentBid;
      this.players = d.players;
      this.currentAuction = d.currentAuction;
      this.auctionPayment = [];
      this.marketValues=d.market;
      if(this.players[this.playerId].bidSkipper === false){
        this.bidWinnerWrapper = d.bidWinnerWrapper;
      }
      if(this.players[this.playerId].iStartedAuction === true){
        this.changeTurn();
      }
    }.bind(this));

    this.$store.state.socket.on('twoMarketChanged',function(d){
      this.twoMarket=d.twoMarket;
    }.bind(this));

    this.$store.state.socket.on('ValueRaised', function(d){
      console.log(d.playerId, "raised the market");
      this.players=d.players;
      this.marketValues=d.marketValues;
      this.skillsOnSale=d.skillsOnSale;
      this.auctionCards=d.auctionCards;
      this.isPlacedList=d.isPlacedList;
      this.twoMarket=d.twoMarket;
      if (this.twoMarket===true){
        //console.log("kör market en gång till")
        //this.placeBottle('market',0);
      }
      //console.log(this.twoMarket);
      if(this.players[this.playerId].myTurn===true&&this.twoMarket===false){
      this.changeTurn();
    }

    }.bind(this)
  );


  this.$store.state.socket.on('nameSet',function(d){
    this.players = d.players;
    this.playerName = d.playerName;
    //console.log(this.playerName, "from listnener in view")
  }.bind(this)
);

this.$store.state.socket.on('quarterWorkerPlaced',function(d){
  this.players=d.players;
  this.workerPlacement=d.placements.workerPlacement;
  this.isPlacedList=d.isPlacedList;
}.bind(this));


this.$store.state.socket.on('workerPlaced',function(d){
  this.players=d.players;
  this.workerPlacement=d.placements.workerPlacement;
  this.isPlacedList=d.isPlacedList;
  if(this.players[this.playerId].myTurn===true&&d.action!=="cardAndIncome"){
    this.changeTurn();
  }
}.bind(this));


this.$store.state.socket.on('discardTwoIsTrue',function(d){
  this.discardTwo=d.discardTwo;
}.bind(this));

    this.$store.state.socket.on('turnChanged',function(d){
      this.players=d.players;
      this.sortPlayerList();
    }.bind(this));

    this.$store.state.socket.on('roundChanged', function(d){
      this.round=d.round;
      this.marketValues=d.market;
      this.skillsOnSale=d.skillsOnSale;
      this.auctionCards=d.auctionCards;
      this.itemsOnSale=d.itemsOnSale;
      this.players=d.players;
      this.buyPlacement=d.placements.buyPlacement;
      this.skillPlacement=d.placements.skillPlacement;
      this.marketPlacement=d.placements.marketPlacement;
      this.auctionPlacement=d.placements.auctionPlacement;
      this.workerPlacement=d.placements.workerPlacement;
      this.incomePhase=d.incomePhase;
      this.sortPlayerList();
    }.bind(this));

    this.$store.state.socket.on('incomeRaised',function(d){
      this.players=d.players;
      this.discardTwo=d.discardTwo;
      this.isPlacedList=d.isPlacedList;
      console.log("isPLacedList",this.isPlacedList.getIncome);

      if(this.discardTwo===true){
        console.log("kör igen")
        this.placeWorker({action: 'quarter', cost: 0})
      }
      if(this.players[this.playerId].myTurn===true && this.discardTwo!==true){
        console.log("changeTurn income")
        this.changeTurn();
      }
    }.bind(this));


    this.$store.state.socket.on('incomeStarted',function(d){
      this.players=d.players;
      this.incomePhase=d.incomePhase;
    }.bind(this));

    this.$store.state.socket.on('incomeGotten',function(d){
      this.players=d.players;
      for(let id in this.players){
        console.log("incomeGotten for. player is", this.players[id].hasChoosenIncome);
        if(this.players[id].hasChoosenIncome===false){
          return
        }
      }
    if(this.players[this.playerId].playerNumberInList===0){
      this.changeRound();
    }
    }.bind(this));

    this.$store.state.socket.on('readyStatusChanged',function(d){
      this.players=d.players;
    }.bind(this));

    this.$store.state.socket.on('secretChoosen', function(d){
      console.log("secretChoosen")
      this.players=d.players;
      if(this.players[this.playerId].playerNumberInList===0){
        console.log("secretChoosen111111")
        for(let player in this.players){
          console.log("playerrr");
          if(this.players[player].secret.length===0){
            return
          }
        }
        console.log("ll is readyStatusChanged");
        this.allReady();
      }
    }.bind(this));

    this.$store.state.socket.on('setUpFixed',function(d){
      this.players=d.players;
      this.sortPlayerList();
      this.allPlayersReady=d.allPlayersReady;

    }.bind(this));

  },
  methods: {

    openreadypage: function(){




    },





    sortPlayerList: function(){
      if(Object.keys(this.players).length!==this.playerCount){
        return
      }
      this.playerList=[]
      for(let id in this.players){
        this.playerList.push(this.players[id])
      }
      for(let n=0;n<this.playerCount-1;n+=1){
        for(let i=0;i<this.playerCount-1;i+=1){
          if(this.playerList[i].playerNumberInList>this.playerList[i+1].playerNumberInList){
            let memory=this.playerList[i];
            this.playerList[i]=this.playerList[i+1];
            this.playerList[i+1]=memory;
          }
        }
      }
      while(this.playerList[this.playerCount-1].playerNumberInList!==this.players[this.playerId].playerNumberInList){
        let memory=this.playerList.pop();
        this.playerList.unshift(memory);
      }
      this.playerList.pop();

    },

    allReady: function(){
      this.$store.state.socket.emit('allAreReady',{roomId: this.$route.params.id})
    },

    secretCardChoosen: function(card){
      this.$store.state.socket.emit('chooseSecretCard',{roomId: this.$route.params.id,
      playerId: this.playerId,
      card: card});
    },

    isReady: function(){
      this.$store.state.socket.emit('playerIsReady',{roomId: this.$route.params.id,
      playerId: this.playerId});
    },

    selectAll: function (n) {
      n.target.select();

    },
    submitName: function(){
      //this.fixedPlayerName = this.playerName;
      this.gotSubmitted = true;
      this.$store.state.socket.emit('sendPlayerName', {roomId: this.$route.params.id,
         playerId: this.playerId,
          playerName: this.playerName});
      //console.log(this.playerName, "from submitName")
    },

/* Vad har vi gjort här med placeBottle och doAction? Jo, problemet var att när man klickade på en auctionknapp
och ville aktionera ut ngt man hade på handen så lades det i item och inte i currentAuction. Det löstes genom att
skicka @doAction till vår egen doAction, och denna skickar vidare till rätt funktion beroende på vad som placeBottle
har gjort true eller false. Om man börjar auction så ska auction vara true och allt annat false tex. */
    placeBottle: function (action, cost) {
      if(this.players[this.playerId].myTurn === false){
        return
      }
      if(this.isPlacedList.item===true || this.isPlacedList.market===true
        || this.isPlacedList.skill===true || this.isPlacedList.auction===true
        || this.isPlacedList.getIncome===true|| this.isPlacedList.getIncome2===true){
          return
        }
      else if(action ==="market"){
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

    income: function(d){
      console.log("income i Collectors");
      this.$store.state.socket.emit('collectorsSetIncome', {
        drawOneCard: d.drawOneCard,
        oneIncome: d.oneIncome,
        twoIncome: d.twoIncome,
        roomId: this.$route.params.id,
        playerId: this.playerId
    });
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
        this.$store.state.socket.emit('collectorsStartIncome',{
          roomId: this.$route.params.id
        })
      }
    },

    changeRound: function(){
      this.$store.state.socket.emit('collectorsChangeRound',{
        roomId: this.$route.params.id,
        playerId: this.playerId
      });
    },

    doAction: function(card){
      if(this.players[this.playerId].myTurn === false){
        console.log("not my turn");
      }
      else if(this.isPlacedList.item===true){

        this.buyCard(card);
      }
      else if(this.isPlacedList.skill===true){
        this.buySkill(card);
      }
      else if(this.isPlacedList.auction===true){

        this.startAuction(card);
      }
      else if(this.isPlacedList.market===true){
        this.raiseMarket(card,'hand');

      }
      else if(this.isPlacedList.getIncome===true){
        this.raiseIncome(card);
      }
      // if you won the auction, you can pay with your own cards
      if(this.bidWinnerWrapper==="bidWinnerWrapperVisible" && this.players[this.playerId].hand.indexOf(card) > -1){

        if(this.moneyPayment >= card.auctionWorth){

        this.auctionPayment.push(card);
        const index = this.players[this.playerId].hand.indexOf(card);

        this.players[this.playerId].hand.splice(index, 1);

        var eachCard;
        this.cardPayment = 0;
        for(eachCard in this.auctionPayment){
          this.cardPayment += this.auctionPayment[eachCard].auctionWorth;
        }
        this.moneyPayment = this.winningBid - this.cardPayment;
        }
        else{
          alert("You can't pay more than the winning bid")
        }
      }
      // to remove cards from auctionPayment, just click them again.
      else if(this.bidWinnerWrapper==="bidWinnerWrapperVisible" && this.auctionPayment.indexOf(card) > -1){
        this.players[this.playerId].hand.push(card);
        const index = this.auctionPayment.indexOf(card);

        this.auctionPayment.splice(index, 1);

        var eachCard2;
        this.cardPayment = 0;
        for(eachCard2 in this.auctionPayment){
          this.cardPayment += this.auctionPayment[eachCard2].auctionWorth;
        }
        this.moneyPayment = this.winningBid - this.cardPayment;
      }
    },






    raiseIncome: function(card){
      console.log("raiseIncome")
      this.$store.state.socket.emit('collectorsRaiseIncome', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          card: card
        }
      );
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

    setDiscardTwoTrue: function(){
      if(this.players[this.playerId].myTurn===false){
        return
      }
      if(this.isPlacedList.item===true || this.isPlacedList.market===true
        || this.isPlacedList.skill===true || this.isPlacedList.auction===true
        || this.isPlacedList.getIncome===true|| this.isPlacedList.getIncome2===true){
          return
        }

      this.$store.state.socket.emit('collectorsSetDiscardTwoTrue',{
        roomId: this.$route.params.id})
    },


    placeWorker: function(d){
      if(this.players[this.playerId].myTurn===false){
        return
      }
      if(this.isPlacedList.item===true || this.isPlacedList.market===true
        || this.isPlacedList.skill===true || this.isPlacedList.auction===true
        || this.isPlacedList.getIncome===true|| this.isPlacedList.getIncome2===true){
          return
        }
      console.log("placeWorker")
        if(d.action==="quarter"&&this.round!==4){
          this.$store.state.socket.emit('collectorsQuarterTile',{
          roomId: this.$route.params.id,
          playerId: this.playerId,
          cost: d.cost
        });
        }
        else{
          this.$store.state.socket.emit('collectorsWorkers',{
            action: d.action,
            cost: d.cost,
            roomId: this.$route.params.id,
            playerId: this.playerId
          });
        }
    },


    marketBottle: function(action, cost=0, twoMarket){
      for (let i = 0; i < this.players[this.playerId].hand.length; i += 1){
        this.$set(this.players[this.playerId].hand[i], 'available', true);
      }
      for (let i = 0; i<this.skillsOnSale.length; i += 1){
        console.log(this.skillsOnSale[i]);
        if(this.skillsOnSale[i].item !== undefined){

          //this.$set(this.skillsOnSale[i], 'available', true);
          this.$set(this.skillsOnSale[i],'available',true);
          break
        }
      }
      for (let i = 0;i<this.auctionCards.length; i += 1){
        if(this.auctionCards[i].item !== undefined){
          this.$set(this.auctionCards[i], 'available', true);
          console.log(this.skillsOnSale[i]);
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
      for (let i = 0; i<this.skillsOnSale.length; i += 1){
        if(this.skillsOnSale[i].item !== undefined){

          //this.$set(this.skillsOnSale[i], 'available', true);
          this.$set(this.skillsOnSale[i],'available',false);
          break
        }
      }
      for (let i = 0;i<this.auctionCards.length; i += 1){
        if(this.auctionCards[i].item !== undefined){
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
        if(this.isPlacedList.market===true){
          this.raiseMarket(card,'skill');

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
      //console.log(this.players[this.playerId].playerName ,"från sendmessage emit")
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
        if(this.players[this.playerId].money >= this.moneyPayment){
          this.$store.state.socket.emit('collectorsPlaceInItems', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          currentAuctionCard: this.currentAuction,
          moneyPayment: this.moneyPayment,
          winningPlayerHand: this.players[this.playerId].hand
          }
          );
        }
        else{
          alert("You don't have enough money. Please choose more cards on your hand to pay with")
        }
    },

    placeAuctionCardInMarket: function(){
      if(this.players[this.playerId].money >= this.moneyPayment){
        this.$store.state.socket.emit('collectorsPlaceInMarket', {
        roomId: this.$route.params.id,
        playerId: this.playerId,
        currentAuctionCard: this.currentAuction,
        moneyPayment: this.moneyPayment,
        winningPlayerHand: this.players[this.playerId].hand
        }
        );
      }
      else{
        alert("You don't have enough money. Please choose more cards on your hand to pay with")
      }
    },

    placeAuctionCardInSkills: function (){
        if(this.players[this.playerId].money >= this.moneyPayment){
          this.$store.state.socket.emit('collectorsPlaceInSkills', {
          roomId: this.$route.params.id,
          playerId: this.playerId,
          currentAuctionCard: this.currentAuction,
          moneyPayment: this.moneyPayment,
          winningPlayerHand: this.players[this.playerId].hand
          }
          );
        }
        else{
          alert("You don't have enough money. Please choose more cards on your hand to pay with")
        }
    },
  raiseMarket: function(card,action){
    if(this.players[this.playerId].myTurn === false){
      return

    }
    console.log(action);
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
    this.$store.state.socket.emit('collectorsChangeTwoMarket', {roomId: this.$route.params.id});
  }
}
};


</script>
<style scoped>
  *{
    font-size: 1.8vh;
  }

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

  .nameEnter{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    justify-content: center;
    align-items: center;
  }

  #nameArea{
    resize: none;
    margin-bottom: 1rem;
    outline: none;
    font-size: 13pt;
    height: 18pt;
    text-align: center;
  }

  .nameEnter button{
    outline: none;
    color: #313639;
    border: 1px solid #e60000;
    letter-spacing: 0.1rem;
    font-weight: bold;
    height: 30px;
    background-color:	#f8f8ff;
    border-radius: 2rem;
    box-shadow: 0.3rem 0.3rem 0.2rem black;
    transition: 200ms;
  }

  .nameEnter button:hover{
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0.4rem 0.38rem 0.28rem black;
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
    cursor: pointer;
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
/*@media all and (min-width:30em){

  .menuBar ul li:nth-of-type(-n+4){
    width: auto;
    display: block;
    max-height:50px;
  }

  .menuBar .burgerBarsIcon{
    display: none;
  }
}*/
  .bigWrapper{
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 80% 20%;
    grid-auto-rows: 5% 95%;
  }

  .gameBoardWrapper{
    width: 80vw;
    grid-column: 1;
    grid-row: 2;
    display: grid;
    grid-template-columns: 33% 33% 34%;
    grid-template-rows: 25% 25% 25% 25%;
  }

  .playerInfo{
    margin-left: 5px;
    grid-column: 2;
    grid-row: 2;
    background-color: beige;
    color: black;
    font-weight: bold;
    height: 100%;
    position: relative;
    /* overflow-y: hidden; */
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;

  }

  .Items{
    display: inline-block;
    grid-column: 2/ span 2;
    grid-row: 2;
  }

  .Skills{
    display: inline-block;
    grid-column: 2/ span 2;
    grid-row: 3;
  }


  .auctionWrapper{
    margin: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .tempWorker{
    margin: 2px;
    grid-column: 1/ span 3;
    grid-row: 1;
    background-color: rgb(255, 217, 179);
  }

  .marketWrapper{
    margin: 2px;
    background-color: #4169E1;
    grid-column: 1/ span 3;
    grid-row: 4;
  }

  .openButton{
    position: relative;
    top: 0;
    cursor: pointer;
    margin: 2px;
    border-radius: 28px;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: transparent;
    Letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 120%;
    font-family: "sans", serif;
    padding: 5px;
    border-color: white;
    border-width: 2px;
    font-weight: bold;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .openButton img{
    height: 10%;
    padding: 3px;
  }

  .openAuctionGridButton {
  color: rgb(155, 89, 182);
  }


  .openAuctionGridButton:hover {
    background-color: rgb(230, 204, 255);
    border-color: black;
  }

  /*Dekstop menu end*/
  /*här slutar css för navbar*/

  #mePlayer{
    height: 100%;
  }

  .myStatus{
    margin-top: -5px;
    background-color: rgb(77, 219, 219);
    border: 6px;
    border-style: solid;
    border-color: white;
    border-radius: 20px;
    width: 98%;
    height: 100%;
  }

  .myStatusContent{
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 95%;
    width: 98%;
    margin-top: -10px;
  }

  .myStatusComponent{
    height: 30%;
    width: 100%;
    padding: 1%;
    margin-left: -1%;
  }

  .myCards{
    margin-left: 5%;
    transform: scale(0.45);
    transform-origin: left top;
    text-align: left;
  }

  /* .itemsAndSkills div{
    display: flex;
    flex-direction: column;
  } */





  /* PLAYERVIEW STYLING */
  .openPlayerviewGridButton{
    height: 10%;
    width: 100%;
    transform: scale(0.9);
    font-size: 1.8vh;
    color: rgb(31, 145, 145);
    position: relative;
    top: 0;
    cursor: pointer;
    margin: 2px;
    border-radius: 28px;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: transparent;
    Letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 100%;
    font-family: "sans", serif;
    padding: 5px;
    border-color: white;
    border-width: 2px;
    font-weight: bold;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(53, 124, 124);
  }

  .openPlayerviewGridButton>img{
    height: 100%;
    /* width: 20%; */
  }

  .openPlayerviewGridButton:hover{
    background-color: rgb(154, 255, 255);
    border-color: black;
  }

  .myHand div{
    display: grid;
    grid-template-columns: 70px 70px 70px 70px 70px 70px 70px 70px 70px ;
  }

  .myItems div, .mySkills div{
    display: grid;
    grid-template-columns: 70px 70px 70px 70px 70px 70px 70px 70px 70px;
  }


  .itemsAndSkills{
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 50%;
  }

  @media all and (max-height:40em){
    .myCards{
      font-size: 200%;
      margin-top: 0px;
      display: grid;
      grid-template-columns: 20% 60%;
      grid-gap: 40%;
    }

    .myHand div{
    display: grid;
    grid-template-columns: 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px;
    }

    .myItems div, .mySkills div{
    display: grid;
    grid-template-columns: 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px 0px;
    }

    #meCards{
      transition: 0.2s ease;
    }

    #meCards:hover{
      transform: scale(2);
      display: grid;
      grid-template-columns: 70px 70px 70px 70px;
      grid-template-rows: 100px 100px 100px 100px;

    }

    #meCards div:hover{
      transform: scale(0.5)translate(-50%,-50%);
    }
  }

  /* @media all and (max-height:30em){
    .myCards{
      display: none;
    }
  } */

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

  .incomeWrapper{
    grid-column: 2/ span 3;
    grid-row: 2/4;
    z-index: 5;
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
    display: flex;
    flex-direction: row;
    /* position: relative;
    top: 25%;
    width: 80%;
    text-align: center;
    margin-top: 30px; */
    /* display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0px 0px;
    grid-template-areas:
    "myHandOverlay myItemsOverlay mySkillsOverlay"; */
  }
  .overlayPlayerView a{
    padding: 10px;
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
    height:100%;
    width: 0%;
    top: 0;
    right: 0;
    background: rgba(0,0,0,.9);
    overflow-x: hidden;
    z-index: 10;
    transition: all 0.5s;
  }

  /*.completeAuctionDiv{
    display: flex;
    flex-direction: column;
    align-items: center;

  }*/

  .CollectorsStartAuctionOverlay{
    border-radius: 1em;
    grid-area: CollectorsStartAuctionOverlay;
    border: 5px dotted #fff;
  }

  .auctionWrapper{
    background-color: rgb(195, 155, 211);
    margin:10%;
    border-radius: 2em;
    display: grid;
    z-index: 8;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 33% 33% 34%;
    grid-template-areas:
    "auctionLeft  auctionTopMiddle auctionRight"
    "auctionLeft  auctionMiddle auctionRight"
    "auctionLeft  auctionMiddle auctionRight";
  }

  .auctionWrapper h1{
    text-align: center;
    grid-area: auctionTopMiddle;

  }

  .auctionWrapper .cardslots{
    grid-area: auctionMiddle;
  }

  .currentBidWrapper{
    align-items: center;
    border-left: dotted white;
    grid-area: auctionRight;
    padding-left: 10%;
    display: grid;
    grid-template-rows: 50% 25% 25%;
    grid-template-areas:
    "auctionRightTop"
    "auctionRightMiddle"
    "auctionRightBottom";
  }

  .currentBidTextWrapper{
    grid-area: auctionRightTop;

  }

  .raiseBidButtonWrapper{
    grid-area: auctionRightMiddle;
    margin: 5%;
  }

  .raiseBidButton:hover{
    cursor: pointer;
  }


  .forfeitBidButtonWrapper{
    grid-area: auctionRightBottom;
    margin: 5%;
  }

  .forfeitBidButton{
    cursor: pointer;
  }

  #raiseBidButton{
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 1rem;
    border-radius: 6px;
    padding: 10%;
    height: 70%;
    width: 100%;
    background: #43C6AC;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #F8FFAE, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #F8FFAE, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  #forfeitBidButton{
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 1rem;
    border-radius: 6px;
    padding: 10%;
    height: 70%;
    width: 100%;
    background: #ED213A;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #93291E, #ED213A);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #93291E, #ED213A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
    width: 80%;
    text-align: center;
    margin-top: 30px;
  }

  .overlayAuction a{
    padding: 10px;
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
#theOtherPlayers {
  width: 100%;
  height: 100%;
}

  .layout{
    z-index:3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);/* 1fr 1fr;*/
    grid-template-rows: auto 1fr 1fr 1fr;
    gap: 0px 0px;
  }
  .menuBar{
    border-radius: 1em;
    grid-column: 1/ span 2;
    grid-row: 1;
    border: 5px solid #fff;
    background-color: #313639;
  }
  .otherPlayers{
    border-radius: 1em;
    grid-area: otherPlayers;
    border: 5px solid #fff;
    background-color: RoyalBlue;
  }
  .Auction{
    grid-column: 1;
    grid-row: 2/ span 2;
    border-radius: 1em;
    border: 5px solid #fff;
    background-color: rgb(195, 155, 211);
    margin: 0;
    padding: 0;
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

  .auctionPaymentCards{
    transform: scale(0.4)translate(-50%,-50%);
  }




  .bidWinnerWrapperInvisible {
    display: none;
  }

  .bidWinnerWrapperVisible {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bidWinnerWrapperVisible button{
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 1rem;
    border-radius: 6px;
    height: 80px;
    background: #7affde;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #EF629F, #ffc06d);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #EF629F, #f5c27f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    /* importerat från UI-gradient */
  }
  .foter{
    bottom: 0;
    left:0;
    position: absolute;
  }

  @media all and (max-width:500px){

    #app>div{
      height: 100%;
      width: 100%;
    }

    #megaWrapper {
      height: 100%;
      width: 100%;

    }

    .startgamewrapper{
      grid-row: 1;
      grid-column: 1;
      height: 100%;
      width: 100%;
    }



    .layout{
      grid-column: 1;
      grid-row: 1;
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;

    }

    main {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 100%;
    }

    .bigWrapper{
      grid-row: 1;
      grid-column: 1;
      display: grid;
      grid-template-columns: 72% 22%;
      grid-template-rows: 7% 93%;
      height: 100%;
      width: 100%;

    }

    .menuBar {
      grid-column: 1/3;
      grid-row: 1;
    }

    .gameBoardWrapper{
      grid-row: 2;
      grid-column: 1;
      display: grid;
      grid-template-rows: 20% 30% 30% 20%;
      grid-template-columns: 33% 66%
    }


    .playerInfo{
      grid-row: 2;
      grid-column: 2;
      display: grid;
      grid-template-rows: 50% 50%;
      grid-template-columns: 100%;
    }

    .theOtherPlayers{
      grid-column: 1;
      grid-row: 1;
    }

    #mePlayer{
      grid-column: 1;
      grid-row: 2;
    }



    .Items{
      height: 100%;
      width: 100%;
      grid-row: 2;
      grid-column: 2;
    }

    .Skills{
      grid-row: 3;
      grid-column: 2;
    }

    .tempWorker {
      grid-row: 1;
      grid-column: 1/3;
    }

    .marketWrapper{
      grid-row: 4;
      grid-column: 1/3;
    }

    .Auction {
      grid-row: 2/4;
      grid-column: 1;
      height: 100%;
      width: 100%;
    }

    .openAuctionGridButton{
      grid-row: 1;
      grid-column: 1;
      height: 100%;
      width: 100%;
      text-align: center;
      left: 0px;
    }

    .openButton{
      position: relative;
      top: 0;
      cursor: pointer;
      margin: 0px;
      border-radius: 10px;
      background-color: transparent;
      -webkit-text-stroke: 1px black;
      color: transparent;
      Letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 75%;
      font-family: "sans", serif;
      padding: 0px;
      border-color: white;
      border-width: 2px;
      font-weight: bold;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .openButton img{
      visibility: hidden;
    }

    .frontAuction {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 30% 70%;
    }


    .cardsOnSale{
      height: 100%;
      width: 100%;
    }

    .buttonWrapper{
      display: none;
    }



  }




</style>
