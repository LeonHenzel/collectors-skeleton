<template>
    <div class="CollectorsBuyAction">
      <div class="gridWrapper">
        <button href="#" class = "openButton" @click="openNav()">items
          <img src="https://cdn4.iconfinder.com/data/icons/agile-5-black-fill/64/agile-5-_Black_fill-03-512.png" height="30" width="30">
        </button>
        <div class="buy-cards">
          <div class="cardDiv" v-for="(card, index) in itemsOnSale" :key="index">
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="buyCard(card)"/>
            {{ cardCost(card) }}
          </div>
        </div>
        <div class="buttonWrapper">
          <div :class="['buttons', {'red':p.cost>0}]" v-for="(p, index) in placement" :key="index">
            <button id="smallPurchaseButton"
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



      <div class="overlay" id="nav">
        <a href="#" class="closeButton" @click="closeNav()">&times;</a>
        <h3> Cards on sale </h3>
        <div class="buy-cards">
          <div class="cardDiv" v-for="(card, index) in itemsOnSale" :key="index">
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="buyCard(card)"/>
            {{ cardCost(card) }}
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
        <button href="#" class = "playerboardButton" @click="closeNav()">Back to playerboard </button>
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
    placement: Array
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
  .CollectorsBuyAction{
    height: 22.5vh;
    background-color: rgb(236, 112, 99);
  }

  .gridWrapper{
    display: grid;
    height: 22.5vh;
    grid-template-columns: 25% 75%;
    grid-template-rows: 25% 75%;
  }

  .buy-cards{
    grid-column: 2
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

  .buttonWrapper .buttons{
    border: 1px solid white;
    margin: 2px;
    background-color: green;
    width: 20px;
    height: 20px;
    border-radius: 5rem;
    transform: scale(1.4);
    margin-bottom: 1rem;
  }

  .red{
    background-color: red;
  }

  #smallPurchaseButton{
    height: 20px;
    width: 20px;
    background-color: transparent;
    border-radius: 2rem;
    border: none;
    padding: 0.1rem;
    color: white;
  }

  #smallPurchaseButton:hover{
    cursor: pointer;
  }

  .buy-cards, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
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
    color: rgb(176, 58, 46);
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

  .openButton:hover{
    background-color: rgb(255, 173, 153);
    border-color: black;
    cursor: pointer;
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
</style>
