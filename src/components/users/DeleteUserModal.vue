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

<script>
export default {
  props: {
    active: {
      type: Boolean,
    },
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
  },
  methods: {
    /**
     * 刪除使用者
     */
    async submitUser() {
      this.deleteUser(this.user.id);
      this.closeModal();
    },
  },
};
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
