<template>
  <!--用户信息-->
  <div class="left-left">
    <div class="left-header">
      <el-row>
        <el-col :span="10">
          <div class="user-img">
            <img :src="userInfo.avatar" alt=""/>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="user-detail">
            <h3>{{userInfo.name}}</h3>
            <p>({{userInfo.rank}})</p>
            <p>{{userInfo.department}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="left-main">
      <el-row class="user-ul">
        <el-col class="user-li"><i></i>{{userInfo.entryTime}}</el-col>
        <el-col class="user-li"><i></i>{{userInfo.post}}</el-col>
        <el-col class="user-li"><i></i>{{userInfo.mobilePhoneNumber}}</el-col>
        <el-col class="user-li"><i></i>{{userInfo.tel}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      name: 'UserInfo',
      computed: {
        ...mapGetters([
          'userInfo'
        ])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bgw: #FFFFFF;
  .left-main {
    color: #333;
  }
  .left-left {
    height: 329px;
    background-color: $bgw;
    .left-header {
      text-align: center;
      color: #333;
      height: 40%;
      .user-img {
        width: 100%;
        height: 100%;
        img {
          width: 60%;
          margin-top: 30px;
        }
      }
      .user-detail {
        text-align: left;
        float: left;
        margin-top: 30px;
        h3 {
          width: 100%;
          margin: 0;
          line-height: 36px;
        }
        p {
          line-height: 30px;
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .left-left .user-ul {
    .user-li {
      height: 40px;
      line-height: 40px;
      text-align: left;
      i {
        display: inline-block;
        width: 20px;
        margin-right: 40px;
      }
    }
  }
</style>
