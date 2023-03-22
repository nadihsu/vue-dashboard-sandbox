<template>
  <div>
    <div class="title">
      使用者名單
    </div>
    <button @click="showCreateModal = true">
      新增
    </button>
    <SearchUser :get-users="getUsers" />
    <UserList
      :data="data"
      :edit-user="editUser"
      :delete-user="deleteUser"
    />
    <button
      type="button"
      @click="handlePagedChange(pager)"
    >
      頁碼
    </button>
  </div>
  <Modal
    v-if="showCreateModal"
    @close="showCreateModal = false"
  >
    <EditUserModal
      :active="showCreateModal"
      :close-modal="onClose"
      :create-user="createUser"
      :get-users="getUsers"
    />
  </Modal>
</template>

<script>
import request from '@/utils';
import Modal from '../modal/Modal.vue';
import UserList from './UserList.vue';
import EditUserModal from './EditUserModal.vue';
import SearchUser from './SearchUser.vue';

export default {
  components: {
    UserList,
    EditUserModal,
    Modal,
    SearchUser,
  },
  data() {
    return {
      pager: 2,
      data: [],
      pagination: {
        first_result: 0,
        max_results: 20,
      },
      showCreateModal: false,
    };
  },
  mounted() {
    this.getUsers({ isSearching: true });
  },
  methods: {
    /**
     * 處理查詢條件
     */
    handleSubmitQuery(data) {
      const result = {};

      Object.entries(data)
        .filter(([, val]) => val !== -1) // 選項不限
        .forEach(([key, val]) => {
          result[key] = val;
        });

      return result;
    },
    /**
     * 取得使用者
     *
     * @param {object} param0
     */
    async getUsers({ isSearching = false, pagination = this.pagination, data = {} } = {}) {
      const qs = this.handleSubmitQuery(data);

      const payload = {
        ...qs,
        first_result: isSearching ? 0 : pagination.first_result,
        max_results: pagination.max_results,
      };

      const out = await request('GET', '/users', payload);

      if (out?.result === 'ok') {
        this.data = out.ret;
        this.pagination = {
          first_result: out.pagination.first_result,
          max_results: out.pagination.max_results,
        };
      }
    },
    /**
     * 新增使用者
     *
     * @param {object} data 新增的資料
     */
    async createUser(data) {
      const out = await request('POST', '/user', data);

      if (out?.result === 'ok') {
        this.getUsers();
      }
    },
    /**
     * 編輯使用者
     *
     * @param {string} userId 使用者代號
     * @param {object} data 變更使用者資料
     */
    async editUser(userId, data) {
      console.log('passing editUser');
      const out = await request('PUT', `/user/${userId}`, data);

      if (out?.result === 'ok') {
        this.getUsers();
      }
    },
    /**
     * 刪除使用者
     *
     * @param {string} userId 使用者代號
     */
    async deleteUser(userId) {
      const out = await request('DELETE', `/user/${userId}`);

      if (out?.result === 'ok') {
        this.getUsers();
      }
    },
    /**
     * 切換頁碼
     *
     * @param {number} pageNo
     */
    handlePagedChange(pageNo) {
      const newPagination = {
        ...this.pagination,
        first_result: this.pagination.max_results * (pageNo - 1),
      };

      this.getUsers({ pagination: newPagination });
      this.pager += 1;
    },
    onClose() {
      this.showCreateModal = false;
    },
  },
};
</script>
