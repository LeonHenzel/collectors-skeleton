<template>
    <div class="mePlayer" v-if="player">
      <div class="mePlayerContent">
        <div class="mySkillTokensDiv">
          My Skills
          <div class="mySkillTokens">
            <div id="skillsFirstRow">
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsVP.png"></div>
                <div>{{player.skillVP.VPAll}}</div> 
              </h1>
            </div>
            <div id="skillsSecondRow">
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsFastavalVP.png"></div>
                <div>{{player.skillVP.VPfastaval}}</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsfiguresVP.png"></div>
                <div>{{player.skillVP.VPfigures}}</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsmovieVP.png"></div>
                <div>{{player.skillVP.VPmovie}}</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsMusicVp.png"></div>
                <div>{{player.skillVP.VPmusic}}</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsTechVP.png"></div>
                <div>{{player.skillVP.VPtechnology}}</div>
              </h1>
            </div>
            <div id="skillsThirdRow">
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsAuctionIncome.png"></div>
                <div>{{player.auctionIncome}}</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsGainBottle.png"></div>
                <div>?</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillswork2.png"></div>
                <div>{{player.workerIncome}}</div>
              </h1>
              <h1 class="badge">
                <div class="imageContainer"><img src="/images/skillsWorkCard.png"></div>
                <div>{{player.workerCard}}</div>
              </h1>
            </div>
          </div>
        </div>

        <div class="playerInfoWrapper">
            <div class="pointsSymbol"></div>
            <div class="pointsPlayer">
                {{player.points}}
            </div>
            <div class="energySymbol"></div>
            <div class="energyPlayer">
                {{player.energyBottles}}
            </div>
            <div class="moneySymbol"></div>
            <div class="playerMoney">
            {{player.money}}
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
}

.imageContainer{
  height: 7vh;
  width: 4vw;
}

.imageContainer img{
  max-width: 100%;
  max-height: 100%;
}

#skillsFirstRow{
  display: flex;
}

#skillsSecondRow{
  display: flex;
}

#skillsThirdRow{
  display: flex;
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
  background: rgb(42, 61, 5);
  border-radius: 5%;
  margin: 1% 1%;
}

.badge *{
  color: aliceblue;
}


.mySkillTokensDiv{
  font-size: 2.5vh;
  text-align: center;
  height: 30vh;
}

.mySkillTokens{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pointsSymbol {
  content: url('/images/victoryPoints-Symbol.png');
  height: 5%;
  width: 5%;
}

.energySymbol {
  content: url('/images/energyDrink-Symbol.png');
  height: 5%;
  width: 5%;
}

.moneySymbol {
  content: url('/images/moneySymbol.png');
  height: 5%;
  width: 5%;
}

</style>
