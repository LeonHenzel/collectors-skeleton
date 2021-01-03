<template>
  <div class="workersWrapper">
    <div class="workersTitle">
      <img src="https://cdn1.iconfinder.com/data/icons/worker-icons/100/01-1User-512.png" alt="workerImg" width="160px" height="160px">
      <h1>Work</h1>
    </div>
    <div class="workerButtons">
      <div v-for="(p,index) in placement" :key="index">
        <button class="workerOption"
          v-if="p.playerId===null"
          @click="placeWorkers(p)"
          :disabled="disablePlacement(index, p.cost)">
          {{p.cost}}
        </button>
        <div v-if="p.playerId !== null">
          {{p.playerId}}
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
    display: flex;
  }

  .workerOption{
    width: 100px;
    height: 150px;
    z-index: 100;
  }
</style>
