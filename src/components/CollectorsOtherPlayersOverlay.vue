<template>
    <div class="mePlayer" v-if="player">
        <div class="thisPlayerContent">
            <CollectorsOtherPlayerviewOverlayTitle v-if="player"
            :player="player"
            :labels="labels" />

            <div class="topRightContent">
                <button class="closeButton" @click="closeOverLay(player);">
                  <a href="#" >&times;</a>
                </button>
            </div>



             <div class="leftandright">
                <div class="mePlayerContent">

                    <div class="myPointsDiv">
                    <div class="myPoints">
                        <div class="glow">
                        <div class="badge pointsBadge" id="victoryPointsBadge">
                            <h2>Total Victory points</h2>
                            <div class="pointsImageDiv"><div class="pointsSymbol"></div></div>
                            <div class="points pointsPlayer">{{player.points}}</div>
                        </div>
                        </div>

                        <div id="myPointsSecondRow">
                        <div class="badge pointsBadge">
                            <h2>Energy Bottles</h2>
                            <div class="pointsImageDiv"><div class="energySymbol"></div></div>
                            <div class="points energyPlayer">{{player.energyBottles}}</div>
                        </div>

                        <div class="badge pointsBadge">
                            <h2>Coins</h2>
                            <div class="pointsImageDiv"><div class="moneySymbol"></div></div>
                            <div class="points playerMoney">{{player.money}}</div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="mySkillTokensDiv">
                    <!-- <div class="glow"> -->
                        <div class="mySkillTokens">
                        <h2>{{player.playerName}}'s Skills</h2>
                        <div id="skillsFirstRow">
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsVP.png"></div>
                                <div class="points skillPoints">{{player.skillVP.VPAll}}</div>
                            </div>
                            </h1>
                        </div>
                        <div id="skillsSecondRow">
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsFastavalVP.png"></div>
                                <div class="points skillPoints">{{player.skillVP.VPfastaval}}</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsfiguresVP.png"></div>
                                <div class="points skillPoints">{{player.skillVP.VPfigures}}</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsmovieVP.png"></div>
                                <div class="points skillPoints">{{player.skillVP.VPmovie}}</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsMusicVp.png"></div>
                                <div class="points skillPoints">{{player.skillVP.VPmusic}}</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsTechVP.png"></div>
                                <div class="points skillPoints">{{player.skillVP.VPtechnology}}</div>
                            </div>
                            </h1>
                        </div>
                        <div id="skillsThirdRow">
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsAuctionIncome.png"></div>
                                <div class="points skillPoints">{{player.auctionIncome}}</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsGainBottle.png"></div>
                                <div class="points skillPoints">?</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillswork2.png"></div>
                                <div class="points skillPoints">{{player.workerIncome}}</div>
                            </div>
                            </h1>
                            <h1 class="badge">
                            <div class="badgeContent">
                                <div class="imageContainer"><img src="/images/skillsWorkCard.png"></div>
                                <div class="points skillPoints">{{player.workerCard}}</div>
                            </div>
                            </h1>
                        </div>
                        </div>
                    <!-- </div> -->
                    </div>

                    <div class="itemSummaryWrapperDiv">
                    <div class="itemSummaryWrapper">
                        <div>{{player.playerName}}'s Items Market Values</div>
                        <div class="itemSummaryWrapperContent">
                        <div class="badge itemsBox">
                            <div class="points pointsImageDiv"><img src="/images/movieItem.png"/></div>
                            <div>{{player.itemsByNumber.movie}}</div>
                        </div>
                        <div class="badge itemsBox">
                            <div class="points pointsImageDiv"><img src="/images/musicItem.png" /></div>
                            <div>{{player.itemsByNumber.music}}</div>
                        </div>
                        <div class="badge itemsBox">
                            <div class="points pointsImageDiv"><img src="/images/techItem.png" /></div>
                            <div>{{player.itemsByNumber.technology}}</div>
                        </div>
                        <div class="badge itemsBox">
                            <div class="points pointsImageDiv"><img src="/images/figursItem.png" /></div>
                            <div>{{player.itemsByNumber.figures}}</div>
                        </div>
                        <div class="badge itemsBox">
                            <div class="points pointsImageDiv"><img src="/images/fastavalItem.png" /></div>
                            <div>{{player.itemsByNumber.fastaval}}</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="rightContent">
                    <div class="myItemsOverlay">
                        <h4>{{player.playerName}}'s Items</h4>
                        <div class="cardslots" v-if="player">
                        <CollectorsCard v-for="(card, index) in player.items" :card="card" :key="index"/>
                        </div>
                    </div>

                    <div class="mySkillsOverlay">
                        <h4>{{player.playerName}}'s Skills</h4>
                        <div class="cardslots" v-if="player">
                        <CollectorsCard v-for="(card, index) in player.skills" :card="card" :key="index"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>


<script>
import CollectorsOtherPlayerviewOverlayTitle from '@/components/CollectorsOtherPlayerviewOverlayTitle.vue'
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsOtherPlayersOverlay'
,
  components: {
    CollectorsOtherPlayerviewOverlayTitle,
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object
  },
  methods: {

    closeOverLay: function(hej){
      this.$emit('closeOverlay',hej )
    }

  }
}
</script>

<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');

*{
  font-family: 'Bangers', cursive;
  font-size: 2vh;
  letter-spacing: 0.2vh;
  z-index: 500;
}

.closeButton{
  grid-column: 2;
  grid-row: 1;
  background-color: transparent;
  height: 5vh;
  margin-right: 2vw;
  margin-top: 3vh;
  cursor: pointer;
}

.topRightContent {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 30% 70%;
}

.leftandright{
    grid-row: 2;
    grid-column: 1/3;
    margin-top: 4vh;
    display: grid;
    grid-template-columns: 60% 40%;
    grid-template-rows: 100%;
}

.rightContent{

    grid-column: 2;
    grid-row: 1;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 100%;
}

.cardslots {
    margin-top: -1vh;
    display: grid;
    grid-template-columns: 12% 12% 12% 12% 12% 12% 12% 12% 12% 12%;
    grid-template-rows: 100%
}

.mePlayer{
    position: absolute;
    margin-left: calc(-50vw + 50%);
    height: 92vh;
    width: 92vw;
    background: blanchedalmond;
    margin-left: -69vw;
    margin-top: -8vh;
    box-shadow: 0px 0px 5vh 5vw rgb(0, 0, 0);
    border-radius: 3%;
}

.thisPlayerContent {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 20% 75%;
}

.mePlayerContent{
  grid-column: 1;
  grid-row: 1;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 25% 50% 25%;
  /*display: felx;
  flex-direction: column;*/
  align-items: center;
  height: 100%;;
}


.myPointsDiv{
  justify-content: center;
  padding-bottom: 1vh;

}

.itemSummaryWrapperDiv{
  padding-top: 1vh;
  justify-content: center;
}

.imageContainer{
  height: 6vh;
  width: 4vw;
}

.imageContainer img{
  max-width: 100%;
  max-height: 100%;
}

#skillsFirstRow{
  display: flex;
  justify-content: center;
}

#skillsSecondRow{
  display: flex;
  justify-content: center;
}

#skillsThirdRow{
  display: flex;
  justify-content: center;
}

#skillsFirstRow h1{
  display: flex;
  justify-content: center;
  align-items: center;
}

#skillsSecondRow h1{
  display: flex;
  justify-content: center;
  align-items: center;
}

#skillsThirdRow h1{
  display: flex;
  justify-content: center;
  align-items: center;
}


.badge{
  display: flex;
  align-items: center;
  background: rgb(42, 61, 5);
  border-radius: 5%;
  margin: 1% 1%;
  padding: 0.4vh 0.5vw;
}

.badge *{
  color: aliceblue;
}

.badgeContent{
  display: flex;
  align-items: center;
}

.skillPoints{
  padding: 10%;
}


.mySkillTokensDiv{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 2.5vh;
  text-align: center;
  z-index: 5;
}

.mySkillTokens{
  padding: 0.8vh 2vw;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  background: green;
  border-radius: 5%;
  /* box-shadow: 0px 0px 1.5vh 1vw rgb(199, 5, 5); */
  position: relative;
  /* z-index: 5; */
}

.glow{
  position: relative;
}

.glow::before, .glow::after{
	content: '';
	position: absolute;
	left: -2px;
	top: -2px;
	background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00,#ffff00, #ff0000, #fb0094,
		#0000ff, #00ff00,#ffff00, #ff0000);
	background-size: 400%;
	width: calc(100% + 4px);
	height: calc(100% + 4px);
	animation: steam 20s linear infinite;
  z-index: -1;
  border-radius: 5%;
}

@keyframes steam {
	0% {
		background-position: 0 0;
	}
	50% {
		background-position: 400% 0;
	}
	100% {
		background-position: 0 0;
	}
}

.glow::after {
	filter: blur(4vh);
}

.mySkillTokens h2{
  margin: 0;
  font-size: 2.5vh;
}

.myPointsDiv{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
}

.myPoints{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgb(12, 51, 75);
  text-align: center;
  padding: 0.8vh 2vw;
  border-radius: 5%;
}

#myPointsSecondRow{
  display: grid;
  grid-template-columns: 50% 50%;
}

#victoryPointsBadge{
  margin: 0;
}

#victoryPointsBadge *{
  font-size: 2.7vh;
  padding: 0.7vh;
}

.pointsBadge{
  background: lightskyblue;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5vh;
  margin-top: 1vh;
}

.pointsBadge *{
  margin: 0 0.2vw;
}

.pointsImageDiv{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.7vh;
  width: 4vw;
}

.pointsImageDiv img{
  height: 8vh;
}

.itemSummaryWrapperDiv{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}

.itemSummaryWrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: wheat;
  text-align: center;
  padding: 0.8vh 0.8vw;
  border-radius: 5%;
}

.itemSummaryWrapperContent{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.8vh 2vw;
  border-radius: 5%;
}

.itemsBox{
  background: rgb(83, 79, 70);
}

.points{
  padding: 1vw;
}

.pointsSymbol {
  content: url('/images/victoryPoints-Symbol.png');
  height: 4.7vh;
}

.energySymbol {
  content: url('/images/energyDrink-Symbol.png');
  height: 4.7vh;
}

.moneySymbol {
  content: url('/images/moneySymbol.svg');
  height: 4.7vh;
  width: 4vw;
}

</style>
