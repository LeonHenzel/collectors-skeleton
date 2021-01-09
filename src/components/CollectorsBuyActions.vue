<template>
    <div class="CollectorsBuyAction">
      <div class="gridWrapper">
        <button type="submit" class="cancelButton" v-if="isPlacedList.item && player.myTurn" @click="cancelAction()"></button>
        <div class="openButtonWrapper">
          <button href="#" class = "openButton openItems" @click="openNav()">
            <div class="theButton">
            <img src="https://cdn4.iconfinder.com/data/icons/agile-5-black-fill/64/agile-5-_Black_fill-03-512.png" height="40" width="40">
            <p>{{labels.items}}</p>
            </div>
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
        <div class="arrowAndCostGrid">
          <div class="cardCostsDiv">
          <div  v-for="(card, index) in itemsOnSale" :key="index">
            <span class="cardCost" v-if="cardCost(card)!==false">Market cost {{ cardCost(card) }}</span>
          </div>
        </div>
        <div class="arrows">
          <div  v-for="(card, index) in itemsOnSale" :key="index">
            <div class="arrow down" v-if="index===0">
            </div>
            <div class="arrow left" v-else>
            </div>
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
              <p>{{labels.items}}</p>
            </button>
          </div>
          <div class="buy-cardsWrapper">
            <h1>{{labels.availableCards}}</h1>
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
            <h2>{{labels.choosepayment}}</h2>
            <div class="buttonsOverlayWrapper">
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
            <button href="#" class = "playerboardButton" @click="closeNav()">{{labels.backplayerboard}} </button>
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
      if(this.marketValues[card.market]===undefined){
        return false;
      }
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
    },
    cancelAction: function(){
      this.$emit('cancelAction')
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  /*.buy-cards {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-column: 2;
  }*/
  .navBuyActions{
    height: 0%;
  }

  .cancelButton{
    position: fixed;
    height: 6vh;
    width: 6vh;
    z-index: 100;
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


.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.theButton{
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100%;
  grid-template-areas:
  "openButtonLeft openButtonRight";
}

  .buy-cards{
    grid-row: 1;
    grid-column: 2;
    display:grid;
    grid-template-columns: repeat(5, 20%); /*19% 19% 19% 19% 19%;*/
    grid-template-rows:100%;

  }

  .CollectorsBuyAction {
    height: 100%;
    width: 100%;
    border: none;
    background-color: rgb(236, 112, 99);
  }

  .buttons {
    border: 0.1em solid white;
    background-color: green;
    width: 80%;
    height: 80%;
    border-radius: 5rem;
    text-align:center;
    /*transform: scale(1.4);*/
    /*margin-bottom: 1rem;*/
    /*display: grid;
    grid-template-columns: repeat(auto-fill, 100px);*/
  }

  .buttons button{
    border-radius: 2em;
    padding: 2%;
  }

  .buttons button:hover{
    background-color: rgb(220, 220, 220);
  }

  #smallPurchaseButtonBuyActions{
    height: 100%;
    width: 100%;
    background-color: transparent;
    border-radius: 5rem;
    border: none;
    text-align: center;
    padding: 0.1%;
    color: white;
  }

  #smallPurchaseButtonBuyActions:hover{
    cursor: pointer;
  }

  /*.buttonWrapper{
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

  }*/

  .buttonWrapper {
    grid-column: 1;
    grid-row: 2/5;
    height: 85%;
    width: 85%;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 33% 33% 33%;
    position: relative;
    border-radius: 1rem;
    border: 0.01rem solid white;
    margin-left: 5%;
    margin-top: 5%;
    align-items: center;
    background-color:rgb(176, 58, 46);
  }

  .gridWrapper{
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 25% 75%;
    grid-template-rows: 30% 40% 15% 15%;
  }

  .arrowAndCostGrid{
    grid-column: 2;
    grid-row: 3/5;
    display: grid;
    grid-template-columns:100%;
    grid-template-rows: 50% 50%;
  }

  .cardCostsDiv{
    height: 100%;
    width: 100%;
    grid-row: 1;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 20% 20% 20% 20% 20%;
    text-align: center;
    bottom: 0;
    z-index: 4;
  }


  .arrows{
    height: 100%;
    width: 100%;
    grid-row: 2;
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 20% 20% 20% 20% 20%;
    text-align: center;
  }

  .openButton{
    height: 100%;
    width: 80%;
    grid-column: 1;
    grid-row: 1;
    cursor: pointer;
    margin: 3%;
    border-radius: 2em;
    background-color: transparent;
    -webkit-text-stroke: 1px black;
    color: rgb(176, 58, 46);
    Letter-spacing: 10%;
    text-transform: uppercase;
    font-family: "sans", serif;
    padding: 5%;
    border-color: white;
    border-width: 0.2em;
    font-weight: bold;
    z-index: 3;
    position: relative;
    justify-content: center;
  }

  .theButton img{
    /* height: 1vh; */
    grid-area: openButtonLeft;
    padding: 5%;
    height: 100%;
    width: 100%;
  }

  .openButton span{
    grid-area: openButtonRight;
    text-align: center;
  }

  .openItems{
    color: rgb(17, 122, 101);
    }

    .cardCost{

      color: black;
    }

  /*  .openItems>img {
      height: 10%;
      width: auto;
    }*/

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
    height: 80%;
    width: 80%;
    background-color: rgb(236, 112, 99);
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
    border-radius: 2em;
    display: grid;
    grid-template-columns: 15% 60% 25%;
    grid-template-rows: 15% 75% 10%;
    grid-template-areas:
    "button cardstext buyaction"
    "cards cards buyaction"
    "empty backToBoard buyaction";
  }

  /*kan nog tas bort
    .overlay .buy-cardsWrapper{
    grid-area: cards;
    display: grid;
    grid-template-rows: 15% 85%;
    grid-template-columns: 100%;
    grid-template-areas:
    "text"
    "availableCards";
  }*/

  .overlay .buy-cardsWrapper h1{
    grid-area: cardstext;
    text-align: center;
  }
  .overlay .buy-cardsWrapper .buy-cards{
    grid-area: cards;
    width:100%;
  }

  /* kan nog tas bort
    .overlay .openButtonWrapper{
    grid-area: button;
    display: grid;
    grid-template-rows: 10% 90%;
    grid-template-areas:
    "openButtonWrappertopLeft"
    "openButtonWrapperbottomLeft";
  }*/

  .overlay .openButtonWrapper .openButton{
    /*grid-area: openButtonWrappertopLeft;*/
    margin-left: 10%;
    margin-top: 10%;
    width: 80%;
    height:80%;
    align-items: center;
  }


  .overlay .openButtonWrapper .openButton button{
    /*grid-area: openButtonWrappertopLeft;*/
    grid-area: button;
  }

  .overlay .paymentWrapper{
    grid-area: buyaction;
    border-left: dotted white;
    display:grid;
    grid-template-rows: 15% 85%;
    grid-template-areas:
    "textPayment"
    "payment";
  }
  .overlay .paymentWrapper h2{
    grid-area: textPayment;
    text-align: center;
  }

  .overlay .paymentWrapper .buttonsOverlayWrapper{
    grid-area: payment;
    display:grid;
    margin-left: 10%;
    grid-template-rows: repeat(5,20%);
  }

  .overlay .paymentWrapper .buttonsOverlayWrapper .buttons{
    width: 80%;
    height: 60%;
  }
  .overlay .paymentWrapper .buttonsOverlayWrapper .buttons button{
    height: 100%;
    width: 100%;
  }


  .overlay .backToBoard{
    right: 50%;
    margin-bottom: 10%;
    transform: bottom;
    grid-area: backToBoard;
  }
  .overlay .backToBoard button{
    right: 50%;
    transform: bottom;
    border-radius: 2em;
    padding: 3%;
    margin-bottom: 3%;
    margin-left: 45%;
  }
  .overlay .backToBoard button:hover{
    background-color: rgb(220, 220, 220);
    cursor: pointer;
  }

  /*.overlay .buy-cards .cardWrapper{
    transform-origin: top left;
    transition: 0.2s;
  }*/

  .overlay .buy-cards:hover~.buy-cards{
    transform: translateX(10%);
  }

  .overlay__content{
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    /*margin-top: 30px;*/
  }

  .overlay a{
    padding: 3%;
    color: white;
    display: block;
  }

  .overlay .closeButton{
    position: absolute;
    top: 2%;
    right: 3%;
    font-size: 300%;
  }



  .buttonsOverlayWrapper .buttons{
    border: 0.1em solid white;
    background-color: green;
    width: 100%;
    height: 100%;
    border-radius: 5rem;
    /*transform: scale(1.4);*/
    /*margin-bottom: 1rem;*/
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

  /*.cardDiv{
    transition: 0.2s;
    height: 350px;
    width: 250px;
    transform: scale(0.4);
    transform-origin: top left;
  }*/

  /*.cardDiv:hover{
    transform: translateY(-1rem);
    transform: scale(0.5);
    cursor: pointer;
  }*/
  .cardDiv:hover{
    z-index: 2;
  }

/*  .cardDiv:hover~.cardDiv{
      transform: translateX(-10%) scale(1.2);
  }*/


  @media all and (max-width:1200px){
    .openButton{
      top:0%;
      left:0%;
      height: 90%;
      width: 90%;

    }

    .theButton{
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      grid-template-areas:
      "openButtonLeft openButtonRight";
    }

    .theButton>img{
      display: none;
    }

    .theButton>span{
      grid-column: 1;
    }
  }

  @media all and (max-width:500px){
    .gridWrapper{
      display: grid;
      grid-template-columns: 33% 67%;
      grid-template-rows: 30% 70%;
    }





/*.cardDiv{
    transition: 0.2s;
    height: 80%;
    width: 100%;
    transform: scale(0.1);

  }*/

  /*.buttonWrapper {
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 33% 33% 33%;
    position: relative;
    top: 0px;
    padding-left: 0px;
    padding-top: 0px;
    border-radius: 1rem;
    border: 0.01rem solid white;
    margin-left: 0rem;
    margin-top: 0rem;
    align-items: center;

  }*/

  .buttons {
    border: 0.01rem solid white;
    background-color: green;
    border-radius: 5rem;
    /*transform: scale(1);*/
    margin-bottom: rem;
    /*display: grid;
    grid-template-columns: repeat(auto-fill, 100px);*/
    font-size: 75%;
  }

  }

</style>
