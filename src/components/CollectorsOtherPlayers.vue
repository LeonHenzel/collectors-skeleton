<template>
  <div class="collectorsOtherPlayers">
    <div class="specificPlayer" v-for="player in playerList" :key="player">
      <div class="otherPlayerWrapper">

      <div class="playerName">


        <span class="nameWrapper">


          {{player.playerName}}
          <div class="playing" v-if="player.myTurn">
            Playing
          </div>
          <div class=firstPlayer v-if="player.firstPlayerToken">
            1st
          </div>
          <button class="expandButton" type="submit">
            <img src="https://www.pinclipart.com/picdir/middle/218-2186085_click-for-full-screen-expand-icon-svg-clipart.png" height="20" width="20">
          </button>
        </span>
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
      <hr>
    </div>
    </div>
</div>
</template>


<script>
export default {
  name: 'CollectorsOtherPlayers'
,
  props: {
    playerList: Array
  }
}
</script>

<style lang="css" scoped>

.collectorsOtherPlayers {
  width: 100%;
  height: 33%;
}

.nameWrapper{
  background-color: 	#f8f8ff;
  display: flex;
}

.expandButton{
  display: inline-block;
  height: 100%;
  z-index: 5000;
  background-color: transparent;
  outline: none;
  border: none;
}

.expandButton:hover{
  cursor: pointer;
}

.itemSummaryWrapper>div{
  text-align: center;
}

.itemSummaryWrapper>div>img {


  height: 72%;
  width: 100%;
  transform: scale(0.9);
  transform-origin: top left;
}

.playing{
  display: inline-block;
  border: 3px dotted yellow;
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
  border: 3px dotted yellow;
  background-color: brown;
  padding: 1.8rem 0.6rem 1.8rem 0.6rem;
  border-radius: 3rem;
  font-size: 10pt;
  letter-spacing: 0.1rem;
  font-weight: bold;
  color: white;
  transform: scale(0.45);
  transform-origin: top left;
}

.specificPlayer {
  width: 100%;
  height: 100%
}

.otherPlayerWrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1% 24% 24% 24% 24%;
  grid-template-rows: 33% 33% 33%;
  grid-gap: 1%;
  background-color: black;
  border: solid black;
  border-radius: 1%;

}

.arrowContainer {
  grid-column: 1;
  grid-row: 1;
  background-color: black;
}



.arrow{
  position:  relative;
    left: -3700%;
    top: -10%;
  height: 150%;
  width: 4400%;
  text-align: center;
  content: url('/images/arrowSymbol.png');
}



.firstPlayer {
  grid-column: 1;
  grid-row: 2;
}

.playerName {
  grid-column: 2/ span 5;
  grid-row: 1;
  background-color: white;
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
}

.playerInfoWrapper {
    grid-column: 5;
    grid-row:1/4;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 33% 33% 33%;
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
  height: 33%;
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
  height: 33%;
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
  height: 33%;
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
