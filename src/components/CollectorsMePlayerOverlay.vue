<template>
    <div class="mePlayer" v-if="player">
      <div class="mePlayerContent">

        <div class="mySkillTokens">
          My Skill Tokens
          <div>
            <img src="/images/skillsVP.png">
            <span></span>
          </div>
          <div>
            <img src="/images/skillsFastavalVP.png">
            <span></span>
            <img src="/images/skillsfiguresVP.png">
            <span></span>
            <img src="/images/skillsmovieVP.png">
            <span></span>
            <img src="/images/skillsMusicVp.png">
            <span></span>
            <img src="/images/skillsTechVP.png">
            <span></span>
          </div>
          <div>
            <img src="/images/skillsAuctionIncome.png">
            <span></span>
            <img src="/images/skillsGainBottle.png">
            <span></span>
            <img src="/images/skillswork2.png">
            <span></span>
            <img src="/images/skillsWorkCard.png">
            <span></span>
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
