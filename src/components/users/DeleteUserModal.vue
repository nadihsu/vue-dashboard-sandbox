<template>
  <div class="modal">
    <div class="modal-title">
      刪除使用者
    </div>
    <div class="modal-content">
      <p>
        請問確認刪除 <span>{{ user.username }}</span> ?
      </p>
    </div>
    <div class="modal-actions">
      <button @click="closeModal">
        取消
      </button>
      <button @click="submitUser">
        刪除
      </button>
    </div>
  </div>
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
