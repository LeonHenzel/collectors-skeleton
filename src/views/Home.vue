

<template>
  <div class="center">
    <div id="hover">
      <h1>Collectors</h1>

    <div>
    <ul>
        <li class ="Engelska" v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'en')">  Set up a game of Collectors for {{i+1}} players</a>.
        </li>
      </ul>
      </div>

    <div>
      <ul>
        <li class="Svenska" v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'se')">Spela Collectors med {{i+1}} spelare</a>.
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created: function () {
    this.$store.commit('SET_ROOM_ID');
  },
  methods: {
    setupCollectors: function (playerCount, lang="en") {
      this.$store.commit('SETUP_GAME', {roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: lang });
      this.$router.push("/room/" + this.$store.state.roomId);
    },
  }
}




</script>
<style scoped>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1em;

  }

  // These CSS classes makes the texts in the fOr loop change colOR And changes the mousepointer img
  .Engelska :hover{
    color: Cyan;
    cursor: url('https://cdn.freebiesupply.com/logos/large/2x/windows-cursor-logo-png-transparent.png'), pointer;
  }
  .Svenska :hover{
    color: Cyan;
    cursor: url('https://cdn.freebiesupply.com/logos/large/2x/windows-cursor-logo-png-transparent.png'), pointer;
  }


</style>
