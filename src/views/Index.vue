<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link tag="div" to="/" class="left-nav icon_shouye" replace></router-link>
      <router-link tag="div" to="/plan/index" v-if="hasAuthority('planIndex')" class="left-nav icon_zonghe" replace></router-link>
      <router-link tag="div" to="/manage/index" v-if="hasAuthority('manageIndex')" class="left-nav icon_jingying" replace></router-link>
      <router-link tag="div" to="/human-resource" v-if="hasAuthority('HumanResource')" class="left-nav icon_hexin" replace></router-link> -->
        <!-- <router-link tag="div" to="/safe/index" v-if="hasAuthority('serviceIndex')" class="left-nav icon_anquan" replace></router-link> -->
      <!-- <router-link tag="div" to="/service/index" v-if="hasAuthority('safeIndex')" class="left-nav icon_fuwu" replace></router-link> -->
        <!-- <router-link tag="div" to="/search/index" class="left-nav" replace>指标搜索</router-link> -->
      <!-- <router-link tag="div" to="/ele-scale" class="left-nav">电网规模</router-link> -->
      <!-- <router-link tag="div" to="/advise" class="left-nav">投资建议</router-link>
      <router-link tag="div" to="/safe-produce" class="left-nav">安全生产</router-link> -->
      <!-- <div tag="div" to="/electric/index" v-if="hasAuthority('electricIndex')" class="left-nav untouch icon_diaodu"></div> -->
      <!-- <router-link tag="div" to="/advise" class="left-nav" replace>调度运行</router-link> -->
      <!-- <router-link tag="div" to="/machine" class="left-nav" replace>同业对标</router-link>
      <router-link tag="div" to="/ele-scale" class="left-nav" replace>考核指标</router-link> -->
      <!-- <div class="left-nav untouch icon_tongye"></div>
      <div class="left-nav untouch icon_kaohe"></div> -->
    </div>
    <router-view name="homeView"/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getPageData()
  },
  methods: {
    getPageData() {
      this.$ajax({
        url: '/app/service/get/LoginUserMenus',
        data: {
          id: sessionStorage.getItem('id') || '1'
        }
      }).then(res => {
        const data = res.data || {}
        const arr = data.menu || []
        this.list = [];
        arr.map((item) => {
          this.list.push(item.perm)
        })
        sessionStorage.setItem('list', JSON.stringify(this.list))
      }).catch(error => {
        this.$toast(error.msg)
      })
    },
    hasAuthority(name) {
      // return this.list.indexOf(name) > -1
      return true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/base';
</style>
