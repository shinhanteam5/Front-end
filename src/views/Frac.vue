<template>
  <div class="img-wrapper">
    <div class="background">
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
      <button @click="openModal()" id="btn1-to-invest">투자하기</button>
      <img
        id="top-menu-1"
        src="../assets/components/frac-top-menu-1.jpg"
        alt=""
      />
      <img
        id="top-menu-2"
        src="../assets/components/frac-top-menu-2.jpg"
        alt=""
      />
      <!-- 보유 주식 없는 경우 -->
      <div v-if="stocks.length === 0" class="btn-wrapper">
        <img
          class="character"
          src="../assets/characters/character2.png"
          alt=""
        />
        <p>보유한 소수점 주식이 없어요.</p>
        <p>지금 시작해 보시겠어요?</p>
        <button @click="openModal()" id="btn2-to-invest">
          국내주식 소수점 투자하기
        </button>
        <img class="qna" src="../assets/components/qna.jpg" alt="" />
        <img
          class="recommend"
          src="../assets/components/recommend.jpg"
          alt=""
        />
      </div>
      <!-- 보유 주식 있는 경우 -->
      <div v-else class="hasStock">
        <div class="main-contents" v-if="show === 1">
          <div class="contents-col1">
            <p>조수진 님의</p>
            <p>소수점 투자 현황입니다</p>
            <h1>{{ totalInvest }}원</h1>
            <h3>
              <span v-if="totalEarn > 0" class="red">▲ {{ totalEarn }}원 </span>
              <span v-else class="blue">▼{{ totalEarn }}원 </span>
              <span v-if="totalRate > 0" class="red"> (+{{ totalRate }}%)</span>
              <span v-else class="blue"> (-{{ totalRate }}%)</span>
            </h3>
          </div>
          <div class="img-wrapper2">
            <img src="../assets/characters/character6.png" />
          </div>
        </div>
        <div class="main-contents" id="page2" v-else>
          <div class="contents-col1">
            <Pie :data="data" :options="options" id="pie-chart" />
          </div>
          <div class="img-wrapper2">
            <img src="../assets/characters/character4.png" />
          </div>
        </div>
        <div class="portfolio-box" id="box1">
          <p @click="showPortfolio()">나의 포트폴리오 한눈에 보기</p>
        </div>
        <div class="portfolio-box not-show" id="box2">
          <p @click="notShowPortfolio()">만큼 투자했어요</p>
        </div>
        <div class="stocks-wrapper">
          <div class="title">
            <div>보유 주식</div>
            <button>수익금액순</button>
          </div>
          <ul class="stocks-list">
            <li id="stock" v-for="stock in stocks">
              <div class="stock-row1">
                <p id="stock-name">{{ stock.stock_name }}</p>
                <p v-if="stock.earn_rate > 1" id="invest-amount" class="red">
                  {{ stock.invest_amount }}원
                </p>
                <p v-else id="invest-amount" class="blue">
                  {{ stock.invest_amount }}원
                </p>
              </div>
              <div class="stock-row2">
                <p id="stock-share">{{ stock.stock_share }}주</p>
                <div>
                  <p v-if="stock.earn_rate > 1" class="red" id="earn-amount">
                    {{ (stock.earn_rate / 100) * stock.invest_amount }}원
                  </p>
                  <p v-else class="blue" id="earn-amount">
                    {{ (stock.earn_rate / 100) * stock.invest_amount }}원
                  </p>
                  <p v-if="stock.earn_rate > 1" class="red" id="earn-rate">
                    {{ stock.earn_rate }}%
                  </p>
                  <p v-else class="blue" id="earn-rate">
                    {{ stock.earn_rate }}%
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- modal  -->
    <div class="modal-wrapper">
      <div id="close">
        <svg
          @click="closeModal()"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div class="modal-row1">소수점 투자</div>
      <div class="modal-row2">
        <img src="../assets/characters/character3.png" alt="" />
        <img class="small" src="../assets/characters/character4.png" alt="" />
      </div>
      <div class="modal-row3">
        <router-link class="link-btn" id="first" to="/frac/select"
          >종목 추천받기</router-link
        >
        <router-link class="link-btn" to="/frac/search"
          >종목 검색하기</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);
export default {
  components: {
    Pie,
  },

  data() {
    return {
      stocks: [], // 주식
      totalEarn: 0, // 총 수익
      totalInvest: 0, // 총 투자 금액
      totalRate: 0, // 총 수익률
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      show: 1,
    };
  },

  methods: {
    openModal() {
      const modal = document.querySelector('.modal-wrapper');
      const background = document.querySelector('.background');
      modal.classList.add('show');
      background.classList.add('be-darker');
    },

    closeModal() {
      const modal = document.querySelector('.modal-wrapper');
      const background = document.querySelector('.background');
      modal.classList.remove('show');
      background.classList.remove('be-darker');
    },

    showPortfolio() {
      this.show = 0;

      const box1 = document.querySelector('#box1');
      const box2 = document.querySelector('#box2');
      box1.classList.add('not-show');
      box2.classList.remove('not-show');
    },

    notShowPortfolio() {
      this.show = 1;

      const box1 = document.querySelector('#box1');
      const box2 = document.querySelector('#box2');
      box2.classList.add('not-show');
      box1.classList.remove('not-show');
    },
  },

  async created() {
    const userId = 1;
    const frm = new FormData();
    frm.append('user_id', userId);

    await axios
      .get(`http://127.0.0.1:8000/api/portfolio/${userId}`, frm)
      .then((response) => {
        // console.log(response.data[0]);
        this.stocks = response.data[0].stocks; // 보유 주식
        this.totalEarn = response.data[0].total_earn;
        this.totalInvest = response.data[0].total_invest;
        this.totalRate = response.data[0].total_rate;
      })
      .catch((error) => console.log(error));

    const colors = [
      '#7284fe',
      '#9575cd',
      '#2e66e1',
      '#e57373',
      '#d8ef79',
      '#ff8a65',
      '#fcaeae',
      '#e6ee9c',
      '#c8d8ff',
      '#b0bec5',
      '#d7ccc8',
    ];
    this.stocks.forEach((stock, index) => {
      this.data.labels.push(stock.stock_name);
      this.data.datasets[0].data.push(stock.invest_amount);
      this.data.datasets[0].backgroundColor.push(colors[index]);
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
</style>
