<template>

  <div>

  <div v-if="players[playerId].playerName===''">
    <form class="nameEnter">
      <h1>{{labels.entername}}</h1>
      <textarea placeholder="Enter name" id="nameArea" v-model="playerName" v-on:keyup.enter="submitName2"></textarea>
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
        :allPlayersIn="allPlayersIn"
        :inviteLink="publicPath + $route.path"
        @isReady="isReady()"
        @secretCardChoosen="secretCardChoosen($event)"/>
      </div>
      </div>




    <div class="layout">
      <!-- <h1>{{isPlacedList}}</h1> -->



      <div class="bigWrapper">

        <div class="menuBar">
          <div href="#" class="logo"> <h1>Collectors</h1></div>
          <input class="menuButton" type="checkbox" id="menuButton">
          <label class="burgerBarsIcon" for="menuButton">
          <span class="barsIcon"></span>
          </label>

          <CollectorsChat :messages="messages" :playerId="playerId" :playerName="players[playerId].playerName" @sendMessage = "sendMessage($event)"/>

          <ul class="menu">
            <li class="item desktop">
              <a href="#" class = "openHelpGridButton" @click="expandHelpGrid()">{{labels.rules}}</a>
            </li>
            <li class="item buttonNav">
              <a href="#" class = "openAboutGridButton" @click="expandAboutGrid()">{{labels.about}}</a>
            </li>
            <li class= "item help">
              <a href="#" class=" openTutorial" @click ="expandTutorialGrid()">{{labels.help}}</a>
            </li>
            <li class="item buttonNav secondary">
              <a id="ExitGame" class = "openExitGridButton" @click="expandExitGrid()">{{labels.exitgamee}}</a>
            </li>
          </ul>

                <div class="aboutOverlay" id = "expandAbout">
                  <a href="#" class="closeAboutGridButton" @click="minimizeAboutGrid()">&times;</a>
                  <div class="aboutInfoOverlay">
                    <h1 id="aboutLogo"><img src="/images/CollectorsLogo01.png" height="500"></h1>
                    <h2>{{labels.collectors}}
                    </h2>
                    <h2>{{labels.collectors2}}</h2>
                    <h2>{{labels.collectors3}}</h2>
                    <h3>Adam Bergman</h3>
                    <h3>Anton Dahl</h3>
                    <h3>Leon Henzel</h3>
                    <img src="/images/sexiboiLeon01.png">
                    <h3>Oskar Jonsson</h3>
                    <h3>Fredrik Nilsson</h3>
                    <img src="/images/sexiboiFredrik.jpg" height="500">
                    <h3>Kalle Rosengren</h3>
                  </div>
                </div>

                <div class="endGameOverlay" v-if="endTheGame"  id = "expandEndGame">
                  <!-- <a href="#" class="closeEndGameGridButton" @click="minimizeEndGameGrid()">&times;</a> -->
                  <div class="EndGameInfoOverlay">
                    <h1 id="EndGameLogo"><img src="/images/CollectorsLogo01.png" height="500"></h1>

                    <h1>{{labels.endTheGame}}</h1>

                    <h2>{{labels.scoreIs}}</h2>

                    <ol v-for="(player, index) in playerEndList" :key="index"><div>{{player.playerName}} {{labels.score}} {{player.points}}</div></ol>






                  </div>
                </div>



                <div class="exitOverlay" id = "expandExit">
                  <a href="#" class="closeExitGridButton" @click="minimizeExitGrid()">&times;</a>
                  <div class="exitInfoOverlay">
                    <h1 id="exitLogo"><img src="/images/CollectorsLogo01.png" height="500"></h1>


                    <h1 class="exittext">{{labels.exitgame}}</h1> <br>
                    <a href="http://localhost:8080/#/">
                      <button class="exitForReal">YES
                      </button>
                    </a>

                    <a class="exitforReal" @click="minimizeExitGrid()">NO</a>

                  </div>
                </div>

                <div class="helpOverlay" id = "expandHelp">
                  <a href="#" class="closeHelpGridButton" @click="minimizeHelpGrid()">&times;</a>
                  <div class="helpInfoOverlay">
                    <img src="/images/CollectorsLogo01.png" class="helplogo" height="500">
                    <h1 class="rulebook">{{labels.rulebook}}</h1>
                    <img src="/images/Screenshot 2021-01-05 at 14.43.21.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.48.01.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.43.48.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.44.32.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.45.02.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.45.26.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.45.41.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.48.12.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.48.22.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.48.35.png">
                    <img src="/images/Screenshot 2021-01-05 at 14.48.44.png">
                  </div>
                </div>

        </div>

        <div class="gameBoardWrapper">
          <div class="Items">
            <!---->
            <div class="cardsOnSale">
              <CollectorsBuyActions v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :itemsOnSale="itemsOnSale"
                :marketValues="marketValues"
                :placement="buyPlacement"
                :isPlacedList="isPlacedList"
                @buyCard="buyCard($event)"
                @placeBottle="placeBottle('buy', $event)"
                @cancelAction="cancelAction()"
                @openHelpGridItem="openHelpGridItem()"/>

              <div class="helpGridItem" id="helpGridItem">
                <a href="#" class="closeButton" @click="closeHelpGridItem()">&times;</a>
                <div class="helpGridItemLayout">
                  <p>{{labels.helpGridItem}}</p>
                </div>
              </div>
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
              :playerCount="playerCount"
              @cancelAction="cancelAction()"
              @buySkill="buySkill($event)"
              @placeBottle="placeBottle('skill',$event)"
              @openHelpGridSkill="openHelpGridSkill()"/>

              <div class="helpGridSkills" id="helpGridSkills">
                <a href="#" class="closeButton" @click="closeHelpGridSkill()">&times;</a>
                <div class="helpGridSkillLayout">
                  <p>{{labels.helpGridSkills}}</p>
                </div>
              </div>
          </div>

          <div class="tempWorker">
            <CollectorsWorkers v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="workerPlacement"
            :round="round"
            @placeWorker="placeWorker($event)"
            @setDiscardTwoTrue="setDiscardTwoTrue()"
            @openHelpGridWorker="openHelpGridWorker()"/>

            <div class="helpGridWorker" id="helpGridWorker">
              <a href="#" class="closeButton" @click="closeHelpGridWorker()">&times;</a>
              <div class="helpGridWorkerLayout">
                <p>{{labels.helpGridWorker}}</p>
              </div>
            </div>
          </div>

          <div class="marketWrapperr">
            <CollectorsMarket v-if="players[playerId]"
            :labels="labels"
            :player="players[playerId]"
            :placement="marketPlacement"
            :marketValues="marketValues"
            :isPlacedList="isPlacedList"
            :twoTimesMarket="twoTimesMarket"
            @cancelAction="cancelAction()"
            @placeBottle="placeBottle('market',$event)"
            @changeTwoMarket="changeTwoMarket()"
            @openHelpGridMarket="openHelpGridMarket()"/>

            <div class="helpGridMarket" id="helpGridMarket">
              <a href="#" class="closeButton" @click="closeHelpGridMarket()">&times;</a>
              <div class="helpGridMarketLayout">
                <p>{{labels.helpGridMarket}}</p>
              </div>
            </div>
          </div>



          <!-- här börjar auction -->
          <div class="Auction">
            <!-- detta är vad som synns i overview.  -->
            <div class="frontAuction">
              <!--<button href="#" class = "openButton openAuctionGridButton" > @click="expandAuctionGrid()" öppna auction vid klick
                <img src="https://www.freeiconspng.com/thumbs/gavel-icon/gavel-icon-1.png"  height="40px" width="30px">
                Auction
              </button>
              <br>kan nog tas bort-->
              <CollectorsStartAuction v-if="players[playerId]"
                :labels="labels"
                :player="players[playerId]"
                :auctionCards="auctionCards"
                :marketValues="marketValues"
                :placement="auctionPlacement"
                :isPlacedList="isPlacedList"
                @cancelAction="cancelAction()"
                @startAuction="startAuction($event)"
                @placeBottle="placeBottle('auction', $event)"
                @openHelpGridAuction="openHelpGridAuction()"/>

            </div>

            <div class="overlayAuction" id = "expandAuction">
              <!--<a href="#" class="closeAuctionGridButton" @click="minimizeAuctionGrid()">&times;</a> kryss knapp auction-->
              <!--<div class="completeAuctionDiv">-->
              <div class="auctionBigWrapper" v-if="players[playerId].bidSkipper===false && bidWinnerWrapper==='bidWinnerWrapperInvisible'" >
                <div class="auctionWrapper">
                  <div class="auctionLogoWrapper">
                    <div href="#" class = "openButton openAuctionGridButton"> <!-- @click="minimizeAuctionGrid()"-->
                      <img class="bildAuction" src="https://www.freeiconspng.com/thumbs/gavel-icon/gavel-icon-1.png">
                      <p>{{labels.auction}}</p>
                    </div>
                  </div>
                  <div class="auctionTitleWrapper">
                    <h1>{{labels.currentauction}}</h1>
                  </div>

                  <div class="cardslots">
                    <CollectorsCard v-for="(card, index) in currentAuction" :card="card" :key="index"/>
                  </div>

                  <!-- Får error om jag inte kör denna extra div runt h3:n -->
                  <div v-if="players[playerId]">
                    <div v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'">
                      <div class="yourTurnToPoorWrapper">
                        <div class="yourTurnWrapper">
                          <h3 v-if="players[playerId].myBiddingTurn">{{labels.yourturn}}</h3>
                        </div>
                        <div class="toPoorWrapper">
                          <h3 v-if="players[playerId].maxAuctionAffordance <= this.currentBid">{{labels.cantaffordbid}}.</h3>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="currentBidWrapper">
                    <div class="currentBidTextWrapper">
                      <p> {{labels.currentbid}} </p>
                      <h3 v-if="this.currentBid !== -1"> {{ currentBid }} {{labels.coin}} </h3>
                      <h3 v-if="this.currentBid === -1"> {{labels.nocurrentbid}} </h3>
                    </div>
                    <div class="raiseBidButtonWrapper">
                      <button  class="raiseBidButton" id="raiseBidButton" v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'" @click="raiseBid">{{labels.raisebidding}}</button>
                    </div>
                    <div class="forfeitBidButtonWrapper">
                      <button class="forfeitBidButton" id="forfeitBidButton" v-if="bidWinnerWrapper === 'bidWinnerWrapperInvisible'" @click="skipThisBidding">{{labels.forfeitbid}}</button>
                    </div>
                  </div>
                </div>
              </div>


                <div v-bind:class="bidWinnerWrapper">
                    <div class="congratsWrapper">
                      <h1>{{labels.congratulations}}</h1>
                      <div id="wonAuctionCardDiv">
                        <CollectorsCard id="wonAuctionCard" v-for="(card, index) in currentAuction" :card="card" :key="index"/>
                      </div>
                    </div>
                    <div class="cardslotsWrapper">
                      <div class="cardslotsTextWrapper">
                        <h3>{{labels.myhand}}</h3>
                      </div>
                      <div class="cardslotsCardsWrapper" v-if="players[playerId]">
                        <div class="cardslots"  v-for="(card, index) in players[playerId].hand" :key="index">
                          <CollectorsCard  :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
                        </div>
                      </div>
                    </div>

                  <div class="paymentAuctionWrapper">
                    <div class="paymentAuctionAllTextWrapper">
                      <div class="paymentAuctionTextWrapper">
                        <h3>{{labels.payment}}</h3>
                        <br>
                        {{labels.clickcards}}
                        <br>
                        {{labels.thesecards}}:

                      </div>
                      <div class="paymentAuctionPaymentWrapper">
                        <div id="auctionPaymentCardslot" v-if="bidWinnerWrapper === 'bidWinnerWrapperVisible'">
                          <CollectorsAuctionPayment v-if="players[playerId]"
                            :labels="labels"
                            :player="players[playerId]"
                            :auctionPayment="auctionPayment"
                            @doAction="doAction($event)"/>
                        </div>
                        <div class="paymentAuctionPaymentTextWrapper">
                          <br>
                          {{labels.yourpaymentis}} {{moneyPayment}} {{labels.andthechosencards}}
                          <br>
                          {{labels.confirm}}
                        </div>
                      </div>
                    </div>
                      <div class="placeAuctionCardWrapper">
                        <div class="placeInItems">
                          <button  @click="placeAuctionCardInItems">{{labels.placeitem}}</button>
                        </div>
                        <div class="placeInSkills">
                          <button  @click="placeAuctionCardInSkills">{{labels.placeskills}}</button>
                        </div>
                        <div class="placeInMarket">
                          <button  @click="placeAuctionCardInMarket">{{labels.placeraisemarket}}</button>
                        </div>
                      </div>
                  </div>

                </div>

                <div class="auctionOver" v-if="players[playerId].bidSkipper===true && currentAuction.length!==0"  id="auctionOver">
                  <div class="auctionOverWrapper">
                    <div class="auctionOverTitle">
                      <h1>{{labels.unfortunately}}</h1>
                    </div>
                    <div class="sadEmojiDiv">
                      <div id="sadEmoji">
                        <CollectorsSadEmoji v-if="players[playerId]"
                        :player="players[playerId]" />
                      </div>
                    </div>
                    <div class="auctionOverContent">
                      <h3>{{labels.auctionover}}</h3>
                      <h4>{{labels.pleasewaitplacing}}</h4>
                    </div>
                  </div>

                </div>
              <!--</div>-->

            </div>
            <div class="helpGridAuction" id="helpGridAuction">
              <a href="#" class="closeButton" @click="closeHelpGridAuction()">&times;</a>
              <div class="helpGridAuctionLayout">
                <p>{{labels.helpGridAuction}}</p>
              </div>
            </div>
          </div>

          <!-- här slutar auction-->


        </div>




          <div class="playerInfo">

            <div id="theOtherPlayers">
              <CollectorsOtherPlayers v-if="players[playerId]"
                :playerList="playerList"
                :labels="labels" />
            </div>

            <div id="mePlayer">
              <button type="submit" class="openHelpGridPlayerview" @click="openHelpGridPlayerview()">?</button>
                <div class="myStatus">
                  <div class="myStatusContent">
                    <h2 id="myStatusTitle">{{labels.mystatus}}</h2>

                    <div class="myStatusComponent">
                    <CollectorsMePlayer v-if="players[playerId]"
                      :player="players[playerId]"
                      :labels="labels"
                      @openHelpGridPlayerview="openHelpGridPlayerview()" />
                    </div>

                    <button href="#" class ="openPlayerviewGridButton" @click="expandPlayerviewGrid()">
                      <img src="https://image.flaticon.com/icons/png/512/30/30565.png">
                      <span class="openPlayerviewGridButtonText">{{labels.expandstatus}}</span>
                    </button>



                    <!--

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
                    </div> -->
                  </div>
                </div>

                <div class="overlayPlayerView" id = "expandPlayerview">

                  <div class="overlayPlayerViewWrapper">
                    <button class="closePlayerviewGridButton" @click="minimizePlayerviewGrid()">
                      <a href="#">&times; </a>
                    </button>
                    <div class="overlayPlayerViewWrapperTop" v-if="players[playerId]">
                        <CollectorsPlayerviewOverlayTitle v-if="players[playerId]"
                        :player="players[playerId]"
                        :labels="labels" />
                    </div>


                    <div class="overlayPlayerViewWrapperBottom">
                      <div class="overlayPlayerView_leftContent">
                        <div>
                          <CollectorsMePlayerOverlay v-if="players[playerId]"
                          :player="players[playerId]"
                          :labels="labels" />
                        </div>
                      </div>
                      <div class="overlayPlayerView_rightContent">
                        <div>
                          <!-- nödvändig -->
                        </div>
                        <div class="myHandOverlay">
                          <h4>{{labels.myhand}}</h4>
                          <div class="cardslots" v-if="players[playerId]">
                            <CollectorsCard v-for="(card, index) in players[playerId].hand" :card="card" :availableAction="card.available" @doAction="doAction(card)" :key="index"/>
                          </div>
                        </div>

                        <div class="myItemsOverlay">
                          <h4>{{labels.myitems}}</h4>
                          <div class="cardslots" v-if="players[playerId]">
                            <CollectorsCard v-for="(card, index) in players[playerId].items" :card="card" :key="index"/>
                          </div>
                        </div>

                        <div class="mySkillsOverlay">
                          <h4>{{labels.myskills}}</h4>
                          <div class="cardslots" v-if="players[playerId]">
                            <CollectorsCard v-for="(card, index) in players[playerId].skills" :card="card" :key="index"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
            <div class="helpGridPlayerview" id="helpGridPlayerview">
              <a href="#" class="closeButton" @click="closeHelpGridPlayerview()">&times;</a>
              <div class="helpGridPlayerviewLayout">
                <p>{{labels.helpGridPlayerview}}</p>
              </div>
            </div>
          </div>


      </div>

    </div>



    </main>

<!--
    <br>

    <button v-if="players[playerId]" @click="players[playerId].money += 1">
      fake more money
    </button>-->

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
import CollectorsMePlayerOverlay from '@/components/CollectorsMePlayerOverlay.vue'
import CollectorsSadEmoji from '@/components/CollectorsSadEmoji.vue'
import CollectorsPlayerviewOverlayTitle from '@/components/CollectorsPlayerviewOverlayTitle.vue'








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
    CollectorsMePlayer,
    CollectorsMePlayerOverlay,
    CollectorsSadEmoji,
    CollectorsPlayerviewOverlayTitle,


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
      playerEndList: [],
      playerCount: 0,
      twoTimesMarket:0,
      placementInfo: {
        cost: 0,
        timesMarket: 0,
      },
      choosenPlacementCost:0,
      helpGridOpened: false,
      endTheGame: false
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
        this.placementInfo=d.placementInfo;
        this.twoTimesMarket=d.twoTimesMarket;
        this.choosenPlacementCost=d.choosenPlacementCost;
        this.endTheGame=d.endTheGame;
        this.sortPlayerList();
        if(this.endTheGame)
        {
            this.scoreSort();
        }

      }.bind(this));

      this.$store.state.socket.on('collectorsActionCanceld',
    function(d){
      this.players=d.players;
      this.buyPlacement = d.placements.buyPlacement;
      this.skillPlacement = d.placements.skillPlacement;
      this.marketPlacement = d.placements.marketPlacement;
      this.auctionPlacement = d.placements.auctionPlacement;
      this.isPlacedList = d.isPlacedList;
      this.skillsOnSale=d.skillsOnSale;
      this.auctionCards=d.auctionCards;
      this.itemsOnSale=d.itemsOnSale;
      this.placementInfo=d.placementInfo;
      this.choosenPlacementCost=d.choosenPlacementCost;
    }.bind(this));

    this.$store.state.socket.on('collectorsBottlePlaced',
      function(d) {
        this.players = d.players;
        this.buyPlacement = d.placements.buyPlacement;
        this.skillPlacement = d.placements.skillPlacement;
        this.marketPlacement = d.placements.marketPlacement;
        this.auctionPlacement = d.placements.auctionPlacement;
        this.isPlacedList = d.isPlacedList;
        if(this.players[this.playerId].myTurn===true){
          this.skillsOnSale=d.skillsOnSale;
          this.auctionCards=d.auctionCards;
          this.itemsOnSale=d.itemsOnSale;
        }
        this.placementInfo=d.placementInfo;
        this.twoTimesMarket=d.twoTimesMarket;
        this.choosenPlacementCost=d.choosenPlacementCost;
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
        this.choosenPlacementCost=d.choosenPlacementCost;
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
        this.choosenPlacementCost=d.choosenPlacementCost;
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
        this.choosenPlacementCost=d.choosenPlacementCost;
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
        this.minimizeAuctionGrid()
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
        this.minimizeAuctionGrid()
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
      this.minimizeAuctionGrid()
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
      this.twoTimesMarket=d.twoTimesMarket;
      this.choosenPlacementCost=d.choosenPlacementCost;
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
      this.endTheGame=d.endTheGame;
      this.scoreSort();
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
    cancelAction: function(){
      this.$store.state.socket.emit("cancelAction", {
      roomId: this.$route.params.id,
      playerId: this.playerId,
      placementInfo: this.placementInfo,
      isPlacedList: this.isPlacedList})
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

      this.gotSubmitted = true;

        this.$store.state.socket.emit('sendPlayerName', {roomId: this.$route.params.id,
        playerId: this.playerId,
        playerName: this.playerName});

    },

    // checkEndGame: function(){
    //
    //     if(this.round = true;
    //
    //     this.$store.state.socket.emit("hasGameEnded", {roomId: this.$route.params.id,
    //     playerId: this.playerId,
    //     playerName: this.playerName});
    //
    // }

    submitName2: function(){

      this.gotSubmitted = true;

        this.$store.state.socket.emit('sendPlayerName', {roomId: this.$route.params.id,
        playerId: this.playerId,
        playerName: this.playerName.slice(0, -1)});

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
        this.choosenPlacementCost = cost;
        this.marketBottle(action, cost, this.twoMarket);
        return
      }
      this.choosenPlacementCost =cost ;
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

      if(this.players[this.playerId].myTurn === false || card.available===false){
        return
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

    scoreSort: function(){

      this.playerEndList=[]

      for(let id in this.players){
        this.playerEndList.push(this.players[id])
      }

      for(let n=0;n<this.playerEndList.length-1;n+=1){
        for(let i=0;i<this.playerEndList.length-1;i+=1){
          if(this.playerEndList[i].points<this.playerEndList[i+1].points){
            let memory=this.playerEndList[i];
            this.playerEndList[i]=this.playerEndList[i+1];
            this.playerEndList[i+1]=memory;
          }
        }
      }
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
          cost: this.marketValues[card.item] + this.choosenPlacementCost
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
            cost: this.choosenPlacementCost
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
          cost: this.choosenPlacementCost
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

    expandAboutGrid: function(){
      document.getElementById('expandAbout').style.width = "100%";
    },

    minimizeAboutGrid: function(){
      document.getElementById('expandAbout').style.width = "0%";
    },

    expandEndGameGrid: function(){
      document.getElementById('expandAbout').style.width = "100%";
    },

    minimizeEndGameGrid: function(){
      document.getElementById('expandAbout').style.width = "0%";
    },

    expandExitGrid: function(){
      document.getElementById('expandExit').style.width = "100%";
    },

    minimizeExitGrid: function(){
      document.getElementById('expandExit').style.width = "0%";
    },

    expandHelpGrid: function(){
      document.getElementById('expandHelp').style.width = "100%";

    },

    expandTutorialGrid: function(){
      if(this.helpGridOpened===false){
        document.getElementById('helpGridItem').style.width = "100%";
        document.getElementById('helpGridSkills').style.width = "100%";
        document.getElementById('helpGridWorker').style.width = "100%";
        document.getElementById('helpGridMarket').style.width = "100%";
        document.getElementById('helpGridAuction').style.width = "100%";
        document.getElementById('helpGridPlayerview').style.width = "100%";
        this.helpGridOpened = true;
        return;
      }
      document.getElementById('helpGridItem').style.width = "0%";
      document.getElementById('helpGridSkills').style.width = "0%";
      document.getElementById('helpGridWorker').style.width = "0%";
      document.getElementById('helpGridMarket').style.width = "0%";
      document.getElementById('helpGridAuction').style.width = "0%";
      document.getElementById('helpGridPlayerview').style.width = "0%";
      this.helpGridOpened = false;
    },

    openHelpGridItem: function(){
      document.getElementById('helpGridItem').style.width = "100%";
    },

    openHelpGridSkill: function(){
      document.getElementById('helpGridSkills').style.width = "100%";
    },

    openHelpGridWorker: function(){
      document.getElementById('helpGridWorker').style.width = "100%";
    },

    openHelpGridMarket: function(){
      document.getElementById('helpGridMarket').style.width = "100%";
    },

    openHelpGridAuction: function(){
      document.getElementById('helpGridAuction').style.width = "100%";
    },

    openHelpGridPlayerview: function(){
      document.getElementById('helpGridPlayerview').style.width = "100%";
    },

    closeHelpGridItem: function(){
      document.getElementById('helpGridItem').style.width = "0%";
    },

    closeHelpGridSkill: function(){
      document.getElementById('helpGridSkills').style.width = "0%";
    },

    closeHelpGridWorker: function(){
      document.getElementById('helpGridWorker').style.width = "0%";
    },

    closeHelpGridMarket: function(){
      document.getElementById('helpGridMarket').style.width = "0%";
    },

    closeHelpGridAuction: function(){
      document.getElementById('helpGridAuction').style.width = "0%";
    },

    closeHelpGridPlayerview: function(){
      document.getElementById('helpGridPlayerview').style.width = "0%";
    },

    minimizeHelpGrid: function(){
      document.getElementById('expandHelp').style.width = "0%";
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
      // document.getElementById('auctionOver').style.display = "block"
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
        cost: this.choosenPlacementCost,
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

@import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');

  *{
    font-size: 1.8vh;
  }
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

  header {
    user-select: none;
    position: fixed;
    width:100%;
    pointer-events: none;
  }
  main {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
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

  .theOtherPlayers{
    grid-column: 1;
    grid-row: 1;
    position: absolute;
    height: 100vh;
    width: 100vw;
  }

  /*här börjar css för navbar öä*/
  .menuBar{
    grid-column: 1/3;
    grid-row: 1;
    background-color: black;
    box-shadow: 1px 1px 4px 0 rgba(0,0,0,0.1);
    position: relative;
    /* z-index: 12; */
    /*display: grid;
    grid-template-columns: 10% 40% 50%;*/
    /*grid-template-rows: 100%;*/
    height: 100%;
    }

  .openHelpGridButton{
  }

  .menuBar a{
    color: black;
  }

  #ExitGame{
    color: darkred;
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
    padding: 2.5% 5%;
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
    margin-left: 2.5%;
    margin-right: 5%;
    text-decoration: none;
  }

  .menuBar .logo h1{
    font-size: 200%;
    font-family: 'Courier New', monospace;
    color: #6df1d8;
    text-shadow: 0 0 5px #6df1d8, 0 0 10px #6df1d8, 0 0 20px #ff0080, 0 0 30px #ff0080, 0 0 40px #ff0080, 0 0 55px #ff0080, 0 0 75px #ff0080;
    text-align: center;
    letter-spacing: 1.5px;
    margin-top:0;
    margin-bottom: 0;
  }

  #logo{
   margin-left: 30%;
   margin-right:30%;
   margin-top: 0%;
   margin-bottom: 0%;
}

  .menuBar .menu{
    /*grid-column: 3;*/
    clear: both;
    max-height: 0;
    transition: max-height .2s ease-out;
    top: 100%;
    right: 0;
    position: absolute;
    float: left;
    width: 100%;
    /*z-index:3; */
  }

  .menuBar .burgerBarsIcon{
    /*padding: 2.5% 5%;*/
    padding: 1% 2%;
    position: relative;
    float: right;
    cursor: pointer;
    z-index: 12;
  }

  .menuBar .burgerBarsIcon .barsIcon{
    background: white;
    display: block;
    height: 2px;
    width: 18px;
    position: relative;
    transition: background .2s ease-out;
  }

  .menuBar .burgerBarsIcon .barsIcon:before{
    background: white;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: all .5s ease-out;
    top: 250%;
  }

  .menuBar .burgerBarsIcon .barsIcon:after{
    background: white;
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: all .5s ease-out;
    top: -250%;
  }

  .menuBar .menuButton{
    display: none;
  }

  .menuBar .menuButton:checked ~ .menu{
    max-height: 1200%;
    z-index:10;
  }

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

  .cardslotsTextWrapper{
    grid-column: 1;
    grid-row: 1;
  }

 .cardslotsCardsWrapper{
   grid-column: 1;
   grid-row: 2;
   display: grid;
   grid-template-columns: 30% 30% 30%;
   grid-template-rows: 33% 30% 30%;

 }

    .aboutOverlay{

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
      /* grid-template-areas: */

    }

    .endGameOverlay{

      position: fixed;
      width: 100%;
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
      /* grid-template-areas: */

    }

    .exitOverlay{

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
      /* grid-template-areas: */


    }

    .helpOverlay{

      position: fixed;
      width: 0%;
      height:100%;
      top: 0;
      right: 0;
      background: rgba(0,0,0,.7);
      overflow-x: hidden;
      z-index: 100;
      transition: all 0.5s;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0px 0px;
      /* grid-template-areas: */


    }

    .aboutInfoOverlay{
      color: white;
      margin-left: 30%;
      margin-top: -5%;
    }

    .aboutEndGameOverlay{
      color: white;
      margin-left: 30%;
      margin-top: -5%;
    }

    .exitInfoOverlay{
      color: white;
      margin-left: 30%;
      margin-top: -5%;
    }

    .exittext{
    align-content: center;
      left: 0;
      position: relative;
      left: 33%;
    }

    .helpInfoOverlay{
      color: white;
      position: relative;
      left: 11%;

      margin-top: -5%;
    }

    .exitForReal {

        background-color: red;
        border: black;

        padding: 15px 32px;
        text-decoration: none;


        align-items: center;
        font-size: 16px;

        position: relative;
        left: 38%;

          border-radius:5px;
          border:solid 1px black;
          background: red;

          padding:16px 18px 18px;

          -webkit-transition: all 0.1s;
          -moz-transition: all 0.1s;
          transition: all 0.1s;

          -webkit-box-shadow: 0px 8px 0px red;
          -moz-box-shadow: 0px 8px 0px red;
          box-shadow: 0px 8px 0px red;


    }
    .exitForReal {
  transition-duration: 0.5s;
}

.exitForReal:hover {
  background-color: red;
  color: white;
  cursor: not-allowed;





}

.exitforReal {

    background-color: red;
    border: white;

    padding: 15px 32px;
    text-decoration: none;


    align-items: center;
    font-size: 16px;

    position: relative;
    left: 45%;






      border-radius:5px;
      border:solid 1px black;
      background:green;

      padding:16px 18px 18px;

      -webkit-transition: all 0.1s;
      -moz-transition: all 0.1s;
      transition: all 0.1s;

      -webkit-box-shadow: 0px 8px 0px green;
      -moz-box-shadow: 0px 8px 0px green;
      box-shadow: 0px 8px 0px green;


}
.exitforReal {
transition-duration: 0.5s;
}

.exitforReal:hover {
background-color: green;
color: white;
cursor: pointer;
}

    @media all and (min-width:900px){

    .menuBar li{
    float: left;
    }

    .menuBar ul {
      border-radius:50em;
    }

    .menuBar li a{
      padding: 5px 30px;
    }

    .menuBar .menu{
      justify-content: center;
      clear: none;
      float: right;
      top: 4.5%;
      max-height: none;
      width: auto;
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

    .menuBar ul li:nth-of-type(1){
      width: auto;
      order: 1;
      display: block;
      background: SeaShell;
      align-items: center;

    }

    .menuBar ul li:nth-of-type(2){
      width: auto;
      order: 2;
      display: block;
      align-items: center;
      background: SeaShell;
    }

    .menuBar ul li:nth-of-type(3){
      width: auto;
      order: 3;
      display: block;
      align-items: center;
      background: SeaShell;
    }

    .menuBar ul li:nth-of-type(4){
      width: auto;
      order: 4;
      display: block;
      align-items: center;
      background: SeaShell;

    }

    /*.menuBar .buttonNav .secondary{
      border:0;
    }*/

    /* .menuBar .burgerBarsIcon{
      order: 3;
      display: block;
    } */

    /*.menuBar .menuButton:not(:checked) ~ .menu{
      max-height: 240px;
    }*/

    /* behövs ej var exemple på tablet mode, ej färdigställd
    .menuBar .menuButton:checked ~ .menu li:nth-of-type(-n+3){
      clear: both;
      height: auto;
      width: auto;
      display: inline-flex;
      flex: right;
      transform: scale(1.2);
    }*/



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
    grid-row: 1;
    grid-column: 1;
    display: grid;
    grid-template-columns: 72% 28%;
    grid-template-rows: 4% 96%;
    height: 100%;
    width: 100%;

  }

  .gameBoardWrapper{
    height: 100%;
    width: 100%;
    grid-row: 2;
    grid-column: 1;
    display: grid;
    grid-template-rows: 20% 30% 30% 20%;
    grid-template-columns: 33% 66%
  }

  .playerInfo{
    grid-column: 2;
    grid-row: 2;
    background-color: beige;
    color: black;
    font-weight: bold;
    height: 96.5%;
    position: relative;
    /* overflow-y: hidden; */
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;
    border-radius: 1em;
    margin-top: 2%;
    border: 6px;
    border-style: solid;
    border-color: white;

  }

  .Items{
    height: 100%;
    width: 100%;
    grid-row: 2;
    grid-column: 2;
    display: inline-block;
    position: relative;
  }


  .Skills{
    display: inline-block;
    position: relative;
    grid-row: 3;
    grid-column: 2;
  }


  /*.auctionWrapper{
    margin: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }*/

  .tempWorker{
    height: 85%;
    width: 100%;
    display: inline-block;
    position: relative;
    margin-top: 1%;
    /*margin: 2px;*/
    grid-row: 1;
    grid-column: 1/3;
    background-color: rgb(255, 217, 179);
    border-radius: 1em;
    border: 5px solid #fff;
    width:100%;
  }

  .marketWrapperr{
    display: inline-block;
    position: relative;
    height: 90%;
    width: 100%;
    margin: 0px;
    background-color: #4169E1;
    grid-row: 4;
    grid-column: 1/3;
    border-radius: 1em;
    border: 5px solid #fff;
  }



  .frontAuction {
    height: 100%;
    width: 100%;
    /*display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 90%; kan nog tas bort*/
  }






  /*Dekstop menu end*/
  /*här slutar css för navbar*/

  #mePlayer{
    height: 100%;
    grid-column: 1;
    grid-row: 2;
    margin: 0;
  }

  .openHelpGridPlayerview{
    position: absolute;
    right: 0;
    height: 4vh;
    width: 2.3vw;
    border-radius: 100%;
    font-weight: bold;
    outline:none;
    font-size: 2vh;
    z-index: 5;
    border: 1px solid black;
  }

  .openHelpGridPlayerview:hover{
    cursor:pointer;
  }

  .myStatus{
    margin: 0;
    background: #672d75;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #C6426E, #642B73);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #C6426E, #642B73); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-top: 6px;
    border-right:  0px;
    border-bottom: 6px;
    border-left:   0px;
    border-style: solid;
    border-color: white;
    border-radius: 20px;
    width: 100%;
    height: 99%;
  }

  #myStatusTitle{
    font-size: 2.3vh;
  }

  .myStatusContent{

    grid-template-rows:12% 36% 48%;
    grid-template-columns: 100%;
    display: grid;
    flex-direction: column;
    height: 98%;
    width: 100%;
    /*margin-top: -10px;*/
  }

  .myStatusContent>h2{
    text-align: center;
  }

  .myStatusComponent{
    height: 100%;
    width: 100%;
    padding: 1%;
    margin-left: -1%;
  }

  /*.myCards{
    margin-left: 5%;
    transform: scale(0.45);
    transform-origin: left top;
    text-align: left;
  }*/

  /* .itemsAndSkills div{
    display: flex;
    flex-direction: column;
  } */





  /* PLAYERVIEW STYLING */
  .openPlayerviewGridButton{
    margin-top: 20%;
    height: 100%;
    width: 100%;
    transform: scale(0.9);
    font-size: 1.8vh;
    /* position: relative; */
    top: 0;
    cursor: pointer;
    margin: 2px;
    border-radius: 28px;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: transparent;
    Letter-spacing: 1px;
    text-transform: uppercase;
    font-family: "sans", serif;
    padding: 5px;
    border-color: white;
    border-width: 2px;
    font-weight: bold;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4c1958;
  }

  .openPlayerviewGridButton img{
    height: 10vh;
    margin-right: 2%;
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

    /*#meCards:hover{
      transform: scale(2);
      display: grid;
      grid-template-columns: 70px 70px 70px 70px;
      grid-template-rows: 100px 100px 100px 100px;

    }*/

    /*#meCards div:hover{
      transform: scale(0.5)translate(-50%,-50%);
    }*/
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .openPlayerviewGridButtonText{
    font-size: 2.3vh;
  }

  .myHandOverlay{

    border-radius: 1em;
    /* grid-area: myHandOverlay; */
    border: 5px dotted #fff;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 20% 80%;
  }

  .myHandOverlay h4, .myItemsOverlay h4, .mySkillsOverlay h4{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bangers', cursive;
    font-size: 2vh;
    letter-spacing: 0.1vw;
  }

  .myHandOverlay>span{
    grid-row: 1;
    grid-column: 1;
  }



  .myItemsOverlay{
    border-radius: 1em;
    /* grid-area: myHandOverlay; */
    border: 5px dotted #fff;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 85%;
  }

.myItemsOverlay>span{
  grid-row: 1;
  grid-column: 1;
}

  .incomeWrapper{
    grid-column: 2/ span 3;
    grid-row: 2/4;
    z-index: 5;
  }

  .mySkillsOverlay{
    border-radius: 1em;
    /* grid-area: myHandOverlay; */
    border: 5px dotted #fff;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 15% 85%;
  }

  .mySkillsOverlay>span{
    grid-row: 1;
    grid-column: 1;
  }

  .playerView button{
    float: right;
    margin: 20px;
  }

  .overlayPlayerViewWrapper{
    border-radius: 1%;
    height: 90vh;
    width: 90vw;
    /* background: #672d75;
    background: -webkit-linear-gradient(to left, #C6426E, #642B73);
    background: linear-gradient(to left, #C6426E, #642B73); W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+; */

    background: repeating-conic-gradient(#933, #bf4040 1%);

    display: grid;
    grid-template-rows: 5% 15% 80%;
    grid-template-columns: 95% 5%;
  }

  .overlayPlayerViewWrapperTop{
    grid-column: 1/3;
    grid-row: 1/3;

  }


  .overlayPlayerViewWrapperBottom{
    display: grid;
    grid-template-columns: 55% 45%;
    grid-template-rows: 100%;
  }



  .overlayPlayerView_leftContent{
    /* display: grid;
    grid-template-rows: 10% 90% */
  }

  .overlayPlayerView_rightContent{

    grid-column: 2;
    grid-row: 1;
    display: grid;
    grid-template-rows: 10% 29.5% 29.5% 29.5%;
    grid-template-columns: 100%;
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
    color: white;
    display: block;
  }

  .overlayPlayerView .closePlayerviewGridButton{
    font-size: 6vh;
    background-color: transparent;
    grid-column: 2;
    grid-row: 1;
  }

  .aboutOverlay .closeAboutGridButton{
    width: 0;
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
    color: white;
  }

  .exitOverlay .closeExitGridButton{
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
    color: white;

  }

  .helpOverlay .closeHelpGridButton{
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
    color: white;

  }


  .overlayAuction{
    position: fixed;
    height: 100vh;
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
  .auctionOver{
    /* grid-area: auctionBottom; */
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .auctionOverWrapper{
    border-radius: 5%;
    box-shadow: 0px 0px 100px 20px rgb(199, 5, 5);
    width: 90%;
    height: 60vh;
    background: black;
    display: grid;
    grid-template-rows: 34% 36% 15%;
  }

  .auctionOverTitle{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auctionOverTitle h1{
    font-size: 4vh;
  }

  .sadEmojiDiv{
    height: 1vh;
  }

  #sadEmoji{
    z-index: 99999;
  }





  .bidWinnerWrapperVisible {
    height: 90vh;
    margin-top: 4vh;
    grid-area: auctionBottom;
    display: grid;
    margin-left: 5%;
    margin-right: 5%;
    grid-template-columns: 40% 60%;
    grid-template-rows: 25% 85%;
    grid-template-areas:
    "bidWinnerWrapperTop bidWinnerWrapperTop"
    "bidWinnerWrapperBottomLeft bidWinnerWrapperBottomRight";
    /*display: flex;
    flex-direction: column;
    align-items: center;*/
    overflow: hidden;
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
  .bidWinnerWrapperVisible button:hover{
    cursor:pointer;
  }

  .bidWinnerWrapperVisible .congratsWrapper{
    grid-area: bidWinnerWrapperTop;
    text-align: center;
  }



  #wonAuctionCardDiv{
    display: flex;
    align-items: center;
    justify-content: center;
    /* transform-origin: center; */
  }

  #wonAuctionCard{
    transform-origin: center top;
  }

  .bidWinnerWrapperVisible .cardslotsWrapper{
    grid-area: bidWinnerWrapperBottomLeft;
    display: grid;
    grid-template-columns: 80%;
    grid-template-rows: 20% 70%;
  }

  .bidWinnerWrapperVisible .paymentAuctionWrapper{
    grid-area: bidWinnerWrapperBottomRight;
    display: grid;
    grid-template-rows: 60% 40%;
    grid-template-areas:
    "paymentAuctionWrapperTop"
    "paymentAuctionWrapperBottom";
  }

  .bidWinnerWrapperVisible .paymentAuctionWrapper .paymentAuctionAllTextWrapper{
    grid-area: paymentAuctionWrapperTop;
    margin-bottom:5%;
  }


  .bidWinnerWrapperVisible .paymentAuctionWrapper .placeAuctionCardWrapper{
    grid-area:paymentAuctionWrapperBottom;
    display: grid;
    grid-template-columns: 33% 33% 34%;
    grid-template-areas:
    "paymentAuctionWrapperBottomLeft paymentAuctionWrapperBottomMid paymentAuctionWrapperBottomRight";
  }

  .bidWinnerWrapperVisible .paymentAuctionWrapper .placeAuctionCardWrapper .placeInItems{
    grid-area: paymentAuctionWrapperBottomLeft;
  }

  .bidWinnerWrapperVisible .paymentAuctionWrapper .placeAuctionCardWrapper .placeInSkills{
    grid-area: paymentAuctionWrapperBottomMid;
  }

  .bidWinnerWrapperVisible .paymentAuctionWrapper .placeAuctionCardWrapper .placeInMarket{
    grid-area: paymentAuctionWrapperBottomRight;
  }

  .placeAuctionCardWrapper{
    position: absolute;
    bottom: 7vh;
    margin-left: -3vw;
  }

  .placeAuctionCardWrapper div button{
    height: 9vh;
    font-size: 1.5vh;
  }

  /* #auctionOver{

  } */



  .CollectorsStartAuctionOverlay{
    border-radius: 1em;
    grid-area: CollectorsStartAuctionOverlay;
    border: 5px dotted #fff;
  }

  .auctionBigWrapper{
    grid-area: auctionTop;
  }

  .auctionBigWrapper .auctionWrapper{
    height: 90vh;
    background-color: rgb(195, 155, 211);
    margin-top: 2%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 2%;
    border-radius: 2em;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 20% 50% 30%;
    grid-template-areas:
    "auctionTopLeft  auctionTopMiddle auctionRight"
    "auctionLeft  auctionMiddle auctionRight"
    "auctionLeft  auctionMiddle auctionRight";
  }

  .auctionBigWrapper .auctionWrapper .auctionTitleWrapper{
    text-align: center;
    grid-area: auctionTopMiddle;
  }

  .auctionBigWrapper .auctionWrapper .auctionLogoWrapper{
    grid-area: auctionTopLeft;
  }

  .Auction .openButton{
   /*position: relative;
   top: 0;
   cursor: pointer;*/
   height:100%;
   width: 100%;
   margin: 3%;
   border-radius: 2em;
   background-color: transparent;
   -webkit-text-stroke: 1px black;
   color: transparent;
   Letter-spacing: 1px;
   text-transform: uppercase;
   font-size: 120%;
   font-family: "sans", serif;
   padding: 5%;
   border-color: white;
   border-width: 0.2em;
   font-weight: bold;
   z-index: 3;
   align-items: center;
   justify-content: center;
   display: grid;
   grid-template-columns: 40% 60%;
   grid-template-areas:
   "openButtonLeft openButtonRight";
 }

 .auctionBigWrapper .auctionWrapper .auctionLogoWrapper .openButton{
   /*float: right;*/
   margin-left: 10%;
   margin-top: 10%;
 }

 .Auction .openButton img{
   /* height: 1vh; */
   grid-area: openButtonLeft;
   padding: 5%;
   height: 5vh;
   /*height: 100%;
   width: 30%; kan tas bort*/
 }

 .Auction .openButton p{
   grid-area: openButtonRight;
   text-align: center;
 }


  .Auction .openAuctionGridButton {
  display: flex;
  flex-direction: column;
  color: rgb(155, 89, 182);
  height: 100%;
  width: 60%;
  text-align: center;
  border: 1px white;
  border-style: solid;
  }

  /*.Auction .auctionLogoWrapper .openAuctionGridButton img{
  height: 60%;
  width: 60%;
  }*/

  /* .openAuctionGridButton img{
    height: 5vh;
    width: 3vw;
  } */


  /*.openAuctionGridButton:hover {
    background-color: rgb(230, 204, 255);
    border-color: black;
  } behövs inte längre då den ej är clickable*/

  .auctionBigWrapper .auctionWrapper .yourTurnToPoorWrapper{
    grid-area: auctionLeft;
    margin-top:10%;
    margin-left: 10%;

    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 40% 60%;
    grid-template-areas:
    "yourTurnToPoorWrapperTop"
    "yourTurnToPoorWrapperBottom";
  }

  .auctionBigWrapper .auctionWrapper .yourTurnToPoorWrapper .yourTurnWrapper{
    grid-area: yourTurnToPoorWrapperTop;
  }

  .auctionBigWrapper .auctionWrapper .yourTurnToPoorWrapper .toPoorWrapper{
    grid-area: yourTurnToPoorWrapperBottom;
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

  .helpGridItem, .helpGridSkills, .helpGridWorker, .helpGridMarket, .helpGridAuction, .helpGridPlayerview{
    position: absolute;
    width: 0%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.7);
    overflow-x: hidden;
    z-index: 6;
    transition: all 0.5s;
  }

  .helpGridItemLayout, .helpGridSkillLayout, .helpGridWorkerLayout, .helpGridMarketLayout, .helpGridAuctionLayout, .helpGridPlayerviewLayout{
    text-align: center;
    color: white;
  }

  .helpGridItem__content, .helpGridSkills__content, .helpGridWorker__content, .helpGridMarket__content, .helpGridAuction__content, .helpGridPlayerview__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    /*margin-top: 30px;*/
  }

  .helpGridItem a, .helpGridSkills a, .helpGridWorker a, .helpGridMarket a, .helpGridAuction a, .helpGridPlayerview a{
    padding: 3%;
    font-size: 220%;
    color: white;
    display: block;
    float: right;
  }



  .overlayAuction__content{
    position: relative;
    top: 25%;
    width: 80%;
    text-align: center;
    /* margin-top: 30px; */
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
    grid-column: 1;
    grid-row: 1;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 100%;
  }



  .menuBar{
    border-radius: 1em;
    grid-column: 1/ span 2;
    grid-row: 1;
    border: 5px solid #fff;
    background-color: #313639;
    height: 3.5vh;
  }
  .otherPlayers{
    border-radius: 1em;
    grid-area: otherPlayers;
    border: 5px solid #fff;
    background-color: RoyalBlue;
  }
  .Auction{
    display: inline-block;
    position: relative;
    height: 100%;
    width: 100%;
    grid-row: 2/4;
    grid-column: 1;
    border-radius: 1em;
    border: 5px solid #fff;
    background-color: rgb(195, 155, 211);
    margin: 0;
    padding: 0;
  }

  .cardsOnSale{
    height: 100%;
    width: 100%;
    grid-area: cardsOnSale;
    border-radius: 1em;
    border: 5px solid #fff;
  }
  .playerView{
    border-radius: 1em;
    grid-area: playerView;
    border: 5px solid #fff;
    background-color: RoyalBlue;
  }

  .myHandOverlay .cardslots {
    grid-row: 2;
    grid-column: 1;
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;
    grid-template-rows: 100%
  }

  .myItemsOverlay .cardslots {
    grid-row: 2;
    grid-column: 1;
    display: grid;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
    grid-template-rows: 100%
  }

  .mySkillsOverlay .cardslots {
    grid-row: 2;
    grid-column: 1;
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;
    grid-template-rows: 100%
  }

  /*.cardslots div {
    transform: scale(0.5)translate(-50%,-50%);
    transition:0.2s;
    transition-timing-function: ease-out;
    z-index: 0;
  }*/
  /*.cardslots div:hover {
    transform: scale(1)translate(-25%,0);
    z-index: 1;
  }*/

  /*.auctionPaymentCards{
    transform: scale(0.4)translate(-50%,-50%);
  }*/




  .bidWinnerWrapperInvisible {
    display: none;
  }


    /* importerat från UI-gradient */
  .foter{
    bottom: 0;
    left:0;
    position: absolute;
  }

  @media all and (max-width: 900px){
    *{
      font-size: 2vh;
    }
  }

  @media all and (max-width:500px){

    .playerInfo{
      margin-left: 0px;
    }









/*
    .tempWorker {

    }

    .marketWrapperr{

    }

    .Auction {

    }
 */

    .openButton{
    font-size: 75%;
    margin: 0px;
    /* border-radius: 10px; */
    }


    .openButton img{
      visibility: hidden;
    }






    .buttonWrapper{
      display: none;
    }

}
.helplogo{
  position: relative;
  left: 12%;
}





</style>
