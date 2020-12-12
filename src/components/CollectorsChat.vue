
<template class="chat">
  <div class="mainWrapper">
    <button type="submit" id="openChatButton" @click="chatGotClicked=true">
      <img src="https://www.flaticon.com/premium-icon/icons/svg/14/14558.svg" height="20" width="20">
    </button>

    <div id="chatWrapper" v-if="chatGotClicked" @keyup.enter="sendMessage">

        <div id="chatHeader">
          Chat
          <button type="submit" id ="closeChat" @click="chatGotClicked=false"> &times;</button>
        </div>

      <form class="yourMessage">
        <hr>
        <span>
          <textarea id="commentWindow" v-model="message"></textarea>
         <button id="sendButton" type="submit" @click="sendMessage">
            <img src ="https://image.flaticon.com/icons/png/512/46/46076.png" width="20" height="20">
          </button>
        </span>
      </form>
      <div id="messages">

        <div id="invisibleDiv" v-for="(msg,index) in messages" :key="'msg'+index">
          <div :class="['bubble', {'friendBubble':msg.playerId!==playerId}]">
            {{msg.message}}
          </div>
        </div>


      </div>
    </div>
  </div>
</template>


<!--.................................................................................................... -->

<script>
  export default{
    name: 'CollectorsChat',
    props:{
      messages: Array,
      playerId: String,
    },
  data: function () {
    return{
      chatGotClicked: false,
      gotSubmitted: false,
      message: "",
      send: false
    }
  },
  methods:{
    sendMessage: function(){
      var msg = this.message;
      if(msg.length>1 || this.chatGotClicked===true){
        this.$emit('sendMessage', msg);
      }
      this.message = ""
      var chatWindow = document.getElementById("messages");
      chatWindow.scrollIntoView();
    },

    test: function(){
      this.send = true
      this.sentMessage = this.message
      if(this.sentMessage!=""){
        this.allMessages.push({value: this.sentMessage})
      }
      this.message = ""
      var element = document.getElementById("messages");
      element.scrollIntoView();
    }
  }
}

</script>

<!--.................................................................................................... -->

<style>
.mainWrapper{
  margin-left: 5px;
}

#commentWindow{
  resize: none;
  max-height: 16pt;
  font-size: 11pt;
  margin-left: 10%;
  width: 70%;
  border-radius: 5px;
  outline: none;
}


#messages{
  position:absolute;
  height: 500px;
  max-height: 490px;
  width:100%;
  overflow:auto;
  background-color: #313639;
}
#chatHeader{
  background-color: #6495ED;
  padding: 10px;
  font-size: 20pt;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid lightgrey;
}
#invisibleDiv{
  height: 40px;
  background-color: transparent;
  margin-top: 5px;
  margin-bottom: 5px;
}

.bubble{
  min-width: 20%;
  position: absolute;
  width: max-content;
  max-width: 60%;
  color: white;
  margin: 5px;
  border-radius: 15px;
  padding: 10px;
  background-color: #6495ED;
  right: 0;
}

.bubble:hover{
  cursor: text;
}

.friendBubble{
  background-color: lightgrey;
  left: 0;
  color: black;
}

  #chatWrapper{
  border-radius: 10px;
  position: fixed;
  width: 400px;
  height: 600px;
  background-color: #f8f8ff;
  z-index:100;
  }

  #openChatButton{
  border: none;
  outline: none;
  }

  #openChatButton:hover{
  cursor: pointer;
  }


  .yourMessage{
  position: absolute;
  bottom: 0;
  width: 100%;
  }

  #sendButton{
  margin: 10px;
  width: 28px;
  height: 30px;
  outline: none;
  border: none;
  background-color: transparent;
  left: 5px;
  }

  #sendButton:hover{
  cursor: pointer;
  }

  #closeChat{
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  font-size: 18pt;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
  }

  #closeChat:hover{
  cursor: pointer;
  }

  #messages{
    color:black;
  }
</style>
