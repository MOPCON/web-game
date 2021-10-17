<template>
  <div class="navbar">
    <nav class="container">
      <a href="https://mopcon.org/2021/">
        <img v-if="!blackMode" src="@/assets/images/logo-b.svg" />
        <img v-if="blackMode" src="@/assets/images/logo-w.svg" />
      </a>
      <div v-if="blackMode" class="item-list">
        <div v-if="canPrevious" class="item" @click="previousPage">
          <i class="fas fa-arrow-left"></i>
          <span>回上一頁</span>
        </div>
        <div class="item" @click="openLeaveGame">
          <i class="fas fa-sign-out-alt"></i>
          <span>退出遊戲</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    blackMode: Boolean,
    canPrevious: Boolean,
  },
  methods: {
    previousPage() {
      this.$emit('previous-page');
    },
    openLeaveGame() {
      this.$emit('open-leave-game');
    },
  },
};
</script>

<style lang="scss">
.navbar {
  width: 100%;
  position: absolute;
  margin-top: 2rem;
  z-index: 100;
  .container {
    @include flex(space-between);
  }
  .item-list {
    @include flex;
  }
  .item {
    margin-left: 1.5rem;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      path {
        color: $colorWhite;
      }
    }
    span {
      color: $colorWhite;
      margin-left: 0.5rem;
    }
  }
}
</style>
