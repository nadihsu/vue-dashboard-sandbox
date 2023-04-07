<template lang="pug">
div
  el-table(:data="data", stripe, border)
    el-table-column(prop="id", :label="$t('M_ID')")
    el-table-column(prop="username", :label="$t('M_USERNAME')")
    el-table-column(prop="created_at", :label="$t('M_CREATED_AT')", :formatter="formatterDate")

    el-table-column(prop="enable", :label="$t('M_ENABLE_STATE')", align="center")
      template(#default="scope")
        el-tag(:type="scope.row.enable ? 'success' : 'danger'").
          {{ scope.row.enable ? $t('M_ENABLED') : $t('M_DISABLED') }}

    el-table-column(prop="locked", :label="$t('M_LOCKED_STATE')", align="center")
      template(#default="scope2")
        el-icon(:size="20")
          i-ep-lock(v-if="scope2.row.locked", color="#999")
          i-ep-unlock(v-else).

    el-table-column(:label="$t('M_OPERATOR')", align="center")
      template(#default="scope3")
        el-button(size="small", @click="openEditUserDialog(scope3.row)").
          {{ $t('ACTION.EDIT') }}
        el-button(type="danger", size="small", @click="openDeleteUserDialog(scope3.row)").
          {{ $t('ACTION.DELETE') }}

el-dialog(
v-model="showEditModal",
:title="`${$t('M_EDITED_USER')}: ${user.username}`",
width="25%",
destroy-on-close)
  edit-user-modal(
  :active="showEditModal",
  :user="user",
  :close-modal="onClose",
  :edit-user="editUser").

el-dialog(
v-model="showDeleteModal",
:title="`${$t('M_DELETED_USER')}: ${user.username}`",
width="25%",
center,
destroy-on-close)
  delete-user-modal(
  :active="showDeleteModal",
  :user="user",
  :close-modal="onClose",
  :delete-user="deleteUser").

</template>

<script lang="ts">
import { ref, getCurrentInstance, defineComponent, ComponentInternalInstance } from 'vue';
import EditUserModal from './EditUserModal.vue';
import DeleteUserModal from './DeleteUserModal.vue';

type UserType = {
  [key: string]: any
}

export default defineComponent({
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
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const user:UserType = ref({});

    /**s
     * 日期格式化
     *
     * @param {{ created_at: string }} row 使用者建立日期
     */
    function formatterDate(row:{ created_at: string }) {
      return (proxy as any)?.$day(row.created_at).format('YYYY-MM-DD');
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
    function openEditUserDialog(userData:UserType) {
      showEditModal.value = true;
      user.value = userData;
    }

    /**
     * 開啟刪除彈窗
     *
     * @param {object} userData
     */
    function openDeleteUserDialog(userData:UserType) {
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
}) ;
</script>
