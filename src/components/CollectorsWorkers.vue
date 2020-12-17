<template>
  <div class="workersWrapper">

    <button v-for="f in fields" :key="f" class="workerOption" type="submit" @click="buyWorkers">
      <h1>{{f.fieldNumber}}</h1>
    </button>

  </div>
</template>

<script>
  export default{
    name: 'CollectorsWorkers',
    props:{},
    data: function() {
      return{

        field1:{
          fieldNumber: 1,
          description: "cost: -1 Bottle, gives 1 dollar"
        },

        field2:{
          fieldNumber: 2,
          description: "cost: 1 bottle + 1 dollar, draw 2 cards"
        },

        field3:{
          fieldNumber: 3,
          description: "cost: 1 bottle, draw 1 card, get p1-token"
        },

        field4:{
          fieldNumber: 4,
          description: "cost: 1 bottle, draw 1 card, place 1 card on playerboard",
        },

        field5:{
          fieldNumber: 5,
          description: "cost: 1 bottle, weird thingy (changes through quarters)"
        },

        fields: [this.field1, this.field2, this.field3, this.field4, this.field5]
    }
  },
    methods:{
      buyWorkers: function(){

      }
    }
  }
</script>

<style>

  .workersWrapper{
    display: flex;
  }

  .workerOption{
    width: 200px;
    height: 300px;
  }
</style>
