<template>
  <div class="marketWrapper">
    <h1>{{labels.raiseMarket}}</h1>
    <div class="buttons" v-for="(p, index) in placement" :key="index">
      <button
        v-if="p.playerId===null"
        :disabled="cannotAfford(p.cost)"
        @click="placeBottle(p)" >
        ${{p.cost}}
        {{p.numberOfChangedMarkets}}
      </button>
      <div v-if="p.playerId !== null">
        {{p.playerId}}
      </div>
    </div>
    <div class="marketValuesWrapper">
      <div class="firstValue">
        {{marketValues.movie}}
      </div>
      <div class="firstValueSym">
        <img src="/images/movieValue.png" />
      </div>
      <div class="secondValue">
        {{marketValues.music}}
      </div>
      <div class="secondValueSym">
        <img src="/images/musicValue.png" />
      </div>
      <div class="thirdValue">
        {{marketValues.technology}}
      </div>
      <div class="thirdValueSym">
        <img src="/images/techValue.png" />
      </div>
      <div class="fourthValue">
        {{marketValues.figures}}
      </div>
      <div class="fourthValueSym">
        <img src="/images/figursValue.png" />
      </div>
      <div class="fithValue">
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
.buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-row: 1;
  grid-column: 1;
}

.marketWrapper {
  display: grid;;
  grid-template-columns: 100%;
  grid-template-rows: 20%, 60%;
}

.marketValues {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-row: 20% 40%;
  grid-column: 19% 19% 19% 19% 19%;
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


</style>
