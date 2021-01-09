


<template>
  <div class="incomeOverlay">
    <h2>{{labels.chooseincome}}</h2>
    <div>
      <label for="drawACard">{{labels.drawcard}}</label>
      <input type="checkbox" value="1" v-model="drawCardVar" name="drawACard">
    </div>
    <div>
      <label for="oneIncome">{{labels.onemoredime}}</label>
      <input type="checkbox" value="1" v-model="oneIncomeVar" name="oneIncome">
    </div>
    <div>
      <label for="twoIncome">{{labels.twomoredimes}}</label>
      <input type="checkbox" value="1" v-model="twoIncomeVar"  name="twoIncome">
    </div>
  <div>
  <button
  :disabled="wrongBoxesChecked()"
  @click="sendIncomeInfo()">
    {{labels.confirmincome}}
  </button>
  <div v-if="wrongBoxesChecked()">
    {{labels.vargodvälj}} {{player.incomeToChoose}} {{labels.inkomsterduvill}}
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
.incomeOverlay {
  background-color: black;
  height: 100%;
  width: 100%;
  border: 5px solid white;
  text-align: center;
}


</style>
