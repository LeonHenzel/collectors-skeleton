<template>
  <div>
  <div id="specificPlayer" v-for="player in playerList" :key="player">
    Name: {{player.playerName}}
    <div class="playerInfoWrapper">
      <div class="isPlayingBox playerBox">
        <span v-if="player.myTurn">Is playing</span>
      </div>
      <div class="moneyBox playerBox">
        Money: {{player.money}}

      </div>
      <div class="pointsBox playerBox">
        points: {{player.points}}

      </div>
      <div class="firstPlayerBox playerBox">
        <span v-if="player.firstPlayerToken">Firstplayer next round</span>
      </div>
      <div class="energyBottlesBox playerBox">
        EnergyBottles: {{player.energyBottles}}

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
.itemSummaryWrapper {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50%;
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
    display: grid;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10%;
    grid-template-rows: 49% 49%;
    grid-gap: 1%
}

.isPlayingBox {
  grid-column: 1/4;
  grid-row: 1;
}

.firstPlayerBox {
  grid-column: 1/6;
  grid-row: 2;
}

.energyBottlesBox {
  grid-column: 6/10;
  grid-row: 2
}

.pointsBox {
  grid-column: 7/10;
  grid-row: 1;
}

.moneyBox {
  grid-column: 4/7;
  grid-row: 1
}

.playerBox {
  width: 100%;
  height: 100%;
  border: 2px solid black;
  background-color: white;
}




</style>
