<template>
  <div class="modal">
    <div class="modal-title">
      {{ user.id ? `編輯使用者: ${user.username}` : '新增使用者' }}
    </div>
    <div class="modal-content">
      <form>
        <div class="form-field">
          <label for="username"> 使用者 </label>
          <input
            id="username"
            v-model="data.username"
            type="text"
            name="username"
          >
        </div>
        <div class="form-field">
          啟用
          <label for="enable">
            <input
              id="1"
              v-model="data.enable"
              type="radio"
              name="enable"
              value="1"
            >
            啟用
          </label>
          <label for="disabled">
            <input
              id="0"
              v-model="data.enable"
              type="radio"
              name="enable"
              value="0"
            >
            停用
          </label>
        </div>
        <div class="form-field">
          鎖定
          <label for="locked">
            <input
              id="locked"
              v-model="data.locked"
              type="radio"
              name="locked"
              value="1"
            >
            已鎖定
          </label>
          <label for="unlocked">
            <input
              id="unlocked"
              v-model="data.locked"
              type="radio"
              name="locked"
              value="0"
            >
            未鎖定
          </label>
        </div>
      </form>
    </div>
    <div class="modal-actions">
      <button @click="clearUser">
        清空
      </button>
      <button @click="submitUser">
        建立
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
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
    createUser: {
      type: Function,
      default: () => {},
    },
    editUser: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      data: this.user,
    };
  },
  watch: {
    user(newValue) {
      this.data = newValue;
    },
  },
  methods: {
    /**
     * 清空資料
     */
    clearUser() {
      this.data = {};
    },

    /**
     * 送出使用者資料
     */
    async submitUser() {
      if (!Object.keys(this.data).length) {
        return;
      }

      // 編輯
      if (this.data.id) {
        this.editUser?.(this.data.id, {
          username: this.data.username,
          enable: this.data.enable,
          locked: this.data.locked,
        });
      }

      // 新增
      if (!this.data.id) {
        this.createUser?.(this.data);
      }

      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
.modal {
  > div {
    padding: 1rem;
  }

  &-title {
    border-bottom: 1px solid #333;
  }

  &-actions {
    border-top: 1px solid #333;
  }

  .form-field {
    display: block;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
