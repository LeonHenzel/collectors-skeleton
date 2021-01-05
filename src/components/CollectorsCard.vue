<template>
    <div v-if="card.x>0" :class="['card', {'available-to-choose': availableAction}]" :style="{'background-position': (-(card.x-1)*250)+'px ' + (-(card.y-1)*350)+'px'}" @click="doAction">

      {{card.item}}
      {{card.skill}}
      {{card.market}}
      <br>
      {{card.available}}
    </div>
</template>

<script>
export default {
  name: 'CollectorsCard',
  props: {
    card: Object,
    availableAction: Boolean
  },
  methods: {
    doAction: function() {
      this.$emit('doAction');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    color:red;
    user-select: none;
    width:250px;
    height:350px;
    background-image: url('/images/collectors-cards.png');

    border-radius: 10px;
    box-shadow: -1rem 0 3rem #000;
    transition: 0.2s;
    transform: scale(0.5);
    transform-origin: top left;
  }

  @media all and (max-width:1500px){
    .card{
      transform: scale(0.47);

    }
  }

  @media all and (max-width:1450px){
    .card{
      transform: scale(0.45);

    }
  }


  @media all and (max-width:1400px){
    .card{
      transform: scale(0.43);

    }
  }

  @media all and (max-width:1350px){
    .card{
      transform: scale(0.42);

    }
  }

  @media all and (max-width:1300px){
    .card{
      transform: scale(0.41);

    }
  }

  @media all and (max-width:1250px){
    .card{
      transform: scale(0.40);

    }
  }


  @media all and (max-width:1200px){
    .card{
      transform: scale(0.38);

    }
  }


  @media all and (max-width:1150px){
    .card{
      transform: scale(0.37);

    }
  }


  @media all and (max-width:1050px){
    .card{
      transform: scale(0.35);

    }
  }


  @media all and (max-width:1000px){
    .card{
      transform: scale(0.33);

    }
  }


  @media all and (max-width:900px){
    .card{
      transform: scale(0.30);

    }
  }



  @media all and (max-width:800px){
    .card{
      transform: scale(0.27);

    }
  }



  @media all and (max-width:700px){
    .card{
      transform: scale(0.25);

    }
  }

  @media all and (max-width:600px){
    .card{
      transform: scale(0.23);

    }
  }

  @media all and (max-width:50){
    .card{
      transform: scale(0.20);
      
    }
  }










  @media all and (max-width:500px){
    .card {
      color:red;
      user-select: none;
      width:250px;
      height: 350px;
      background-image: url('/images/collectors-cards.png');
      border-radius: 10px;
      box-shadow: -1rem 0 3rem #000;
      transition: 0.2s;
    }
  }

    /* När man hovrar ett kort så ska det åka upp lite. 1rem ≈ 15px atm*/

  .available-to-choose {
    animation: jiggle 10s ease-in-out;
    animation-iteration-count:infinite;
    box-shadow: 0 0 30px yellow;
  }

  @keyframes jiggle {
    0% {transform:rotate(360deg);}
    50% {transform:rotate(-360deg);}
    100% {transform:rotate(360deg);}
  }


</style>
