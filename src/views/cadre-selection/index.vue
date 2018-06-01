<template>
    <div class="app-container">
        <el-row>
          <!--面包屑-->
          <breadcrumb></breadcrumb>
        </el-row>
        <!--筛选排序-->
      <el-row class="item-box">
        <el-col :xs="24" :sm="16"><h5>
          干部筛选
        </h5></el-col>
        <el-col :xs="20" :sm="6">
          <el-input
            @keyup.enter.native="handleFilter"
            class="filter-item"
            placeholder="姓名/部门名称"
            v-model="listQuery.title">
          </el-input>
        </el-col>
        <el-col :xs="4" :sm="2">
          <el-button type="primary" class="search-btn">搜索</el-button>
        </el-col>
        <el-col class="list">
          <el-row>
            <el-col :xs="24" :sm="3">
              <span>所在单位:</span>
            </el-col>
            <el-col :xs="24" :sm="21">
              <checkbox v-model="selectCompany" :options="companyOptions" @change="handleCheckMore"></checkbox>
            </el-col>
          </el-row>
          <el-row v-if="!isMore">
            <el-col :xs="24" :sm="3">
              <span>集团直管干部:</span>
            </el-col>
            <el-col :xs="24" :sm="21">
              <checkbox v-model="selectCenterCadre" :options="centerCadreOptions"></checkbox>
            </el-col>
          </el-row>
          <el-row v-if="isMore">
            <el-col :xs="24" :sm="3">
              <span>干部状态:</span>
            </el-col>
            <el-col :xs="24" :sm="21">
              <checkbox v-model="selectStatus" :options="statusOptions"></checkbox>
            </el-col>
          </el-row>
          <el-row v-if="isMore">
            <el-col :xs="24" :sm="3">
              <span>机构层级:</span>
            </el-col>
            <el-col :xs="24" :sm="21">
              <checkbox v-model="selectOrganizationLevel" :options="organizationLevelOptions"></checkbox>
            </el-col>
          </el-row>
          <el-row v-if="isMore">
            <el-col :xs="24" :sm="3">
              <span>岗位层级:</span>
            </el-col>
            <el-col :xs="24" :sm="21">
              <checkbox v-model="selectDepartment" :options="departmentOptions"></checkbox>
            </el-col>
          </el-row>
          <!--<el-row v-if="isMore">-->
            <!--<el-col :xs="24" :sm="3">-->
              <!--<span>岗位层级:</span>-->
            <!--</el-col>-->
            <!--<el-col :xs="24" :sm="21">-->
              <!--<checkbox v-model="selectLevel" :options="levelOptions"></checkbox>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <el-collapse-transition v-if="isMore">
            <div v-if="isShow">
              <el-row>
                <el-col :xs="24" :sm="3">
                  <span>职级:</span>
                </el-col>
                <el-col :xs="24" :sm="21">
                  <checkbox v-model="selectRank" :options="rankOptions"></checkbox>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="3">
                  <span>司龄:</span>
                </el-col>
                <el-col :xs="24" :sm="21">
                  <checkbox v-model="selectDivisionAge" :options="divisionAgeOptions"></checkbox>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="3">
                  <span>年龄:</span>
                </el-col>
                <el-col :xs="24" :sm="21">
                  <checkbox v-model="selectLifeAge" :options="lifeAgeOptions"></checkbox>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="3">
                  <span>最高学历:</span>
                </el-col>
                <el-col :xs="24" :sm="21">
                  <checkbox v-model="selectTopEducation" :options="topEducationOptions"></checkbox>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="3">
                  <span>海外经验:</span>
                </el-col>
                <el-col :xs="24" :sm="21">
                  <checkbox v-model="selectOverseas" :options="overseasOptions"></checkbox>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="24" :sm="3">
                  <span>人才发展项目:</span>
                </el-col>
                <el-col :xs="24" :sm="21">
                  <checkbox v-model="selectDevelopmentProject" :options="developmentProjectOptions"></checkbox>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-col>
        <el-col v-if="isMore"><span class="btn" @click="isShow = !isShow" :class="[isShow?'shink':'extend']"></span></el-col>
      </el-row>
        <!--表格-->
        <filter-table
          :selectData="selectData"
          :pageTotal="total"
          :listQuery="listQuery" @changePage="changePage"></filter-table>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    import { getCadreSelect } from '@/api/cadreSelection'
    import checkbox from './checkbox'
    import FilterTable from './filter-table/index'
    export default {
      data() {
        return {
          isMore: false,
          isShow:false,
          selectStatus: ['在职'],
          statusOptions: ['在职','离职','退休'],
          selectCompany: ['总部', '人寿', '资产', '养老','健投','在线'],
          companyOptions:[{name:'总部',children:[]}, '人寿', '资产', '养老','健投','在线'],
          selectOrganizationLevel:null,
          organizationLevelOptions:['人寿总公司', '人寿分公司', '人寿三级机构', '人寿四级机构','人寿五级机构','人寿资产子公司'],
          selectDepartment: null,
          departmentOptions:['管委会', '经委会', '一级部门', '二级部门','一级处','二级处'],
          selectLevel: null,
          levelOptions:['高层干部', '中层干部', '基层干部'],
          selectCenterCadre: ['否','是'],
          centerCadreOptions:['否','是'],

          selectRank: null,
          rankOptions:[ 'A级', 'B级', 'C级','D级','E级'],
          selectDivisionAge: null,
          divisionAgeOptions:['小于1年', '1-2年', '3-4年', '5-9年','10-14年','15年以上'],
          selectLifeAge: null,
          lifeAgeOptions:['35岁以下', '36-45', '46-55', '56岁以上'],
          selectTopEducation: null,
          topEducationOptions:['专科及以下', '本科', '硕士研究生', '博士研究生'],
          selectOverseas: null,
          overseasOptions:['无', '工作经历', '学习经历'],
          selectDevelopmentProject: null,
          developmentProjectOptions:['千人计划', '世纪组训', '青干班', '中青班'],
          selectData:[],
          total:null,
          listLoading: true,
          multipleSelection: [],
          listQuery: {
            page: 1,
            limit: 5,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: '+id'
          },
          downloadLoading: false,
          dialogFormVisible: false,
          radio2: 3
        }
      },
      watch: {
        selectCompany(val){
          console.log(val)
        }
      },
      components: {
        checkbox,
        FilterTable,
        Breadcrumb,
      },
      methods: {
        handleCheckMore() {
          this.isMore =
            this.selectCompany.length == this.companyOptions.length ?
            false : true
        },
        handleFilter(val) {
          this.listQuery.page = 1
          this.getList()
        },
        //获取数据
        getList() {
          this.listLoading = true
          getCadreSelect(this.listQuery).then(res=>{
            this.selectData = res.data.items
            this.total = res.data.total
            this.listLoading = false
          })
        },
        changePage(data) {
          this.listLoading = true
          getCadreSelect(data).then(res=>{
            this.selectData = res.data.items
            this.total = res.data.total
            this.listLoading = false
          })
        },
      },
      created() {
        this.getList()
      }
    }
</script>

<style scoped>
  .border-no span{
    border: none !important;
  }
  .go-to:hover {
    color: blue;
    cursor: pointer;
  }
  .item-box{
    margin-bottom: 10px;
    background-color: #fff;
  }
  .item-box .list span{
    display: inline-block;
    padding: 12px 20px;
    margin-right: -20px;
  }
  .item-box h5 {
    padding: 0 8px;
    margin: 20px;
    border-left: 4px solid #ee7800;
    font-size: 18px;
  }
  .filter-item,.search-btn{
    margin: 20px 0;
  }
  .search-btn{
    background: #ee7800;
    border-color: #ee7800;
  }
  .btn{
    height: 20px;
    width: 68px;
    font-size: 12px;
    float: right;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  .btn.extend{
    background: url(./../../assets/images/extend.png) no-repeat;
  }
  .btn.shink{
    background: url(./../../assets/images/shink.png) no-repeat;
  }
</style>
