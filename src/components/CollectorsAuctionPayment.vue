<template>
    <div>
      <div class="auction-payment-cards">
        <div class="cardDiv" v-for="(card, index) in auctionPayment" :key="index" @click="doAction(card)">
          <CollectorsCard 
            class="auction-payment-card"
            :card="card" 
            :availableAction="card.available"/>
            <div class="cardWorthText"> 
            This card is worth {{ cardAuctionWorth(index) }} coin(s)
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
    auctionPayment: Array
  },
  methods: {
    doAction: function(card) {
      this.$emit('doAction', card);
    },
    cardAuctionWorth: function (index) {
    //   return this.marketValues[card.market];
      return this.auctionPayment[index].auctionWorth
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .auction-payment-cards, .buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
  }
  .auction-payment-card, .buttons {
    transform: scale(0.75)translateX(-10%)
  }
  .cardWorthText{
    transform: translateX(5%)translateY(-90%)
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

  .cardDiv:hover{
      transform: scale(0.85);
      z-index: 1;
  }

  .cardDiv:hover .cardWorthText{
      color:crimson;
      font-weight: bold;
      width: 250px;
      transform: translateX(5%)translateY(-50%)
  }

  /* .cardDiv:hover~.cardDiv{
      transform: translateX(130px);
  } */
</style>
