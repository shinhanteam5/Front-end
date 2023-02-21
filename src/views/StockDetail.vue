<template>
    <div class="img-wrapper">
      <div class="background" id="stockList-background">

        <div id="bottom-bar">
          <img src="../assets/components/bottom-bar.jpg" alt="" />
        </div>
        <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
        <!-- 리스트 기준 -->
        
        <!-- 종목 리스트 -->
        <div> 
            {{detail[0].name}}
        </div>
        <div> 
            {{detail[0].current_price}}
        </div>
        <div class="chart"> 
          <button>1주</button>
          <button>3달</button>
          <button>1년</button>
          <button>3년</button>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  const priceToString = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  export default {
    data() {
      return {
        detail: [],
      };
    },
  
    methods: {},
  
    created() {
      axios
        .get(
          'http://127.0.0.1:8000/api/stocklist/377300'
        )
        .then((response) => {
          this.detail=response.data
        });


    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import '../scss/main.scss';
  @import '../scss/views/_frac.scss';
  @import '../scss/views/_stockDetail.scss';
  </style>
  