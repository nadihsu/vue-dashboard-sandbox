<template lang="pug">
el-form(:model="form", label-width="80")
  el-form-item(:label="$t('M_USERNAME')")
    el-input(v-model="form.username").

  el-form-item(:label="$t('M_ENABLE_STATE')")
    el-radio-group(v-model="form.enable")
      el-radio(:label="Number(1)").
        {{ $t('M_ENABLED') }}
      el-radio(:label="Number(0)").
        {{ $t('M_DISABLED') }}

  el-form-item(:label="$t('M_LOCKED_STATE')")
    el-radio-group(v-model="form.locked")
      el-radio(:label="Number(1)").
        {{ $t('M_LOCKED') }}
      el-radio(:label="Number(0)").
        {{ $t('M_UNLOCKED') }}

  el-form-item
    el-button(@click="clearUser").
      {{ $t('ACTION.RESET') }}
    el-button(type="primary", @click="submitUser").
      {{ user.id ? $t('ACTION.EDIT') : $t('ACTION_CREATED') }}
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from 'vue';

interface Form {
  username: string;
  enable: boolean;
  locked: boolean;
}

export default defineComponent({
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
      default: () => ({}),
    },
    createUser: {
      type: Function,
      default: () => Promise,
    },
    editUser: {
      type: Function,
      default: () => Promise,
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
      form.value = {} as Form;
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
});
</script>
