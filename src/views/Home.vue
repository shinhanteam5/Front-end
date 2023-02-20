<template>
  <div class="img-wrapper">
    <img class="home" src="../assets/pages/home.png" alt="" />

    <!-- 모달 창 -->
    <div class="modal">
      <div class="modal-contents">
        <div class="contents-col1">
          <p>주식 투자를</p>
          <p>소액으로 간편하게!</p>
          <div>
            <router-link to="/frac" id="frac-link"
              >소수점 투자하러 가기</router-link
            >
          </div>
        </div>
        <div class="contents-col2">
          <img
            class="character"
            src="../assets/characters/character1.png"
            alt=""
          />
        </div>
      </div>
      <div class="modal-bottom">
        <button>오늘 보지 않기</button>
        <button>닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_home.scss';
</style>
