<template>
  <div class="Login home-bg">
    <div class="container">
      <div class="area">
        <div class="image">image</div>
        <div class="box">
          <h2>即刻回到戰場</h2>
          <h1>讓世人記得勇者大人的名號</h1>
          <div class="title">
            <img src="@/assets/images/title-tag.svg" />
            <h3 class="color-primary">請輸入您的帳號/電子郵件</h3>
          </div>
          <div class="form-input">
            <input
              id="email"
              type="email"
              class="input col-8"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div class="title">
            <img src="@/assets/images/title-tag.svg" />
            <h3 class="color-primary">請輸入您的密碼</h3>
          </div>
          <div class="form-input form-password">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              class="input col-8"
              placeholder="6-18位數密碼，請區分大小寫"
              required
            />
            <span class="togglePassword" @click="togglePassword"> 顯示 </span>
          </div>
          <div class="btn-area">
            <div class="btn btn-orange">
              登入<i class="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss">
.Login {
  min-height: 100vh;
  height: 100vh;
  .container {
    @include flex(center, row, center);
    height: 100%;
  }
  .area {
    @include flex(space-between, row, stretch);
    flex-grow: 1;
  }
  .image {
    @include flex(center, row, center);
    width: 30%;
    border: 1px $colorGray solid;
    background-color: $colorWhiteLight;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 8px 0px 0px 8px;
  }
  .box {
    width: 70%;
    padding: 2.5rem 5rem;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 0px 8px 8px 0px;
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
      @include flex(flex-end);
      margin-top: 3rem;
    }
  }
}
</style>
