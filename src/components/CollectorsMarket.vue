<template>
  <div class="marketWrapper">
<h1>{{labels.raiseMarket}}</h1>
  <button type="submit" class="cancelButton" v-if="isPlacedList.market && player.myTurn" @click="cancelAction()">{{labels.cancelAction}}</button>
    <div class="buttonsMarket" v-if="!isPlacedList.market || !player.myTurn">

      <div class="theButtons">

    <div  v-for="(p, index) in placement" :key="index">
      <div class="buttonGrid">
      <button class="buttons"
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeBottle(p)" >
        ${{p.cost}}



      </button>
      <span v-if="p.playerId===null">
      x {{p.numberOfChangedMarkets}}
    </span>


    <div v-if="p.playerId !== null">
      {{p.playerId}}
    </div>



    </div>
  </div>
  </div>
  </div>
    <div class="marketValuesWrapper">
      <div class="firstValue marketBox">
        {{marketValues.movie}}
      </div>
      <div class="firstValueSym">
        <img src="/images/movieValue.png" />
      </div>
      <div class="secondValue marketBox">
        {{marketValues.music}}
      </div>
      <div class="secondValueSym">
        <img src="/images/musicValue.png" />
      </div>
      <div class="thirdValue marketBox">
        {{marketValues.technology}}
      </div>
      <div class="thirdValueSym">
        <img src="/images/techValue.png" />
      </div>
      <div class="fourthValue marketBox">
        {{marketValues.figures}}
      </div>
      <div class="fourthValueSym">
        <img src="/images/figursValue.png" />
      </div>
      <div class="fithValue marketBox">
        {{marketValues.fastaval}}
      </div>
      <div class="fithValueSym">
        <img src="/images/fastavalValue.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectorsMarket',
  props: {
    labels: Object,
    player: Object,
    placement:  Array,
    marketValues: Object,
    isPlacedList: Object
  },
  methods: {
    cannotAfford: function (cost) {
      return (this.player.money < cost);
  },
    placeBottle: function(p){
      if(p.numberOfChangedMarkets===2){
        this.$emit('changeTwoMarket');
        this.$emit('placeBottle', p.cost);
      }
      else {
        this.$emit('placeBottle', p.cost);
      }
    },
    cancelAction: function(){
      this.$emit('cancelAction')
    }

}
}
</script>




<style lang="css" scoped>

.cancelButton{
  height: 60%;
  width: 80%;
  margin: 10%;
  z-index: 100;
  grid-column: 1;
  grid-row: 2;
}


.buttonGrid>div{
  grid-column: 1;
}

.buttonGrid>span{
  margin-top: 49%;
  margin-bottom: 49%;
  text-align: center;
  grid-column: 2;
}

.buttons{
  border: 0.1em solid white;
  background-color: green;
  width: 100%;
  height: 100%;
  padding: 0.1%;
  border-radius: 5rem;
  text-align: center;
  color: white;
  font-size: 2vh;
}


.buttonGrid {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 100%;
}

.buttonsMarket {
  height: 100%;
  width: 100%;
  display: grid;
  grid-column: 1;
  grid-row: 2;
}

.theButtons {
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 33% 33% 33%;
}

.theButtons button:hover{
  cursor:pointer;
}

.marketWrapper {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:30% 40% 30%;
  grid-template-rows: 20% 80%;
  text-align: center;
}

.marketWrapper>h1{
  grid-column: 1;
  grid-row: 1;
}

.marketValuesWrapper {
  width: 100%;
  height: 100%;
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-rows:  30% 70%;
  grid-template-columns:  20% 20% 20% 20% 20%;
}

.firstValue {
  grid-column: 1;
  grid-row: 1;
}

.secondValue {
  grid-column: 2;
  grid-row: 1;
}

.thirdValue {
  grid-column: 3;
  grid-row: 1;
}

.fourthValue {
  grid-column: 4;
  grid-row: 1;
}

.fithValue {
  grid-column: 5;
  grid-row: 1;
}

.firstValueSym {
  grid-column: 1;
  grid-row: 2;
}

.secondValueSym {
  grid-column: 2;
  grid-row: 2;
}

.thirdValueSym {
  grid-column: 3;
  grid-row: 2;
}

.fourthValueSym {
  grid-column: 4;
  grid-row: 2;
}

.fithValueSym {
  grid-column: 5;
  grid-row: 2;
}

.marketValuesWrapper>div>img {
  width: 90%;
  height: 100%;
  top: 0;
  left:0;



}

.marketBox {
  border: solid white;
  background-color: #8A2BE2;
}



@media all and (max-width:500px){


}


</style>
