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
          <p>{{filter}}</p>
        </div>
        <router-link to="/frac/select" id="select-link"
          >필터 변경하기</router-link
        >
      </div>
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <router-link id="back-btn" to="/frac/select">
        <img
          href=""
          id="top-bar"
          src="../assets/components/top-bar.png"
          alt=""
        />
      </router-link>
      <!-- 리스트 기준 -->
      <section class="category">
        <ul class="chart-tab" ref="tab" @click.prevent="setContext">
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
        <!-- 로딩 화면 -->
        <div class="loading-wrapper">
          <img id="loading" src="../assets/components/loading.gif" />
        </div>
        <!-- 종목들 -->
        <ul v-if="stockContext === 'high'" class="stock-list">
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

        <ul v-if="stockContext === 'low'" class="stock-list">
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
              <div class="blue">{{ stock.mkp }}</div>
              <div class="blue">{{ stock.fltRt + '%' }}</div>
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
      filter:"",
      stockContext: 'high',
      stockList: [],
      stockList2: [],
    };
  },

  methods: {
    setContext(ev) {
      this.chartContext = ev.target.textContent;
      this.setCrrTab(this.chartContext); // li가 들어감.
    },

    setCrrTab(crr) {
      this.$refs.tab.querySelectorAll('li').forEach((item) => {
        item.classList.remove('active');
      });
      this.$refs.tab.querySelectorAll('li').forEach((item) => {
        if (item.textContent === crr) {
          item.classList.add('active');
          // this.imgurl=this.detail[0].this.imageMatch[crr.textContent]

          if (crr === '상승') {
            this.stockContext = 'high';
            this.stockList=this.stockList2
            this.stockList=this.stockList.filter(item => item.fltRt > 0);
            this.stockList.sort((a, b) => {
              return b.fltRt - a.fltRt;
            });
          } else {
            this.stockList=this.stockList2
            this.stockList=this.stockList.filter(item => item.fltRt < 0);

            this.stockContext = 'low';
            this.stockList.sort((a, b) => {
              return a.fltRt - b.fltRt;
            });
          }
        }
      });
    },
    getDetail(index) {
      const stock_code = String(this.stockList[index].srtnCd);

      const frm = new FormData();
      frm.append('clpr', Number(this.stockList[index].clpr));
      frm.append('vs', Number(this.stockList[index].vs));
      frm.append('fltRt', Number(this.stockList[index].fltRt));
      frm.append('itmsNm', this.stockList[index].itmsNm);

      axios
        .post(`http://34.64.58.230/api/stocklist/submit/${stock_code}`, frm)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },

  async created() {

    let url = '';
    let url2 = '';
    const tendency = this.$route.query.filter;

    if (tendency == 1) {
      this.filter="필터 : 공격형";
      url =
        'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=DIlWQ5yy%2BbSIwrzWGOAXjybTToyaT4bkcMf9lUR%2FU6BNxri4WtaLREqWIGmmIT8LjlP5LeB2U9U3ZbTkofQQGw%3D%3D&numOfRows=50&resultType=json&endFltRt=30&beginFltRt=15';
      url2 =
        'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=DIlWQ5yy%2BbSIwrzWGOAXjybTToyaT4bkcMf9lUR%2FU6BNxri4WtaLREqWIGmmIT8LjlP5LeB2U9U3ZbTkofQQGw%3D%3D&numOfRows=50&resultType=json&endFltRt=-15&beginFltRt=-30';
    } else if (tendency == 2) {
      this.filter="필터 : 중립형";
      url =
        'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=DIlWQ5yy%2BbSIwrzWGOAXjybTToyaT4bkcMf9lUR%2FU6BNxri4WtaLREqWIGmmIT8LjlP5LeB2U9U3ZbTkofQQGw%3D%3D&numOfRows=50&resultType=json&endFltRt=15&beginFltRt=5';
      url2 =
        'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=DIlWQ5yy%2BbSIwrzWGOAXjybTToyaT4bkcMf9lUR%2FU6BNxri4WtaLREqWIGmmIT8LjlP5LeB2U9U3ZbTkofQQGw%3D%3D&numOfRows=50&resultType=json&endFltRt=-5&beginFltRt=-15';
    } else {
      this.filter="필터 : 안정형";
      url =
        'https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=DIlWQ5yy%2BbSIwrzWGOAXjybTToyaT4bkcMf9lUR%2FU6BNxri4WtaLREqWIGmmIT8LjlP5LeB2U9U3ZbTkofQQGw%3D%3D&numOfRows=100&resultType=json&endFltRt=5&beginFltRt=-5';
    }

    await axios.get(url).then((response) => {
      const stockList = response.data.response.body.items.item;
      stockList.forEach((stock) => {
        this.stockList.push({
          srtnCd: stock.srtnCd,
          itmsNm: stock.itmsNm,
          mkp: priceToString(stock.mkp),
          fltRt: Number(stock.fltRt),
          trqu: priceToString(stock.trqu),
          clpr: stock.clpr,
          vs: stock.vs,
        });

        this.stockList2.push({
            srtnCd: stock.srtnCd,
            itmsNm: stock.itmsNm,
            mkp: priceToString(stock.mkp),
            fltRt: Number(stock.fltRt),
            trqu: priceToString(stock.trqu),
            clpr: stock.clpr,
            vs: stock.vs,
          });



        this.stockList.sort((a, b) => {
          return b.fltRt - a.fltRt;
        });
        this.stockList=this.stockList.filter(item => item.fltRt > 0);
      });



    });

    if (tendency != 3) {
      await axios.get(url2).then((response) => {
        const stockList = response.data.response.body.items.item;
        console.log(stockList);
        stockList.forEach((stock) => {
          this.stockList.push({
            srtnCd: stock.srtnCd,
            itmsNm: stock.itmsNm,
            mkp: priceToString(stock.mkp),
            fltRt: Number(stock.fltRt),
            trqu: priceToString(stock.trqu),
            clpr: stock.clpr,
            vs: stock.vs,
          });

          this.stockList2.push({
            srtnCd: stock.srtnCd,
            itmsNm: stock.itmsNm,
            mkp: priceToString(stock.mkp),
            fltRt: Number(stock.fltRt),
            trqu: priceToString(stock.trqu),
            clpr: stock.clpr,
            vs: stock.vs,
          });


          this.stockList.sort((a, b) => {
            return b.fltRt - a.fltRt;
          });
          this.stockList=this.stockList.filter(item => item.fltRt > 0);
        });
      });
    }

    const loading = document.querySelector('.loading-wrapper');
    loading.classList.add('not-show');
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockList.scss';
</style>
