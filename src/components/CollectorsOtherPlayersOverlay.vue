<template>
    <div class="mePlayer" v-if="player">
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
                <h2>My Coins</h2>
                <div class="pointsImageDiv"><div class="moneySymbol"></div></div>
                <div class="points playerMoney">{{player.money}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mySkillTokensDiv">
          <!-- <div class="glow"> -->
            <div class="mySkillTokens">
              <h2>{{labels.myskills}}</h2>
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
            <div>My Item's Market Values</div>
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
    </div>
</template>


<script>
export default {
  name: 'CollectorsOtherPlayersOverlay'
,
  props: {
    player: Object,
    labels: Object
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

.mePlayerContent{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
}

.myPointsDiv{
  padding-bottom: 1vh;
}

.itemSummaryWrapperDiv{
  padding-top: 1vh;
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
