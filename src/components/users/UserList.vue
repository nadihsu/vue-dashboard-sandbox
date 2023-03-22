<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>序</th>
          <th>使用者</th>
          <th>啟用時間</th>
          <th>啟用</th>
          <th>鎖定</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="d in data"
          :key="d.id"
        >
          <td>{{ d.id }}</td>
          <td>{{ d.username }}</td>
          <td>{{ day(d.created_at).format('YYYY-MM-DD') }}</td>
          <td>{{ d.enable ? '啟用' : '停用' }}</td>
          <td>{{ d.locked ? '鎖定' : '未鎖定' }}</td>
          <td>
            <button @click="openEditUserDialog(user)">
              編輯
            </button>
            <button @click="openDeleteUserDialog(user)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal
    v-if="showEditModal"
    @close="showEditModal = false"
  >
    <EditUserModal
      :active="showEditModal"
      :user="user"
      :close-modal="onClose"
      :edit-user="editUser"
    />
  </Modal>
  <Modal
    v-if="showDeleteModal"
    @close="showDeleteModal = false"
  >
    <DeleteUserModal
      :active="showDeleteModal"
      :user="user"
      :close-modal="onClose"
      :delete-user="deleteUser"
    />
  </Modal>
</template>

<script>
import EditUserModal from './EditUserModal.vue';
import DeleteUserModal from './DeleteUserModal.vue';
import Modal from '../modal/Modal.vue';

export default {
  components: {
    Modal,
    EditUserModal,
    DeleteUserModal,
  },
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
  data() {
    return {
      showEditModal: false,
      showDeleteModal: false,
      user: {},
    };
  },
  methods: {
    /**
     * 關閉彈窗
     */
    onClose() {
      this.showEditModal = false;
      this.showDeleteModal = false;
      this.user = {};
    },
    /**
     * 開啟編輯彈窗
     *
     * @param {object} user
     */
    openEditUserDialog(user) {
      this.showEditModal = true;
      this.user = user;
    },
    /**
     * 開啟刪除彈窗
     *
     * @param {object} user
     */
    openDeleteUserDialog(user) {
      this.showDeleteModal = true;
      this.user = user;
    },
  },
};
</script>

<style lang="scss" scope>
.table-wrapper {
  margin-bottom: 1rem;

  table {
    border: 1px solid #333;
    width: 100%;
    padding: 1rem;
    text-align: center;

    th {
      border-bottom: 1px solid #666;
      background: #a6a6a6;
      color: #333;
    }

    th,
    td {
      padding: 0.3rem 0;
    }

    td > button {
      margin-right: 0.5rem;
    }
  }
}
</style>
