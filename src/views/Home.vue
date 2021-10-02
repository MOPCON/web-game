<template>
  <div class="Home home-bg">
    <div class="container area">
      <div class="image-mo"></div>
      <div class="box">
        <h2>即刻化身勇者加入</h2>
        <h1>拯救 MO 孃大挑戰！</h1>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3 class="color-primary">遊戲方法</h3>
        </div>
        <p>
          遊戲過程中需搭配 MOPCON Gather Town
          地圖，並至指定贊助商及社群攤位中獲取線索。
        </p>
        <p>
          聽說只要完成一半的闖關進度，就能獲得精美小獎品乙份！如果你很厲害闖到最後一關，就可以再額外獲得抽獎資格哦！
        </p>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3 class="color-primary">遊戲限制</h3>
        </div>
        <p>
          建議使用<span class="color-dark-blue fw-700"
            >電腦、筆電與 Chrome 瀏覽器</span
          >開啟遊戲。
        </p>
        <p>必須為 MOPCON 2021 購票會眾才擁有參與遊戲及抽獎的資格。</p>
        <div class="btn-area">
          <div class="btn btn-orange" @click="redirectTo('/register')">
            會眾註冊<i class="fas fa-long-arrow-alt-right"></i>
          </div>
          <div class="btn" @click="redirectTo('/login')">
            會眾登入<i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    redirectTo(url) {
      this.$router.push({ path: url });
    },
  },
};
</script>

<style lang="scss">
.Home {
  min-height: 100vh;
  height: 100vh;
  .area {
    @include flex(space-between, row, center);
    height: 100%;
  }
  .image-mo {
    width: 35%;
    height: 650px;
    border: 1px #000 solid;
  }
  .box {
    width: calc(65% - 1rem);
    padding: 2.5rem;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    h3 {
      margin-left: 0.5rem;
    }
    p {
      margin-bottom: 0.5rem;
    }
    .title {
      @include flex;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    .btn-area {
      @include flex(space-evenly);
      margin-top: 3rem;
    }
  }
}
</style>
