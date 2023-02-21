<template>
    <div class="img-wrapper">
      <div class="background" id="stockList-background">

        <div id="bottom-bar">
          <img src="../assets/components/bottom-bar.jpg" alt="" />
        </div>
        <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
        <!-- 리스트 기준 -->
        
        <!-- 종목 리스트 -->
        <div class="main"> 

            {{detail[0].name}}
        </div>
        <div> 
            {{detail[0].current_price}}
        </div>
        <div> 
            + {{detail[0].earn}} ({{detail[0].earn_rate}}%) 오늘
        </div>

        <div class="chartbutton">
          <img  :src="imgurl"/>
          <ul class="tab" ref="tab" @click.prevent="setContext">
            <li class="on"><a>1주</a></li>
            <li><a>한달</a></li>
            <li><a>1년</a></li>
            <li><a>3년</a></li>
         </ul>
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
        imgurl:"",
        chartContext:"1주",
        detail: [{}],
        imageMatch:{
              "1주":"week",
              "한달":"month3",
              "1년":"year",
              "3년":"year3",

            }
      };
    },
  
    methods: {
      setContext(ev){
        this.chartContext=ev.target.textContent;
        this.setCrrTab(ev.target.parentNode) ; // li가 들어감.
      },
      setCrrTab(crr){
        this.$refs.tab.querySelectorAll('li').forEach((item)=>{
          item.classList.remove('on')
        })
        this.$refs.tab.querySelectorAll('a').forEach((item)=>{

          if(item.textContent===crr.textContent){
            
            var img = this.imageMatch[crr.textContent]
            this.imgurl=this.detail[0][img]
            console.log()
            // this.imgurl=this.detail[0].this.imageMatch[crr.textContent]
            item.parentNode.classList.add('on');
          }
        })

      }
    },
  
    created() {
      axios
        .get(
          'http://127.0.0.1:8000/api/stocklist/377300'
        )
        .then((response) => {
        
          this.detail=response.data
          this.imgurl=response.data[0].week
        });
    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import '../scss/main.scss';
  @import '../scss/views/_frac.scss';
  @import '../scss/views/_stockDetail.scss';
  </style>
  