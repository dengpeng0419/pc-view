<template>
  <div class="ui-toast" :class="{'show': visible, 'is-bottom': positionClass}">
    <div v-if="className === 'blue'" class="toast-text-blue">{{message}}</div>
    <div v-else class="toast-text">{{message}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      }
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
      positionClass() {
        return this.className === 'blue'
      }
    }
  }
</script>

<style lang="scss">
  .ui-toast {
    position: fixed;
    left: 0;
    top: 0%;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    //justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: all .25s ease-in-out;
    transform: translate3d(0, 20px, 0);
    background: rgba(255, 255, 255, .01);
    padding-top: 80vh;

    .toast-text {
      padding: 25px 50px;
      max-width: 80%;
      box-sizing: border-box;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      font-size: 40px;
      word-break: break-all;
      text-align: justify;
      pointer-events: auto;
    }

    &.show {
      background: rgba(255, 255, 255, .01);
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(0, 0, 0);
    }

    .toast-text-blue {
      max-width: 80%;
      padding: 20px 70px;
      background: #4D7BFE;
      box-shadow: 0 4px 14px 0 rgba(77, 123, 254, 0.40);
      border-radius: 100px;
      box-sizing: border-box;
      font-size: 28px;
      word-break: break-all;
      color: #fff;
    }
  }

  .is-bottom {
    margin-top: -240px;
    justify-content: flex-end;
  }
</style>