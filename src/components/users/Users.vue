<template lang="pug">
div
  .title {{ $t('M_USER_TITLE') }}

  el-button(type="primary", icon="Edit", @click="showCreateModal = true") {{ $t('ACTION.CREATED') }}

  SearchUser(:get-users="getUsers")
  UserList(:data="data", :edit-user="editUser", :delete-user="deleteUser")
  .pagination-wrapper
    el-pagination(
    background,
    layout="total, prev, pager, next, sizes",
    :page-size="Number(pagination.max_results)",
    :page-sizes="[20, 40, 100]",
    :total="pagination.total",
    @size-change="handleSizeChange",
    @current-change="handlePagedChange").

el-dialog(v-model="showCreateModal", :title="$t('M_CREATED_USER')", width="25%")
  template(#default)
    EditUserModal(
    :active="showCreateModal",
    :close-modal="onClose",
    :create-user="createUser",
    :get-users="getUsers")
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { request } from '@/utils';
import UserList from './UserList.vue';
import EditUserModal from './EditUserModal.vue';
import SearchUser from './SearchUser.vue';

export default defineComponent({
  components: {
    UserList,
    EditUserModal,
    SearchUser,
  },
  setup() {
    const showCreateModal = ref(false);
    const pager = ref(2);
    const data = ref([]);
    const pagination = ref({
      first_result: 0,
      max_results: 20,
      total: 0,
    });

    /**
     * 處理查詢條件
     *
     * @param dataData 查詢條件
     * @returns 過濾後查詢條件
     */
    function handleSubmitQuery(dataData:object) {
      const result:{ [key: string]: number | string } = {};

      Object.entries(dataData)
        .filter(([, val]) => val !== -1) // 選項不限
        .filter(([, val]) => (val !== '')) // 過濾沒有值的選項
        .forEach(([key, val]) => {
          result[key] = val;
        });

      return result;
    }

    /**
     * 取得使用者
     *
     * @param param params
     * @param param.isSearching 是否檢索
     * @param param.newPagination 新頁碼
     * @param param.searchData 查詢條件
     */
    async function getUsers({
      isSearching = false,
      newPagination = pagination.value,
      searchData = {},
    } = {}) {
      const qs = handleSubmitQuery(searchData);

      const payload = {
        ...qs,
        first_result: isSearching ? 0 : newPagination.first_result,
        max_results: newPagination.max_results,
      };

      const out = await request('GET', '/users', payload);

      if (out?.result === 'ok') {
        data.value = out.ret;
        pagination.value = out.pagination;
      }
    }

    /**
     * 新增使用者
     *
     * @param userData 新增的資料
     */
    async function createUser(userData:object) {
      const out = await request('POST', '/user', userData);

      if (out?.result === 'ok') {
        getUsers();
      }
    }

    /**
     * 編輯使用者
     *
     * @param userId 使用者代號
     * @param userData 變更使用者資料
     */
    async function editUser(userId:string, userData:object) {
      const out = await request('PUT', `/user/${userId}`, userData);

      if (out?.result === 'ok') {
        getUsers();
      }
    }

    /**
     * 刪除使用者
     *
     * @param userId 使用者代號
     */
    async function deleteUser(userId:string) {
      const out = await request('DELETE', `/user/${userId}`);

      if (out?.result === 'ok') {
        getUsers();
      }
    }

    /**
     * 切換頁碼
     *
     * @param pageNo 頁碼數
     */
    function handlePagedChange(pageNo:number) {
      const newPagination = {
        ...pagination.value,
        first_result: pagination.value.max_results * (pageNo - 1),
      };

      getUsers({ newPagination });
      pager.value += 1;
    }

    /**
     * 切換頁碼總數
     *
     * @param val 每頁頁碼總數
     */
    function handleSizeChange(val:number) {
      const newPagination = {
        ...pagination.value,
        max_results: val,
      };

      getUsers({ newPagination });
    }

    /**
     * 關閉新增彈窗
     */
    function onClose() {
      showCreateModal.value = false;
    }

    onMounted(() => {
      getUsers({ isSearching: true });
    });

    return {
      showCreateModal,
      pager,
      data,
      pagination,
      handleSubmitQuery,
      getUsers,
      createUser,
      editUser,
      deleteUser,
      handlePagedChange,
      handleSizeChange,
      onClose,
    };
  },
});
</script>

<style scoped>
  .pagination-wrapper {
    margin-top: 1rem;
  }
</style>
