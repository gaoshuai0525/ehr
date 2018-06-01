<template>
  <el-row class="item-box">
    <el-table
      ref="multipleTable"
      :data="selectData"
      fit
      :stripe="true"
      style="width:100%"
      tooltip-effect="dark">
      <el-table-column
        align="center"
        label="序号"
        width="55"
        type="index">
        <!--<template>
          <span>{{}}</span>
        </template>-->
      </el-table-column>
      <el-table-column
        align="center"
        width="80"
        label="姓名">
        <template slot-scope="scope">
          <div @click="view(scope.row.id)" class="go-to">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        width="55"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        width="55"
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        align="center"
        width="55"
        prop="workAges"
        label="司龄">
      </el-table-column>
      <el-table-column
        align="center"
        min-width="135"
        prop="department"
        label="部门">
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        prop="post"
        label="职位">
      </el-table-column>
      <el-table-column
        align="center"
        width="55"
        prop="rank"
        label="职级">
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        prop="firstPerformance"
        label="2015年绩效">
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        prop="secondPerformance"
        label="2016年绩效">
      </el-table-column>
      <el-table-column
        align="center"
        width="120"
        prop="thirdPerformance"
        label="2017年绩效">
      </el-table-column>
      <el-table-column
        align="center"
        width="55"
        prop="status"
        label="状态">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="listQuery.page"
      :page-size="listQuery.limit"
      background
      prev-text="上一页"
      next-text="下一页"
      layout="slot,prev, pager, next, jumper"
      :total="pageTotal">
      <span>共计<i class="color-orange">{{pageTotal}}</i>名干部，{{listQuery.page}} / {{totalPage}}页</span>
    </el-pagination>
  </el-row>
</template>

<script>
  export default {
    name: 'FilterTable',
    props:{
      selectData:{
        type: Array,
        default:[]
      },
      pageTotal:{
        type:Number,
        default:null
      },
      listQuery:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        currentPage: 1,
        totalPage:4,
        listLoading: true,
      }
    },

    methods: {
      // 跳转页
      view(id){
        this.$router.push({path:'/cadres-details/index',query:{employid:id,"infoType":"0"}})
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.listQuery.page = val
        this.$emit('changePage',this.listQuery)
      }
    }
  }
</script>
<style>
  .el-table {
    font-size: 16px;
  }
  .has-gutter tr th {
    background-color: #fff8ed;
  }
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f9f9f9;
  }
  .el-pagination {
    color: rgb(51,51,51);
    text-align: center;
    margin-top: 30px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ee7800;
    border: 1px solid #ee7800;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    background-color: #fff;
    width: 56px;
    border: 1px solid;
  }
  .el-pagination.is-background .el-pager li {
    background-color: #fff;
    border: 1px solid;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover,.el-pagination.is-background .btn-next:hover, .el-pagination.is-background .btn-prev:hover,.el-input__inner:hover {
    color: #ee7800;
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
    border-color: #ee7800;
  }
</style>
<style scoped>
  .color-orange {
    color: #ee7800;
    margin: 0 10px;
  }
  .item-box {
    padding: 20px;
    background-color: #ffffff;
  }
  .go-to:hover {
    color: blue;
    cursor: pointer;
  }
</style>
