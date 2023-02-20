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
      <div><i class="fa-solid fa-x"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasInvestment: false,
    };
  },

  methods: {
    openModal() {},
  },
};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
</style>
