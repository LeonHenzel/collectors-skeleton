<template>
  <div class="workersWrapper">
    <div class="workersTitle">
      <img src="https://cdn1.iconfinder.com/data/icons/worker-icons/100/01-1User-512.png" alt="workerImg" width="160px" height="160px">
      <h1>Work</h1>
    </div>
    <div class="workerButtons">
      <div class="workerButtonsContent" v-for="(p, index) in placement" :key="index">
        <button class="workerOption"
          v-if="p.playerId===null"
          @click="placeWorkers(p)"
          :disabled="disablePlacement(index, p.cost)">
          
        <div v-if="p.action!=='quarter'" :id="p.action"></div>

        <div v-if="round===1 && p.action==='quarter'" id="quarterRound1"></div>
        <div v-if="round===2 && p.action==='quarter'" id="quarterRound2"></div>
        <div v-if="round===3 && p.action==='quarter'" id="quarterRound3"></div>
        <div v-if="round===4 && p.action==='quarter'" id="quarterRound4"></div>

        <br>
        {{p.cost}}

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
    margin-top: 1%;
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
    grid-template-columns: 175px 175px 175px 175px 175px;
    grid-gap: 1%;
  }

  .workerButtonsContent{
    width: 170px;
    height: 95px;
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
    text-align: center;
    height: 75px;
    width: 150px;
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
    width: 100%;
    height: 100%;
  }

  #quarterRound1{
    content:url("/images/1.1.png");
    margin-left: -8px;
    margin-top: -3px;
    width: 110%;
    height: 105.5%;
    border-radius: 5px;
  }

  #quarterRound2{
    content:url("/images/1.2.png");
    margin-left: -8px;
    margin-top: -3px;
    width: 110%;
    height: 105.5%;
    border-radius: 5px;
  }

  #quarterRound3{
    content:url("/images/1.3.png");
    margin-left: -8px;
    margin-top: -3px;
    width: 110%;
    height: 105.5%;
    border-radius: 5px;
  }

  #quarterRound4{
    content:url("/images/1.4.png");
    margin-left: -8px;
    margin-top: -3px;
    width: 110%;
    height: 105.5%;
    border-radius: 5px;
  }

  #recycle{
    content:url("/images/2.png");
    margin-left: -5px;
    width: 107%;
    height: 101%;
    border-radius: 5px;
  }

  #twoCards{
    content:url("/images/3.png");
    margin-left: -5px;
    width: 107%;
    height: 101%;
    border-radius: 5px;
  }

  #cardsAndfirstPlayer{
    content:url("/images/4.png");
    margin-left: -5px;
    width: 107%;
    height: 101%;
    border-radius: 5px;
  }

  #cardAndIncome{
    content:url("/images/5.png");
    margin-left: -8px;
    margin-top: -3px;
    width: 110%;
    height: 105.5%;
    border-radius: 5px;
  }

  @media screen and (max-width: 1590px){
    .workersWrapper{
      transform: scale(0.9);
    }
  }

  @media screen and (max-width: 1475px){
    .workersWrapper{
      margin-left: -3%;
      transform: scale(0.85);
    }
    .workersTitle{
      transform: translateX(-5%);
    }
    .workerButtons{
      transform: translateX(5%);
    }
  }

  @media screen and (max-width: 1310px){
    .workersWrapper{
      transform: scale(0.8);
    }
  }

  @media screen and (max-width: 1250px){
    .workersWrapper{
      transform: scale(0.7);
    }
  }

  @media screen and (max-width: 1080px){
    .workersWrapper{
      transform: scale(0.6);
    }
  }

  @media screen and (max-width: 949px){
    .workersWrapper{
      transform: scale(0.5);
    }
  }

  @media screen and (max-height: 770px){
    .workersWrapper{
      transform: scale(0.8);
    }
  }

  @media screen and (max-height: 700px){
    .workersWrapper{
      transform: scale(0.6);
      margin-top: 0;
    }
  }

  @media screen and (max-height: 600px){
    .workersWrapper{
      transform: scale(0.4);
      margin-top: -2%;
    }
  }


</style>
