<template>
  <el-checkbox-group
    ref="input"
    class="selection"
    v-model="selectVal"
    @change="handleCheckedCompanyChange">
    <el-checkbox-button
      v-for="unit in options"
      :label="unit"
      :key="unit" class="border-no">{{unit}}</el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
    export default {
        name: 'Checkbox',
        props: {
          value: [Array],
          options: {
            type:Array
          }
        },
        data() {
          return {
            selectVal: this.value
          }
        },
      watch: {
        value(val){
            this.selectVal = val
        }
      },
      computed: {

      },
        methods: {
          handleCheckedCompanyChange(value) {
            this.$emit('input',value)
            this.$emit('change',value)
          }
        }
    }
</script>

<style>
  .selection .el-checkbox-button__inner{
    border: none;
    padding: 5px 10px;
    margin: 6px 0;
    padding-right: 40px;
    color: #606266;
  }
  .selection .el-checkbox-button:first-child .el-checkbox-button__inner{
    border: none;
  }
  .selection .el-checkbox-button.is-checked .el-checkbox-button__inner{
    background: none;
    color: #ee7800;
    -webkit-box-shadow: none;
    box-shadow: none;
    transition: none;
  }
  .selection .el-checkbox-button.is-checked:hover .el-checkbox-button__inner{
    position: relative;
    /*margin: -1px -1px -1px -1px;*/
    /*border: 1px dashed #ee7800;*/
    /*border-right: none;*/
    background: url(./../../../assets/images/check-button.png) no-repeat right;
  }
  .selection .el-checkbox-button.is-checked:hover .el-checkbox-button__inner:after{
    content: '';
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px dashed #ee7800;
  }
</style>
