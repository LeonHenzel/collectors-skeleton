<template>
  <div class="workersWrapper">
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
        this.$emit('setDiscardTwoTrue')
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
  }

  .workerOption{
    width: 200px;
    height: 300px;
  }
</style>
