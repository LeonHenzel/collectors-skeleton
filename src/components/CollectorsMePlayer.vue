<template>
    <div class="mePlayer" v-if="player">
        <div class="mePlayerWrapper">
            <div class="playerName">
              <div class="nameWrapper">

                <span class="theName">
                {{player.playerName}}
                </span>
                <div class="tokenGrid">
                  <div class="playing" v-if="player.myTurn">
                    {{labels.playing}}
                  </div>
                  <div class="firstPlayer" v-if="player.firstPlayerToken">
                    {{labels.first}}
                  </div>


                </div>

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
                <div class="itemsCount">
                {{player.itemsByNumber.movie}}
                </div>
              </div>
              <div class="secondItem itemsBox">
                <img src="/images/musicItem.png" />
                <div class="itemsCount">
                  {{player.itemsByNumber.music}}
                </div>
              </div>
              <div class="thirdItem itemsBox">
              <img src="/images/techItem.png" />
                <div class="itemsCount">
                  {{player.itemsByNumber.technology}}
                </div>
              </div>
              <div class="fourthItem itemsBox">
                <img src="/images/figursItem.png" />
                <div class="itemsCount">
                {{player.itemsByNumber.figures}}
              </div>
              </div>
              <div class="fithItem itemsBox">
                <img src="/images/fastavalItem.png" />
                <div class="itemsCount">
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
    player: Object,
    labels: Object
  }
}
</script>

<style lang="css" scoped>

*{
  font-size: 1.6vh;
}

.itemsCount{
  font-size: 2.2vh;
}

.nameWrapper{
  height: 100%;
  width: 100%;
  background-color: 	#f8f8ff;
  display: grid;
  grid-template-columns: 50% 35% 15%;
  grid-template-rows: 100%;
}


.theName{
  height: 100%;
  width: 100%;
  grid-column: 1;
  grid-row: 1;
  text-align: left;
  margin-top: 0.5vh;
  margin-left: 1vw;
  font-size: 1.9vh;
}

.tokenGrid{
  grid-column: 2;
  grid-row: 1;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
}

.mePlayer {
  width: 100%;
  height: 100%;;
}

.mePlayerWrapper {
  width: 98%;
  height: 97%;
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
  width: 70%;
  display: inline-block;
  border: 3px dotted yellow;
  background-color: green;
  padding: 15% 5% 15% 5%;
  margin-right: 5%;
  border-radius: 3rem;
  font-size: 100%;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: white;
  /*: scale(0.45);
  transform-origin: top left;*/
  grid-column: 1;
  grid-row: 1;
  text-align: center;
}

.firstPlayer{
  width: 70%;
  display: inline-block;
  border: 3px dotted yellow;
  background-color: brown;
  padding: 15% 5% 15% 5%;
  margin-right: 5%;
  border-radius: 3rem;
  font-size: 100%;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: white;
  /*transform: scale(0.45);
  transform-origin: top left;*/
  grid-column: 2;
  grid-row: 1;
  text-align: center;
}

.playerName {
  grid-column: 2/5;
  grid-row: 1;
  background-color: white;
  display: flex;
  align-items: center;
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
  font-size: 2.2vh;
  text-align: center;
  padding: 30%;
}

.playerMoney {
  font-size: 2.2vh;
  text-align: center;
  padding: 30%;
}

.energyPlayer {
  font-size: 2.2vh;
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
