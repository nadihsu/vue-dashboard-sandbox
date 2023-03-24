<template>
  <el-form
    :model="form"
    label-width="80"
  >
    <el-form-item label="使用者">
      <el-input v-model="form.username" />
    </el-form-item>

    <el-form-item label="啟用">
      <el-radio-group v-model="form.enable">
        <el-radio :label="Number(1)">
          啟用
        </el-radio>
        <el-radio :label="Number(0)">
          停用
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="鎖定">
      <el-radio-group v-model="form.locked">
        <el-radio :label="Number(1)">
          鎖定
        </el-radio>
        <el-radio :label="Number(0)">
          解鎖
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button @click="clearUser">
        清空
      </el-button>
      <el-button
        type="primary"
        @click="submitUser"
      >
        {{ user.id ? '編輯' : '新增' }}
      </el-button>
    </el-form-item>
  </el-form>
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
    const { username, enable, locked } = this.user;
    return {
      form: {
        username: username ?? '',
        enable: enable ?? null,
        locked: locked ?? null,
      },
    };
  },
  methods: {
    /**
     * 清空資料
     */
    clearUser() {
      this.form = {};
    },
    /**
     * 送出使用者資料
     */
    async submitUser() {
      const { id } = this.user;
      const { username, enable, locked } = this.form;

      if (!Object.keys(this.form).length) {
        return;
      }

      // 編輯
      if (id) {
        this.editUser(id, {
          username,
          enable,
          locked,
        });
      }

      // 新增
      if (!id) {
        this.createUser(this.form);
      }

      this.closeModal();
      this.clearUser();
    },
  },
};
</script>
