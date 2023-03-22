<template>
  <div class="search-wrap">
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
        <label for="enable">啟用</label>
        <select
          id="enable"
          v-model="data.enable"
        >
          <option value="-1">
            不限
          </option>
          <option value="1">
            啟用
          </option>
          <option value="0">
            停用
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="locked">鎖定</label>
        <select
          id="locked"
          v-model="data.locked"
        >
          <option value="-1">
            不限
          </option>
          <option value="1">
            鎖定
          </option>
          <option value="0">
            未鎖定
          </option>
        </select>
      </div>

      <div class="form-field">
        <button @click="searchUsers">
          搜尋
        </button>
      </div>

      <div class="form-field">
        <button @click="resetSearch">
          恢復
        </button>
      </div>
    </form>
  </div>
</template>

<script>
const initData = {
  username: '',
  enable: -1,
  locked: -1,
};

export default {
  props: {
    getUsers: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      data: initData,
    };
  },
  methods: {
    /**
     * 查詢使用者
     */
    async searchUsers() {
      this.getUsers({ isSearching: true, data: this.data });
    },
    /**
     * 恢復查詢條件
     */
    resetSearch() {
      this.data = initData;
    },
  },
};
</script>

<style lang="scss" scope>
.search-wrap {
  border: 1px solid #333;
  padding: 1rem;
  margin: 1rem 0;

  form {
    display: flex;
    align-items: flex-end;
  }

  .form-field {
    margin-right: 1rem;

    label {
      display: block;
      margin-bottom: 0.3rem;
    }
  }
}
</style>
