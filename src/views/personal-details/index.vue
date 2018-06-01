<template>
  <!--个人信息-->
  <div class="dashboard-container">
    <!--头部-->
    <ul class="dashboard-top" height="54px" v-show="noticeShow">
      <li class="top-left">泰康人力资源管理系统改版上线啦！</li>
      <li class="top-right" @click="closeNotice">X</li>
    </ul>
    <!--主体部分-->
    <el-row :gutter="20">
      <!--左部-->
      <el-col :span="8">
        <div class="dashboard-left">
          <!--用户信息-->
          <user-info></user-info>
          <div class="dashboard-text">您可以进行以下操作</div>
          <div class="look">
            <el-row>
              <el-col>
                <router-link to="/personal-details/index">
                  <p>查看/维护个人信息</p>
                </router-link>
              </el-col>
              <el-col>
                <router-link to="/personal-details/index">
                  <p>查看下属员工信息</p>
                </router-link>
              </el-col>
            </el-row>
          </div>
          <!--在线调查-->
          <div class="online-survey">
            <div class="online-h">
              <h3>在线调查</h3>
            </div>
            <el-row class="online-ul">
              <el-col class="online-li" v-for="(value,index) in onlineSurvey" :key="index">
                <el-row>
                  <el-col :span="4">{{value.title}}</el-col>
                  <el-col :span="20" class="online-span">{{value.content}}</el-col>
                </el-row>
                <!--<i>{{value.title}}</i><span>{{value.content}}</span>-->
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <!--右部-->
      <el-col :span="16">
        <div class="dashboard-right">
          <!--设备统计-->
          <div class="right-top bgw">
            <div class="right-top-h">
              <h3>设备统计</h3>
            </div>
            <div class="right-top-m">
              <el-row>
                <el-col :span="4" :offset="2">
                  <router-link to="/work/index">
                    <div class="grid-content bg-purple">
                      <img src="../../assets/images/out.png" alt="">
                      <p>申请公出</p>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="4">
                  <router-link to="/work/index">
                    <div class="grid-content bg-purple">
                      <img src="../../assets/images/absence.png" alt="">
                      <p>申请销假</p>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="4">
                  <router-link to="/work/index">
                    <div class="grid-content bg-purple">
                      <img src="../../assets/images/rvacation.png" alt="">
                      <p>申请休假</p>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="4">
                  <router-link to="/work/index">
                    <div class="grid-content bg-purple">
                      <img src="../../assets/images/review.png" alt="">
                      <p>我的审批</p>
                    </div>
                  </router-link>
                </el-col>
                <el-col :span="4">
                  <router-link to="/work/index">
                    <div class="grid-content bg-purple">
                      <img src="../../assets/images/out.png" alt="">
                      <p>查看我的申请</p>
                    </div>
                  </router-link>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--待办事项-->
          <div class="right-md bgw">
            <div class="right-md-h">
              <h3>待办事务</h3>
            </div>
            <div class="right-md-m">
              <el-row class="backlog-ul">
                <el-col v-for="(value,index) in backlog" :key="index" class="backlog-li">
                  <el-row>
                    <el-col
                      :span="4"
                      :offset="1"
                      class="backlog-span backlog-tit">{{value.title}}</el-col>
                    <el-col
                      :span="4"
                      :offset="1"
                      class="backlog-span">7天内
                      <i :class="[value.sevenDayWithin == '0' ? 'i-no' : 'i-bg']">{{value.sevenDayWithin=='0' ? '(无)' : value.sevenDayWithin+'个'}}</i>
                    </el-col>
                    <el-col
                      :span="4"
                      :offset="1"
                      class="backlog-span">3天内
                      <i :class="[value.threeDayWithin == '0' ? 'i-no' : 'i-bg']">{{value.threeDayWithin=='0' ? '(无)' : value.threeDayWithin+'个'}}</i>
                    </el-col>
                    <el-col
                      :span="4"
                      :offset="1"
                      class="backlog-span">当天
                      <i :class="[value.today == '0' ? 'i-no' : 'i-bg']">{{value.today=='0' ? '(无)' : value.today+'个'}}</i>
                    </el-col>
                    <el-col
                      :span="4"
                      class="backlog-span">过期
                      <i :class="[value.staleDated == '0' ? 'i-no' : 'i-bg']">{{value.staleDated=='0' ? '(无)' : value.staleDated+'个'}}</i>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--我的消息、招聘公告-->
          <div class="right-bm bgw">
            <tabs></tabs>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
    </div>
  </div>
</template>

<script>
  import UserInfo from './UserInfo'// 用户信息
  import Tabs from './Tabs'// tabs切换
  import { getOnline, getBacklog } from '@/api/personalDetail'
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    components: {
      Tabs,
      UserInfo
    },
    data() {
      return {
        // 在线调查
        onlineSurvey: null,
        // 待办事项
        backlog: null,
        listLoading: true,
        noticeShow: true
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getOnline().then(res => {
          this.onlineSurvey = res.data
          this.listLoading = false
        })
        getBacklog().then(res => {
          this.backlog = res.data
          this.listLoading = false
        })
      },
      closeNotice() {
        this.noticeShow = false
        return this.noticeShow
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .w100 {
    width: 100%;
    height: 100%;
  }

  .el-header {
    padding: 0;
    color: #333;
  }

  .el-aside {
    overflow: visible;
    margin-right: 16px;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  $bgw: #FFFFFF;
  .bgw {
    background-color: $bgw;
  }

  .look {
    height: 103px;
    background-color: $bgw;
    margin-bottom: 15px;
    p {
      height: 50%;
      line-height: 50px;
      margin: 0;
      text-align: left;
      margin-left: 30px;
    }
  }

  .online-survey {
    height: 166px;
    background-color: $bgw;
    .online-h {
      height: 53px;
      line-height: 53px;
      text-align: left;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-size: 16px;
        padding-left: 24px;
        font-weight: 400;
      }
    }
    .online-ul {
      text-align: left;
      margin: 10px 0 0 20px;
      .online-li {
        color: orangered;
        line-height: 30px;
        .online-span {
          color: #333;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .online-li:nth-child(2) {
        color: red;
        span {
          margin-left: 36px;
        }
      }
    }
  }

  .right-top {
    margin-bottom: 15px;
  }

  .right-top-h {
    height: 54px;
    line-height: 54px;
    text-align: left;
    border-bottom: 1px solid #f5f5f5;
    h3 {
      font-size: 16px;
      padding-left: 24px;
      font-weight: 400;
    }
  }

  .right-top-m {
    height: 110px;
    padding-top: 10px;
    .grid-content {
      text-align: center;
    }
  }

  .right-md-h {
    height: 54px;
    line-height: 54px;
    text-align: left;
    border-bottom: 1px solid #f5f5f5;
    h3 {
      font-size: 16px;
      padding-left: 24px;
      font-weight: 400;
    }
  }

  .right-md-m {
    height: 161px;
    text-align: left;
    overflow: auto;
    .backlog-ul {
      padding-left: 20px;
      .backlog-li {
        height: 33%;
        line-height: 54px;
        border-bottom: 1px solid #F0F0F0;
        .backlog-span {
          .i-bg {
            width: 50px;
            height: 20px;
            line-height: 20px;
            color: #ffffff;
            text-align: center;
            border-radius: 10px;
            background-color: orange;
            display: inline-block;
          }
        }
        .backlog-tit {
          font-weight: 600;
        }
      }
    }
  }

  .right-bm {
    overflow: hidden;
    text-align: center;
  }

  @media only screen and (min-width: 992px) {
    .el-col-md-2 {
      width: 20%;
    }
  }

  .right-md {
    margin-bottom: 19px;
  }

  .right-bm {
    height: 226px;
  }
  .dashboard {
    &-container {
      padding: 0 17px 19px 15px;
      background-color: #F0F0F0;
    }
    &-text {
      height: 26px;
      line-height: 26px;
      text-align: left;
    }
    &-top {
      height: 54px;
      line-height: 54px;
      .top-left {
        float: left;
      }
      .top-right {
        float: right;
        cursor: pointer;
      }
    }
  }
</style>
