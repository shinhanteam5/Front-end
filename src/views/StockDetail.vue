<template>
  <div class="img-wrapper">
    <div class="background" id="stockList-background">
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
      <div class="stock-name">
        {{ detail[0].name }}
      </div>
      <div class="stock-current-price">
        {{ detail[0].current_price }}
      </div>
      <div class="stock-earn">
        <span v-if="detail[0].earn > 0">+</span>
        {{ detail[0].earn }} ({{ detail[0].earn_rate }}%) 오늘
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

      <div>
        회사소개
        <div class="info">{{ detail[0].info }}</div>
      </div>

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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imgurl: '',
      chartContext: '1주',
      detail: [{}],
      imageMatch: {
        '1주': 'week',
        한달: 'month3',
        '1년': 'year',
        '3년': 'year3',
      },
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
      .get(`http://127.0.0.1:8000/api/stocklist/${stock_code}`)
      .then((response) => {
        this.detail = response.data;
        this.imgurl = response.data[0].week;
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockDetail.scss';
</style>
