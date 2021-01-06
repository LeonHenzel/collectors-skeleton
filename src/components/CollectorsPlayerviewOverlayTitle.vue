<template>
    <div class="playerName" v-if="player">
        <h1>{{player.playerName}}<span v-if="player.myTurn">, it is your turn! </span></h1>
        <h2 v-if="player.firstPlayerToken">Next round you will be the first player.</h2>  
    </div>
</template>


<script>
export default {
  name: 'CollectorsPlayerviewOverlayTitle'
,
  props: {
    player: Object
  }
}
</script>

<style lang="css" scoped>

    .playerName h1{
        text-transform: capitalize;
    }

</style>
