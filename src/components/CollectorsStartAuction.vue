<template>
    <div class="auctionLayout">
      <div class="auctionLayoutTitleWrapper">
        <!--<h3>{{ labels.startAuction }}</h3>-->
        <button href="#" class = "openButton openAuctionGridButton" > <!--@click="expandAuctionGrid()" öppna auction vid klick-->
          <img src="https://www.freeiconspng.com/thumbs/gavel-icon/gavel-icon-1.png"  height="40px" width="30px">
          {{labels.auction}}
        </button>
      </div>
      <div class="auctionLayoutContentWrapper">
        <div class="auction-cards">
          <div class="cardDiv" v-for="(card, index) in auctionCards" :key="index">
            <CollectorsCard
              :card="auctionCards[auctionCards.length-1-index]"
              :availableAction="auctionCards[auctionCards.length-1-index].available"
              @doAction="startAuction(auctionCards[auctionCards.length-1-index])"/>
          </div>
        </div>

        <div class="arrowGrid">
          <div v-for="(card, index) in auctionCards" :key="index">
            <div class="arrow right" v-if="index!==3">
            </div>
            <div class="arrow down" v-else>
            </div>
          </div>
        </div>

        <div class="bu">

        </div>
        <button type="submit" class="cancelButton" v-if="isPlacedList.auction && player.myTurn" @click="cancelAction()">{{labels.cancelAction}}</button>
        <div class="buttonDiv" v-if="!isPlacedList.auction || !player.myTurn">
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
      console.log(card.item);
      if (card.available) {
        this.$emit('startAuction', card)
        this.highlightAvailableCards()
      }
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
  height: 60%;
  width: 80%;
  margin: 10%;
  z-index: 100;
  grid-column: 1;
  grid-row: 3;
}

  .arrowGrid{
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;
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


  .auctionLayout{
    width: 100%;
    height: 100%;
    /*grid-row: 2;
    grid-column: 1;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; kan nog tas bort*/
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 20% 80%;
    grid-template-areas:
    "auctionLayoutTop"
    "auctionLayoutBottom";
  }


  .auctionLayoutTitleWrapper {
    padding: 5%;
    color: transparent;
    grid-area: auctionLayoutTop;
  }

  .openButton{
    position: relative;
    top: 0;
    /*cursor: pointer;*/
    margin: 2px;
    border-radius: 28px;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: transparent;
    Letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 120%;
    font-family: "sans", serif;
    padding: 5px;
    border-color: white;
    border-width: 2px;
    font-weight: bold;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .openButton img{
    padding: 5%;
  }

  .openAuctionGridButton {
  color: rgb(155, 89, 182);
  height: 7vh;
  width: 70%;
  text-align: center;
  }

  .openAuctionGridButton img{
  height: 5vh;
  width: 5vh;
  }

  .auctionLayoutContentWrapper{
    grid-area: auctionLayoutBottom;
    display: grid;
    grid-template-rows: 60% 15% 25%;
    grid-template-areas:
    "auctionLayoutContentWrapperTop"
    "auctionLayoutContentWrapperBottom";
  }

  .auction-cards{
    grid-area: auctionLayoutContentWrapperTop;
    margin-top: 5%;
    /*margin-left: 5%;*/
    margin-right: 10%;
    margin-bottom: 5%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: 90%;

  }

  .buttonDiv{
    grid-row: 3;
    display: grid;
    flex-direction: row;
    grid-template-columns: repeat(4,25%);
    grid-template-rows: 100%;

  }

  .buttonDiv .buttons{
    width: 80%;
    height: 80%;

  }

  .buttons button{
    border: 0.1em solid white;
    background-color: green;
    width: 100%;
    height: 100%;
    padding: 0.1%;
    border-radius: 5rem;
    text-align: center;
    color: white;
    /*background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);
    background: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);*/

  }
  .buttons button:hover{
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


  /* detta funkade inte bra när man startar auction så att ett kort försvinner. Korthögen hoppade längre och längre till vänster */
  /* .cardDiv:not(:first-child){
    margin-left: -100px;
  } */

  .cardDiv{
    height: 100%;
    width: 100%;
    transition: 0.2s;

  }

  .cardDiv div{
    position: absolute;
  }

  /*.cardDiv:hover{
    transform: scale(1.2) translateY(2rem);
    z-index: 20000000000;
  }*/

  /*.cardDiv:hover~.cardDiv{
      transform: translateX(2rem);
  }*/

  /*@media screen and (max-width: 1400px) {
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
  }*/



    @media all and (max-width:500px){


      .auctionLayout>h3{
        color: transparent;
        user-select: none;
      }

      /*.auction-cards{
        margin-left: 0px;
        margin-top: 0px;
        grid-row: 2;
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
      }*/

      /*.cardDiv{
        transition: 0.2s;
        transform: scale(0.2);
      }*/

      .openButton{
      font-size: 75%;
      margin: 0px;
      border-radius: 10px;
      }


      .openButton img{
        visibility: hidden;
      }
    }

</style>
