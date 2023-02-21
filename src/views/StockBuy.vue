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
          <input placeholder="구매금액입력" />
          <p>천원 단위로 구매 가능합니다.</p>
        </form>
        <!-- 예상... -->
        <div class="info">
          <div>
            <p class="grey">주문 가능 금액</p>
            <p>100,000원</p>
          </div>
          <div>
            <p class="grey">예상 수수료</p>
            <p>-</p>
          </div>
          <div>
            <p class="grey">예상 주식수</p>
            <p>-</p>
          </div>
        </div>
        <!-- 버튼 4개 -->
        <div class="buttons">
          <button>1천원</button>
          <button>1만원</button>
          <button>5만원</button>
          <button>10만원</button>
        </div>
        <!-- 숫자 입력 -->
        <section class="numbers">
          <div class="row">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
          <div class="row">
            <div>4</div>
            <div>5</div>
            <div>6</div>
          </div>
          <div class="row">
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
          <div class="row">
            <div id="word">초기화</div>
            <div>0</div>
            <div class="delete-icon">
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
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_stockBuy.scss';
</style>
