<template>
  <div class="modal-mask">
    <slot />
  </div>
</template>

<style lang="scss" scope>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
