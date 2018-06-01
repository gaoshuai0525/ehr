<template>
  <div class="app-container">
    <el-row>
      <!--面包屑-->
      <breadcrumb></breadcrumb>
    </el-row>
    <el-row>
      <el-input v-model="input" placeholder="姓名">
      </el-input>
    </el-row>
    <el-row>
      <el-table
        ref="multipleTable"
        :data="selectData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          label="姓名"
          width="110">
          <template slot-scope="scope">
            <div @click="view(scope.row.id)" class="go-to">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="post"
          label="职位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          width="220">
        </el-table-column>
        <el-table-column
          prop="resetContent"
          label="修改内容"
          width="220">
        </el-table-column>
        <el-table-column
          prop="submitDate"
          label="提交时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="110">
          <template slot-scope="scope">
            <i @click="view(scope.row.id)" class="operate">审核</i>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection(selectData)">全选</el-button>
        <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
        <el-button
          class="filter-item"
          type="primary"
          :loading="downloadLoading"
          icon="el-icon-download"
          @click="dialogFormVisible = true">批量审核通过</el-button>
      </div>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-size="listQuery.limit"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
    <el-row>
      <el-dialog title="请选择所要导出干部的方式" :visible.sync="dialogFormVisible">
        <el-radio-group v-model="radio2">
          <el-radio :label="3">干部清单</el-radio>
          <el-radio :label="6">干部简历——完整版</el-radio>
          <el-radio :label="9">干部简历——简版</el-radio>
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
      data() {
        return {
          input:'',
          selectData:[
            {
              "name":"杜彦斌",
              "post":"二级部经理",
              "department":"集团总部/信息中心/规划管理部",
              "resetContent":"基本信息",
              "submitDate":"2018-4-3"
            },
            {
              "name":"杜彦斌",
              "post":"二级部经理",
              "department":"集团总部/信息中心/规划管理部",
              "resetContent":"基本信息、教育经历",
              "submitDate":"2018-4-1"
            },
            {
              "name":"杜彦斌",
              "post":"二级部经理",
              "department":"集团总部/信息中心/规划管理部",
              "resetContent":"工作经历、教育信息",
              "submitDate":"2018-3-21"
            },
          ],
          multipleSelection: [],
          listQuery: {
            page: 1,
            limit: 5,
            importance: undefined,
            title: undefined,
            type: undefined,
            sort: '+id'
          },
          total:null,
          downloadLoading:false,
          dialogFormVisible: false,
          radio2: 3
        }
      },
      components: {
        Breadcrumb,
      },
      methods: {
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        // 分页
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.listQuery.limit = val
          this.getList()
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.listQuery.page = val
          this.getList()
        },
      }
    }
</script>

<style scoped>
  .operate {
    color: #0000ff;
    cursor: pointer;
  }
</style>
