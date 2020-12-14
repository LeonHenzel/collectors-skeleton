<template>
    <div>
      <h1>{{ labels.startAuction }}</h1>
      <div class="auction-cards">
        <div class="cardDiv" v-for="(card, index) in auctionCards" :key="index">
          <CollectorsCard 
            :card="card" 
            :availableAction="card.available" 
            @doAction="startAuction(card)"/>
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
    </div>
</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsStartAuction',
  components: {
    CollectorsCard
  },
  props: {
    labels: Object,
    player: Object,
    auctionCards: Array,
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
      if(this.player.myTurn === true && this.player.energyBottles > 0){
        for (let i = 0; i < this.auctionCards.length; i += 1) {
            if (this.marketValues[this.auctionCards[i].item] <= this.player.money - cost) {
            this.$set(this.auctionCards[i], "available", true);
            }
            else {
            this.$set(this.auctionCards[i], "available", false);
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
      }
    },
    startAuction: function (card) {
      if (card.available) {
        this.$emit('startAuction', card)
        this.highlightAvailableCards()
      }
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .auction-cards, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
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
