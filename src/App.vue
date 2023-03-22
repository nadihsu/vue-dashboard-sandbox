<template>
  <div class="wrapper">
    <div class="main-layout">
      <aside>
        <Sidebar />
      </aside>
      <div class="main-content">
        <router-view ter-view />
      </div>
    </div>
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
    background: #fff;
    width: 10rem;
    padding: 1rem;
  }

  .main-content {
    padding: 2rem;
    flex-grow: 2;
    overflow-y: scroll;
  }
}
</style>
