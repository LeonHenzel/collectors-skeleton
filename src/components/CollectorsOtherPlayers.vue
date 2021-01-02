<template>
  <div id="collectorsOtherPlayers">
  <div class="specificPlayer" v-for="player in playerList" :key="player">
    <div class="otherPlayerWrapper">
      <div v-if="player.myTurn" class="arrow">
        <div class="arrowContainer">
            <div class="arrow">
            </div>
        </div>
      </div>

    <div class="playerName">


      <span v-if="player.myTurn">
        {{player.playerName}} is playing
      </span>
      <span v-else>
        Name: {{player.playerName}}
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
        Movie
        <div>
        {{player.itemsByNumber.movie}}
      </div>
      </div>
      <div class="secondItem itemsBox">
        Music
        <div>
          {{player.itemsByNumber.music}}
        </div>
      </div>
      <div class="thirdItem itemsBox">
        technology
        <div>
          {{player.itemsByNumber.technology}}
        </div>
      </div>
      <div class="fourthItem itemsBox">
        figures
        <div>
        {{player.itemsByNumber.figures}}
      </div>
      </div>
      <div class="fithItem itemsBox">
        fastaval
        <div>
        {{player.itemsByNumber.fastaval}}
      </div>
      </div>



    </div>
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

#collectorsOtherPlayers {
  width: 100%;
  height: 100%;
}

.specificPlayer {
  width: 100%;
  height: 100%
}

.otherPlayerWrapper {
  width: 100%;
  height: 33%;
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
  grid-column: 2/5;
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
