<template>
  <div :class="{show: isShow}" class="ui-loading" v-if="display">
    <div class="icon-body">
      <i class="icon-loading"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    data() {
      return {
        isShow: false,
        display: false
      }
    }
  }
</script>

<style lang="scss">
  .ui-loading {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s ease-in-out;
    &.show {
       background: rgba(255, 255, 255, .01);
       opacity: 1;
       pointer-events: auto;
     }
    .icon-body {
      display:flex;
      justify-content:center;
      align-items:center;
      width:168px;
      height:168px;
      margin-top: -5%;
      border-radius:20px;
      background-color: rgba(0, 0, 0,.7);
      .icon-loading {
        width: 140px;
        height: 140px;
        display: block;
        background-size:contain;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url(./loading.svg);
      }
    }
  }
</style>