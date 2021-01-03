<template>
    <div class="auctionLayout">
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
      <div class="buttonDiv">
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

  .auctionLayout{
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .auctionLayout h1{
    margin-left:20px;
  }

  .buttonDiv{
    margin-left: 30px;
    margin-top: -70px;
    display: flex;
    flex-direction: row;
  }

  .buttons{
    display: flex;
  }

  .buttons button{
    border-radius: 8px;
    width: 80px;
    height: 50px;
    background: #833ab4;
    background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);
    background: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);

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
  .auction-cards{
    margin-left: -40px;
    margin-top: -70px;
    display: grid;
    grid-template-columns: 130px 130px 130px 130px 130px 130px 130px;
    transform: scale(0.5);
  }

  /* detta funkade inte bra när man startar auction så att ett kort försvinner. Korthögen hoppade längre och längre till vänster */
  /* .cardDiv:not(:first-child){
    margin-left: -100px;
  } */

  .cardDiv{
    transition: 0.2s;
  }

  .cardDiv:hover{
    transform: scale(1.8) translateY(50px);
    z-index: 20000000000;
  }

  .cardDiv:hover~.cardDiv{
      transform: translateX(100px);
  }

  @media screen and (max-width: 1400px) {
    .auctionLayout{
      transform: scale(0.8);
      margin-top: -30px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-width: 1200px) {
    .auctionLayout{
      transform: scale(0.7);
    }
    .auction-cards{
    margin-left: -20px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-width: 1100px) {
    .auctionLayout{
      transform: scale(0.6);
    }
    .auction-cards{
    margin-left: 10px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-width: 900px) {
    .auctionLayout{
      transform: scale(0.5);
      margin-left: 10px;
    }
    .auction-cards{
    margin-left: 10px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-width: 800px) {
    .auctionLayout{
      transform: scale(0.4);
      margin-left: 10px;
    }
    .auction-cards{
    margin-left: 10px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }


  @media screen and (max-height: 910px) {
    .auctionLayout{
      transform: scale(0.9);
      margin-top: -25px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }  
  
  @media screen and (max-height: 880px) {
    .auctionLayout{
      transform: scale(0.8);
      margin-top: -25px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-height: 800px) {
    .auctionLayout{
      transform: scale(0.7);
      margin-top: -40px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-height: 720px) {
    .auctionLayout{
      transform: scale(0.6);
      margin-top: -70px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-height: 595px) {
    .auctionLayout{
      transform: scale(0.55);
      margin-top: -75px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-height: 580px) {
    .auctionLayout{
      transform: scale(0.5);
      margin-top: -90px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

  @media screen and (max-height: 500px) {
    .auctionLayout{
      transform: scale(0.4);
      margin-top: -110px;
    }
    .buttonDiv{
      margin-left:20px
    }
  }

</style>
