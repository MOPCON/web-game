<template>
  <div>
    <loading v-model:active="isLoading"></loading>
  </div>
  <div v-if="!isMobile">
    <Navbar
      :black-mode="blackMode"
      :can-previous="canPrevious"
      v-on:previous-page="previousPageEmit"
      v-on:open-leave-game="openLeaveGameEmit"
    />
    <router-view v-slot="{ Component }">
      <component
        ref="view"
        :is="Component"
        :black-mode="blackMode"
        v-on:can-previous="canPreviousEmit"
        v-on:show-loading="showLoading"
      />
    </router-view>
  </div>
  <div v-if="isMobile">
    <CrowdedNotice />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import CrowdedNotice from '@/components/CrowdedNotice.vue';
export default {
  components: {
    Navbar,
    CrowdedNotice,
  },
  data() {
    return {
      innerWidth: null,
      canPrevious: false,
      isLoading: false,
    };
  },
  computed: {
    isMobile() {
      return this.innerWidth <= 768;
    },
    blackMode() {
      const path = this.$route.path;
      let isBlackMode = false;
      if (path === '/introduction' || path === '/game') {
        isBlackMode = true;
      }
      return isBlackMode;
    },
  },
  mounted() {
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.innerWidth = window.innerWidth;
    },
    canPreviousEmit(data) {
      this.canPrevious = data;
    },
    previousPageEmit() {
      this.$refs.view.previousPage();
    },
    openLeaveGameEmit() {
      this.$refs.view.openLeaveGame();
    },
    showLoading(isShow) {
      this.isLoading = isShow;
    },
  },
};
</script>
