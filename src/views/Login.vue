<template>
  <div class="login">
    <div class="login-icon"></div>
    <div style="position:relative;">
      <input v-model="name" placeholder="请输入用户名"/>
      <div class="userName"></div>
    </div><div style="position:relative;">
      <input type="password" v-model="passport" placeholder="请输入密码"/>
      <div class="passport"></div>
    </div>
    <div class="login-button" @click="login">登录</div>
  </div>
</template>

<script>
import { JSEncrypt } from 'jsencrypt'

export default {
  name: 'home',
  data() {
    return {
      name: '',
      passport: ''
    }
  },
  mounted() {
    const element=document.getElementById("water1")
    element.style.display = 'none'
    //this.$watermark.set('water1', 'demo:信通公司公司', 0)
    // this.$loading.show();
    // this.$toast('描述');
  },
  methods: {
    login() {
      const name = this.name
      const passport = this.passport
      if (!name) {
        this.$toast('用户名不能为空')
        return
      }
      if (!passport) {
        this.$toast('密码不能为空')
        return
      }
      // const publicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALldL4hqBNN6kgQ1HPk5qeLmKYbyxDA6C9zuOI8vi0SvrltyMjowYHoEPPHtGKLE9jgtD3E//ErfKDf8CwJXybcCAwEAAQ=='
      // const jsencrypt = new JSEncrypt()
      // jsencrypt.setPublicKey(publicKey)
      // const secret = jsencrypt.encrypt(passport)
      this.$ajax({
        url: 'table/login',
        data: {
          userAccount: name,
          password: passport
        }
      }).then(res => {
        const data = res.data || {};
        sessionStorage.setItem('id', data.id)
        sessionStorage.setItem('water', data.deptName+data.userAccount)
        this.$watermark.set('water1', data.deptName+data.userAccount, 0)
        // this.$watermark.set('water2', data.deptName+data.userName, 250)
        const element=document.getElementById("water1")
        element.style.display = 'none'
        sessionStorage.setItem('pc_view_login', '1')
        this.$router.push({
          name: 'investTarget'
        })
      }).catch(error => {
        // this.$watermark.set('water1', 'demo:信通公司公司', 0)
        // this.$router.push({
        //   name: 'investTarget'
        // })
        console.log(error)
        this.$toast(error.msg)
      })
    }
  }
}
</script>

<style lang="scss">
  .login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-icon {
      margin-top: 16vh;
      margin-bottom: 20px;
      width: 150px;
      height: 150px;
      background-image: url(../assets/img/icon_login.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .userName {
      position: absolute;
      top: 38px;
      left: 48px;
      width: 32px;
      height: 32px;
      background-image: url(../assets/img/icon_user.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .passport {
      position: absolute;
      top: 38px;
      left: 48px;
      width: 32px;
      height: 32px;
      background-image: url(../assets/img/icon_locked.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    
    .login-button {
      margin-top: 85px;
      font-size: 46px;
      display: flex;
      color: #131C2E;
      background-color: #fff;
      justify-content: center;
      width: 480px;
      height: 80px;
      line-height: 80px;
      border-radius: 40px;
    }

    input{  
      position: relative;
      background: none;  
      outline: none;  
      border:none;
      border-bottom: 1px solid #456288;
      height: 50px;
      width: 630px;
      font-size: 24px;
      margin-top: 30px;
      color: #accbee;
      padding-left: 240px;
      box-sizing: border-box;
    }
    
    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
      font-size: 24px;
			color: #accbee;
		}
		::-moz-placeholder { /* Firefox 19+ */  
      font-size: 24px;
			color:#accbee;
		}
		:-ms-input-placeholder { /* IE 10+ */ 
		  font-size: 24px;
      color:#accbee;
		}
		:-moz-placeholder { /* Firefox 18- */ 
		  font-size: 40px;
      color: #accbee;
		}
  }
</style>

