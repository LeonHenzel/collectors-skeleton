<template>
    <div class="mePlayer" v-if="player">

        <div class="playerInfoWrapper">
            <div class="pointsSymbol">
            </div>
            <div class="pointsPlayer">

                {{player.points}}


            </div>
            <div class="energySymbol">


            </div>
            <div class="energyPlayer">

                {{player.energyBottles}}


            </div>
            <div class="moneySymbol">

            </div>
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
