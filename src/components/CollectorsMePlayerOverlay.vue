<template>
    <div class="mePlayer" v-if="player">
      <div class="mePlayerContent">
        <div class="mySkillTokensDiv">
          <div class="glow">
            <div class="mySkillTokens">
              <h2>{{labels.myskills}}</h2>
              <div id="skillsFirstRow">
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsVP.png"></div>
                    <div class="skillPoints">{{player.skillVP.VPAll}}</div>
                  </div>
                </h1>
              </div>
              <div id="skillsSecondRow">
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsFastavalVP.png"></div>
                    <div class="skillPoints">{{player.skillVP.VPfastaval}}</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsfiguresVP.png"></div>
                    <div class="skillPoints">{{player.skillVP.VPfigures}}</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsmovieVP.png"></div>
                    <div class="skillPoints">{{player.skillVP.VPmovie}}</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsMusicVp.png"></div>
                    <div class="skillPoints">{{player.skillVP.VPmusic}}</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsTechVP.png"></div>
                    <div class="skillPoints">{{player.skillVP.VPtechnology}}</div>
                  </div>
                </h1>
              </div>
              <div id="skillsThirdRow">
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsAuctionIncome.png"></div>
                    <div class="skillPoints">{{player.auctionIncome}}</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsGainBottle.png"></div>
                    <div class="skillPoints">?</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillswork2.png"></div>
                    <div class="skillPoints">{{player.workerIncome}}</div>
                  </div>
                </h1>
                <h1 class="badge">
                  <div class="badgeContent">
                    <div class="imageContainer"><img src="/images/skillsWorkCard.png"></div>
                    <div class="skillPoints">{{player.workerCard}}</div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div class="myPointsDiv">
          <div class="myPoints">
            <div class="badge pointsBadge">
              <div class="pointsImageDiv"><div class="pointsSymbol"></div></div>
              <div class="pointsPlayer">{{player.points}}</div>
            </div>

            <div class="badge pointsBadge">
              <div class="pointsImageDiv"><div class="energySymbol"></div></div>
              <div class="energyPlayer">{{player.energyBottles}}</div>
            </div>

            <div class="badge pointsBadge">
              <div class="pointsImageDiv"><div class="moneySymbol"></div></div>
              <div class="playerMoney">{{player.money}}</div>
            </div>
          </div>
        </div>




        <div class="itemSummaryWrapper">
            <div class="firstItem itemsBox">
            <img src="/images/movieItem.png"  />
            <div>
            {{player.itemsByNumber.movie}}
            </div>
            </div>
            <div class="secondItem itemsBox">
            <img src="/images/musicItem.png" />
            <div>
                {{player.itemsByNumber.music}}
            </div>
            </div>
            <div class="thirdItem itemsBox">
            <img src="/images/techItem.png" />
            <div>
                {{player.itemsByNumber.technology}}
            </div>
            </div>
            <div class="fourthItem itemsBox">
            <img src="/images/figursItem.png" />
            <div>
            {{player.itemsByNumber.figures}}
            </div>
            </div>
            <div class="fithItem itemsBox">
            <img src="/images/fastavalItem.png" />
            <div>
            {{player.itemsByNumber.fastaval}}
            </div>
            </div>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  name: 'CollectorsMePlayerOverlay'
,
  props: {
    player: Object
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
}

.myPointsDiv, .itemSummaryWrapper{
  padding-top: 1vh;
}

.imageContainer{
  height: 4.7vh;
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
  padding: 1vh;
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgb(12, 51, 75);
  text-align: center;
  padding: 0.8vh 2vw;
  border-radius: 5%;
}

.pointsBadge{
  background: lightskyblue;
}

.pointsImageDiv{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.7vh;
  width: 4vw;
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
