<template>
  <div>
    <p>전문가의견</p>
    <p>오늘의 숫자는: {{ showName }}</p>
  </div>
</template>
  
  <script>

  
  export default {
    name: 'ExpertComment',
    data() {
      return {
      }
    },
    computed: {
            showName() {
              var random1 = Math.floor(Math.random() * 101);
              var random2 = Math.floor(Math.random() * 101);
              if(random1> random2){
                var a = random2
                var b = random1
              }
              else{
                var b = random2
                var a = random1
              }
              console.log(a,b-a,100-b)
    }
  },
    watch: {
            myData(newValue, oldValue) {
            },
        },
    created(){
        // this.chartData.datasets[0].data[0]=this.listData[0].profit1
        // this.chartData.datasets[0].data[1]=this.listData[0].profit2
        
    }
  }
  </script>

<style lang="scss" scoped>
#stockList-background > div:nth-child(15) > p{
    left: 40px;
    position:absolute;
    top:1600px;
    font-family: 'Noto Sans KR';
    font-size:25px;
    font-weight: 500;
}
</style>