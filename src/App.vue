<template>
  <div v-if="!isMobile">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
  <div v-if="isMobile">
    <CrowdedNotice />
  </div>
</template>

<script>
import CrowdedNotice from '@/components/CrowdedNotice.vue';
export default {
  components: {
    CrowdedNotice,
  },
  data() {
    return {
      innerWidth: null,
    };
  },
  computed: {
    isMobile() {
      return this.innerWidth <= 768;
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
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
