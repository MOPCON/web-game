<template>
  <div class="Register home-bg">
    <div class="container">
      <div class="area">
        <div class="image">image</div>
        <div class="box">
          <h2>即刻化身勇者加入</h2>
          <h1>讓世人記得勇者大人的名號</h1>
          <Form
            @submit="onSubmit"
            v-slot="{ errors }"
            :validation-schema="schema"
          >
            <div class="title">
              <img src="@/assets/images/title-tag.svg" />
              <h3 class="color-primary">請輸入您的帳號/電子郵件</h3>
            </div>
            <div class="form-input">
              <Field
                name="email"
                class="input col-8"
                placeholder="example@gmail.com"
              />
              <div class="input-error" v-if="errors.email">
                <i class="fas fa-times-circle"></i>{{ errors.email }}
              </div>
            </div>
            <div class="title">
              <img src="@/assets/images/title-tag.svg" />
              <h3 class="color-primary">請輸入您的密碼</h3>
            </div>
            <div class="form-input form-password">
              <Field
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="input col-8"
                placeholder="6-18位數密碼，請區分大小寫"
              />
              <span class="togglePassword" @click="togglePassword"> 顯示 </span>
              <div class="input-error" v-if="errors.password">
                <i class="fas fa-times-circle"></i>{{ errors.password }}
              </div>
            </div>
            <div class="title">
              <img src="@/assets/images/title-tag.svg" />
              <h3 class="color-primary">請確認您的密碼</h3>
            </div>
            <div class="form-input form-password">
              <Field
                name="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="input col-8"
                placeholder="再次輸入您的密碼"
              />
              <span class="togglePassword" @click="toggleConfirmPassword">
                顯示
              </span>
              <div class="input-error" v-if="errors.confirmPassword">
                <i class="fas fa-times-circle"></i>{{ errors.confirmPassword }}
              </div>
            </div>
            <div class="form-group">
              <div>
                <div class="title">
                  <img src="@/assets/images/title-tag.svg" />
                  <h3 class="color-primary">請輸入您的暱稱</h3>
                </div>
                <Field
                  name="nickname"
                  class="input input-auto"
                  placeholder="輸入您的暱稱"
                />
                <div class="input-error" v-if="errors.nickname">
                  <i class="fas fa-times-circle"></i>{{ errors.nickname }}
                </div>
              </div>
              <div>
                <div class="title">
                  <img src="@/assets/images/title-tag.svg" />
                  <h3 class="color-primary">請輸入您的購票序號</h3>
                </div>
                <Field
                  name="ticketId"
                  class="input input-auto"
                  placeholder="輸入您的購票序號"
                />
                <div class="input-error" v-if="errors.ticketId">
                  <i class="fas fa-times-circle"></i>{{ errors.ticketId }}
                </div>
              </div>
            </div>
            <div class="policy form-checkbox">
              <Field
                v-model="checkPolicy"
                id="policy"
                name="policy"
                type="checkbox"
                class="input"
                value="policy"
                :class="{ valid: checkPolicy === undefined && errors.policy }"
              />
              <label for="policy"></label>
              <span class="policy-content"
                >我已閱讀並同意 MOPCON 的<span
                  class="link-orange fw-700"
                  @click="openModal()"
                  >隱私權使用政策</span
                ></span
              >
            </div>
            <div class="btn-area">
              <button class="btn btn-orange">
                註冊<i class="fas fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
  <Modal :modal-open="modalOpen" @modal-close="closeModal">
    <div class="modal-title">
      <h1 class="color-orange">蒐集個人資料告知事項</h1>
    </div>
    <div class="modal-hr" />
    <div class="modal-body">
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>個人資料提供同意</h3>
        </div>
        <div class="policy-description">
          MOPCON
          科技年會為遵守個人資料保護法規定，在您提供個人資料予本單位前，依法告知下列事項：<br />
          一、因提供年會相關資訊等目的而獲取您下列個人資料類別：姓名（別稱可）、連絡方式（E-MAIL）等，或其他得以直接或間接識別您個人之資料。<br />
          二、本年會將依個人資料保護法及相關法令之規定下，依隱私權保護政策，蒐集、處理
        </div>
      </div>
      <div class="policy form-checkbox">
        <Field
          v-model="checkPolicy"
          id="policy-modal"
          type="checkbox"
          class="input"
          value="policy"
        />
        <label for="policy-modal"></label>
        <span class="policy-content">我已閱讀並同意</span>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
export default {
  name: 'Register',
  components: {
    Modal,
    Field,
    Form,
  },
  setup() {
    function onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    }
    const schema = Yup.object().shape({
      email: Yup.string().required('請輸入您的帳號/電子郵件'),
      password: Yup.string()
        .min(6, '密碼最少 6 碼')
        .max(18, '密碼最多 18 碼')
        .required('請輸入您的密碼'),
      confirmPassword: Yup.string()
        .required('請輸入您的密碼')
        .oneOf([Yup.ref('password')], '請與密碼輸入一致'),
      nickname: Yup.string().required('請輸入您的暱稱'),
      ticketId: Yup.string().required('請輸入您的購票序號'),
      policy: Yup.string().required(),
    });
    return {
      onSubmit,
      schema,
    };
  },
  data() {
    return {
      modalOpen: false,
      showPassword: false,
      showConfirmPassword: false,
      checkPolicy: '',
    };
  },
  methods: {
    openModal() {
      const vm = this;
      vm.modalOpen = true;
    },
    closeModal(show) {
      this.modalOpen = show;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
  },
};
</script>

<style lang="scss">
.Register {
  min-height: 100vh;
  height: 100vh;
  .container {
    padding-top: 100px;
  }
  .area {
    @include flex(space-between, row, stretch);
    flex-grow: 1;
  }
  .image {
    @include flex(center, row, center);
    width: 35%;
    border: 1px $colorGray solid;
    background-color: $colorWhiteLight;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 8px 0px 0px 8px;
  }
  .box {
    width: 65%;
    padding: 2.5rem 5rem;
    background: $colorWhite;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 0px 8px 8px 0px;
    p {
      margin-bottom: 0.5rem;
    }
    .title {
      @include flex;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
      h3 {
        margin-left: 0.5rem;
      }
    }
    .btn-area {
      @include flex(flex-end);
      margin-top: 3rem;
    }
    .form-group {
      @include flex;
      > div {
        flex: 1;
      }
      > div + div {
        margin-left: 1.5rem;
      }
    }
    .policy {
      margin-top: 1.5rem;
      &-content {
        margin-left: 0.5rem;
      }
    }
  }
}

.modal {
  &-title {
    @include flex(center);
  }
  &-hr {
    width: 90%;
    height: 2px;
    margin: 2.5rem auto;
    background: linear-gradient(
      90deg,
      rgba(255, 153, 51, 0.6) 0%,
      #fb8628 49.48%,
      rgba(255, 153, 51, 0.6) 100%
    );
  }
  &-body {
    @include flex(normal, column, center);
    .title {
      @include flex;
      h3 {
        margin-left: 0.5rem;
      }
    }
    .policy-description {
      width: 450px;
      height: 280px;
      border: 1px solid $colorGray;
      font-size: 1.25rem;
      overflow-y: auto;
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
    }
    .policy {
      margin-top: 3rem;
      &-content {
        margin-left: 0.5rem;
        font-size: 1rem;
      }
    }
  }
}
</style>
