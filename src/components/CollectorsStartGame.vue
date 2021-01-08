<template>

    <div class="readyoverlay" id="readyoverlay"  v-if="!player.ready">

      <div class="waitingPlayers" v-if="allPlayersIn===false">

        <div class="waitingPlayersContent">
          <div>Waiting for more players to join...</div>  
          <div class="inviteContent">
            <div>Use the link to invite more players:</div>
            <div><input class="inviteLinkContainer" type="text" :value="inviteLink" @click="selectAll" readonly="readonly"></div>
          </div>
        </div>
          
      </div>

      <button class="startbutton" v-if="allPlayersIn" @click="isReady()">{{labels.ready}}</button>


    </div>
    <div class="readyoverlay" v-else>
    <div class="choosecardswrapper">


      <h1 v-if="player.secret.length===0"> {{labels.chooseyoursecretcard}} </h1>
      <div class="choosecards" v-if="player.secret.length===0">

        <CollectorsCard class="carddiv" v-for="(card, index) in player.hand" :key="index"
          :card="card"
          :availableAction="card.available"
          @doAction="secretCardChoosen(card)"/>
    </div>
    <div v-else >
      <ul v-for="(playerr, index) in allPlayers" :key="index">
        <div v-if="playerr.ready">

          <div v-if="playerr.secret.length===0"><h1>{{playerr.playerName}}{{labels.ischoosingsecretitem}}</h1></div>
        <div v-else> <h1>{{playerr.playerName}} {{labels.isready}}</h1></div>
        </div>
        <div v-else>
          <h1>{{playerr.playerName}} {{labels.isnotready}} </h1>
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
    allPlayers: Object,
    allPlayersIn: Boolean,
    inviteLink: String


  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",


    }
  },

  methods: {
    isReady: function(){
      if (this.allPlayersIn) {
        console.log("StartGame")
        this.$emit('isReady')
      }


    },
    secretCardChoosen: function(card){
      this.$emit('secretCardChoosen',card)
      this.$emit('choosecard')

    },
    selectAll: function (n) {
      n.target.select();
    },
}
}
</script>

<style lang="css" scoped>

.readyoverlay{
width: 100vw;
height: 100vh;
background: rgba(0, 0, 0, 0.8);
z-index: 10;
position: fixed;

}
.readyoverlay__content{
position: relative;
top: 25%;
width: 100%;

}
#readyoverlay{
  text-align: center;
  display: flex;
  align-items:center;
  justify-content: center;
}

.waitingPlayersContent{
  font-size: 2.4vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* background: black; */
  width: 50vw;
  height: 50vh;
}

.inviteContent{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.inviteContent div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.inviteLinkContainer{
  background: rgb(255, 126, 152);
  border-radius: 5%;
  text-align: center;
  width: 20vw;
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
.startbutton {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.startbutton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.startbutton span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.startbutton:hover span {
  padding-right: 25px;
}

.startbutton:hover span:after {
  opacity: 1;
  right: 0;
}
.footer{
  bottom: 0;
  left: 0;
  position: absolute;

}


</style>
