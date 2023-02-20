<template>
  <div class="img-wrapper">
    <div class="background">
      <div id="bottom-bar">
        <img src="../assets/components/bottom-bar.jpg" alt="" />
      </div>
      <img id="top-bar" src="../assets/components/top-bar.png" alt="" />
      <div class="selection-wrapper">
        <h1>희망하는 <span>투자 성향</span>을 선택하세요</h1>
        <section class="tendency-wrapper">
          <div class="tendency-col1">
            <h2>공격형</h2>
            <div class="img-wrapper">
              <img src="../assets/characters/character5.png" alt="" />
            </div>
          </div>
          <div class="tendency-col2">
            <div class="col2-row1">
              <div class="category">
                <p id="first">매우 높은 위험</p>
                <p id="second">높은 위험</p>
              </div>
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
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
            <div class="col2-row2 contents">
              시장평균 수익률을 훨씬 넘어서는 높은 수준의 투자수익을 추구하며,
              이를 위해 자산가치의 변동에 따른
              <span id="red">손실위험을 적극 수용</span>함
            </div>
          </div>
        </section>
        <section class="tendency-wrapper">
          <div class="tendency-col1">
            <h2>중립형</h2>
            <div class="img-wrapper">
              <img src="../assets/characters/character6.png" alt="" />
            </div>
          </div>
          <div class="tendency-col2">
            <div class="col2-row1">
              <div class="category">
                <p id="third">다소 높은 위험</p>
                <p id="fourth">보통 위험</p>
              </div>
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
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
            <div class="col2-row2 contents">
              투자에 상응하는 투자위험이 있음을 충분히 인식하고
              <span id="orange">일정 수준의 손실 위험을 감수</span>할 수 있음
            </div>
          </div>
        </section>
        <section class="tendency-wrapper">
          <div class="tendency-col1">
            <h2>안정형</h2>
            <div class="img-wrapper">
              <img
                id="seal-character"
                src="../assets/characters/character4.png"
                alt=""
              />
            </div>
          </div>
          <div class="tendency-col2">
            <div class="col2-row1">
              <div class="category">
                <p id="fifth">낮은 위험</p>
                <p id="sixth">매우 낮은 위험</p>
              </div>
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
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
            <div class="col2-row2 contents">
              투자원금의 손실위험은 최소화하고, 이자소득이나 배당소득 수준의
              <span id="purple">안정적인 투자</span>를 목표로 함
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';
@import '../scss/views/_frac.scss';
@import '../scss/views/_tendency.scss';
</style>
