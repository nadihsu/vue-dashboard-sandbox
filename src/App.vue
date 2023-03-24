<template>
  <div class="wrapper">
    <el-container class="main-layout">
      <el-aside width="10rem">
        <Sidebar />
      </el-aside>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Sidebar,
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
    padding: 2rem;
    flex-grow: 2;
    overflow-y: scroll;
  }
}
</style>
