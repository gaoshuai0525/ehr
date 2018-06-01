<template>
  <div class="app-container">
    <!--面包屑-->

      <el-breadcrumb class="app-breadcrumb" separator=">" v-if="cadresDetailsMsg">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">干部管理首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/cadre-selection/index' }">干部筛选</el-breadcrumb-item>
        <el-breadcrumb-item>{{cadresDetailsMsg.basicInfo.name}}</el-breadcrumb-item>
      </el-breadcrumb>

    <!--头部-->
    <el-row class="top-page" v-if="cadresDetailsMsg">
      <!--展示-->
      <el-row :gutter="30" v-if="!isEdit">
        <el-col :xs="12" :sm="6" :md="4" :lg="3">
          <div class="img-box">
            <img :src="cadresDetailsMsg.basicInfo.file" alt="" />
          </div>
        </el-col>
        <el-col :xs="8" :sm="15" :md="18" :lg="19">
        <el-row :gutter="30">
          <el-col class="name">
                {{cadresDetailsMsg.basicInfo.name}}
                <span class="job-num">(员工号：{{cadresDetailsMsg.basicInfo.id}})</span>
                <span class="level">{{cadresDetailsMsg.basicInfo.employeeDepar}}</span>
          </el-col>
          <el-col class="department">
            <span>{{cadresDetailsMsg.basicInfo.employeeDepar}}</span>
          </el-col>
          <el-col class="preview">
              <span>{{cadresDetailsMsg.basicInfo.nation}}</span> |
              <span>{{cadresDetailsMsg.basicInfo.nationality}}</span> |
              <span>{{cadresDetailsMsg.basicInfo.polity}}</span> |
              <span>{{cadresDetailsMsg.basicInfo.gender}}</span> |
              <span>{{cadresDetailsMsg.basicInfo.birthday}}出生</span>
          </el-col>
        </el-row>
        </el-col>
        <el-col :xs="4" :sm="3" :md="2" :lg="2">
          <!--<i class="edit" @click="isEdit=!isEdit">编辑</i>-->
        </el-col>
      </el-row>
      <el-row :gutter="30" v-else>
        <el-col :xs="12" :sm="6" :md="4" :lg="3">
          <div class="img-box">
            <img :src="cadresDetailsMsg.basicInfo.file" alt="" />
            <p><i class="reset-bn">修改</i></p>
            <p>说明：仅支持上传JPG、GIF、PNG格式照片，并且照片大小不能超过2M</p>
          </div>
        </el-col>
        <el-col :xs="12" :sm="18" :md="20" :lg="21">
          <el-form ref="cadresDetailsMsg.basicInfo" :model="cadresDetailsMsg.basicInfo" label-width="80px">
            <el-form-item label="姓名" class="form-item">
              <el-input v-model="cadresDetailsMsg.basicInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="员工号" class="form-item">{{cadresDetailsMsg.basicInfo.id}}</el-form-item>
            <el-form-item label="职位" class="form-item">{{cadresDetailsMsg.basicInfo.employeeDepar}}</el-form-item>
            <el-form-item label="机构部门" class="form-item">{{cadresDetailsMsg.basicInfo.employeeDepar}}</el-form-item>
            <el-form-item label="性别" class="form-item">
              <el-radio-group v-model="cadresDetailsMsg.basicInfo.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="国籍" class="form-item">
              <el-select v-model="cadresDetailsMsg.basicInfo.nation" placeholder="国籍">
                <el-option label="中国" value="中国"></el-option>
                <el-option label="美国" value="美国"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族" class="form-item">
              <el-select v-model="cadresDetailsMsg.basicInfo.nationality" placeholder="民族">
                <el-option v-for="(item,index) in nation"
                           :key="index"
                           :label="item"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" class="form-item">
              <el-select v-model="cadresDetailsMsg.basicInfo.polity" placeholder="民族">
                <el-option v-for="(item,index) in politicsStatus"
                           :key="index"
                           :label="item"
                           :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" class="form-item">
              <el-col :span="11">
                <el-date-picker
                  type="month"
                  placeholder="月"
                  v-model="cadresDetailsMsg.basicInfo.birthday"
                  style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item class="form-item">
              <el-button type="primary" @click="isEdit=!isEdit">保存</el-button>
              <el-button @click="isEdit=!isEdit">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-row>
    <!--导航-->
    <goodTab :options="menuList">
        <!--基本信息-->
        <basicInfo :basicData="cadresDetailsMsg.basicInfo"></basicInfo>
        <!--教育经历-->
        <educationInfo :educationData="cadresDetailsMsg.educationInfo"></educationInfo>
        <!--工作经历-->
        <workHistory
          :externalWorkInfo="cadresDetailsMsg.externalWorkInfo"
          :innerWorkInfo="cadresDetailsMsg.innerWorkInfo"
          :partWorkInfo="cadresDetailsMsg.partWorkInfo"
        ></workHistory>
        <!--绩效套餐-->
        <perfInfo :perfData="cadresDetailsMsg.performanceInfo"></perfInfo>
        <!--奖惩情况-->
        <praiseInfo
          :praiseInfo="cadresDetailsMsg.praiseInfo"
          :punishInfo="cadresDetailsMsg.punishInfo"
        ></praiseInfo>
        <!--干部申报事项-->
        <cadre-declare
          :famWorkExpInfo="cadresDetailsMsg.famWorkExpInfo"
          :famBusiInfo="cadresDetailsMsg.famBusiInfo"
          :inOutCardInfo="cadresDetailsMsg.inOutCardInfo"
          :otherInfo="cadresDetailsMsg.otherInfo"
        ></cadre-declare>
    </goodTab>
  </div>
</template>

<script>
    import { getCadreDetails,resetCadreDetails } from '@/api/cadresDetails'
    import goodTab from './good-tab'
    import basicInfo from './detail-modules/basic-info.vue'
    import perfInfo from './detail-modules/perf-info.vue'
    import educationInfo from './detail-modules/education-info.vue'
    import workHistory from './detail-modules/work-history'
    import praiseInfo from './detail-modules/praise-info'
    import cadreDeclare from './detail-modules/cadre-declare'

    export default {
      components: {
        goodTab,
        basicInfo,
        perfInfo,
        educationInfo,
        workHistory,
        cadreDeclare,
        praiseInfo,
      },
      data() {
        return {
          cadresDetailsMsg: {
            basicInfo: {},
            educationInfo: [],
            externalWorkInfo: [],
            innerWorkInfo: [],
            partWorkInfo: [],
            performanceInfo: [],
            praiseInfo: [],
            punishInfo: [],
            famWorkExpInfo: [],
            famBusiInfo: [],
            inOutCardInfo: [],
            otherInfo: ""
          },
          menuList: ['基本信息','教育经历','工作经历','绩效信息','奖惩情况','干部申报事项'],
          politicsStatus: {
            1: '中共党员',
            2: '中共预备党员',
            3: '共青团员',
            4: '民革会员',
            5: '民盟盟员',
            6: '民建会员',
            7: '民进会员',
            8: '农工党党员',
            9: '致公党党员',
            10: '九三学社社员',
            11: '台盟盟员',
            12: '无党派民主人士',
            13: '群众',
            99: '其他'
          },// 政治面貌
          isEdit: false,
          nation:['汉族','满族']
        }
      },
      methods: {
        getList() {
          this.listLoading = true
          getCadreDetails(this.$route.query.employid).then(res => {
            this.cadresDetailsMsg = res.data
            this.listLoading = false
          })
        },
        save(dataForm,str) {
          dataForm.id=this.$router.currentRoute.query.id
          this.$refs['abstractForm'].validate((valid) => {
            if (valid) {
              this.listLoading = true
              resetCadreDetails(dataForm).then((res) => {
                this.listLoading = false
                 this.reload(str)
                this.$notify({
                  title: '成功',
                  message: '保存完成',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          })
        },
        cancel(str){
            this.reload(str)
        },
        reload(str){
          getCadreDetails(this.$route.query.id).then(res => {
            this.cadresDetailsMsg[str] = res.data[str]
            this.$set(this.cadresDetailsMsg[str],'isEdit',false)
            this.listLoading = false
          })
        },
      },
      created() {
        this.getList()
      },
      mounted() {
//        setTimeout(() =>{
//          this.scroll()
//        },1000)
      },
      computed: {
      },
      beforeRouteEnter(to,from,next) {
        next(vm => {
        })
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
  .top-page {
    padding: 20px;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 5px;
  }
  .edit {
    cursor: pointer;
  }
  .add {
    cursor: pointer;
  }
  .reset-bn {
    color: #0000ff;
    cursor: pointer;
  }
  .form-item {
    margin-bottom: 0px;
  }
  .item-box {
    /*background-color: #fff;*/
    margin-top: 10px;
  }
  .item-box h5 {
    /*height: 60px;*/
    /*line-height: 60px;*/
    padding: 0 8px;
    margin: 24px 20px;
    border-left: 2px solid #ee7800;
  }
  .img-box {
    width: 100%;
  }
  .img-box img {
    width: 100%;
    height: auto;
    vertical-align: middle;
  }
  .top-page .name{
    font-size: 26px;
    padding: 14px 0;
  }
  .top-page .job-num{
    font-size: 14px;
    display: inline-block;
    margin-right: 15px;
    margin-left: 5px;
  }
  .top-page .level{
    font-size: 22px;
  }
  .top-page .department{
    padding: 14px 0;
  }
  .top-page .preview{
    padding:4px 0;
  }
</style>
