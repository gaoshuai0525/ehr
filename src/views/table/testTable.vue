<template>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
    import { getList } from '@/api/table'
    export default {
      name: 'test2',
      data() {
        return {
          list: null,
          listLoading: true
        }
      },
      filters: {
        statusFilter(status) {
          const statusMap = {
            published: 'success',
            draft: 'gray',
            deleted: 'danger'
          }
          return statusMap[status]
        }
      },
      created() {
        this.fetchData()
      },
      methods: {
        fetchData() {
          this.listLoading = true
          getList({success:true}).then(response => {
            this.list = response.data
            this.listLoading = false
          })
        }
      }
    }
</script>

<style scoped>

</style>
