<template>
  <div id="app">
    <!-- <div class="top-nav"></div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  watch: {
    '$route'(to, from) {  
      const name = this.$route.name
      // const water = sessionStorage.getItem('water')
      // const element=document.getElementById("water1");
      // const element2=document.getElementById("water2");
      // if (name !== 'login') {
      //   if (name.indexOf('Index')>-1 || name === 'home') {
      //     element.style.display = 'none'
      //     element2.style.display = 'block'
      //   } else {
      //     element.style.display = 'block'
      //     element2.style.display = 'none'
      //   }
      // } else {
      //   element.style.display = 'none'
      //   element2.style.display = 'none'
      // }
    }
  },
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}
// .top-nav {
//   position: fixed;
//   top: 0;
//   left: 0;
//   background: #172226;
//   height: 57px;
//   z-index: 9px;
//   width: 2560px;
// }
</style>

