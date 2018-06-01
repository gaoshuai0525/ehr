<template>
  <!--头部-->
  <el-menu class="navbar el-col" mode="horizontal">
  <!--<el-menu class="navbar el-col" mode="horizontal" :class="[!sidebar.opened ? 'close-header' : 'open-header']">-->
    <!--logo-->
    <div class="logo-box">
      <a href="javascript:;" class="logo">
        <img src="../../../assets/images/logo.png" alt="logo">
      </a>
    </div>
    <!--控制左侧栏大小-->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <!--设置/头像/退出/-->
    <div class="nav">
      <div class="nav-item">
        <a class="set" href="javascript:;"><i></i>设置</a>
      </div>
      <div class="nav-item">
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
            <img class="user-avatar" src="../../../assets/images/role_icon.png">
            <span class="user-name">{{introduction.user}}</span>
          </div>
        </div>
      </div>
      <div class="nav-item">
        <a class="logout" @click="logout" href="javascript:;"><i></i>退出</a>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'introduction'
    ])
  },
  methods: {
    // 控制左侧菜单大小
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/variables.scss';
  .open-header {
    transition: left .3s;
    left: 236px !important;
  }
  .close-header {
    transition: left .3s;
    left: 36px !important;
  }
.navbar {
  height: 68px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1999;
  line-height: 68px;
  border-radius: 0px !important;
  /*background: $menuBg;*/
  background: url("../../../assets/images/background.png");
  box-shadow: 10px 1px 15px rgba(0,0,0,.17);
  padding: 0 20px 0 28px;
  .hamburger-container {
    line-height: 68px;
    height: 68px;
    float: left;
    margin-left: 20px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 68px;
    display: inline-block;
    position: relative;
    margin-right: 10px;
    .avatar-wrapper {
      width: 86px;
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 10px;
      }
      .user-name {
        position: absolute;
        right: 0;
      }
    }
  }
}
  .logo-box {
    float: left;
    .logo {
      display: block;
      img {
        vertical-align: middle;
      }
    }
  }
  .nav {
    float: right;
    height: 100%;
    .nav-item {
      display: inline-block;
      cursor: pointer;
      a {
        display: block;
        vertical-align: middle;
        i {
          width: 13px;
          height: 13px;
          display: inline-block;
          float: left;
          margin-top: 27px;
          margin-right: 6px;
        }
      }
    }
  }
  .set{
    margin-right: 16px;
    i {
      background: url("../../../assets/images/set.png") no-repeat center center;
    }
  }
  .logout {
    margin-left: 10px;
    i {
      background: url("../../../assets/images/logout.png") no-repeat center center;
    }
  }
</style>

