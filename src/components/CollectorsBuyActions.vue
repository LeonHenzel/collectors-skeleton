<template>
    <div>
      <h1>{{ labels.buyCard }}</h1>
      /*test shop button start*/
      <h3> Click to show cards on sale </h3>
      <button @click="togglePopup"> Show cards on sale </button>
      <div class="fullScreenPopup hidden">
        <div class = "centerPopupContent"><h3> Cards on sale </h3></div>
      /*test shop button end*/
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
        /*test shop button start*/
        <h3> Click to go back to playerboard</h3>
        <button @click="togglePopup"> Show playerboard </button>
        /*test shop button end*/
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
    /*test shop button start*/
    togglePopup: function(){
      /*test shop button start*/
      const popup = document.querySelector('.fullScreenPopup');
      /*test shop button end*/
      popup.classList.toggle('hidden');
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
    justify-content: center; /*lite problem med denna*/
  }

  .fullScreenPopup{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left:0;
    background-color: rgba(0,0,0,0.7);
    color: white;
  }

  .centerPopupContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

.hidden{
  display: none;
}

</style>
