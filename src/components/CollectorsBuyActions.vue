<template>
    <div>
      <h1>{{ labels.buyCard }}</h1>
      <!--test shop button start, ett popup fönster-->
      <h3> Click to show cards on sale </h3>
      <div id="nav" class ="overlay">
        <a href="#" class="closeButton" @click="closeNav()">&times;</a>
        <h3> Cards on sale </h3>
        <div class="buy-cards">
          <div v-for="(card, index) in itemsOnSale" :key="index">
            <CollectorsCard
              :card="card"
              :availableAction="card.available"
              @doAction="buyCard(card)"/>
            {{ cardCost(card) }}
          </div>
        </div>
        <div class= "centerPopupContent">
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
    <button href="#" class = "openButton" @click="openNav()">Show cards on sale </button>
  </div>
  <!-- test shop button end -->
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
    /*test shop button start, functioner som öppnar popup fönstret*/
    openNav: function(){
      document.getElementById('nav').style.height = "100%";
    },
    closeNav: function(){
      document.getElementById('nav').style.height = "0%";
    }
    /*test shop button end*/
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-cards, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    justify-content: center;
  }

/*test shop button start, här finns styling för popup*/
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
  /*test shop button end*/

</style>
