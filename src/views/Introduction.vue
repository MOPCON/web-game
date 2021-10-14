<template>
  <div class="Introduction game-bg">
    <div class="container">
      <div class="area">
        <div class="orange-hr" />
        <div class="image">
          <img
            v-if="introduction.image"
            class="bg"
            :src="getImgUrl(introduction.image)"
          />
          <h3 class="image-title">{{ this.introduction.name }}</h3>
        </div>
        <div class="orange-hr" />
        <div class="content">
          <p>{{ this.introduction.description }}</p>
          <div class="button-area">
            <div class="btn btn-black" @click="nextPage">
              點擊繼續<i class="fas fa-arrow-right"></i>
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
      <h1 class="color-orange">是否要退出遊戲？</h1>
    </div>
    <div class="modal-hr" />
    <div class="modal-body">
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
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import axios from 'axios';
export default {
  name: 'Introduction',
  components: {
    Modal,
  },
  props: {
    blackMode: Boolean,
  },
  data() {
    return {
      introductionList: [],
      introductionId: 1,
      introduction: {},
      modalOpen: false,
    };
  },
  emits: ['canPrevious'],
  created() {
    this.getIntroductionData();
  },
  methods: {
    getIntroductionData() {
      axios
        .get(process.env.VUE_APP_BASE_URL + '/introduction.json')
        .then((response) => {
          this.introductionList = response.data;
          this.getIntroduction(this.introductionId);
        });
    },
    getIntroduction(id) {
      this.introduction = this.introductionList.filter(function (item) {
        return item.id === id;
      })[0];
      this.$emit('can-previous', this.introduction.can_previous);
    },
    nextPage() {
      if (this.introduction.next_type === 'introduction') {
        this.introductionId = this.introduction.next_introduction_id;
        this.getIntroduction(this.introductionId);
      } else {
        this.redirectTo(this.introduction.next_url);
      }
    },
    redirectTo(url) {
      this.$router.push({ path: url });
    },
    previousPage() {
      this.introductionId = this.introduction.previous_introduction_id;
      this.getIntroduction(this.introductionId);
    },
    openLeaveGame() {
      console.log('leave game');
      console.log(this.blackMode);
      this.openModal();
    },
    openModal() {
      const vm = this;
      vm.modalOpen = true;
    },
    closeModal(show) {
      this.modalOpen = show;
    },
    getImgUrl(pic) {
      return require('@/assets/images/game/' + pic);
    },
  },
};
</script>

<style lang="scss">
.Introduction {
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
    .bg {
      width: 100%;
      vertical-align: middle;
    }
    &-title {
      top: 0.5rem;
      position: absolute;
      width: 193px;
      height: 49px;
      color: $colorWhite;
      line-height: 49px;
      padding-left: 1.5rem;
      background: linear-gradient(
        90deg,
        #ff9933 63.54%,
        rgba(255, 153, 51, 0) 100%
      );
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
      width: 450px;
      color: $colorWhite;
    }
    .button-area {
      @include flex;
      margin-top: 2.5rem;
      .btn + .btn {
        margin-left: 2rem;
      }
    }
  }
}
</style>
