<template lang="pug">
.search-wrap
  el-form(label-position="top", label-width="100px")
    el-form-item(:label="$t('M_USERNAME')")
      el-input(v-model="data.username").

    el-form-item(:label="$t('M_ENABLE_STATE')")
      el-select(v-model="data.enable")
        el-option(
        v-for="item in enableOptions",
        :key="item.value",
        :label="item.label",
        :value="item.value").

    el-form-item(:label="$t('M_LOCKED_STATE')")
      el-select(v-model="data.locked")
        el-option(
        v-for="item in lockedOptions",
        :key="item.value",
        :label="item.label",
        :value="item.value").

    el-form-item(:label="$t('M_CREATED_AT')")
      el-date-picker(
      v-model="data.created_at",
      type="daterange",
      :start-placeholder="$t('M_CREATED_START_AT')",
      :end-placeholder="$t('M_CREATED_END_AT')",
      format="YYYY/MM/DD",
      value-format="YYYY-MM-DD").

    el-form-item
      el-button(type="primary", @click="searchUsers").
        {{ $t('ACTION.SEARCH') }}

    el-form-item
      el-button(@click="resetSearch").
        {{ $t('ACTION.CLEAR') }}
</template>

<script>
import { ref, getCurrentInstance, computed } from 'vue';

const initData = {
  username: '',
  enable: -1,
  locked: -1,
  created_at: [],
};

export default {
  props: {
    getUsers: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const data = ref({ ...initData });

    const enableOptions = computed({
      get: () => ([
        {
          label: proxy.$t('M_WITHOUT_LIMIT'),
          value: -1,
        },
        {
          label: proxy.$t('M_ENABLED'),
          value: 1,
        },
        {
          label: proxy.$t('M_DISABLED'),
          value: 0,
        },
      ]),
    });

    const lockedOptions = computed({
      get: () => ([
        {
          label: proxy.$t('M_WITHOUT_LIMIT'),
          value: -1,
        },
        {
          label: proxy.$t('M_LOCKED'),
          value: 1,
        },
        {
          label: proxy.$t('M_UNLOCKED'),
          value: 0,
        },
      ]),
    });

    /**
     * 查詢使用者
     */
    async function searchUsers() {
      const [startCreatedAt, endCreatedAt] = data.value.created_at;
      const payload = {
        ...data.value,
        ...((startCreatedAt && endCreatedAt) && {
          start_created_at: startCreatedAt,
          end_created_at: endCreatedAt,
        }),
      };

      delete payload.created_at;

      props.getUsers({ isSearching: true, searchData: payload });
    }

    /**
     * 恢復查詢條件
     */
    function resetSearch() {
      data.value = { ...initData };
    }

    return {
      data,
      enableOptions,
      lockedOptions,
      searchUsers,
      resetSearch,
    };
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
