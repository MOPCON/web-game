<template>
  <div class="Game game-bg">
    <div class="container">
      <div class="area">
        <div class="orange-hr" />
        <div class="image">
          <div class="flow-chart">
            <div class="line line-orange" />
            <i class="fas fa-check-circle orange"></i>
            <div class="line line-orange" />
            <div class="mo-circle">
              <img src="@/assets/images/mo-circle.jpg" width="24" />
            </div>
            <div class="line line-orange">
              <div class="mo-circle">
                <img src="@/assets/images/mo-circle.jpg" width="24" />
              </div>
            </div>
            <div class="gift orange"><i class="fas fa-gift"></i></div>
            <div class="line" />
            <i class="far fa-circle"></i>
            <div class="line" />
            <i class="far fa-circle"></i>
            <div class="line" />
            <div class="gift"><i class="fas fa-gift"></i></div>
            <div class="line" />
            <i class="far fa-circle"></i>
            <div class="line" />
            <i class="far fa-circle"></i>
          </div>
        </div>
        <div class="orange-hr" />
        <div class="content">
          <p>
            當你終於到達了臭蟲帝國之後，發現這裡的王宮戒備森嚴，於是決定等到晚上再作打算。一路上風塵僕僕，你已經餓扁了。因此，你急需找一點食物，剛好有人跟你說，某個地方需要你去做一份工作，為了食物，你只好姑且一試...
          </p>
          <div class="button-area">
            <div class="btn btn-black" @click="openModal('prize')">
              領取獎品<i class="fas fa-arrow-right"></i>
            </div>
            <div class="btn btn-black" @click="openModal('task')">
              挑戰遊戲<i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <div class="orange-hr" />
      </div>
    </div>
  </div>
  <Modal
    :modal-open="modalOpen"
    @modal-close="closeModal"
    :black-mode="blackMode"
  >
    <div class="modal-title">
      <h1 v-if="modalType === 'leave'" class="color-orange">
        是否要退出遊戲？
      </h1>
      <h1 v-if="modalType === 'task'" class="color-orange">挑戰任務</h1>
      <h1 v-if="modalType === 'prize'" class="color-orange">領取獎品</h1>
    </div>
    <div class="modal-hr" />
    <div v-if="modalType === 'leave'" class="modal-body">
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>提示</h3>
        </div>
        <p>
          你就快要完成任務了，確定要在這邊就結束嗎？給你最後拯救公主的機會！
        </p>
      </div>
      <div class="button-area">
        <div class="btn btn-black" @click="closeModal(false)">取消</div>
        <div class="btn btn-black" @click="redirectTo('/leave')">離開遊戲</div>
      </div>
    </div>
    <Form
      v-if="modalType === 'task'"
      @submit="onSubmit"
      v-slot="{ errors }"
      :validation-schema="schema"
      class="modal-body"
    >
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>提示</h3>
        </div>
        <p>請找到並前往攤位 A 完成任務。</p>
      </div>
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>題目</h3>
        </div>
        <p>請問做完這份工作後，你得到幾個 MO 幣？</p>
      </div>
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>請輸入您的答案</h3>
        </div>
        <Field name="answer" class="input col-10" placeholder="輸入您的答案" />
        <div class="input-error" v-if="errors.answer">
          <i class="fas fa-times-circle"></i>{{ errors.answer }}
        </div>
      </div>
      <div class="button-area">
        <button class="btn btn-black">送出答案</button>
      </div>
    </Form>
    <div v-if="modalType === 'prize'" class="modal-body">
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>提示</h3>
        </div>
        <p>
          這裡是遊戲的中繼站，挑戰到這裡辛苦啦！
          為了好好獎賞努力玩大地遊戲的大家，今年 MOPCON
          特別提供數位獎品讓你下載哦！ btw 如果繼續挑戰，把 Mosume
          解救出來的話，將有機會獲得更棒的神秘獎勵唷！
        </p>
      </div>
      <div class="button-area">
        <div class="btn btn-black" @click="downloadPrize()">下載獎品</div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
export default {
  name: 'Game',
  components: {
    Modal,
    Field,
    Form,
  },
  setup() {
    const schema = Yup.object().shape({
      answer: Yup.string().required('請檢查您的答案'),
    });
    return {
      schema,
    };
  },
  props: {
    blackMode: Boolean,
  },
  data() {
    return {
      modalOpen: false,
      modalType: 'task',
    };
  },
  emits: ['canPrevious'],
  methods: {
    redirectTo(url) {
      this.$router.push({ path: url });
    },
    openLeaveGame() {
      this.openModal('leave');
    },
    openModal(type) {
      this.modalType = type;
      const vm = this;
      vm.modalOpen = true;
    },
    closeModal(show) {
      this.modalOpen = show;
    },
    onSubmit(values) {
      // TODO: call api
      console.log(JSON.stringify(values, null, 2));
      this.redirectTo('/reward');
    },
    downloadPrize() {
      console.log('download prize');
    },
  },
};
</script>

<style lang="scss">
.Game {
  min-height: 100vh;
  height: 100%;
  .container {
    height: 100%;
    padding-top: 100px;
    padding-bottom: 50px;
  }
  .area {
    flex-grow: 1;
  }
  .orange-hr {
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      rgba(255, 153, 51, 0.6) 0%,
      #fb8628 49.48%,
      rgba(255, 153, 51, 0.6) 100%
    );
  }
  .image {
    width: 100%;
    height: 700px;
    background-color: rgb(73, 73, 73);
    .flow-chart {
      @include flex(normal, row, center);
      position: absolute;
      width: 100%;
      height: 80px;
      background: rgba(0, 0, 0, 0.4);
      .line {
        width: 100%;
        height: 4px;
        background: $colorGray;
        border-radius: 8px;
      }
      .line-orange {
        background: $colorOrange;
      }
      svg {
        font-size: 1.25rem;
        path {
          color: $colorGray;
        }
        &.orange path {
          color: $colorOrange;
        }
      }
      svg + .line,
      .gift + .line,
      .mo-circle + .line {
        margin-left: 0.5rem;
      }
      .gift {
        @include flex;
        background: $colorGray;
        border-radius: 12px;
        padding: 4px;
        svg {
          font-size: 1rem;
        }
        path {
          color: $colorPrimary;
        }
      }
      .gift.orange {
        border: 1px solid $colorOrange;
        background: $colorOrange;
        svg path {
          color: $colorWhite;
        }
      }
      .mo-circle {
        width: 26px;
        height: 26px;
        border: 1px solid $colorOrange;
        border-radius: 12px;
        img {
          border-radius: 11px;
        }
      }
      .line .mo-circle {
        position: absolute;
        top: -11px;
        right: 0px;
      }
    }
  }
  .content {
    @include flex(normal, row);
    margin-top: 1rem;
    margin-bottom: 1rem;
    p {
      color: $colorWhite;
      flex: 1;
    }
    .button-area {
      @include flex(flex-end, column, center);
      margin-right: 1rem;
      margin-left: 1rem;
      .btn + .btn {
        margin-top: 1rem;
      }
    }
  }
}
.modal > .modal-content-black {
  .modal-title {
    @include flex(center);
  }
  .modal-hr {
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
  .modal-body {
    @include flex(normal, column, center);
    .title {
      @include flex;
      width: 450px;
      h3 {
        margin-left: 0.5rem;
      }
    }
    p {
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
      color: $colorWhite;
    }
    .input {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .button-area {
      @include flex;
      margin-top: 1.5rem;
      .btn + .btn {
        margin-left: 2rem;
      }
    }
  }
}
</style>
