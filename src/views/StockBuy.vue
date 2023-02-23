<template>
  <div class="img-wrapper">
    <div class="background">
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <router-link id="back-btn" to="/frac/stockdetail">
        <img
          href=""
          id="top-bar"
          src="../assets/components/top-bar.png"
          alt=""
        />
      </router-link>
      <!-- https://velog.io/@imyourgenie/Vue.js-%EC%B5%9C%EC%A2%85-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9E%85%EB%A0%A5-%ED%8F%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0 -->
      <div class="form-wrapper">
        <form action="">
          <input
            id="inputMoney"
            v-model="shownMoney"
            placeholder="구매금액입력"
          />
          <p v-if="inputMoney === 0">천원 단위로 구매 가능합니다.</p>
          <p v-else-if="inputMoney > 0 && inputMoney < 3000">
            <img src="../assets/steakers/cookie.png" />
            과자만큼 투자하기
          </p>
          <p v-else-if="inputMoney >= 3000 && inputMoney <= 5000">
            <img src="../assets/steakers/coffee.png" />
            커피만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 5000 && inputMoney <= 14000">
            <img src="../assets/steakers/food.png" />
            점심만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 14000 && inputMoney <= 25000">
            <img src="../assets/steakers/chicken.png" />
            치킨만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 25000 && inputMoney <= 50000">
            <img src="../assets/steakers/pizza.png" />
            피자만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 50000 && inputMoney <= 100000">
            <img src="../assets/steakers/ktx.png" />
            KTX 티켓만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 100000 && inputMoney <= 300000">
            <img src="../assets/steakers/earphone.png" />
            무선 이어폰만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 300000 && inputMoney <= 500000">
            <img src="../assets/steakers/smartwatch.png" />
            스마트 워치만큼 투자하기
          </p>
          <p v-else-if="inputMoney > 500000 && inputMoney <= 700000">
            <img src="../assets/steakers/allowance.png" />
            한 달 용돈만큼 투자하기
          </p>
          <p v-else>
            <img src="../assets/steakers/travel.png" />
            여행 경비만큼 투자하기
          </p>
        </form>
        <!-- 예상... -->
        <div class="info">
          <div>
            <p class="grey">주문 가능 금액</p>
            <p>{{ shownBalance }}</p>
          </div>
          <div>
            <p class="grey">예상 수수료</p>
            <p>{{ shownCharge }}</p>
          </div>
          <div>
            <p class="grey">예상 주식수</p>
            <p>{{ shownShareNumber }}</p>
          </div>
        </div>
        <!-- 버튼 4개 -->
        <div class="buttons">
          <button @click="addMoney(1000)">1천원</button>
          <button @click="addMoney(10000)">1만원</button>
          <button @click="addMoney(50000)">5만원</button>
          <button @click="addMoney(100000)">10만원</button>
        </div>
        <!-- 숫자 입력 -->
        <section class="numbers">
          <div class="row">
            <div @click="addNumber(1)">1</div>
            <div @click="addNumber(2)">2</div>
            <div @click="addNumber(3)">3</div>
          </div>
          <div class="row">
            <div @click="addNumber(4)">4</div>
            <div @click="addNumber(5)">5</div>
            <div @click="addNumber(6)">6</div>
          </div>
          <div class="row">
            <div @click="addNumber(7)">7</div>
            <div @click="addNumber(8)">8</div>
            <div @click="addNumber(9)">9</div>
          </div>
          <div class="row">
            <div id="word" @click="resetMoney()">초기화</div>
            <div @click="addNumber(0)">0</div>
            <div class="delete-icon" @click="deleteMoney()">
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
                  d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
              </svg>
            </div>
          </div>
        </section>
        <!-- 구매하기 버튼 -->
        <button id="buy-btn" @click="buy()">구매하기</button>
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
      <div class="modal-row1">
        <img src="../assets/characters/character3.png" alt="" />
      </div>
      <div class="modal-row2">
        <p class="bold">매수 완료</p>
        <p>정상적으로 매수 완료되었습니다.</p>
      </div>
      <div class="modal-btn">
        <router-link class="link-btn" to="/frac">완료</router-link>
      </div>
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
      inputMoney: 0,
      shownMoney: '',
      balance: 1000000, // 잔액
      shownBalance: '',
      charge: 0, // 수수료
      shownCharge: '-',
      shareNumber: 0, // 주식수
      shownShareNumber: '-',
      currnetPrice: 0,
      frm: new FormData(),
    };
  },

  methods: {
    buy() {
      if (this.inputMoney === 0) {
        return;
      }

      this.frm.append('invest_amount', Number(this.inputMoney));
      this.frm.append('stock_share', Number(this.shareNumber));

      axios
        .post('http://127.0.0.1:8000/api/stocklist/buy', this.frm)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));

      this.openModal();
    },

    makeFormData(name, stock_code) {
      this.frm.append('stock_name', String(name));
      this.frm.append('stock_code', Number(stock_code));
      this.frm.append('portfolio_id', Number(1));
      this.frm.append('earn_rate', Number(0));
    },

    updateCharge() {
      this.charge = (this.inputMoney * 0.01).toFixed(2);
      this.shownCharge = String(this.charge) + '원';
    },

    updateShareNumber() {
      this.shareNumber = (this.inputMoney / this.currnetPrice).toFixed(2);
      this.shownShareNumber = String(this.shareNumber) + '주';
    },

    showInputMoney() {
      this.shownMoney = priceToString(this.inputMoney) + '원';
    },

    updateBalance() {
      this.balance = 1000000 - this.inputMoney;
      this.shownBalance = priceToString(this.balance) + '원';
    },

    addMoney(money) {
      this.inputMoney = this.inputMoney + money;
      this.showInputMoney();
      this.updateBalance();
      this.updateCharge();
      this.updateShareNumber();
    },

    addNumber(number) {
      this.inputMoney = Number(String(this.inputMoney) + String(number));
      this.showInputMoney();
      this.updateBalance();
      this.updateCharge();
      this.updateShareNumber();
    },

    deleteMoney() {
      this.inputMoney = parseInt(this.inputMoney / 10);
      this.showInputMoney();
      this.updateBalance();
      this.updateCharge();
      this.updateShareNumber();
    },

    resetMoney() {
      this.inputMoney = 0;
      this.shownMoney = '구매금액입력';

      this.balance = 1000000;
      this.shownBalance = '1,000,000원';

      this.charge = 0;
      this.shownCharge = '-';

      this.shareNumber = 0;
      this.shownShareNumber = '-';
    },

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
    const { name, user_id, stock_code, current_price } = this.$route.query;
    this.makeFormData(name, stock_code);
    this.currnetPrice = current_price;

    this.shownBalance = priceToString(this.balance) + '원';
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockBuy.scss';
</style>
