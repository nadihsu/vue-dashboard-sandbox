<template>
  <transition name="modal">
    <ModalMask>
      <ModalBlock>
        <button @click="close">
          x
        </button>
        <slot />
      </ModalBlock>
    </ModalMask>
  </transition>
</template>

<script>
import ModalMask from './ModalMask.vue';
import ModalBlock from './ModalBlock.vue';

export default {
  components: {
    ModalMask,
    ModalBlock,
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
