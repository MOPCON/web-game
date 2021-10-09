<template>
  <div class="Game game-bg">
    <div class="container">
      <div class="area">
        <div class="orange-hr" />
        <div class="image">
          <div class="flow-chart flow-chart-extend">
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
                <img src="@/assets/images/mo-circle.jpg" width="24" />
                <div v-if="moMessage != ''" class="notify">
                  {{ moMessage }}
                </div>
              </div>
              <i
                v-if="
                  missionIndex != currentMissionIndex &&
                  missionIndex != giftIndex
                "
                :class="{
                  'fas fa-check-circle orange':
                    missionIndex < currentMissionIndex,
                  'far fa-circle': missionIndex >= currentMissionIndex,
                }"
              ></i>
              <div
                v-if="missionIndex == giftIndex"
                class="gift"
                :class="{ orange: missionIndex < currentMissionIndex }"
              >
                <i class="fas fa-gift"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="orange-hr" />
        <div class="content">
          <p>
            {{ this.currentMission.description }}
          </p>
          <div class="button-area">
            <div
              v-if="
                currentMissionIndex != giftIndex &&
                currentMissionIndex != lastIndex
              "
              class="btn btn-black"
              @click="openModal('task')"
            >
              挑戰遊戲<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="currentMissionIndex == giftIndex"
              class="btn btn-black"
              @click="openModal('prize')"
            >
              領取獎品<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="currentMissionIndex == giftIndex"
              class="btn btn-black"
              @click="continueMission()"
            >
              繼續拯救<i class="fas fa-arrow-right"></i>
            </div>
            <div
              v-if="currentMissionIndex == lastIndex"
              class="btn btn-black"
              @click="redirectTo('/reward')"
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
      v-if="modalType === 'task' && answerList.length > 0"
      @submit="onSubmit"
      class="modal-body"
    >
      <div class="question-list">
        <div
          v-for="(question, questionIndex) in questionList"
          :key="question.name"
          class="question"
        >
          <div class="title">
            <img src="@/assets/images/title-tag.svg" />
            <h3>提示</h3>
          </div>
          <p>{{ question.description }}</p>
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
        <p>{{ questionList[0].description }}</p>
      </div>
      <div class="button-area">
        <div
          class="btn btn-black"
          @click="downloadPrize(questionList[0].uid, questionList[0].name)"
        >
          下載獎品
        </div>
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
      giftIndex: 6,
      lastIndex: 0,
      questionList: [],
      answerList: [],
    };
  },
  created() {
    this.getMeData();
    this.$emit('can-previous', true);
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
    openWindow(url) {
      window.open(url);
    },
    onSubmit() {
      const data = {
        answer: this.answerList,
      };
      this.moMessage = '';
      this.verify(data);
    },
    downloadPrize(url) {
      this.openWindow(url);
    },
    continueMission(uid) {
      const data = {
        answer: [
          {
            uid: uid,
            vkey: '',
          },
        ],
      };
      this.verify(data);
    },
    getMeData() {
      api.auth
        .me()
        .then((response) => {
          this.missionList = Object.assign({}, this.missionList);
          let res = response.data;
          this.missionList = res.data.mission_list;
          this.currentMissionIndex = parseInt(res.data.current_mission) - 1;
          this.currentMission = this.missionList[this.currentMissionIndex];
          this.lastIndex = this.missionList.length - 1;
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
        });
    },
    previousPage() {
      this.moMessage = '';
      if (this.currentMissionIndex == 0) {
        this.redirectTo('/introduction');
      } else {
        this.currentMissionIndex--;
        this.currentMission = this.missionList[this.currentMissionIndex];
        this.getTaskData();
        const missionList = this.missionList;
        this.missionList = [];
        setTimeout(() => {
          this.missionList = missionList;
        }, 0);
      }
    },
    nextMission() {
      this.currentMissionIndex++;
      this.currentMission = this.missionList[this.currentMissionIndex];
      this.getTaskData();
      const missionList = this.missionList;
      this.missionList = [];
      if (this.currentMissionIndex === this.lastIndex) {
        this.moMessage = '恭喜完成所有挑戰！';
      } else {
        this.moMessage = '恭喜答對了！繼續挑戰下一關吧';
      }
      setTimeout(() => {
        this.missionList = missionList;
      }, 0);
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
        });
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
