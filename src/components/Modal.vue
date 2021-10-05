<template>
  <div>
    <div
      id="myModal"
      class="modal fade"
      :class="{ show: show }"
      :style="{ 'display: flex': show }"
    >
      <div class="modal-content" :class="{ 'modal-content-black': blackMode }">
        <div class="clearfix">
          <span class="close" @click="close()">
            <i class="fas fa-times"></i>
          </span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalOpen: Boolean,
    blackMode: Boolean,
  },
  data() {
    return {
      show: this.modalOpen,
    };
  },
  watch: {
    modalOpen(show) {
      this.modalChange(show);
      this.show = show;
    },
    show(show) {
      this.$emit('modal-close', show);
    },
  },
  mounted() {
    const vm = this;
    if (this.show) {
      vm.modalChange(true);
    }
    window.onclick = function (event) {
      const modal = document.getElementById('myModal');
      if (event.target === modal) {
        vm.close();
        vm.modalChange();
      }
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    modalChange(status = false) {
      const body = document.querySelector('html, body');
      const modal = document.getElementById('myModal');
      if (status) {
        body.classList.add('modal-open');
        modal.style.display = 'flex';
      } else {
        modal.style.display = 'none';
        modal.classList.remove('show');
        body.classList.remove('modal-open');
      }
    },
  },
};
</script>

<style lang="scss">
/* The Modal (background) */
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal {
  display: none;
  align-items: center;
  position: fixed;
  z-index: 1071;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal.fade {
  opacity: 0;
}
.modal.show {
  opacity: 1;
}

/* Modal Content */
.modal.fade .modal-content {
  background-color: #ffffff;
  border: 2px solid $colorOrange;
  border-radius: 10px;
  margin: 50px auto;
  width: 90%;
  max-width: 850px;
  transform: translate(0, -50px);
  transition: transform 0.3s ease-out;
  padding: 1rem 3rem 2.5rem;
  @include screen(pad) {
    padding: 1rem 1.5rem;
  }
}

.modal.fade .modal-content-black {
  background-color: $colorBlack;
}

.modal.show .modal-content {
  transform: none;
}

.fade {
  transition: opacity 0.15s linear;
}

/* The Close Button */
.close {
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  float: right;
  svg path {
    color: $colorOrange;
    &:hover {
      color: $colorOrangeLight;
    }
  }
}

.clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
