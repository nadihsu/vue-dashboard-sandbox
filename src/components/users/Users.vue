<template>
  <div>
    <div class="title">
      使用者名單
    </div>
    <el-button
      type="primary"
      icon="Edit"
      @click="showCreateModal = true"
    >
      新增
    </el-button>
    <SearchUser :get-users="getUsers" />
    <UserList
      :data="data"
      :edit-user="editUser"
      :delete-user="deleteUser"
    />
    <div class="pagination-wrapper">
      <el-pagination
        background
        layout="total, prev, pager, next, sizes"
        :page-size="Number(pagination.max_results)"
        :page-sizes="[20, 40, 100]"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handlePagedChange"
      />
    </div>
  </div>
  <el-dialog
    v-model="showCreateModal"
    title="新增使用者"
    width="25%"
  >
    <template #default>
      <EditUserModal
        :active="showCreateModal"
        :close-modal="onClose"
        :create-user="createUser"
        :get-users="getUsers"
      />
    </template>
  </el-dialog>
</template>

<script>
import request from '@/utils';
import UserList from './UserList.vue';
import EditUserModal from './EditUserModal.vue';
import SearchUser from './SearchUser.vue';

export default {
  components: {
    UserList,
    EditUserModal,
    SearchUser,
  },
  data() {
    return {
      pager: 2,
      data: [],
      pagination: {
        first_result: 0,
        max_results: 20,
        total: 0,
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
        .filter(([, val]) => val)
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
        this.pagination = out.pagination;
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
    /**
     * 切換頁碼總數
     */
    handleSizeChange(val) {
      const newPagination = {
        ...this.pagination,
        max_results: val,
      };

      this.getUsers({ pagination: newPagination });
    },
    /**
     * 關閉新增彈窗
     */
    onClose() {
      this.showCreateModal = false;
    },
  },
};
</script>

<style scoped>
  .pagination-wrapper {
    margin-top: 1rem;
  }
</style>
