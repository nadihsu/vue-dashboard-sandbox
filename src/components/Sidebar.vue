<template>
  <router-link to="/">
    Users
  </router-link>
  <router-link to="/about">
    About
  </router-link>
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
