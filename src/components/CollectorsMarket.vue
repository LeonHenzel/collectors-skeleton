<template>
  <div class="marketWrapper">

    <div class="buttonsMarket">
      <h1>{{labels.raiseMarket}}</h1>
    <div  v-for="(p, index) in placement" :key="index">
      <button
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeBottle(p)" >
        ${{p.cost}}
      </button>
      x {{p.numberOfChangedMarkets}}
      <div v-if="p.playerId !== null">
        {{p.playerId}}
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
    marketValues: Object
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
    }

}
}
</script>

<style lang="css" scoped>
.buttonsMarket {
  display: grid;
  grid-column: 1;
  grid-row: 1;
}

.marketWrapper {
  display: grid;;
  grid-template-columns:30% 40% 30%;
  grid-template-rows: 20% 30%;
  text-align: center;
}

.marketValuesWrapper {
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-row: 20% 40%;
  grid-column: 12% 12% 12% 12% 12%;
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


</style>
