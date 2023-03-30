<template lang="pug">
.wrapper
  el-container.main-layout
    el-aside(:width="lang === 'en-US' ? '11rem' : '9rem'")
      sidebar.
    el-container
      el-header
        el-menu(
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false")
          el-menu-item LEGO
          .flex-grow
          .right-menu-content
            el-dropdown(@command="handleLangChange")
              span.el-dropdown-link {{ $t('M_LANG') }}
                el-icon.el-icon--right
                  i-ep-arrow-down
              template(#dropdown)
                el-dropdown-item(command="zh-TW") 繁體中文
                el-dropdown-item(command="en-US") EN
      el-main.main-content
        router-view.
</template>

<script>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import useLangStore from '@/store/useLangStore';
import Sidebar from './components/Sidebar.vue';

export default {
  components: { Sidebar },
  setup() {
    const { t } = useI18n();
    const { lang } = storeToRefs(useLangStore());
    const { updateLang } = useLangStore();

    /**
     * 切換語系
     *
     * @param {string} value 語系代碼
     */
    function handleLangChange(value) {
      updateLang(value);
    }

    return {
      t,
      lang,
      handleLangChange,
    };
  },
};
</script>

<style lang="scss">
@import 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css';
@import './styles/main.scss';

.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: row;
}

.right-menu-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.main-layout {
  display: flex;
  height: 100vh;
  flex: 1;

  aside {
    position: relative;
    height: 100%;
    padding: 1rem;
    background-color: #F6F6F6;
  }

  .main-content {
    overflow-y: scroll;
  }
}

.flex-grow {
  flex-grow: 1;
}

.el-dropdown-link:focus-visible {
  outline: none;
}
</style>
