<template>
  <div class="item-box">
    <el-row
      v-for="(value,index) in perfData" :key="index"
      :gutter="30"
      class="list"
    >
      <el-col :xs="24" :sm="8"><span>年度：{{value.year}}</span></el-col>
      <el-col :xs="24" :sm="8"><span>结果：{{value.result}}</span></el-col>
      <el-col :xs="24" :sm="8"><span>绩效指标详情：{{value.content}}</span></el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      perfData:{
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
    background-color: #fff;
  }
  .item-box h5 {
    line-height: 18px;
    padding: 0 8px;
    margin: 0 20px 24px 20px;
    border-left: 4px solid #ee7800;
    font-size: 18px;
  }
  .item-box .list{
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
