<template>
    <div class="CollectorsBuyAction">
      <div class="gridWrapper">
        <div class="openButtonWrapper">
          <button href="#" class = "openButton openItems" @click="openNav()">
            <img src="https://cdn4.iconfinder.com/data/icons/agile-5-black-fill/64/agile-5-_Black_fill-03-512.png" height="40" width="40">
            Items
          </button>
        </div>
        <div class="buy-cards">
          <div class="cardDiv" v-for="(card, index) in itemsOnSale" :key="index">
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="buyCard(card)"/>
            <!--{{ cardCost(card) }}-->
          </div>
        </div>
        <div class="buttonWrapper">
          <div :class="['buttons', {'red':p.cost!==0}]" v-for="(p, index) in placement" :key="index">
            <button id="smallPurchaseButtonBuyActions"
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



      <div class="overlay" id="navBuyActions">
        <a href="#" class="closeButton" @click="closeNav()">&times;</a>

        <div class="overlayLayout">
          <div class="openButtonWrapper">
            <button href="#" class = "openButton openItems" @click="closeNav()">
              <img src="https://cdn4.iconfinder.com/data/icons/agile-5-black-fill/64/agile-5-_Black_fill-03-512.png" height="40" width="40">
              Items
            </button>
          </div>
          <div class="buy-cardsWrapper">
            <h1>These cards are available!</h1>
            <div class="buy-cards">
              <div class="cardDiv" v-for="(card, index) in itemsOnSale" :key="index">
                <CollectorsCard
                  :card="card"
                  :availableAction="card.available"
                  @doAction="buyCard(card)"/>
                {{ cardCost(card) }}
              </div>
            </div>
          </div>

          <div class="paymentWrapper">
            <h2>Choose your payment.</h2>
            <div class="buttonsWrapper">
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
  name: 'CollectorsBuyActions',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    itemsOnSale: Array,
    marketValues: Object,
    placement: Array,
    isPlacedList: Object
  },
  methods: {
    cannotAfford: function (cost) {
      let minCost = 100;
      for(let key in this.marketValues) {
        if (cost + this.marketValues[key] < minCost)
          minCost = cost + this.marketValues[key]
      }
      return (this.player.money < minCost);
    },
    cardCost: function (card) {
      return this.marketValues[card.market];
    },
    placeBottle: function (p) {
      if(this.isPlacedList.item===true || this.isPlacedList.market===true
        || this.isPlacedList.skill===true || this.isPlacedList.auction===true
        || this.isPlacedList.getIncome===true|| this.isPlacedList.getIncome2===true){
          return
        }
      this.$emit('placeBottle', p.cost);
      this.highlightAvailableCards(p.cost);

    },

    highlightAvailableCards: function (cost=100) {
      for (let i = 0; i < this.itemsOnSale.length; i += 1) {
        if (this.marketValues[this.itemsOnSale[i].item] <= this.player.money - cost) {
          this.$set(this.itemsOnSale[i], "available", true);
        }
        else {
          this.$set(this.itemsOnSale[i], "available", false);
        }
        this.chosenPlacementCost = cost;
      }
      for (let i = 0; i < this.player.hand.length; i += 1) {
        if (this.marketValues[this.player.hand[i].item] <= this.player.money - cost) {
          this.$set(this.player.hand[i], "available", true);
          this.chosenPlacementCost = cost;
        }
        else {
          this.$set(this.player.hand[i], "available", false);
          this.chosenPlacementCost = cost;
        }
      }
    },

    buyCard: function (card) {
      if (card.available) {
        this.$emit('buyCard', card)
        this.highlightAvailableCards()
      }
    },

    openNav: function(){
      document.getElementById('navBuyActions').style.height = "100%";
    },
    closeNav: function(){
      document.getElementById('navBuyActions').style.height = "0%";
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .buy-cards {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-column: 2;
  }

  .CollectorsBuyAction {
    height: 22.5vh;
    border: none;
    background-color: rgb(236, 112, 99);
  }

  .buttons {
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

  #smallPurchaseButtonBuyActions{
    height: 20px;
    width: 20px;
    background-color: transparent;
    border-radius: 2rem;
    border: none;
    padding: 0.1rem;
    color: white;
  }

  #smallPurchaseButtonBuyActions:hover{
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

  .gridWrapper{
    display: grid;
    height: 22.5vh;
    grid-template-columns: 25% 75%;
    grid-template-rows: 25% 75%;
  }

  .openButton{
    transform: scale(0.8);
    transform-origin: top left;
    max-height: 60px;
    min-width: 100px;
    grid-column: 1;
    grid-row: 1;
    cursor: pointer;
    margin: 3%;
    border-radius: 28px;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: rgb(176, 58, 46);
    Letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 23px;
    font-family: "sans", serif;
    padding: 5%;
    border-color: white;
    border-width: 2px;
    font-weight: bold;
    z-index: 3;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .openButton img{
    padding: 5%;
  }

  .openItems{
    color: rgb(17, 122, 101);
    }

  .openItems:hover {
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
    background-color: rgb(236, 112, 99);
    margin: 10%;
    border-radius: 2em;
    display: grid;
    grid-template-columns: 15% 60% 25%;
    grid-template-rows: 90% 10%;
    grid-template-areas:
    "button cards buyaction"
    "button backToBoard buyaction";
  }

  .overlay .buy-cardsWrapper{
    grid-area: cards;
    border-right: dotted white;
    grid-template-rows: 5% 95%;
    grid-template-areas:
    "text"
    "availableCards";
  }
  .overlay .buy-cardsWrapper h1{
    grid-area: text;
    text-align: center;
  }
  .overlay .buy-cardsWrapper .buy-cards{
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
    margin-left:10%;
    margin-top:10%;
  }

  .overlay .paymentWrapper{
    grid-area: buyaction;
    grid-template-rows: 5% 95%;
    grid-template-areas:
    "textPayment"
    "payment";
  }
  .overlay .paymentWrapper h2{
    grid-area: textPayment;
    text-align: center;
  }

  .overlay .paymentWrapper .buttonsWrapper{
    grid-area: payment;
  }

  .overlay .paymentWrapper .buttonsWrapper .buttons{
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
    cursor: pointer;
  }

  .overlay .buy-cards .cardWrapper{
    transform-origin: top left;
    transition: 0.2s;
  }

  .overlay .buy-cards .cardWrapper:hover~.cardWrapper{
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
    background-color:rgb(176, 58, 46);
  }

  .buttonsWrapper .buttons{
    border: 1px solid white;
    margin: 2px;
    background-color: green;
    width: 20px;
    height: 20px;
    border-radius: 5rem;
    transform: scale(1.4);
    margin-bottom: 1rem;
  }

  .buttons .red{
    background-color: red;
  }

  .openButton:hover{
    background-color: rgb(255, 173, 153);
    border-color: black;
    cursor: pointer;
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
    cursor: pointer;
  }

  .cardDiv:hover~.cardDiv{
      transform: translateX(40px) scale(0.4);
  }

</style>
