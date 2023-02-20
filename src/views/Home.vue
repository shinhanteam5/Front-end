<template>
  <div class="img-wrapper">
    <img class="home" src="../assets/home.png" alt="" />

    <!-- 모달 창 -->
    <div class="modal">
      <div class="modal-contents">
        <div class="">
          <p>주식 투자를</p>
          <p>소액으로 간편하게!</p>
          <button>소수점 투자하러 가기</button>
        </div>
        <div>
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
@import '../scss/_variables.scss';
@import '../scss/views/_home.scss';
</style>
