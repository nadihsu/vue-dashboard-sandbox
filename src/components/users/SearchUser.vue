<template>
  <div class="search-wrap">
    <el-form
      label-position="top"
      label-width="100px"
    >
      <el-form-item label="使用者">
        <el-input v-model="data.username" />
      </el-form-item>

      <el-form-item label="啟用">
        <el-select
          v-model="data.enable"
        >
          <el-option
            v-for="item in enableOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="鎖定">
        <el-select
          v-model="data.locked"
        >
          <el-option
            v-for="item in lockedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="建立日期">
        <!-- <el-date-picker
          v-model="data.created_at"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="請選擇"
          size="default"
        /> -->
        <el-date-picker
          v-model="data.created_at"
          type="daterange"
          start-placeholder="起"
          end-placeholder="迄"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="searchUsers"
        >
          搜尋
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="resetSearch">
          清除
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const initData = {
  username: '',
  enable: -1,
  locked: -1,
  created_at: [],
};

const enableOptions = [
  {
    label: '不限',
    value: -1,
  },
  {
    label: '啟用',
    value: 1,
  },
  {
    label: '停用',
    value: 0,
  },
];

const lockedOptions = [
  {
    label: '不限',
    value: -1,
  },
  {
    label: '已鎖定',
    value: 1,
  },
  {
    label: '未鎖定',
    value: 0,
  },
];

export default {
  props: {
    getUsers: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      data: { ...initData },
      enableOptions,
      lockedOptions,
    };
  },
  methods: {
    /**
     * 查詢使用者
     */
    async searchUsers() {
      const [startCreatedAt, endCreatedAt] = this.data.created_at;
      const payload = {
        ...this.data,
        ...((startCreatedAt && endCreatedAt) && {
          start_created_at: startCreatedAt,
          end_created_at: endCreatedAt,
        }),
      };

      delete payload.created_at;

      this.getUsers({ isSearching: true, data: payload });
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
  border: 1px solid var(--el-border-color);
  padding: 1rem;
  margin: 1rem 0;

  form {
    display: flex;
    align-items: flex-end;
  }

  .el-form-item {
    margin-right: 1rem;
  }
}
</style>
