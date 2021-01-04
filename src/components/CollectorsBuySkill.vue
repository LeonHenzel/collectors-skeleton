<template>
    <div class="CollectorsBuySkill">
      <div class="gridWrapper">
        <button href="#" title="Expands with more info" class="openButton openSkills" @click="openNav()">
          <img src="https://static.thenounproject.com/png/225624-200.png" width="40" height="40">
          Skills
        </button>
        <div class="buy-skills">
          <div class="cardDiv" v-for="(card, index) in skillsOnSale" :key="index">
            <CollectorsCard
              :card="skillsOnSale[skillsOnSale.length-1-index]"
              :availableAction="skillsOnSale[skillsOnSale.length-1-index].available"
              @doAction="buySkill(skillsOnSale[skillsOnSale.length-1-index])"/>
          </div>
        </div>
        <div class="buttonWrapper">
          <div :class="['buttons', {'red':p.cost!==0}]" v-for="(p, index) in placement" :key="index">
            <button id="smallPurchaseButtonBuySkill"
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
                Skills
              </button>
            </div>
            <div class="buy-skillsWrapper">
              <h1>These cards are available!</h1>
          <div class="buy-skills">
            <div class="cardWrapper" v-for="(card, index) in skillsOnSale" :key="index">
              <CollectorsCard
              :card="skillsOnSale[skillsOnSale.length-1-index]"
              :availableAction="skillsOnSale[skillsOnSale.length-1-index].available"
              @doAction="buySkill(skillsOnSale[skillsOnSale.length-1-index])"/>
            </div>
            </div>
          </div>
          <div class="buttonsWrapper">
              <h2>Choose your payment.</h2>
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
          <div class="backToBoard">
            <button href="#" class = "playerboardButton" @click="closeNav()">Back to playerboard </button>
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
    isPlacedList: Object
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
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-skills {
    margin-top: 10px;
    grid-column: 2;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
  }

  .CollectorsBuySkill{
    height: 23vh;
    border: none;
    background-color: rgb(69, 179, 157);
  }

  .buttons{
    border: 1px solid white;
    margin: 5px;
    background-color: green;
    width: 20px;
    height: 20px;
    border-radius: 5rem;
    transform: scale(1.4);
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
  }

  .buttons button{
    border-radius: 2em;
    padding: 10px;
  }
  .buttons button:hover{
    background-color: rgb(220, 220, 220);
  }


  .red{
    background-color: red;
  }

  #smallPurchaseButtonBuySkill:hover{
    cursor: pointer;
  }


  .buttonWrapper{
    position: relative;
    top: 1rem;
    padding-left: 5px;
    padding-top: 5px;
    border-radius: 1rem;
    border: 2px solid white;
    margin-left: 0.5rem;
    margin-top: 0.1rem;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 33% 33% 33%;
    grid-column: 1;
    grid-row: 2;
    width: 100px;
    height: 90px;
    background-color:rgb(17, 122, 101);
  }

  #smallPurchaseButtonBuySkill{
    border-radius: 2rem;
    background-color: transparent;
    border: none;
    padding: 0.1rem;
    color: white;
  }

  .gridWrapper{
    height: 22.5vh;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 30% 70%;
  }


  .openButton{
    transform: scale(0.8);
    transform-origin: top left;
    max-height: 60px;
    min-width: 100px;
    grid-column: 1;
    grid-row: 1;
    padding: 3px;
    cursor: pointer;
    margin: 2px;
    border-radius: 28px;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: transparent;
    Letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 23px;
    font-family: "sans", serif;
    padding: 5px;
    border-color: white;
    border-width: 2px;
    font-weight: bold;
    z-index: 3;
  }

  .openSkills {
  color: rgb(17, 122, 101);
  }

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
    background-color: rgb(69, 179, 157);
    margin: 10%;
    border-radius: 2em;
    display: grid;
    grid-template-columns: 15% 60% 25%;
    grid-template-rows: 90% 10%;
    grid-template-areas:
    "button cards buyaction"
    "button backToBoard buyaction";
  }

  .overlay .buy-skillsWrapper{
    grid-area: cards;
    border-right: dotted white;
    grid-template-rows: 5% 95%;
    grid-template-areas:
    "text"
    "availableCards";
  }
  .overlay .buy-skillsWrapper h1{
    grid-area: text;
    text-align: center;
  }
  .overlay .buy-skillsWrapper .buy-skills{
    grid-area: availableCards;
    align-items:center;
  }

  .overlay .openButtonWrapper{
    grid-area: button;
    grid-template-rows: 5% 95%;
    grid-template-areas:
    "topLeft"
    "bottomLeft";
  }

  .overlay .openButtonWrapper .openButton{
    grid-area: "topLeft";
    margin-left:10px;
    margin-top:10px;
  }

  .overlay .buttonsWrapper{
    grid-area: buyaction;
    grid-template-rows: 5% 95%;
    grid-template-areas:
    "textPayment"
    "payment";
  }
  .overlay .buttonsWrapper h2{
    grid-area: textPayment;
    text-align: center;
  }

  .overlay .buttonsWrapper .buttons{
    grid-area: payment;
    margin-left: 15%;
    margin-bottom: 15%;
  }

  .overlay .backToBoard{
    right: 50%;
    border-right: dotted white;
    transform: bottom;
    grid-area: backToBoard;
  }
  .overlay .backToBoard button{
    right: 50%;
    transform: bottom;
    border-radius: 2em;
    padding: 10px;
    margin-bottom: 5px;
    margin-left: 45%;
  }
  .overlay .backToBoard button:hover{
    background-color: rgb(220, 220, 220);
  }

  .overlay .buy-skills .cardWrapper{

    transform-origin: top left;
    transition: 0.2s;
  }

  .overlay .buy-skills .cardWrapper:hover~.cardWrapper{
    transform: translateX(100px);
  }

  .overlay__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .overlay a{
    padding: 10px;
    color: white;
    display: block;
  }

  .overlay .closeButton{
    position: absolute;
    top: 20px;
    right: 50px;
    font-size: 40px;
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
  .cardDiv{
    transition: 0.2s;
    height: 350px;
    width: 250px;
    transform: scale(0.4);
    transform-origin: top left;
  }

  .cardDiv:hover{
    transform: translateY(-1rem);
    transform: scale(0.5);
  }

  .cardDiv:hover~.cardDiv{
      transform: scale(0.4) translateX(70px);
  }

</style>
