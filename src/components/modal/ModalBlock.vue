<template>
  <div class="modal-block">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.modal-block {
  width: 400px;
  padding: 1rem;
  background-color: #fff;
  position: relative;
  cursor: default;
  border-radius: 10px;
}
</style>
