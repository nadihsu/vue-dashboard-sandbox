<template lang="pug">
div
  el-table(:data="data", stripe, border)
    el-table-column(prop="id", label="序")
    el-table-column(prop="username", label="使用者")
    el-table-column(prop="created_at", label="建立時間", :formatter="formatterDate")

    el-table-column(prop="enable", label="啟用", align="center")
      template(#default="scope")
        el-tag(:type="scope.row.enable ? 'success' : 'danger'").
          {{ scope.row.enable ? '啟用' : '停用' }}

    el-table-column(prop="locked", label="鎖定", align="center")
      template(#default="scope2")
        el-icon(:size="20")
          i-ep-lock(v-if="scope2.row.locked", color="#999")
          i-ep-unlock(v-else).

    el-table-column(label="操作", align="center")
      template(#default="scope3")
        el-button(size="small", @click="openEditUserDialog(scope3.row)").
          編輯
        el-button(type="danger", size="small", @click="openDeleteUserDialog(scope3.row)").
          刪除

el-dialog(
v-model="showEditModal",
:title="`編輯使用者: ${user.username}`",
width="25%",
destroy-on-close)
  edit-user-modal(
  :active="showEditModal",
  :user="user",
  :close-modal="onClose",
  :edit-user="editUser").

el-dialog(
v-model="showDeleteModal",
:title="`刪除使用者: ${user.username}`",
width="25%",
center,
destroy-on-close)
  delete-user-modal(
  :active="showDeleteModal",
  :user="user",
  :close-modal="onClose",
  :delete-user="deleteUser").

</template>

<script>
import { ref, getCurrentInstance } from 'vue';
import EditUserModal from './EditUserModal.vue';
import DeleteUserModal from './DeleteUserModal.vue';

export default {
  components: { EditUserModal, DeleteUserModal },
  props: {
    data: {
      type: Array,
      required: true,
    },
    editUser: {
      type: Function,
      default: () => {},
    },
    deleteUser: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const user = ref({});

    /**
     * 日期格式化
     *
     * @param {{ created_at: string }} row 使用者建立日期
     */
    function formatterDate(row) {
      return proxy.$day(row.created_at).format('YYYY-MM-DD');
    }

    /**
     * 關閉彈窗
     */
    function onClose() {
      showEditModal.value = false;
      showDeleteModal.value = false;
    }

    /**
     * 開啟編輯彈窗
     *
     * @param {object} userData
     */
    function openEditUserDialog(userData) {
      showEditModal.value = true;
      user.value = userData;
    }

    /**
     * 開啟刪除彈窗
     *
     * @param {object} userData
     */
    function openDeleteUserDialog(userData) {
      showDeleteModal.value = true;
      user.value = userData;
    }

    return {
      showEditModal,
      showDeleteModal,
      user,
      formatterDate,
      onClose,
      openEditUserDialog,
      openDeleteUserDialog,
    };
  },
};
</script>
