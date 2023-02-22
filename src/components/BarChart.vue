<template>
     <li v-for="item in listData" v-bind:key="item.id">
      <b>{{ item}}</b>
    </li>
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
          labels: [ 'January', 'February', 'March' ],
          datasets: [ { data: [, 20, 12] } ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
    ,
  }
  </script>

<style lang="scss" scoped>
.bar{
    position:absolute;
    top:1000px
}
</style>