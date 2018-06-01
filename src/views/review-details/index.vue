<template>
  <div class="app-container">
    <!--面包屑-->
    <el-row>
      <el-breadcrumb class="app-breadcrumb" separator="|" v-if="cadresDetailsMsg">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">干部管理首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/cadre-selection/index' }">干部筛选</el-breadcrumb-item>
        <el-breadcrumb-item>{{cadresDetailsMsg.abstract.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <!--头部-->
    <el-row class="top-page" v-if="cadresDetailsMsg">
      <!--展示-->
      <el-row v-if="!FormVisible.abstract">
        <el-col :span="6">
          <div class="img-box">
            <img :src="abstract.avatar" alt="" />
          </div>
        </el-col>
        <el-col :span="18">
          <el-row>
            <el-col>
              <el-row>
                <el-col :span="18">{{abstract.name}}(员工号：{{abstract.employee}})<span>{{abstract.post}}</span></el-col>
                <el-col :span="6">
                  <i class="edit" @click="FormVisible.abstract=!FormVisible.abstract">编辑</i>
                </el-col>
              </el-row>
            </el-col>
            <el-col>
              <span>{{abstract.company}}</span>/<span>{{abstract.firstCompany}}</span>/<span>{{abstract.secondCompany}}</span>
            </el-col>
            <el-col>
              <span>{{abstract.nationality}}</span>|
              <span>{{abstract.nation}}</span>|
              <span>{{abstract.politicsStatus}}</span>|
              <span>{{abstract.sex}}</span>|
              <span>{{abstract.birthDate}}出生</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!--编辑-->
      <el-row v-else>
        <el-col :span="8">
          <div class="img-box">
            <img :src="abstract.avatar" alt="" />
            <p><i class="reset-bn">修改</i></p>
            <p>说明：仅支持上传JPG、GIF、PNG格式照片，并且照片大小不能超过2M</p>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form ref="abstractForm" :model="abstract" label-width="80px">
            <el-form-item label="姓名" class="form-item">
              <el-input v-model="abstract.name"></el-input>
            </el-form-item>
            <el-form-item label="员工号" class="form-item">{{abstract.employee}}</el-form-item>
            <el-form-item label="职位" class="form-item">{{abstract.post}}</el-form-item>
            <el-form-item label="机构部门" class="form-item">{{abstract.company}}/{{abstract.firstCompany}}/{{abstract.secondCompany}}</el-form-item>
            <el-form-item label="性别" class="form-item">
              <el-radio-group v-model="abstract.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="国籍" class="form-item">
              <el-select v-model="abstract.nationality" placeholder="国籍">
                <el-option label="中国" value="中国"></el-option>
                <el-option label="美国" value="美国"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族" class="form-item">
              <el-select v-model="abstract.nation" placeholder="民族">
                <el-option label="汉族" value="汉族"></el-option>
                <el-option label="满族" value="满族"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="政治面貌" class="form-item">
              <el-input v-model="abstract.politicsStatus"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" class="form-item">
              <el-col :span="11">
                <el-date-picker
                  type="year"
                  placeholder="年"
                  v-model="abstract.birthDate"
                  style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col :span="11">
                <el-date-picker
                  type="month"
                  placeholder="月"
                  v-model="abstract.birthDate"
                  style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item class="form-item">
              <el-button type="primary" @click="clickSaveHandler('abstractForm',abstract)">保存</el-button>
              <el-button @click="FormVisible.abstract=!FormVisible.abstract">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-row>
    <!--导航-->
    <el-row
      class="top"
      ref="topMenu"
      :class="[ isFixed ? 'tp0' : '']"
      v-if="cadresDetailsMsg">
      <el-col>
        <ul>
          <li
            v-for="(item,index) in cadresDetailsMsg.list"
            :key="index"
            :style="currentIndex == index? {background:'red'}:''"
            @click="clickFn(index)">
            <h5>{{item.name}}</h5>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!--内容-->
    <el-row
      class="bottom"
      ref="bottomMenu"
      :style="{paddingTop:isFixed ? '40px' :'0px'}">
      <!--<el-col>
        <ul>
          <li v-for="item in cadresDetailsMsg.list">
            <h5 class="details-type" ref="detailsType">{{item.name}}</h5>
            <ul>
              <li class="items" v-for="value in item.data"></li>
            </ul>
          </li>
        </ul>
      </el-col>-->
      <!--基本信息-->
      <el-col>
        <div class="details-type" ref="detailsType">
          <h5>基本信息<el-button class="edit">编辑</el-button></h5>
        </div>
        <div class="items">
          <!--展示-->
          <el-row v-if="basicInfo">
            <el-col>
              <el-row>
                <el-col :span="12">入司时间：{{basicInfo.inTime}}</el-col>
                <el-col :span="12">参加工作时间：{{basicInfo.dateWork}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="12">加入当前部门时间：{{basicInfo.joinCurrentDepartmentTime}}</el-col>
                <el-col :span="12">加入当前职位时间：{{basicInfo.joinCurrentPosition}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="12">第一学历：{{basicInfo.firstEducation}}</el-col>
                <el-col :span="12">毕业院校及专业：{{basicInfo.firstSchool}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="12">最高学历：{{basicInfo.highestEducation}}</el-col>
                <el-col :span="12">毕业院校及专业：{{basicInfo.secondSchool}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="12">专业技术职务：{{basicInfo.technicalOccupation}}</el-col>
                <el-col :span="12">职业技能资格：{{basicInfo.professionalSkillsQualification}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="12">身份证号：{{basicInfo.IDNumber}}</el-col>
                <el-col :span="12">婚姻状况：{{basicInfo.maritalStatus ? '已婚' : '未婚'}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col :span="12">籍贯：{{basicInfo.nativePlace}}</el-col>
                <el-col :span="12">户籍所在地：{{basicInfo.CM}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col>家庭住址：{{basicInfo.homeAdd}}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--编辑-->
          <!--<el-row>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
          </el-row>-->
        </div>
      </el-col>
      <!--绩效套餐-->
      <el-col>
        <div class="details-type" ref="detailsType">绩效套餐</div>
        <div class="items">
          <el-row>
            <el-col v-for="(value,index) in perfInfo" :key="index">
              <el-row>
                <el-col :span="8">年度：{{value.year}}</el-col>
                <el-col :span="8">结果：{{value.result}}</el-col>
                <el-col :span="8">绩效指标详情：{{value.details}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--教育经历-->
      <el-col>
        <div class="details-type" ref="detailsType">教育经历</div>
        <div class="items">
          <el-row>
            <el-col v-for="(value,index) in education" :key="index">
              <el-row>
                <el-col>
                  <el-row>
                    <el-col :span="8">{{value.name}}({{value.date}})</el-col>
                    <el-col :span="8">
                      <span v-if="value.highestEducation">最高学历</span>
                      <span v-if="value.firstEducation">第一学历</span></el-col>
                    <el-col :span="8"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="8">学历：{{value.education}}</el-col>
                    <el-col :span="8">学院（系）：{{value.school}}</el-col>
                    <el-col :span="8">专业：{{value.major}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="8">学历性质：{{value.degreeNature}}</el-col>
                    <el-col :span="8">毕业情况：{{value.isGraduation ? '毕业': '未毕业'}}</el-col>
                    <el-col :span="8">所获学位：{{value.degree}}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--工作经历-->
      <el-col>
        <div class="details-type" ref="detailsType">工作经历</div>
        <div class="items" v-if="workHistory">
          <el-row>
            <el-col>
              <el-row>
                <el-col>外部工作经历</el-col>
                <el-col v-for="(value,index) in workHistory.outer" :key="index">
                  <el-row>
                    <el-col :span="6">{{value.company}}{{value.date}}</el-col>
                    <el-col :span="6">部门：{{value.part}}</el-col>
                    <el-col :span="6">职务：{{value.job}}</el-col>
                    <el-col :span="6"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>新增工作经历</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-row>
                <el-col>内部工作经历</el-col>
                <el-col v-for="(value,index) in workHistory.inter" :key="index">
                  <el-row>
                    <el-col :span="6">{{value.company}}{{value.date}}</el-col>
                    <el-col :span="6">部门：{{value.part}}</el-col>
                    <el-col :span="6">职务：{{value.job}}</el-col>
                    <el-col :span="6"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--配偶子女从业-->
      <el-col>
        <div class="details-type" ref="detailsType">配偶子女从业</div>
        <div class="items">
          <el-row>
            <el-col v-for="(value,index) in SpouseChildren" :key="index">
              <el-row>
                <el-col>
                  <el-row>
                    <el-col :span="12">{{value.name}}&nbsp;&nbsp;{{value.role}}</el-col>
                    <el-col :span="12"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="8">工作单位：{{value.unit}}</el-col>
                    <el-col :span="8">从业时间：{{value.workDate}}</el-col>
                    <el-col :span="8">职务：{{value.job}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="8">学历：{{value.education}}</el-col>
                    <el-col :span="8">证件名称：{{value.ID}}</el-col>
                    <el-col :span="8">证件号:{{value.IDNum}}</el-col>
                  </el-row>
                </el-col>
              </el-row>

            </el-col>
            <el-col>
              <i>新增配偶子女从业情况</i>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--本人配偶子女经商办企业-->
      <el-col>
        <div class="details-type" ref="detailsType">本人配偶子女经商办企业</div>
        <div class="items">
          <el-row>
            <el-col v-for="(item,index) in spouseChildrenBusiness" :key="index">
              <el-row>
                <el-col>
                  <el-row>
                    <el-col :span="12">{{item.name}}&nbsp;&nbsp;{{item.role}}&nbsp;&nbsp;{{item.company}}</el-col>
                    <el-col :span="12"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="12">企业状态：{{item.companyStatus}}</el-col>
                    <el-col :span="12">企业统一社会信用代码：{{item.enterpriseUnifiedSocialCreditCode}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="12">企业成立日期：{{item.date}}</el-col>
                    <el-col :span="12">企业或其他市场主体类型：{{item.enterpriseOtherMarketSubjectType}}</el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="12">注册资本：{{item.registeredCapital}}万元</el-col>
                    <el-col :span="12">个人认缴出资额或个人出资额：{{item.individualSubscribedCapitalPersonalContribution}}万元</el-col>
                  </el-row>
                </el-col>
                <el-col>企业经营范围：{{item.BusinessScopeEnterprise}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--出入境证件-->
      <el-col>
        <div class="details-type" ref="detailsType">出入境证件</div>
        <div class="items">
          <el-row>
            <el-col v-for="(value,index) in immigrationDocuments" :key="index">
              <el-row>
                <el-col>
                  <el-row>
                    <el-col :span="12">{{value.name}}({{value.validity}})</el-col>
                    <el-col :span="12"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col>
                  <el-row>
                    <el-col :span="12">证件号码：{{value.number}}</el-col>
                    <el-col :span="12">签发日期：{{value.dateIssue}}</el-col>
                  </el-row>
                </el-col>
                <el-col>备注：{{value.visaCountry}}</el-col>
              </el-row>
            </el-col>
          </el-row>

        </div>
      </el-col>
      <!--奖惩情况-->
      <el-col>
        <div class="details-type" ref="detailsType">奖惩情况</div>
        <div class="items">
          <el-row v-if="rewardPunishment">
            <el-col>
              <el-row>
                <el-col>近三年奖励情况</el-col>
                <el-col v-for="(value,index) in rewardPunishment.reward" :key="index">
                  <el-row>
                    <el-col :span="2">{{value.date}}</el-col>
                    <el-col :span="2">{{value.type ? '内部奖励' : '外部奖励'}}</el-col>
                    <el-col :span="18">{{value.details}}</el-col>
                    <el-col :span="2"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col><i>更多</i></el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-col>近三年处罚情况</el-col>
                <el-col v-for="(value,index) in rewardPunishment.punishment" :key="index">
                  <el-row>
                    <el-col :span="2">{{value.date}}</el-col>
                    <el-col :span="2">{{value.type ? '内部处罚' : '外部处罚'}}</el-col>
                    <el-col :span="18">{{value.details}}</el-col>
                    <el-col :span="2"><i>编辑</i></el-col>
                  </el-row>
                </el-col>
                <el-col><i>更多</i></el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-button>+新增奖惩情况</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--其他-->
      <el-col>
        <div class="details-type" ref="detailsType">其他</div>
        <div class="items" v-if="others">{{others.content}}</div>
      </el-col>
    </el-row>
    <!--<good-tab :allMsg="allMsg" ref="cadresTab"></good-tab>-->
    <!--<good-tab :goodmsg="$route.params"></good-tab>-->
  </div>
</template>

<script>
  // import GoodTab from './good-tab'
  import { getCadreDetails,resetCadreDetails } from '@/api/cadresDetails'
  export default {
    components: {
      // GoodTab
    },
    data() {
      return {
        cadresDetailsMsg: null,
        abstract: null,// 摘要信息
        basicInfo: null,// 基本信息
        perfInfo: null,// 绩效信息
        education: null,// 教育经历
        workHistory: null,// 工作经历
        SpouseChildren: null,// 配偶子女从业
        spouseChildrenBusiness: null,// 本人配偶子女经商办企业
        immigrationDocuments: null,// 出入境证件
        rewardPunishment: null,// 奖惩情况
        others: null,// 其他事项
        FormVisible:{
          abstract: false,
          basicInfo: false,
          perfInfo: false,
          education: false,
          workHistory: false,
          SpouseChildren: false,
          spouseChildrenBusiness: false,
          immigrationDocuments: false,
          rewardPunishment: false,
          others: false
        },
        isFixed:false,
        currentIndex: 0,
        listLoading: true,
        heightArr:[]
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        console.log(this.$route)
        getCadreDetails(this.$route.query.id).then(res => {
          this.cadresDetailsMsg = res.data
          this.abstract = res.data.abstract
          this.basicInfo=this.cadresDetailsMsg.list[0].data
          this.perfInfo=this.cadresDetailsMsg.list[1].data
          this.education=this.cadresDetailsMsg.list[2].data
          this.workHistory=this.cadresDetailsMsg.list[3].data
          this.SpouseChildren=this.cadresDetailsMsg.list[4].data
          this.spouseChildrenBusiness=this.cadresDetailsMsg.list[5].data
          this.immigrationDocuments=this.cadresDetailsMsg.list[6].data
          this.rewardPunishment=this.cadresDetailsMsg.list[7].data
          this.others=this.cadresDetailsMsg.list[8].data

          this.listLoading = false
        })
      },
      scroll() {
        let that = this
        let hh = this.$refs.bottomMenu.$el.offsetTop
        let th = this.$refs.topMenu.$el.offsetTop
        let jump = this.$refs.bottomMenu.$el.children
        for(let i=0;i<jump.length;i++){
          this.heightArr.push(jump[i].children[0].offsetTop+th)
        }
        window.addEventListener("scroll",(e) =>{
          if(!e){
            e= window.event
          }
          let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop>=th) {
            this.isFixed = true
          }
          else if(scrollTop<th){
            this.isFixed = false
          }
          for(let i = 0 ; i < this.heightArr.length ; i++){
            if (scrollTop>=this.heightArr[i]) {
              this.currentIndex = i;
            }
          }
        })
      },
      clickFn(index) {
        let jump = this.$refs.bottomMenu.$el.children
        let th = this.$refs.topMenu.$el.offsetTop
        document.documentElement.scrollTop=this.heightArr[index]
        this.currentIndex = index
      },
      // 保存
      clickSaveHandler(ref,dataForm) {
        // this.FormVisible.abstract = false
        dataForm.id=this.$router.currentRoute.query.id
        this.$refs[ref].validate((valid) => {
          if (valid) {
            this.listLoading = true
            resetCadreDetails(dataForm).then((res) => {
              this.listLoading = true
              this.abstract = res.data
              this.FormVisible.abstract = false
              // this.getList()
              this.$notify({
                title: '成功',
                message: '修改完成',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      setTimeout(() =>{
        this.scroll()
      },1000)
    },
    computed: {
      test() {

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    background: #ffffff;
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
  .top-page {
    border: 1px solid #cccccc;
    padding: 20px;
    margin-bottom: 30px;
  }
  .edit {
    cursor: pointer;
  }
  .reset-bn {
    color: #0000ff;
    cursor: pointer;
  }
  .form-item {
    margin-bottom: 0px;
  }
  .img-box {
    text-align: center;
  }
  .img-box img {
    width: 150px;
    height: 200px;
    vertical-align: middle;
  }
  .tp0{
    position: fixed;
    left: 200px;
    right: 20px;
    top: 50px;
    z-index: 998;
  }
  .tp40{
    position: fixed;
    top: 40px;
  }
  .top{
    border: 1px solid #cccccc;
    background: #ffffff;
  }
  .bottom{

  }
  .top li{
    float: left;
    list-style: none;
    line-height: 40px;
    padding: 0 20px;
    text-align: center;
    cursor: pointer;
  }
  .details-type{
    line-height:35px;
  }
  .items{
    /*height: 114px;*/
  }
  /*.items div{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }*/
  .items div h5{
    line-height: 30px;
  }
  .items div p{
    line-height: 24px;
  }
</style>
