<template>
  <el-col class="item-box">
    <!--<div class="details-type" ref="detailsType">
      <h5>干部申报事项</h5>
    </div>-->
    <el-row>
      <el-col class="item-container">
        <div class="details-type">
          <h3>配偶子女从业</h3>
        </div>
        <div class="items">
          <el-row :gutter="50">
            <el-col
              v-for="(value,index) in famWorkExpInfo"
              :key="index"
              class="mb24">
              <el-row
                class="pb24"
                :class="[index==famWorkExpInfo.length-1 ? '' : 'bb1']">
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">{{value.relationName}}&nbsp;&nbsp;{{value.empRelation}}</el-col>
                    <el-col :xs="24" :sm="12"><i class="edit">编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="8">工作单位：{{value.company}}</el-col>
                    <el-col :xs="24" :sm="8">从业时间：{{value.workPeriod}}</el-col>
                    <el-col :xs="24" :sm="8">职务：{{value.achievement}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="8">学历：{{value.grade}}</el-col>
                    <el-col :xs="24" :sm="8">证件名称：{{value.statusType}}</el-col>
                    <el-col :xs="24" :sm="8">证件号:{{value.idcard}}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="item-container">
        <div class="details-type">
          <h3>本人配偶子女经商办企业</h3>
        </div>
        <div class="items">
          <el-row>
            <el-col
              v-for="(item,index) in famBusiInfo"
              :key="index"
              class="mb24">
              <el-row
                class="pb24"
                :class="[index==famBusiInfo.length-1 ? '' : 'bb1']">
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">{{item.relationName}}&nbsp;&nbsp;{{item.empRelation}}&nbsp;&nbsp;{{item.companyName}}</el-col>
                    <el-col :xs="24" :sm="12"><i class="edit">编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">经营状态：{{item.companyStatus}}</el-col>
                    <el-col :xs="24" :sm="12">企业统一社会信用代码：{{item.companyCode}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">成立日期：{{item.createDate}}</el-col>
                    <el-col :xs="24" :sm="12">公司类型：{{item.companyType}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">注册资本：{{item.totalAmount}}</el-col>
                    <el-col :xs="24" :sm="12">个人认缴出资额：{{item.personAmount}}</el-col>
                  </el-row>
                </el-col>
                <el-col>经营范围：{{item.businessScope}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="item-container">
        <div class="details-type">
          <h3>出入境证件</h3>
        </div>
        <div class="items">
          <el-row>
            <el-col
              v-for="(value,index) in inOutCardInfo"
              :key="index"
              class="mb24">
              <el-row
                class="pb24"
                :class="[index==inOutCardInfo.length-1 ? '' : 'bb1']">
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">{{value.idcardType}}({{value.validityPeriod}})</el-col>
                    <el-col :xs="24" :sm="12"><i class="edit">编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :xs="24" :sm="12">证件号码：{{value.idcard}}</el-col>
                    <el-col :xs="24" :sm="12">签发日期：{{value.issuedDate}}</el-col>
                  </el-row>
                </el-col>
                <el-col v-if="value.appleNation">已申请签证国家：{{value.appleNation}}</el-col>
                <el-col v-else>备注：{{value.remark}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="item-container">
        <div class="details-type">
          <h3>其他事项</h3>
        </div>
        <div class="items">{{otherInfo}}</div>
      </el-col>
    </el-row>

  </el-col>
</template>

<script>
    export default {
      name: "declare",
      props: {
        famWorkExpInfo:{
          type: Array,
          default:[]
        },
        famBusiInfo:{
          type: Array,
          default:[]
        },
        inOutCardInfo:{
          type: Array,
          default:[]
        },
        otherInfo:{
          type: String,
          default:""
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
      created() {
      },
      methods: {
        clickSaveHandler() {
        },
        cancel() {
        }
      },
    }
</script>

<style scoped>
  .items {
    padding: 0 40px 0 20px;
  }

  .item-box h5 {
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    padding: 0 8px;
    margin: 24px 0 12px 0;
    border-left: 4px solid #ee7800;
  }
  .item-box .el-col{
    /*height: 30px;*/
    line-height: 30px;
  }
  .item-box .el-col span{
    display: inline-block;
    padding-left: 20px;
  }
  .edit {
    display: none;
  }
  .details-type h3 {
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    padding: 0 8px;
    margin: 20px 0 22px 20px;
    border-left: 4px solid #ee7800;
  }
  .mb24 {
    margin-bottom: 24px;
  }
  .pb24 {
    padding-bottom: 24px;
  }
  .bb1 {
    border-bottom: 1px solid #ccc;
  }
  .item-container {
    margin-bottom: 10px;
    background-color: #ffffff;
  }
</style>
