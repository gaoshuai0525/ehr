<template>
  <div>
    <div class="item-box">
      <!--<div class="details-type" ref="detailsType">奖惩情况</div>-->
      <!--<div class="items">-->
      <h5>奖励情况</h5>
      <el-row :gutter="30" class="list" v-if="praiseInfo" v-for="(value,index) in praiseInfo" :key="value.praiseId">
        <el-col :xs="24" :sm="8" :md="4" :lg="3"><span>{{value.praiseDate}}</span></el-col>
        <el-col :xs="24" :sm="8" :md="4" :lg="3"><span>{{value.praiseType}}</span></el-col>
        <el-col :xs="24" :sm="8" :md="16" :lg="18"><span>{{value.praiseContent}}</span></el-col>
      </el-row>
    </div>
    <div class="item-box">
      <h5>处罚情况</h5>
      <el-row :gutter="30" class="list" v-if="punishInfo" v-for="(value,index) in punishInfo" :key="value.punishId">
        <el-col :xs="24" :sm="8" :md="4" :lg="3"><span>{{value.punishDate}}</span></el-col>
        <el-col :xs="24" :sm="8" :md="4" :lg="3"><span>{{value.punishType}}</span></el-col>
        <el-col :xs="24" :sm="8" :md="16" :lg="18"><span>{{value.punishContent}}</span></el-col>
      </el-row>
      <!--</div>-->
    </div>
  </div>

</template>
<script type="text/javascript">
  export default {
    props: {
      praiseInfo:{
        type: Array,
        default:[]
      },
      punishInfo:{
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
      praiseInfo(){
          console.log(this.praiseInfo)
      }
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
