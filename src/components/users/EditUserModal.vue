<template lang="pug">
el-form(:model="form", label-width="80")
  el-form-item(label="使用者")
    el-input(v-model="form.username").

  el-form-item(label="啟用")
    el-radio-group(v-model="form.enable")
      el-radio(:label="Number(1)").
        啟用
      el-radio(:label="Number(0)").
        停用

  el-form-item(label="鎖定")
    el-radio-group(v-model="form.locked")
      el-radio(:label="Number(1)").
        鎖定
      el-radio(:label="Number(0)").
        解鎖

  el-form-item
    el-button(@click="clearUser").
      清空
    el-button(type="primary", @click="submitUser").
      {{ user.id ? '編輯' : '新增' }}
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  props: {
    showModal: Boolean,
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
  setup(props) {
    const form = ref(reactive({
      username: props.user.username ?? '',
      enable: props.user.enable ?? null,
      locked: props.user.locked ?? null,
    }));

    /**
     * 清空表單
     */
    function clearUser() {
      form.value = {};
    }

    /**
     * 送出表單
     */
    function submitUser() {
      const {
        user: { id },
        editUser,
        createUser,
        closeModal,
      } = props;

      const { username, enable, locked } = form.value;

      if (!Object.values(form.value).length) {
        return;
      }

      // 編輯
      if (id) {
        editUser(id, {
          username,
          enable,
          locked,
        });
      }

      // 新增
      if (!id) {
        createUser(form.value);
      }

      closeModal();
      clearUser();
    }

    return {
      form,
      clearUser,
      submitUser,
    };
  },
};
</script>
