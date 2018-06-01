<template>
  <!--企业首页-->
  <div class="app-container">
    <el-row class="dashboard-breadcrumb">
      <el-breadcrumb separator=">>">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">
          <i class="fa fa-cube" aria-hidden="true"></i><span>干部管理首页</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
      <!--搜索框-->
    <el-row>
      <el-col :offset="6" :span="16">
        <el-row>
          <el-col :span="16">
            <el-input
              placeholder="请输入干部姓名或者所有部门名称进行查询"
              v-model="filterText"
              :maxlength="20"
             ></el-input>
          </el-col>
          <el-col :span="2">
              <el-button
                class="filter-item"
                type="primary"
                @click="handleFilter"
                @keyup.center="handleFilter">搜索</el-button>
            </el-col>
          <el-col :span="4">
              <el-button
                class="filter-item"
                type="primary"
                @click="view"
                @keyup.center="view">条件搜索</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="6" :span="12" class="dashboard-total">
        <el-row>
          <el-col :span="12">
            <div class="dashboard-total-station">
              <p>{{introduction.managementMsg.numbers}}人</p>
              <p>管理岗人数</p>
            </div>
          </el-col>
          <el-row>
            <el-col :span="12">
              <div class="dashboard-total-range">
                <p>{{introduction.managementMsg.groupStraightMsg.numbers}}人</p>
                <p>集团管理范围</p>
              </div>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="isCentralOffice=='0' ? true : false">
      <el-col class="dashboard-button">
        <el-button @click="isShow=!isShow">{{isShow?'收起':'展开'}}</el-button>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <el-row v-if="isShow">
        <el-col :offset="6" :span="12" class="dashboard-detail">
          <el-row>
            <el-col :span="12">
              <div class="dashboard-detail-station">
            <el-row>
              <el-col :span="12">总部</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.headQuarters}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">人寿</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.lifeInsur}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">养老</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.retirement}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">在线</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.onLine}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">资产</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.asset}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">健投</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.health}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="12">合计</el-col>
              <el-col :span="12">{{introduction.managementMsg.numberDetail.total}}</el-col>
            </el-row>
          </div>
            </el-col>
            <el-col :span="12">
              <div class="dashboard-detail-range">
                <el-row>
                  <el-col :span="12">总部</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.headQuarters}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">人寿</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.lifeInsur}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">养老</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.retirement}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">在线</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.onLine}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">资产</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.asset}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">健投</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.health}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">合计</el-col>
                  <el-col :span="12">{{introduction.managementMsg.groupStraightMsg.numberDetail.total}}</el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-collapse-transition>
  </div>
</template>

<script>
  import { dashboard } from '@/api/home'
  import { mapGetters } from 'vuex'
  import { getInfo } from "../../utils/auth";

  export default {
    name: 'app',
    components: {
    },
    data() {
      return {
        filterText: '',
        isShow: false,
        isCentralOffice:'0',
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        listLoading: true
      }
    },
    methods: {
      loadTableData() {
        this.isCentralOffice = (getInfo()).isCentralOffice
      },
      handleFilter() {
        this.listQuery.page = 1
        if (this.filterText == ''){
          this.$message({
            // title: '成功',
            message: '请输入干部姓名/部门后进行搜索',
            type: 'warning',
            duration: 5000,
            showClose:true
          })
        }

      },
      // 跳转页
      view(){
        this.$router.push({path:'/cadre-screen/cadre-selection'})
      }
    },
    created() {
      this.loadTableData()
    },
    computed: {
      ...mapGetters([
        'introduction'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-total,.dashboard-detail{
    text-align: center;
  }
  .dashboard-total-station,.dashboard-total-range{
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 70px 0;
    width:200px;
    height:200px;
    border-radius: 50%;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .dashboard-detail-station,.dashboard-detail-range{
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
    width:200px;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .dashboard-button{
    text-align: center;
  }
</style>
