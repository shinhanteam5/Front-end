<template>
  <div class="img-wrapper">
    <div class="background">
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
      <!-- https://velog.io/@imyourgenie/Vue.js-%EC%B5%9C%EC%A2%85-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%9E%85%EB%A0%A5-%ED%8F%BC-%EB%A7%8C%EB%93%A4%EA%B8%B0 -->
      <div class="form-wrapper">
        <form action="">
          <input v-model="shownMoney" placeholder="구매금액입력" />
          <p>{{ message }}</p>
        </form>
        <!-- 예상... -->
        <div class="info">
          <div>
            <p class="grey">주문 가능 금액</p>
            <p>{{ shownBalance }}</p>
          </div>
          <div>
            <p class="grey">예상 수수료</p>
            <p>{{ charge }}</p>
          </div>
          <div>
            <p class="grey">예상 주식수</p>
            <p>{{ shareNumber }}</p>
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
        <button id="buy-btn">구매하기</button>
      </div>
    </div>
  </div>
</template>

<script>
const priceToString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default {
  data() {
    return {
      message: '천원 단위로 구매 가능합니다.',
      inputMoney: 0,
      shownMoney: '',
      balance: 1000000, // 잔액
      shownBalance: '',
      charge: '-', // 수수료
      shareNumber: '-', // 주식수
    };
  },

  methods: {
    addMoney(money) {
      this.inputMoney = this.inputMoney + money;
      this.shownMoney = priceToString(this.inputMoney) + '원';

      this.balance -= money;
      this.shownBalance = priceToString(this.balance) + '원';
    },

    addNumber(number) {
      this.inputMoney = Number(String(this.inputMoney) + String(number));
      this.shownMoney = priceToString(this.inputMoney) + '원';

      this.balance = 1000000 - this.inputMoney;
      this.shownBalance = priceToString(this.balance) + '원';
    },

    deleteMoney() {
      this.inputMoney = parseInt(this.inputMoney / 10);
      this.shownMoney = priceToString(this.inputMoney) + '원';

      this.balance = 1000000 - this.inputMoney;
      this.shownBalance = priceToString(this.balance) + '원';
    },

    resetMoney() {
      this.inputMoney = 0;
      this.shownMoney = '구매금액입력';

      this.balance = 1000000;
      this.shownBalance = '1,000,000원';
    },
  },

  created() {
    this.shownBalance = priceToString(this.balance) + '원';
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockBuy.scss';
</style>
