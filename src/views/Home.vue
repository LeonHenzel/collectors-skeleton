<template>
  <div class="center">

    <button type="submit" class = "switchLanguage" id = "swedishLanguage" v-if="swedishGotClicked == false"
    @click="swedishGotClicked = true, englishGotClicked= false">
      <img src= "https://cdn.countryflags.com/thumbs/sweden/flag-800.png" witdh = "30" height = "20">
    </button>

    <button type="submit" class = "switchLanguage" id = "englishLanguage" v-if="englishGotClicked == false"
    @click="englishGotClicked = true, swedishGotClicked= false">
      <img src= "https://cdn.countryflags.com/thumbs/united-kingdom/flag-800.png" witdh = "30" height = "20">
    </button>

    <div>
      <h1 id="mainTitle">Collectors</h1>
      <ul v-if="englishGotClicked">
        <li v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'en')">Set up a game of Collectors for {{i+1}} players</a>.
        </li>
      </ul>
      <ul v-if="swedishGotClicked">
        <li v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'se')">Spela Collectors med {{i+1}} spelare</a>.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data:function(){
    return{
      swedishGotClicked: false,
      englishGotClicked: true,
      language: "",
    }
  },
  created: function () {
    this.$store.commit('SET_ROOM_ID');
  },
  methods: {
    setupCollectors: function (playerCount, lang="en") {

      this.$store.commit('SETUP_GAME', {roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: lang });
      this.$router.push("/room/" + this.$store.state.roomId);
    }
  }
}
</script>

<style scoped>
  .center {
    display: absolute;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1em;
  }

  .switchLanguage{
    position: absolute;
    right: 0%;
    top: 0%;
    margin: 5px;
    background-color: transparent;
    outline: none;
    border: none;
  }
  .switchLanguage:hover{
    cursor: pointer;
  }
</style>
