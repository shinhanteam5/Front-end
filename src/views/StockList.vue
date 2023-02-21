<template>
  <div class="img-wrapper">
    <div class="background" id="stockList-background">
      <div id="filter-bar">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <p>필터: 공격형</p>
        </div>
        <router-link to="/frac/select" id="select-link"
          >필터 변경하기</router-link
        >
      </div>
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
      <!-- 리스트 기준 -->
      <section class="category">
        <ul>
          <li class="active">상승</li>
          <li>하락</li>
          <li>인기검색</li>
          <li>높은가격</li>
          <li>낮은가격</li>
        </ul>
      </section>
      <!-- 종목 리스트 -->
      <section class="list">
        <!-- 종목 카테고리 -->
        <ul class="stock-category">
          <li>종목명</li>
          <li>현재가</li>
          <li>등락률</li>
          <li>거래량</li>
        </ul>
        <!-- 종목들 -->
        <ul class="stock-list">
          <router-link
            id="router-link"
            :to="{
              name: 'StockDetail',
              query: {
                stock_code: stock.srtnCd,
              },
            }"
            v-for="(stock, index) in stockList"
            @click="getDetail(index)"
          >
            <li>
              <div>{{ stock.itmsNm }}</div>
              <div class="red">{{ stock.mkp }}</div>
              <div class="red">{{ stock.fltRt + '%' }}</div>
              <div>{{ stock.trqu }}</div>
            </li>
          </router-link>
        </ul>
      </section>
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
      stockList: [],
    };
  },

  methods: {
    getDetail(index) {
      const stock_code = String(this.stockList[index].srtnCd);

      const frm = new FormData();
      frm.append('clpr', Number(this.stockList[index].clpr));
      frm.append('vs', Number(this.stockList[index].vs));
      frm.append('fltRt', Number(this.stockList[index].fltRt));
      frm.append('itmsNm', this.stockList[index].itmsNm);

      axios
        .post(`http://127.0.0.1:8000/api/stocklist/submit/${stock_code}`, frm)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },

  created() {
    axios
      .get(
        'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=DIlWQ5yy%2BbSIwrzWGOAXjybTToyaT4bkcMf9lUR%2FU6BNxri4WtaLREqWIGmmIT8LjlP5LeB2U9U3ZbTkofQQGw%3D%3D&numOfRows=30&resultType=json'
      )
      .then((response) => {
        const stockList = response.data.response.body.items.item;
        stockList.forEach((stock) => {
          this.stockList.push({
            srtnCd: stock.srtnCd,
            itmsNm: stock.itmsNm,
            mkp: priceToString(stock.mkp),
            fltRt: stock.fltRt,
            trqu: priceToString(stock.trqu),
            clpr: stock.clpr,
            vs: stock.vs,
          });
        });
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockList.scss';
</style>
