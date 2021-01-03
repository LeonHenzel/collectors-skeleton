<template>
  <div class="workersWrapper">
    <div class="workersTitle">
      <img src="https://cdn1.iconfinder.com/data/icons/worker-icons/100/01-1User-512.png" alt="workerImg" width="160px" height="160px">
      <h1>Work</h1>
    </div>
    <div class="workerButtons">
      <div class="workerButtonsContent" v-for="(p, index) in placement" :key="index">
        <button class="workerOption" :id="p.action"
          v-if="p.playerId===null"
          @click="placeWorkers(p)"
          :disabled="disablePlacement(index, p.cost)">
          {{p.cost}}

        <div>{{p.action}}</div>

        </button>
        <div class="playerIdPlaced" v-if="p.playerId !== null">
          {{p.playerId}} PLACED HERE
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'CollectorsWorkers',
    props:{
      labels: Object,
      player: Object,
      placement: Array,
      round: Number
    },
    methods:{
      placeWorkers: function(p){
        console.log("CollectorsWorkers Onclick")
        if(this.round!==4&&p.action==="quarter"){
        this.$emit('setDiscardTwoTrue')
      }
        this.$emit('placeWorker', {action: p.action, cost: p.cost})
      },

      disablePlacement: function(index, cost){
        if(this.player.money<cost){
          return true;
        }
        if(index===1 && this.player.energyBottles===0){
          return true;
        }
        if(this.round===4 && this.player.energyBottles===0 && index===0){
          return true;
        }
        if(this.round!==4 && this.player.hand.length<2 && index===0){
          return true;
        }
        if(index===4 && this.player.hand.length<1){
          return true;
        }

      }
    }
  }
</script>

<style>

  button{
    border-radius: 5px;
  }

  .workersWrapper{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgb(255, 217, 179);
    width: 100%;
  }

  .workersTitle{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .workerButtons{
    display: grid;
    grid-template-columns: 100px 100px 100px 100px 100px;
    grid-gap: 1%;
  }

  .workerButtonsContent{
    border: black;
    border-style: solid;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playerIdPlaced{
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 130px;
    border-radius: 5px;
    text-transform: uppercase;
    font-style: italic;
    font-weight: bold;
    color: black;
    background: #d9a7c7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #fffcdc, #aee1ff);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #fffcdc, #95f3ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .workerOption{
    width: 95px;
    height: 150px;
  }

  #quarter{
    background-color: green;
  }

  #recycle{
    background-color: blueviolet;
  }

  #twoCards{
    background-color: blue;
  }

  #cardsAndfirstPlayer{
    background-color: yellow;
  }

  #cardAndIncome{
    background-color: tomato;
  }


</style>
