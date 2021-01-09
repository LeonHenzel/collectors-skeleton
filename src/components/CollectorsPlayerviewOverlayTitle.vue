<template>

    <div class="playerName" v-if="player">
        <div class="coolTitle">
            <h1 v-if="player.myTurn===false">{{player.playerName}}'s status </h1>
            <h1 v-if="player.myTurn">{{player.playerName}}<span>, {{labels.itsyourturn}} </span></h1>
        </div>
        <!-- <h3 v-if="player.firstPlayerToken">In the next round you will be the first player.</h3>   -->
    </div>
</template>


<script>
export default {
  name: 'CollectorsPlayerviewOverlayTitle'
,
  props: {
    player: Object,
    labels: Object
  }
}
</script>

<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css?family=Bangers&display=swap');

.coolTitle {
    margin-top: 2vh;
    margin-left: 8vw;
    width: 75%;
    height: 100%;
    color: #bfaa40;
    display: flex;
    overflow: hidden;
    font-family: 'Bangers', cursive;
    align-items: center;
    justify-content: left;
    position: relative;
    overflow: hidden;
}
.coolTitle:before {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: rotate(0) translateX(-50%) translateY(-50%);
    transform-origin: 0 0;
    width: 100%;
    height: 100%;
    content: '';
    animation: rotation 20s infinite linear;
}
h1 {
    position: relative;
    z-index: 2;
    font-size: 5vh;
    letter-spacing: 1vh;
    text-transform: uppercase;
    transform: rotate(-4deg);
    text-shadow: 1px 1px #ac9939, 2px 2px #983, 3px 3px #86772d, 4px 4px #82742b, 5px 5px #7e702a, 6px 6px #7a6d29, 7px 7px #776928, 8px 8px #736626, 9px 9px #6f6325, 10px 10px #6b5f24, 10px 10px 30px rgba(0, 0, 0, 0.7);
}

h3 {
    margin-left: 8vw;
    margin-top: -0.7vh;
    font-family: 'Bangers', cursive;
    position: relative;
    z-index: 2;
    font-size: 2vh;
    letter-spacing: 0.5vh;
    text-transform: uppercase;
    /* transform: rotate(-5deg);
    text-shadow: 1px 1px #ac9939, 2px 2px #983, 3px 3px #86772d, 4px 4px #82742b, 5px 5px #7e702a, 6px 6px #7a6d29, 7px 7px #776928, 8px 8px #736626, 9px 9px #6f6325, 10px 10px #6b5f24, 10px 10px 30px rgba(0, 0, 0, 0.7); */
}


.playerName h1{
    text-transform: capitalize;
}

</style>
