<template>
  <div class="item-box">
    <el-row v-if="!isEdit" class="list" :gutter="30">
      <el-col :xs="20" :sm="21" :md="22" :lg="22">
        <el-row>
          <el-col :xs="24" :sm="12"><span>入司日期：{{basicData.hireDate}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>参加工作时间：{{basicData.beginWorkDate}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>加入当前部门时间：{{basicData.joinUnitDate}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>加入当前职位时间：{{basicData.joinJobDate}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>第一学历：{{basicData.fisrtGrade}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>毕业院校及专业：{{basicData.SchoolSpeciality}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>最高学历：{{basicData.topGrade}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>毕业院校及专业：{{basicData.speciality}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>专业技术职务：{{basicData.expertisenName}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>职业技能资格：{{basicData.skillsName}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>身份证号：{{basicData.idcard}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>婚姻状况：{{basicData.marital}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>籍贯：{{basicData.nativePlace}}</span></el-col>
          <el-col :xs="24" :sm="12"><span>户籍所在地：{{basicData.regresidence}}</span></el-col>
          <el-col><span>家庭住址：{{basicData.address}}</span></el-col>
        </el-row>
      </el-col>
      <el-col :xs="4" :sm="3" :md="2" :lg="2">
        <!--<i class="edit" @click="isEdit=!isEdit">编辑</i>-->
      </el-col>
    </el-row>

    <el-row v-else>
      <el-form ref="basicData" :model="basicData" label-width="160px">
        <el-row>
          <el-col :span="11">
            <el-form-item
              label="入司时间"
              class="form-item"
              size="mini">{{basicData.hireDate}}
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="参加工作日期"
              class="form-item" size="mini">
              <el-date-picker type="date" placeholder="年/月/日" v-model="basicData.beginWorkDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item
              label="加入当前部门时间"
              class="form-item" size="mini">{{basicData.joinUnitDate}}</el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="加入当前职位时间"
              class="form-item">{{basicData.joinJobDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="专业技术职务" class="form-item clear-l" size="mini">
          <el-input v-model="basicData.expertisenName"></el-input>
        </el-form-item>
        <el-form-item label="职业技能资格" class="form-item" size="mini">
          <el-input v-model="basicData.skillsName"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="身份证号" class="form-item" size="mini">
              <el-input v-model="basicData.idcard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="婚姻状况" class="form-item" size="mini">
              <el-select v-model="basicData.marital" placeholder="婚姻状况">
                <el-option
                  v-for="(item,index) in maritalStatus"
                  :key="index"
                  :label="item"
                  :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="籍贯" class="form-item" size="mini">
              <el-col :span="11">
                <el-select v-model="basicData.nativePlace" placeholder="省">
                  <!-- <el-option
                     v-for="(item,index) in maritalStatus"
                     :key="index"
                     :label="item"
                     :value="item"></el-option>-->
                  <el-option
                    label="山西"
                    value="山西"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11">
                <el-select v-model="basicData.CM" placeholder="市">
                  <el-option
                    label="太原"
                    value="太原"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="户籍所在地" class="form-item" size="mini">
              <el-col :span="11">
                <el-select v-model="basicData.nativePlace" placeholder="省">
                  <el-option
                    label="北京"
                    value="北京"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11">
                <el-select v-model="basicData.CM" placeholder="市">
                  <el-option
                    label="北京"
                    value="北京"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="家庭住址" class="form-item" size="mini">
          <el-input v-model="basicData.homeAdd"></el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-button type="primary" @click="isEdit=!isEdit">保存</el-button>
          <el-button @click="isEdit=!isEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      basicData:{
        type: Object,
        default:{}
      }
    },
    computed:{
    },
    data() {
      return {
        isEdit: false,
        maritalStatus:['已婚','未婚']
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
    padding: 20px;
    margin-top: 10px;
    background-color: #fff;
  }
  .item-box h5 {
    padding: 0 8px;
    margin: 24px 20px 14px 20px;
    border-left: 4px solid #ee7800;
    font-size: 18px;
  }
  .item-box .list{
    line-height: 30px;
  }
  .item-box .list span{
    display: inline-block;
    padding-left: 20px;
  }
</style>
