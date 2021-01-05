<template>
    <div class="mePlayer" v-if="player">

        <div class="mePlayerWrapper">
            <div class="playerName">
              {{player.playerName}}
              <div class="playing" v-if="player.myTurn">
                Playing
              </div>
              <div class=firstPlayer v-if="player.firstPlayerToken">
                1st
              </div>
            </div>

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
    </div>
</template>


<script>
export default {
  name: 'CollectorsMePlayer'
,
  props: {
    player: Object
  }
}
</script>

<style lang="css" scoped>

*{
  font-size: 1.6vh;
}


.mePlayer {
  width: 100%;
  height: 100%;;
}

.mePlayerWrapper {
  width: 99%;
  height: 100%;
  display: grid;
  grid-template-columns: 0% 24% 24% 24% 24%;
  grid-template-rows: 25% 37% 37%;
  grid-gap: 1%;
  background-color: black;
  border: solid black;
  border-radius: 1%;

}

.itemSummaryWrapper>div>img {


  height: 72%;
  width: 100%;
  transform: scale(0.9);
  transform-origin: top left;
}

.playing{
  display: inline-block;
  border: 3% dotted yellow;
  background-color: green;
  padding: 1.8rem 0.6rem 1.8rem 0.6rem;
  border-radius: 3rem;
  font-size: 10pt;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: white;
  transform: scale(0.45);
  transform-origin: top left;
}

.firstPlayer{
  display: inline-block;
  border: 3% dotted yellow;
  background-color: brown;
  padding: 1.8rem 0.6rem 1.8rem 0.6rem;
  border-radius: 3rem;
  font-size: 100%;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: white;
  transform: scale(0.45);
  transform-origin: top left;
}


.firstPlayer {
  grid-column: 1;
  grid-row: 2;
}

.playerName {
  grid-column: 2/5;
  grid-row: 1;
  background-color: white;
  display: flex;
  align-items: left;
  justify-content: center;

}

.textArea{
    text-transform: capitalize;
}

.itemSummaryWrapper {
  grid-column: 2/5;
  grid-row: 2/4;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 59%;
}



.firstItem {
  grid-column: 1;
  grid-row: 1;
}

.secondItem {
  grid-column: 2;
  grid-row: 1;
}

.thirdItem {
  grid-column: 3;
  grid-row: 1;
}

.fourthItem {
  grid-column: 4;
  grid-row: 1;
}

.fithItem {
  grid-column: 5;
  grid-row: 1;
}

.itemsBox {
  width: 100%;
  height: 160%;
  border: 2px solid black;
  background-color: red;
  text-align: center;
}

.playerInfoWrapper {
    grid-column: 5;
    grid-row:1/4;
    display: grid;
    grid-template-columns: 49% 49%;
    grid-template-rows: 32% 32% 32%;
    grid-gap: 1%;
    border: solid black;
    border-radius: 1%;
    background-color: black;
}

.playerInfoWrapper>div {
  background-color: white;
}

.pointsPlayer {
  text-align: center;
  padding: 30%;
}

.playerMoney {
  text-align: center;
  padding: 30%;
}

.energyPlayer {
  text-align: center;
  padding: 30%;
}

.pointsSymbol {
  grid-column: 1;
  grid-row: 1;
  content: url('/images/victoryPoints-Symbol.png');
  height: 32%;
  width: 100%;
}

.pointsPlayer {
  grid-column: 2;
  grid-row: 1;

}


.energySymbol {
  grid-column: 1;
  grid-row: 2;
  content: url('/images/energyDrink-Symbol.png');
  height: 32%;
  width: 100%;

}

.energyPlayer {
  grid-column: 2;
  grid-row: 2;

}

.moneySymbol {
  grid-column: 1;
  grid-row: 3;
  content: url('/images/moneySymbol.png');
  height: 32%;
  width: 100%;

}

.playerMoney {
  grid-column: 2;
  grid-row: 3;


}

.playerBox {
  width: 100%;
  height: 100%;
  border: 2px solid black;
}






</style>
