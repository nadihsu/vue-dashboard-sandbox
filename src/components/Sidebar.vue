<template lang="pug">
router-link(to="/").
  {{ $t('SIDEBAR.USER') }}
router-link(to="/about").
  {{ $t('SIDEBAR.ABOUT') }}
</template>

<style scope lang="scss">
aside a {
  display: block;
  width: 100%;
  padding: 1rem;
  text-decoration: none;
  color: #333;

  &.router-link-active {
    text-decoration: underline;
  }
}
</style>
