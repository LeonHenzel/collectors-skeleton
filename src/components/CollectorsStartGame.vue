<template>

  <div class="readyoverlay" id="readyoverlay"  v-if="!player.ready">

      <button class="startbutton" @click="isReady()">{{labels.ready}}</button>
    </div>

  <div class="readyoverlay" v-else>
    <div class="choosecardswrapper">


      <h1> {{labels.chooseyoursecretcard}} </h1>

    <div class="choosecards" v-if="player.secret.length===0">

        <CollectorsCard class="carddiv" v-for="(card, index) in player.hand" :key="index"
          :card="card"
          :availableAction="card.available"
          @doAction="secretCardChoosen(card)"/>
    </div>
    <div v-else >
      <ul v-for="playerr in allPlayers" :key="playerr">
        <div v-if="playerr.ready">
        {{playerr.playerName}}<span v-if="playerr.secret.length===0">Is choosing secret Item</span>
        <span v-else>Is ready</span>
        </div>
        <div v-else>
          {{playerr.playerName}} Is not ready
        </div>
      </ul>
    </div>
  </div>
  </div>

</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'


export default {
  name: 'CollectorsStartGame',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    allPlayers: Object

  },
  methods: {
    isReady: function(){
      console.log("StartGame")
      this.$emit('isReady')

    },
    secretCardChoosen: function(card){
      this.$emit('secretCardChoosen',card)
      this.$emit('choosecard')

    },
}
}
</script>

<style lang="css" scoped>

.readyoverlay{
width: 100%;
height: 1000px;
background: rgba(0, 0, 0, 0.7);
z-index: 10;
position: fixed;

}
.readyoverlay__content{
position: relative;
top: 25%;
width: 100%;

}
#readyoverlay{
  align-text:center;
  display: flex;
  align-items:center;
  justify-content: center;
}
.startbutton{
  width: 500px;
  height: 200px
}
.choosecards{

  display:flex;
  transition: 200ms;
}
.carddiv:hover{
  transition: 200ms;
  transform: scale(1.2);


}
.choosecardswrapper{
  text-align: center;
  position:fixed;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);

}


</style>
