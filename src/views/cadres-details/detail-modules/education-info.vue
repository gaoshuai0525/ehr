<template>
  <!--<el-col class="item-box">-->
    <!--<div class="details-type" ref="detailsType">-->
      <!--<h5>教育经历</h5>-->
    <!--</div>-->
    <div class="item-box">
      <!--展示-->
      <!--<el-row>-->
        <!--<el-col>-->
          <el-row v-if="educationData" v-for="(value,index) in educationData" :key="index" :gutter="30"
                  class="list"
                  :class="{bd:index!=educationData.length-1}">
                <el-col :span="24"><span>{{value.school}}({{dateFormat(value.studyPeriodStarter,'yyyy.mm')}}-{{dateFormat(value.studyPeriodEnd,'yyyy.mm')}})</span></el-col>
                <el-col :xs="24" :sm="8"><span>学历：{{value.faculty}}</span></el-col>
                <el-col :xs="24" :sm="8"><span>学院（系）：{{value.school}}</span></el-col>
                <el-col :xs="24" :sm="8"><span>专业：{{value.major}}</span></el-col>
                <el-col :xs="24" :sm="8"><span>学历性质：{{value.studystyle}}</span></el-col>
                <el-col :xs="24" :sm="8"><span>毕业情况：{{value.graduate}}</span></el-col>
                <el-col :xs="24" :sm="8"><span>所获学位：{{value.degree}}</span></el-col>
          </el-row>
          <el-row v-else>
            <el-col><span>暂无教育经历信息</span></el-col>
          </el-row>
        <!--</el-col>-->
        <!--<el-col v-else><span>暂无教育经历信息</span></el-col>-->
        <!--&lt;!&ndash;<el-col><i class="add" @click="FormVisible.education = 'c'">+新增教育经历</i></el-col>&ndash;&gt;-->
      <!--</el-row>-->
    </div>
  <!--</el-col>-->
</template>
<script type="text/javascript">
  import  dateFormat from  'dateFormat'
  export default {
    props: {
      educationData:{
        type: Array
      }
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
      },
      dateFormat(date,str){
        return dateFormat(date,str)
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
