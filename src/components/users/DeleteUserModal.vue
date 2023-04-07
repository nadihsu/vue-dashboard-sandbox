<template lang="pug">
span.
  {{ $t('M_CONFIRM_DELETE') }}
span.dialog-footer
  el-button(@click="cancelModal") {{ $t('ACTION.CANCEL') }}
  el-button(type="primary", @click="submitUser").
    {{ $t('ACTION.DELETE') }}
</template>

<script setup lang="ts">
const props = defineProps({
  active: Boolean,
  user: {
    type: Object,
    default() {
      return {};
    },
  },
  closeModal: {
    type: Function,
    default: () => ({}),
  },
  deleteUser: {
    type: Function,
    default: () => Promise,
  },
});

/**
 * 關閉彈窗
 */
function cancelModal() {
  props.closeModal();
}

/**
 * 刪除使用者
 */
async function submitUser() {
  props.deleteUser(props.user.id);
  props.closeModal();
}
</script>

<style lang="scss" scoped>
  .dialog-footer {
    display: block;
    text-align: center;

    button:first-child {
      margin-right: 10px;
    }
  }
</style>
