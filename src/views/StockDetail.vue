<template>
  <div class="img-wrapper">
    <div class="background" id="stockList-background">
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <router-link id="back-btn" to="/frac/stockList">
        <img
          href=""
          id="top-bar"
          src="../assets/components/top-bar.png"
          alt=""
        />
      </router-link>
      <div class="stock-title">
        <div class="stock-name">
          {{ detail[0].name }}
        </div>
        <div class="stock-current-price">{{ currentPrice }}원</div>
        <div class="stock-earn">
          <span v-if="detail[0].earn > 0">+</span>
          {{ earn }}원 ({{ detail[0].earn_rate }}%) 오늘
        </div>
      </div>

      <div class="chart-button">
        <img :src="imgurl" />
        <ul class="chart-tab" ref="tab" @click.prevent="setContext">
          <li class="active"><a>1주</a></li>
          <li><a>한달</a></li>
          <li><a>1년</a></li>
          <li><a>3년</a></li>
        </ul>
      </div>

      <div class="introduce">
        <p>회사 소개</p>
        <div class="info">{{ detail[0].info }}</div>
      </div>

      <div class="chart-wrapper">
        <BarChart
          id="bar-chart-1"
          :list-data="detail"
          :key="detail.length"
          :isLoaded="barLoad"
        />
      </div>

      <div class="chart-wrapper">
        <BarChart2
          :list-data="detail"
          :key="detail.length"
          :isLoaded="barLoad"
        />
      </div>

      <div class="introduce expert">
        <p>전문가의견</p>
        <section>
          <div class="good-comment-circle">{{ good }}%</div>
          <div class="squares">
            <div class="good" :style="'width:' + good + '%'"></div>
            <div class="soso" :style="'width:' + soso + '%'"></div>
            <div class="bad" :style="'width:' + bad + '%'"></div>
          </div>
          <div class="percents">
            <p class="good">긍정 {{ good }}%</p>
            <p class="soso">중립 {{ soso }}%</p>
            <p class="bad">부정 {{ bad }}%</p>
          </div>
        </section>
      </div>

      <ul class="news">
        <p>종목뉴스</p>
        <li id="news-item" v-for="(item, i) in news" :key="item.content">
          <p id="title">{{ item.content }}</p>
          <p id="date">{{ item.tstamp }}</p>
        </li>
      </ul>

      <div class="modal-row3">
        <router-link
          id="buy-btn"
          :to="{
            name: 'StockBuy',
            query: {
              name: detail[0].name,
              user_id: 1,
              stock_code: detail[0].stock_code,
              current_price: detail[0].current_price,
            },
          }"
        >
          구매하기</router-link
        >
        <button id="sell-btn">매도하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '../components/BarChart';
import BarChart2 from '../components/BarChart2';
import ExpertComment from '../components/ExpertComment';
var ctx = document.getElementById('myChart');
console.log('sd', ctx);
import axios from 'axios';

const priceToString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default {
  name: 'App',
  components: { BarChart, BarChart2, ExpertComment },
  data() {
    return {
      good: 0,
      bad: 0,
      soso: 0,
      imgurl: '',
      chartContext: '1주',
      detail: [{}],
      news: [],
      imageMatch: {
        '1주': 'week',
        한달: 'month3',
        '1년': 'year',
        '3년': 'year3',
      },
      barLoad: false,
      currentPrice: '',
      earn: '',
    };
  },

  methods: {
    routerTest() {
      console.log('test');
      this.$router.push({
        name: 'Params',
        // params: { pathMatch: "test" },
        query: {
          detail: this.detail,
        },
        // hash: this.$route.hash,
      });
    },
    setContext(ev) {
      this.chartContext = ev.target.textContent;
      this.setCrrTab(ev.target.parentNode); // li가 들어감.
    },

    setCrrTab(crr) {
      this.$refs.tab.querySelectorAll('li').forEach((item) => {
        item.classList.remove('active');
      });
      this.$refs.tab.querySelectorAll('a').forEach((item) => {
        if (item.textContent === crr.textContent) {
          const img = this.imageMatch[crr.textContent];
          this.imgurl = this.detail[0][img];
          // this.imgurl=this.detail[0].this.imageMatch[crr.textContent]
          item.parentNode.classList.add('active');
        }
      });
    },
  },

  created() {
    const stock_code = this.$route.query.stock_code;

    axios
      .get(`http://34.64.58.230/api/stocklist/${stock_code}`)
      .then((response) => {
        this.detail = response.data;
        this.imgurl = response.data[0].week;
        this.barLoad = true;

        this.currentPrice = priceToString(this.detail[0].current_price);
        this.earn = priceToString(Math.floor(this.detail[0].earn));
      });

    axios
      .get(`http://34.64.58.230/api/stocklist/${stock_code}/news`)
      .then((response) => {
        response.data.forEach((item) => {
          let time = item.tstamp;
          let month = time.substr(0, 2) + '월';
          let day = time.substr(2, 5) + '일';

          let news = {
            content: item.content,
            tstamp: month + day,
          };
          this.news.push(news);
        });
      });

    let a;
    let b;
    let random1 = Math.floor(Math.random() * 101);
    let random2 = Math.floor(Math.random() * 101);
    if (random1 > random2) {
      a = random2;
      b = random1;
    } else {
      b = random2;
      a = random1;
    }
    this.good = a;
    this.bad = b;
    this.soso = 100 - b;
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockDetail.scss';
</style>
