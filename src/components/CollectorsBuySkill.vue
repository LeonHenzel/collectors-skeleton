<template>
    <div class="CollectorsBuySkill">
      <div class="gridWrapper">
        <button type="submit" class="cancelButton" v-if="isPlacedList.skill && player.myTurn" @click="cancelAction()"></button>
        <button href="#" title="Expands with more info" class="openButton openSkills" @click="openNav()">
          <div class="theButton">
          <img src="https://static.thenounproject.com/png/225624-200.png" width="40" height="40">
          <p>{{labels.skills}}</p>
          </div>
        </button>
        <div class="buy-skills">
          <div class="cardDiv" v-for="(card, index) in skillsOnSale" :key="index">
            <CollectorsCard
              :card="skillsOnSale[skillsOnSale.length-1-index]"
              :availableAction="skillsOnSale[skillsOnSale.length-1-index].available"
              @doAction="buySkill(skillsOnSale[skillsOnSale.length-1-index])"/>
          </div>
        </div>
        <div class="arrowGrid">
          <div v-for="(card, index) in skillsOnSale" :key="index">
            <div v-if="index===playerCount" class="arrow down">
            </div>
            <div v-else class="arrow right">
            </div>
          </div>
        </div>
        <div class="buttonWrapper">
          <div  v-for="(p, index) in placement" :key="index">
            <button :class="['buttons', {'red':p.cost!==0}]"
              v-if="p.playerId===null"
              :disabled="cannotAfford(p.cost)"
              @click="placeBottle(p)" >
              ${{p.cost}}
            </button>
            <div v-if="p.playerId !== null">
              {{p.playerId}}
            </div>
          </div>
        </div>

      </div>

      <div>

      </div>
      <div class="overlay" id="navBuySkill">
          <a href="#" class="closeButton" @click="closeNav()">&times;</a>
          <div class="overlayLayout">
            <div class="openButtonWrapper">
              <button href="#" class = "openButton openSkills" @click="closeNav()">
                <img src="https://static.thenounproject.com/png/225624-200.png" width="40" height="40">
                <p>{{labels.skills}}</p>
              </button>
            </div>
            <div class="buy-skillsWrapper">
              <h1>{{labels.availableCards}}</h1>
          <div class="buy-skills">
            <div class="cardWrapper" v-for="(card, index) in skillsOnSale" :key="index">
              <CollectorsCard
              :card="skillsOnSale[skillsOnSale.length-1-index]"
              :availableAction="skillsOnSale[skillsOnSale.length-1-index].available"
              @doAction="buySkill(skillsOnSale[skillsOnSale.length-1-index])"/>
            </div>
            </div>
          </div>
          <div class="paymentWrapper">
            <h2>{{labels.choosepayment}}</h2>
            <div class="buttonsOverlayWrapper">
              <div class="buttons" v-for="(p, index) in placement" :key="index">
                <button class="purchaseButton"
                  v-if="p.playerId===null"
                  :disabled="cannotAfford(p.cost)"
                  @click="placeBottle(p)" >
                  ${{p.cost}}
                </button>
                <div v-if="p.playerId !== null">
                  {{p.playerId}}
                </div>
              </div>
            </div>
          </div>
          <div class="backToBoard">
            <button href="#" class = "playerboardButton" @click="closeNav()">{{labels.backplayerboard}}</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsBuySkill',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    skillsOnSale: Array,
    placement: Array,
    isPlacedList: Object,
    playerCount: Number
  },

  methods: {
    cannotAfford: function (cost) {
      return this.player.money<cost;
    },
    placeBottle: function (p) {
      if(this.isPlacedList.item===true || this.isPlacedList.market===true
        || this.isPlacedList.skill===true || this.isPlacedList.auction===true
        || this.isPlacedList.getIncome===true|| this.isPlacedList.getIncome2===true){
          return
        }
      if(this.player.myTurn===false){
        return
      }
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);

    },
    highlightAvailableCards: function (cost=100) {
      if(this.player.myTurn === true && this.player.energyBottles > 0){
        for (let i = 0; i < this.skillsOnSale.length; i += 1) {
          this.$set(this.skillsOnSale[i],'available',true);
          this.chosenPlacementCost=cost;
        }
        for (let i = 0; i< this.player.hand.length; i += 1 ){
          this.$set(this.player.hand[i], 'available',true);
          this.chosenPlacementCost=cost;
        }
      }
    },


    buySkill: function (card) {
      if (card.available) {

        this.$emit('buySkill', card)
        this.highlightAvailableCards()
      }console.log(this.skillsOnSale);
      console.log(card.item);
    },

    openNav: function(){
      document.getElementById('navBuySkill').style.height = "100%";
    },
    closeNav: function(){
      document.getElementById('navBuySkill').style.height = "0%";
    },
    cancelAction: function(){
      this.$emit('cancelAction')
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cancelButton{
  position: fixed;
  height: 6vh;
  width: 6vh;
  z-index: 100;
}

.arrowGrid{
  grid-column: 2;
  grid-row: 3;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 100%;
  text-align: center;
}

.arrow {
border: solid black;
border-width: 0 3px 3px 0;
display: inline-block;
padding: 3px;
}

.down {
transform: rotate(45deg);
-webkit-transform: rotate(45deg);
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}


  .buy-skills {
    grid-row: 1;
    grid-column: 2;
    display:grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows:100%;
  }

  .CollectorsBuySkill{
    height: 100%;
    width: 100%;
    border-radius: 1em;
    border: 5px solid #fff;
    background-color: rgb(69, 179, 157);
  }

  .buttons{
    border: 0.1em solid white;
    background-color: green;
    width: 80%;
    height: 80%;
    border-radius: 5rem;
    text-align: center;


    /*display: grid;
    grid-template-columns: repeat(auto-fill, 100px);*/
  }

  .buttonWrapper .buttons button{
    outline: none;
  }

  .buttons{
    outline: none;
  }

  .buttons button{
    outline: none;
    height: 80%;
    width: 80%;
    border-radius: 2em;
    padding: 2%
  }
  .buttons button:hover{
    background-color: rgb(220, 220, 220);
  }

  .buttonWrapper .buttons:hover{
    background-color: forestGreen;
    cursor: pointer;
    box-shadow: 0.05em 0.1em 0.21em 0.05em darkgray;
  }




  .red{
    background-color: crimson;

  }

  .buttonWrapper .red:hover{
    background-color: tomato;
  }

  .smallPurchaseButtonBuySkill:hover{
    cursor: pointer;
  }


  .buttonWrapper{
    margin-left: 5%;
    position: relative;
    border-radius: 1rem;
    border: 0.01rem solid white;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 33% 33% 33%;
    grid-column: 1;
    grid-row: 2/4;
    width: 85%;
    height: 85%;
    background-color:rgb(17, 122, 101);
  }

  .smallPurchaseButtonBuySkill{
    border-radius: 2rem;
    background-color: transparent;
    border: none;
    padding: 0.1rem;
    color: white;
  }

  .gridWrapper{
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 30% 55% 15%;
  }


  .openButton{
    max-height: 100%;
    min-width: 90%;
    grid-column: 1;
    grid-row: 1;
    padding: 5%;
    cursor: pointer;
    margin: 3%;
    border-radius: 2em;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: transparent;
    Letter-spacing: 10%;
    text-transform: uppercase;
    font-family: "sans", serif;
    padding: 5%;
    border-color: white;
    border-width: 0.2em;
    font-weight: bold;
    z-index: 3;
    position: relative;
    justify-content: center;
    outline: none;
  }

  .openButton img{
    grid-area: openButtonLeft;
    /*padding: 5%;*/
    height: 100%;
    width: 100%
  }
  .openButton span{
    grid-area: openButtonRight;
    text-align: center;
  }


  .openSkills {
  color: rgb(17, 122, 101);
  }

  /*.openSkills>img {
    height: 98%;
    width: 30%;
  }*/

  .openSkills:hover {
    background-color: rgb(159, 223, 190);
    border-color: black;
  }

  .overlay{
    position: fixed;
    width: 100%;
    height:0%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.7);
    overflow-x: hidden;
    z-index: 6;
    transition: all 0.5s;
  }

  .overlayLayout{
    height: 80%;
    width: 80%;
    background-color: rgb(69, 179, 157);
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
    border-radius: 2em;
    display: grid;
    grid-template-columns: 15% 60% 25%;
    grid-template-rows: 15% 75% 10%;
    grid-template-areas:
    "button cardstext buyaction"
    "cards cards buyaction"
    "empty backToBoard buyaction";
  }

  /* kan nog tas bort
  .overlay .buy-skillsWrapper{
    height: 100%;
    width: 100%;
    grid-area: cards;
    display: grid;
    grid-template-rows: 15% 85%;
    grid-template-columns: 100%;
    grid-template-areas:
    "text"
    "availableCards";
  }*/

  .overlay .buy-skillsWrapper h1{
    grid-area: cardstext;
    text-align: center;
  }
  .overlay .buy-skillsWrapper .buy-skills{
    grid-area: cards;
    align-items:center;
  }

  /*kan nog tas bort
    .overlay .openButtonWrapper{
    grid-area: button;
    display: grid;
    grid-template-rows: 15% 85%;
    grid-template-areas:
    "topLeft"
    "bottomLeft";
  }*/


  .overlay .openButtonWrapper .openButton{
    /*grid-area: topLeft;*/
    /*grid-area: button;*/
    margin-left: 10%;
    margin-top: 10%;
    width: 80%;
    height: 80%;
    align-items: center;
  }

  .overlay .openButtonWrapper .openButton button{
    /*grid-area: openButtonWrappertopLeft;*/
    grid-area: button;
    object-fit: contain;
  }

  .overlay .paymentWrapper{
    grid-area: buyaction;
    border-left: dotted white;
    display: grid;
    grid-template-rows: 15% 85%;
    grid-template-areas:
    "textPayment"
    "payment";
  }
  .overlay .paymentWrapper h2{
    grid-area: textPayment;
    text-align: center;
  }
  .overlay .paymentWrapper .buttonsOverlayWrapper{
    grid-area: payment;
    display: grid;
    margin-left: 10%;
    grid-template-rows: repeat(5,20%);
  }

  .overlay .paymentWrapper .buttonsOverlayWrapper .buttons{
    width: 80%;
    height: 60%;
    border-radius: 5rem;
  }



  .overlay .paymentWrapper .buttonsOverlayWrapper .buttons button{
    height: 100%;
    width: 100%;
    border-radius: 5rem;
  }

  .overlay .backToBoard{
    right: 50%;
    margin-bottom: 10%;
    transform: bottom;
    grid-area: backToBoard;
  }
  .overlay .backToBoard button{
    right: 50%;
    transform: bottom;
    border-radius: 2em;
    padding: 3%;
    margin-bottom: 3%;
    margin-left: 45%;
  }
  .overlay .backToBoard button:hover{
    background-color: rgb(220, 220, 220);
  }

  .cardDiv:hover{
    z-index: 2;
  }

  /*.overlay .buy-skills .cardWrapper{

    transform-origin: top left;
    transition: 0.2s;
  }*/

  /*.overlay .buy-skills .cardWrapper:hover~.cardWrapper{
    transform: translateX(100px);
  }*/

  .overlay__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
  /*  margin-top: 30px;*/
  }
  .overlay a{
    padding: 3%;
    color: white;
    display: block;
  }

  .buttonWrapper>div{
    height: 100%;
    width: 100%;
  }

  .overlay .closeButton{
    position: absolute;
    top: 2%;
    right: 3%;
    font-size: 300%;
  }

  .theButton{
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: 40% 60%;
    grid-template-rows: 100%;
    grid-template-areas:
    "openButtonLeft openButtonRight";
  }

  /*.theButton>img{
    object-fit: contain;
  }*/


  @media all and (max-width:1200px){
    .theButton{
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      grid-template-areas:
      "openButtonLeft openButtonRight";
    }

    .theButton>img{
      display: none;
    }

    .theButton>span{
      grid-column: 1;
    }
      /*visibility: hidden;*/
  }


  /* Den svåra delen! Nu ska vi flytta alla kort som är till
  höger om det kortet som är hover:ed
  .card:hover~.card targetar all the elements that are siblings
  that come after it (the hovered card) with the card class.
  ~ is called the general sibling combinator and it targets
  all the children after the element, but not the element itself
  or any of the siblings before it

  transform: translateX(130px) flyttar helt enkelt alla targeted
  cards 130px höger (framåt i x-direction)*/
  /*.cardDiv{
    transition: 0.2s;
    height: 350px;
    width: 250px;
    transform: scale(0.4);
    transform-origin: top left;
  }

  .cardDiv:hover{
    transform: translateY(-1rem);
    transform: scale(0.5);
  }*/

  /*.cardDiv:hover~.cardDiv{
      transform: scale(0.4) translateX(70px);
  }*/

  @media all and (max-width:500px){
    .gridWrapper{
      display: grid;
      grid-template-columns: 33% 67%;
      grid-template-rows: 30% 70%;
    }
  }

</style>
