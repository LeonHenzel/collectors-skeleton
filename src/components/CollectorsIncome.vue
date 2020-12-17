


<template>
  <div>
    <div>
      <label for="drawACard">Dra ett kort</label>
      <input type="checkbox" value="1" v-model="drawCardVar" name="drawACard">
    </div>
    <div>
      <label for="oneIncome">En extra peng</label>
      <input type="checkbox" value="1" v-model="oneIncomeVar" name="oneIncome">
    </div>
    <div>
      <label for="twoIncome">Två extra pengar</label>
      <input type="checkbox" value="1" v-model="twoIncomeVar"  name="twoIncome">
    </div>
  <div>
  <button
  :disabled="wrongBoxesChecked()"
  @click="sendIncomeInfo()">
    Bekräfta inkomst
  </button>
  <div v-if="wrongBoxesChecked()">
    Var god fyll vilka {{player.incomeToChoose}} inkomster du vill välja
  </div>
</div>
</div>
</template>

<script>
export default {
  name: 'CollectorsIncome',
  props: {
    labels: Object,
    player: Object
  },
  data: function(){ return{
    drawCardVar: false,
    oneIncomeVar: false,
    twoIncomeVar: false,
    numberToChoose: 0
  }},
  methods: {
    wrongBoxesChecked: function(){
      let numberChecked=0;
      if(this.drawCardVar===true){
        numberChecked+=1;
      }
      if(this.oneIncomeVar===true){
        numberChecked+=1;
      }
      if(this.twoIncomeVar===true){
        numberChecked+=1;
      }
      return numberChecked!==this.player.incomeToChoose;
    },
    sendIncomeInfo: function(){
      console.log("CollectorIncome Onclick")
      this.$emit('income', {drawOneCard: this.drawCardVar,
      oneIncome: this.oneIncomeVar,
      twoIncome: this.twoIncomeVar})
      this.drawCardVar=false;
      this.oneIncomeVar=false;
      this.twoIncomeVar=false;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
