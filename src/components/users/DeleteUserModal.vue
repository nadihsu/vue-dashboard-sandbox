<template>
  <span>
    確認刪除？
  </span>
  <span class="dialog-footer">
    <el-button @click="closeModal">取消</el-button>
    <el-button
      type="primary"
      @click="submitUser"
    >
      刪除
    </el-button>
  </span>
</template>

<script setup>
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
    default: () => {},
  },
  deleteUser: {
    type: Function,
    default: () => {},
  },
});

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
