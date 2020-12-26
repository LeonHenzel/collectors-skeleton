<template>
  <div>
    <div v-if="!player.ready">
      <button @click="isReady()">{{labels.ready}}</button>
    </div>
    <div v-else-if="player.secret.length===0" >
        <CollectorsCard v-for="(card, index) in player.hand" :key="index"
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
    }
  }
}
</script>

<style lang="css" scoped>
</style>
