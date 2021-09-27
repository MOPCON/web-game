<template>
  <div class="CrowdedNotice home-bg">
    <div class="container">
      <div class="box">
        <div class="image-mo"></div>
        <h1>這裡是不是太擠了...</h1>
        <span>
          建議使用<span class="color-dark-blue fw-700"
            >電腦、筆電與 Chrome 瀏覽器</span
          >開啟遊戲,
          <br />
          來獲得更佳的遊戲體驗。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrowdedNotice',
};
</script>

<style lang="scss">
.CrowdedNotice {
  @include flex(center, row, center);
  min-height: 100vh;
  .box {
    @include flex(center, column, center);
    padding: 2.5rem 1.5rem;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    h1 {
      margin-top: 1rem;
      margin-bottom: 1rem;
      @include screen(sm) {
        font-size: 1.75rem;
      }
    }
    span {
      font-size: 1.25rem;
    }
    .image-mo {
      width: 350px;
      height: 385px;
      border: 1px #000 solid;
    }
  }
}
</style>
