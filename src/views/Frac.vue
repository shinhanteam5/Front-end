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
      <div v-if="!hasInvestment" class="btn-wrapper">
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
      <div v-else>보유한 소수점 주식 있는 경우</div>
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

export default {
  data() {
    return {
      hasInvestment: false,
      stocks: [], // 주식
      totalEarn: 0, // 총 수익
      totalInvest: 0, // 총 투자 금액
      totalRate: 0, // 총 수익률
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
  },

  created() {
    const userId = 1;
    const frm = new FormData();
    frm.append('user_id', userId);

    axios
      .get(`http://127.0.0.1:8000/api/portfolio/${userId}`, frm)
      .then((response) => {
        // console.log(response.data[0]);
        this.stocks = response.data[0].stocks; // 보유 주식
        this.totalEarn = response.data[0].total_earn;
        this.totalInvest = response.data[0].total_invest;
        this.totalRate = response.data[0].total_rate;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
</style>
