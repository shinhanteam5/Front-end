<template>
  <div>
    <p>전문가의견</p>
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
            // showName() {
            // console.log('실행됐음!');
            // if (this.myName === '') return '';
            // return '정' + this.myName;},
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