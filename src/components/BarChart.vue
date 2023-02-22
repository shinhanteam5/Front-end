<template>
    <p>성장성(매출액, 당기순이익)</p>
    <h2>{{ listData[0].profit1 }}</h2>
    
    <Bar
    class="bar"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    props:['listData'], // 각 메뉴별 view파일에서 propList 로 리스트를 받아 올 것이다.
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [ '2019', '2020', '2021' ],
          datasets: [ { data: [10,1,0] } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
    ,
    beforeCreated(){
        this.chartData.datasets[0].data[0]=this.listData[0].profit1
        this.chartData.datasets[0].data[1]=this.listData[0].profit2
        this.chartData.datasets[0].data[2]=this.listData[0].profit3
    }
  }
  </script>

<style lang="scss" scoped>
.bar{
    position:absolute;
    top:1000px
}
p{
    left: 40px;
    position:absolute;
    top:1000px;
    font-size: 25px;
    font-family: 'Noto Sans KR';
    font-weight: 500;
}
</style>