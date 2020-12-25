<template>
    <div class="CollectorsBuySkill">
      <button href="#" class = "openButton" @click="openNav()">Expand</button>
      <h1>{{ labels.buySkill }}</h1>
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
          <div class="buy-skills">
            <div v-for="(card, index) in skillsOnSale" :key="index">
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
        <button href="#" class = "playerboardButton" @click="closeNav()">Back to playerboard </button>
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
  }
  .CollectorsBuySkill .openButton{
    float: right;
    margin: 20px;
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
