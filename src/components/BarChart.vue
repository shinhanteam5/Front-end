<template>
  <div class="chart-wrapper">
    <p class="grow">성장성(매출액, 당기순이익)</p>
    <Bar
      class="bar"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      v-if="isLoaded"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  props: ['listData', 'isLoaded'], // 각 메뉴별 view파일에서 propList 로 리스트를 받아 올 것이다.
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['2019', '2020', '2021'],
        datasets: [
          { label: '매출액', backgroundColor: '#f87979', data: [0, 0, 0] },
        ],
      },
    };
  },
  watch: {
    listData(newValue, oldValue) {
      this.chartData.datasets[0].data[0] = this.listData[0].profit1;
      this.chartData.datasets[0].data[1] = this.listData[0].profit2;
      this.chartData.datasets[0].data[2] = this.listData[0].profit3;
    },
  },
  beforeMount() {
    console.log('asdf', this.listData);
    // this.chartData.datasets[0].data[0]=this.listData[0].profit1
    // this.chartData.datasets[0].data[1]=this.listData[0].profit2
    // this.chartData.datasets[0].data[2]=this.listData[0].profit3
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
.chart-wrapper {
  position: relative;
}
p.grow {
  font-family: $noto-sans;
  font-weight: 600;
  font-size: 18px;
  font-weight: 600;
}
</style>
