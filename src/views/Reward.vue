<template>
  <div class="Reward home-bg">
    <div class="container area">
      <img class="image-mo" src="@/assets/images/mo/caption.png" />
      <div class="box">
        <h2>感謝偉大的勇者加入</h2>
        <h1>拯救了 MO 孃！</h1>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3 class="color-primary">恭喜 {{ nickname }} 破完所有關卡了！</h3>
        </div>
        <p>
          現在只要<span class="color-dark-blue fw-700">截圖此畫面</span
          >即可參加抽獎，詳情可參考底下的抽獎方式。
        </p>
        <p>
          最後，別忘了按讚訂閱 Mosume 高雄某素梅的 YouTube 頻道，並按讚 Facebook
          粉專哦！
        </p>
        <p>那麼，就祝大家都能夠中獎啦！</p>
        <div class="btn-area">
          <div class="btn" @click="openModal">
            抽獎方式<i class="fas fa-arrow-right"></i>
          </div>
          <div
            class="btn btn-orange"
            @click="openWindow('https://www.facebook.com/mopcon')"
          >
            <i class="fab fa-facebook"></i>
            Facebook
          </div>
          <div
            class="btn btn-orange"
            @click="
              openWindow(
                'https://www.youtube.com/channel/UCFpr5TjvP6tFqccS_oTfWHw'
              )
            "
          >
            <i class="fab fa-youtube"></i>
            YouTube
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal
    :modal-open="modalOpen"
    @modal-close="closeModal"
    :black-mode="blackMode"
  >
    <div class="modal-title">
      <h1 class="color-orange">抽獎方式</h1>
    </div>
    <div class="modal-hr" />
    <div class="modal-body">
      <div>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>Step 1</h3>
        </div>
        <p>請將結局畫面截圖</p>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>Step 2</h3>
        </div>
        <p>上傳至粉專置頂貼文</p>
        <div class="title">
          <img src="@/assets/images/title-tag.svg" />
          <h3>Step 3</h3>
        </div>
        <p>就有機會獲得 MOPCON 2021 各項精美紀念品！</p>
      </div>
      <div class="button-area">
        <div class="btn" @click="openWindow('https://www.facebook.com/mopcon')">
          立即參加
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import api from '../apis/index';
export default {
  name: 'Reward',
  provide() {
    return {
      api: api,
    };
  },
  components: {
    Modal,
  },
  data() {
    return {
      modalOpen: false,
      nickname: 'Name',
    };
  },
  props: {
    blackMode: Boolean,
  },
  emits: ['canPrevious', 'showLoading'],
  created() {
    this.getMeData();
  },
  methods: {
    redirectTo(url) {
      this.$router.push({ path: url });
    },
    openModal() {
      const vm = this;
      vm.modalOpen = true;
    },
    closeModal(show) {
      this.modalOpen = show;
    },
    openWindow(url) {
      window.open(url);
    },
    getMeData() {
      this.$emit('showLoading', true);
      api.auth
        .me()
        .then((response) => {
          let res = response.data;
          this.nickname = res.data.nickname;
          const currentMission = res.data.current_mission;
          const missionLength = res.data.mission_list.length;
          if (currentMission != missionLength) {
            this.redirectTo('/game');
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('showLoading', false);
        });
    },
  },
};
</script>

<style lang="scss">
.Reward {
  min-height: 800px;
  height: 100vh;
  .area {
    @include flex(space-between, row, center);
    height: 100%;
    padding-top: 100px;
    padding-bottom: 50px;
  }
  .image-mo {
    width: 35%;
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
      .btn {
        padding: 0rem 1.5rem;
        @include screen(md) {
          padding: 0rem 0.5rem;
          font-size: 1rem;
        }
      }
      .btn-orange svg {
        margin-left: 0;
        margin-right: 0.5rem;
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
    p {
      color: $colorBlack;
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .button-area {
      margin-top: 1.5rem;
    }
  }
}
</style>
