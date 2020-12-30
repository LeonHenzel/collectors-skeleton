<template>
    <div class="CollectorsBuySkill">
      <button href="#" class = "openButton openSkills" @click="openNav()">
        <img src="https://static.thenounproject.com/png/225624-200.png" width="40" height="40">
        Skills
      </button>
      <!--<h1>{{ labels.buySkill }}</h1>-->
      <div class="buy-skills">
        <div class="cardDiv" v-for="(card, index) in skillsOnSale" :key="index">
          <CollectorsCard
            :card="card"
            :availableAction="card.available"
            @doAction="buySkill(card)"/>
        </div>
      </div>
      <div>
        <div class="buttons" v-for="(p, index) in placement" :key="index">
          <button
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
      <div class="overlay" id="nav">
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
                <div v-for="(card, index) in skillsOnSale" :key="index" title= "These are skills-card on sale">
                  <CollectorsCard
                    :card="card"
                    :availableAction="card.available"
                    @doAction="buySkill(card)"/>
                </div>
              </div>
            </div>
            <div class="buttonsWrapper">
              <h2>Choose your payment.</h2>
              <div class="buttons" v-for="(p, index) in placement" :key="index">
                <button
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
    placement: Array
  },

  methods: {
    cannotAfford: function (cost) {
      return this.player.money<cost;
    },
    placeBottle: function (p) {
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
      }
    },

    openNav: function(){
      document.getElementById('nav').style.height = "100%";
    },
    closeNav: function(){
      document.getElementById('nav').style.height = "0%";
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-skills {
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
  }

  .buttons{
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    margin: 5px;
  }

  .buttons button{
    border-radius: 2em;
    padding: 10px;
  }
  .buttons button:hover{
    background-color: rgb(220, 220, 220);
  }


  .openButton{
    /*position: relative;*/
    bottom: 18px;
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
    z-index: 5;
    transition: all 0.5s;
  }

  .overlayLayout{
    background-color: rgb(69, 179, 157);
    margin: 100px;
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
    "bottomLeft"
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
    "payment"
  }
  .overlay .buttonsWrapper h2{
    grid-area: textPayment;
    text-align: center;
  }

  .overlay .buttonsWrapper .buttons{
    grid-area: payment;
    margin-left: 30px;
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


  .overlay__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .overlay a{
    paddin: 10px;
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
  }

  .cardDiv:hover~.cardDiv{
      transform: translateX(130px);
  }

</style>
