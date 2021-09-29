<template>
  <div v-if="!isMobile">
    <Navbar />
    <router-view />
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
