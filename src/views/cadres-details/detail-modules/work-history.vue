<template>
  <div>
    <!--<div class="item-box" v-if="externalWorkInfo">-->
      <div class="item-box">
        <div><h5>外部工作经历</h5></div>

          <el-row :gutter="30" v-for="(value,index) in externalWorkInfo" :key="index">
            <el-col :xs="24" :sm="8"><span>{{value.company}}{{value.workPeriod}}</span></el-col>
            <el-col :xs="24" :sm="8"><span>部门：{{value.department}}</span></el-col>
            <el-col :xs="24" :sm="8"><span>职务：{{value.achievement}}</span></el-col>
          </el-row>

      </div>
      <div class="item-box">
        <div><h5>内部工作经历</h5></div>

          <el-row :gutter="30" v-for="(value,index) in innerWorkInfo" :key="index">
            <el-col :xs="24" :sm="8"><span>{{value.company}}{{value.workPeriod}}</span></el-col>
            <el-col :xs="24" :sm="8"><span>部门：{{value.department}}</span></el-col>
            <el-col :xs="24" :sm="8"><span>职务：{{value.achievement}}</span></el-col>
          </el-row>

      </div>
      <div class="item-box">
        <div><h5>兼职经历</h5></div>

          <el-row  :gutter="30" v-for="(value,index) in partWorkInfo" :key="index">
            <el-col :xs="24" :sm="8"><span>{{value.company}}{{value.workPeriod}}</span></el-col>
            <el-col :xs="24" :sm="8"><span>部门：{{value.department}}</span></el-col>
            <el-col :xs="24" :sm="8"><span>职务：{{value.achievement}}</span></el-col>
          </el-row>

      </div>
    <!--</div>-->
  </div>

</template>
<script type="text/javascript">
  export default {
    props: {
      externalWorkInfo:{
        type: Array,
        default:[]
      },
      innerWorkInfo:{
        type: Array,
        default:[]
      },
      partWorkInfo:{
        type: Array,
        default:[]
      }
    },
    computed:{
    },
    data() {
      return {
      }
    },
    watch: {

    },
    mounted() {
    },
    methods: {
      clickSaveHandler() {
      },
      cancel() {
      }
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .item-box{
    margin-top: 10px;
    background: #fff;
    padding: 24px 0;
  }
  .item-box h5 {
    line-height: 18px;
    padding: 0 8px;
    margin: 0 20px 24px 20px;
    border-left: 4px solid #ee7800;
    font-size: 18px;
  }
  .item-box .list{
    padding: 24px 0;
    line-height: 30px;
  }
  .bd:after{
    content: '';
    height: 1px;
    background: #ccc;
    width: calc(100% - 70px);
    margin: 0 auto;
    position: relative;
    top: 24px;
  }
  .item-box .el-col span{
    display: inline-block;
    padding-left: 20px;
  }
</style>
