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
    transition-property: transform,scale;
    transition-duration: 0.2s; 
    transform: scale(0.41);
    transform-origin: top left;
  }

  .card:hover{
    transform: scale(0.6) translateY(-2rem);
    z-index: 20;
  }



  @media all and (max-width:1500px){
    .card{
      transform: scale(0.40);

    }
  }

  @media all and (max-width:1450px){
    .card{
      transform: scale(0.39);

    }
  }


  @media all and (max-width:1400px){
    .card{
      transform: scale(0.38);

    }
  }

  @media all and (max-width:1350px){
    .card{
      transform: scale(0.37);

    }
  }

  @media all and (max-width:1300px){
    .card{
      transform: scale(0.36);

    }
  }

  @media all and (max-width:1250px){
    .card{
      transform: scale(0.35);

    }
  }


  @media all and (max-width:1200px){
    .card{
      transform: scale(0.34);

    }
  }


  @media all and (max-width:1150px){
    .card{
      transform: scale(0.33);

    }
  }


  @media all and (max-width:1050px){
    .card{
      transform: scale(0.30);

    }
  }



  @media all and (max-width:950px){
    .card{
      transform: scale(0.28);

    }
  }

  @media all and (max-width:900px){
    .card{
      transform: scale(0.26);

    }
  }



  @media all and (max-width:850px){
    .card{
      transform: scale(0.25);

    }
  }

  @media all and (max-width:800px){
    .card{
      transform: scale(0.24);

    }
  }


  @media all and (max-width:750px){
    .card{
      transform: scale(0.22);

    }
  }

  @media all and (max-width:700px){
    .card{
      transform: scale(0.21);

    }
  }

  @media all and (max-width:650px){
    .card{
      transform: scale(0.19);

    }
  }

  @media all and (max-width:600px){
    .card{
      transform: scale(0.17);

    }
  }

  @media all and (max-width:550px){
    .card{
      transform: scale(0.15);

    }
  }

  @media all and (max-width:525px){
    .card{
      transform: scale(0.13);

    }
  }










  @media all and (max-width:500px){
    .card {
      transform: scale(0.11);
    }
  }

  @media all and (max-width:450){
    .card {
      transform: scale(0.10);
    }
  }

    /* När man hovrar ett kort så ska det åka upp lite. 1rem ≈ 15px atm*/



  .available-to-choose {
    animation: jiggle 10s ease-in-out;
    animation-iteration-count:infinite;
    box-shadow: 0 0 30px yellow;
    z-index: 1000;
  }

  .available-to-choose:hover {
    z-index: 1001;
  }

  /*@keyframes jiggle {
    0% {transform:rotate(0.1deg);}
    50% {transform:rotate(-0.1deg);}
    100% {transform:rotate(0.1deg);}
  }*/


</style>
