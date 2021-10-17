<template>
  <div id="Game" class="Game game-bg">
    <div class="container">
      <div class="area">
        <div class="orange-hr" />
        <div class="image">
          <div
            class="flow-chart"
            :class="{ 'flow-chart-extend': moMessage != '' }"
          >
            <div
              v-for="(mission, missionIndex) in missionList"
              :key="mission.uid"
              class="flow"
            >
              <div
                class="line"
                :class="{ 'line-orange': missionIndex <= currentMissionIndex }"
              />
              <div v-if="missionIndex == currentMissionIndex" class="mo-circle">
                <img src="@/assets/images/mo/circle.jpg" width="24" />
                <div v-if="moMessage != ''" class="notify">
                  {{ moMessage }}
                </div>
              </div>
              <i
                v-if="
                  missionIndex != currentMissionIndex && mission.uid != giftId
                "
                :class="{
                  'fas fa-check-circle orange':
                    missionIndex < currentMissionIndex,
                  'far fa-circle': missionIndex >= currentMissionIndex,
                }"
              ></i>
              <div
                v-if="mission.uid == giftId"
                class="gift"
                :class="{ orange: missionIndex < currentMissionIndex }"
              >
                <i class="fas fa-gift"></i>
              </div>
            </div>
          </div>
          <img
            v-if="currentMission.image != undefined && !isFinish"
            class="bg"
            :src="getImgUrl(currentMission.image[descriptionIndex])"
          />
          <img v-if="isFinish" class="bg" :src="getImgUrl('bg-13.png')" />
        </div>
        <div class="orange-hr" />
        <div class="content">
          <p v-if="currentMission.description != undefined && !isFinish">
            {{ this.currentMission.description[descriptionIndex] }}
          </p>
          <p v-if="isFinish">
            在蒐集完這三項重要元素後，終於成功說服大魔王遠古神獸-攻城獅將 Mosume
            公主變回三次元人物，並且順利地把公主從臭蟲帝國拯救出來！
            當王宮內正歡欣鼓舞地慶祝公主平安回家時，你突然從這個夢中夢裡驚醒過來，發現
            Mosume 其實是剛剛看的
            vtuber，而自己也不是王國的衛兵，不過是一個可愛的肥宅而已
            ...感到失望的你，腦袋裡面全是 Mosume 的聲音，真是魂牽夢縈 ...
            為了能和她多多親近，你決定「按讚訂閱
            MOすめ_Mosume_高雄某素梅頻道」，這樣就可以和他一直一直在一起了！
          </p>
          <div class="button-area">
            <div
              v-if="
                currentMission.uid != giftId && currentMissionIndex != lastIndex
              "
              class="btn btn-black"
              @click="openModal('task')"
            >
              挑戰遊戲<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="
                currentMission.uid == giftId &&
                currentMissionIndex != lastIndex &&
                descriptionIndex < descriptionLastIndex
              "
              class="btn btn-black"
              @click="continueMission"
            >
              點擊繼續<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="
                currentMission.uid == giftId &&
                descriptionIndex == descriptionLastIndex
              "
              class="btn btn-black"
              @click="openModal('prize')"
            >
              領取獎品<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="
                currentMission.uid == giftId &&
                descriptionIndex == descriptionLastIndex
              "
              class="btn btn-black"
              @click="continueMission()"
            >
              繼續拯救<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="currentMissionIndex == lastIndex && !isFinish"
              class="btn btn-black"
              @click="openModal('task')"
            >
              搜集元素<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="isFinish"
              class="btn btn-black"
              @click="openModal('reward')"
            >
              參加抽獎<i class="fas fa-arrow-right"></i>
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
      <h1 v-if="modalType === 'reward'" class="color-orange">抽獎方式</h1>
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
        <div class="btn btn-black" @click="leaveGame">離開遊戲</div>
      </div>
    </div>
    <Form
      v-if="modalType === 'task' && answerList.length > 0"
      @submit="continueMission"
      class="modal-body"
    >
      <div class="question-list">
        <div
          v-for="(question, questionIndex) in questionList"
          :key="question.name"
          :class="{ question: questionList.length > 1 }"
        >
          <div class="title">
            <img src="@/assets/images/title-tag.svg" />
            <h3>提示</h3>
          </div>
          <p :class="{ 'mb-2': question.description_e != '' }">
            {{ question.description }}
          </p>
          <div
            v-if="question.description_e != ''"
            class="btn btn-black btn-inline-block mb-6"
            @click="openWindow(question.description_e)"
          >
            前往遊戲
          </div>
          <div class="title">
            <img src="@/assets/images/title-tag.svg" />
            <h3>題目</h3>
          </div>
          <p>{{ question.name }}</p>
          <div class="title">
            <img src="@/assets/images/title-tag.svg" />
            <h3>請輸入您的答案</h3>
          </div>
          <Field
            v-model="answerList[questionIndex].vkey"
            :name="'answer' + questionIndex"
            class="input"
            :class="{
              'col-10': questionList.length == 1,
              'input-auto': questionList.length > 1,
            }"
            placeholder="輸入您的答案"
          />
          <div class="input-error" v-show="answerList[questionIndex].message">
            <i class="fas fa-times-circle"></i
            >{{ answerList[questionIndex].message }}
          </div>
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
        <div
          class="btn btn-black"
          @click="downloadPrize(questionList[0]['description_e'])"
        >
          下載獎品
        </div>
      </div>
    </div>
    <div v-if="modalType === 'reward'" class="modal-body">
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
        <p>就有機會獲得 MOPCON 2021 各項精美紀念品！！</p>
      </div>
      <div class="button-area">
        <div class="btn btn-black" @click="redirectTo('/reward')">立即參加</div>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal';
import { Field, Form } from 'vee-validate';
import api from '../apis/index';
export default {
  name: 'Game',
  components: {
    Modal,
    Field,
    Form,
  },
  provide() {
    return {
      api: api,
    };
  },
  props: {
    blackMode: Boolean,
  },
  data() {
    return {
      modalOpen: false,
      modalType: 'task',
      missionList: {},
      moMessage: '',
      currentMission: {},
      currentMissionIndex: 0,
      giftId: '',
      lastIndex: 0,
      isFinish: false,
      questionList: [],
      answerList: [],
      descriptionLastIndex: 0,
      descriptionIndex: 0,
    };
  },
  created() {
    this.getMeData();
    this.$emit('canPrevious', true);
  },
  emits: ['canPrevious', 'showLoading'],
  methods: {
    redirectTo(url) {
      this.$router.push({ path: url });
    },
    openLeaveGame() {
      this.openModal('leave');
    },
    leaveGame() {
      window.location.href = process.env.VUE_APP_LEAVE_URL;
    },
    openModal(type) {
      this.modalType = type;
      const vm = this;
      vm.modalOpen = true;
    },
    closeModal(show) {
      this.modalOpen = show;
    },
    openWindow(url) {
      window.open(url);
    },
    continueMission() {
      this.$emit('showLoading', true);
      if (this.descriptionIndex === this.descriptionLastIndex) {
        const data = {
          answer: this.answerList,
        };
        this.moMessage = '';
        this.verify(data);
      } else {
        this.descriptionIndex++;
        this.$emit('showLoading', false);
      }
    },
    getMeData() {
      this.$emit('showLoading', true);
      api.auth
        .me()
        .then((response) => {
          let res = response.data;
          this.missionList = res.data.mission_list;
          this.currentMissionIndex = parseInt(res.data.current_mission) - 1;
          this.currentMission = this.missionList[this.currentMissionIndex];
          this.descriptionLastIndex =
            this.currentMission.description.length - 1;
          this.lastIndex = this.missionList.length - 1;
          this.giftId = res.data.gift_mission;
          this.getTaskData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTaskData() {
      let uid = this.currentMission.uid;
      api.game
        .getTask(uid)
        .then((response) => {
          let res = response.data;
          this.questionList = res.data[0].questions;
          this.answerList = {};
          setTimeout(() => {
            this.answerList = this.questionList.map(function (item) {
              return {
                uid: item.uid,
                vkey: '',
                message: '',
                pass: false,
              };
            });
          }, 0);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('showLoading', false);
        });
    },
    previousPage() {
      this.$emit('showLoading', true);
      this.moMessage = '';
      if (this.descriptionIndex != 0) {
        this.descriptionIndex--;
        this.$emit('showLoading', false);
      } else if (this.currentMissionIndex == 0) {
        this.redirectTo('/introduction');
      } else {
        this.currentMissionIndex--;
        this.currentMission = this.missionList[this.currentMissionIndex];
        this.descriptionLastIndex = this.currentMission.description.length - 1;
        this.descriptionIndex = this.descriptionLastIndex;
        this.getTaskData();
        const missionList = this.missionList;
        this.missionList = [];
        this.scrollToId('Game');
        setTimeout(() => {
          this.missionList = missionList;
        }, 0);
      }
    },
    nextMission() {
      this.$emit('showLoading', true);
      if (this.currentMissionIndex == this.lastIndex) {
        this.isFinish = true;
        this.scrollToId('Game');
      } else {
        this.currentMissionIndex++;
        this.currentMission = this.missionList[this.currentMissionIndex];
        this.descriptionLastIndex = this.currentMission.description.length - 1;
        this.descriptionIndex = 0;
        this.getTaskData();
        const missionList = this.missionList;
        this.missionList = [];
        if (this.currentMissionIndex === this.lastIndex) {
          this.moMessage = '恭喜完成所有挑戰！';
        } else {
          this.moMessage = '恭喜答對了！繼續挑戰下一關吧';
        }
        this.scrollToId('Game');
        setTimeout(() => {
          this.missionList = missionList;
        }, 0);
      }
    },
    verify(data) {
      api.game
        .verify('question', data)
        .then((response) => {
          let res = response.data;
          let isPass = true;
          for (let i = 0; i < this.answerList.length; i++) {
            this.answerList[i].message = res.message[i].message;
            this.answerList[i].pass = res.message[i].pass;
            if (!this.answerList[i].pass) {
              isPass = false;
            }
          }

          if (isPass) {
            this.nextMission();
            this.closeModal(false);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('showLoading', false);
        });
    },
    scrollToId(id) {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth' });
    },
    getImgUrl(pic) {
      return require('@/assets/images/game/' + pic);
    },
    downloadPrize(url) {
      this.$emit('showLoading', true);
      api.game
        .download(url)
        .then((response) => {
          this.downloadFile(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$emit('showLoading', false);
        });
    },
    downloadFile(data) {
      if (!data) {
        return;
      }

      let blob = new Blob([data.data], {
        type: 'application/zip',
      });
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = window.URL.createObjectURL(blob);

      const fileName = 'mosume_gift.zip';
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
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
    .bg {
      width: 100%;
      vertical-align: middle;
    }
    .flow-chart {
      @include flex(normal, row, center);
      position: absolute;
      width: 100%;
      height: 80px;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1;
      .flow {
        @include flex(normal, row, center);
        width: 100%;
      }
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
      .gift.line-orange {
        border: 1px solid $colorOrange;
        background: $colorWhite;
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
      .mo-circle .notify,
      .gift .notify {
        width: 242px;
        position: absolute;
        font-size: 14px;
        color: orange;
        background: white;
        border-radius: 8px;
        padding: 4px 16px;
        border: 1px solid #ff9933;
        top: 30px;
        left: -110px;
      }
      .flow:last-child .mo-circle .notify {
        left: -144px;
        width: 168px;
      }
      .line .mo-circle {
        position: absolute;
        top: -11px;
        right: 0px;
      }
    }
    .flow-chart-extend {
      height: 110px;
      padding-bottom: 30px;
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
    .question-list {
      @include flex;
    }
    .question {
      flex: 1;
      .title {
        width: 100%;
      }
      p {
        width: 100%;
      }
    }
    .question + .question {
      margin-left: 2rem;
    }
    .title {
      @include flex;
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
