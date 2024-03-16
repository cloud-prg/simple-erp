<template>
  <el-col :span="2">
    <el-button type="success" @click="exportExcel()">导出Excel</el-button>
  </el-col>
</template>

<script>
import json2Excel from '@/utils/json2Excel'
export default {
  name: "xlsxbutton",
  props: {
    dataSource: Array,
    sheetName: String,
    ass: String
  },
  data() {
    return {}
  },
  methods: {
    // 导出Excel
    exportExcel(){
      json2Excel(this.dataSource,this.sheetName)
    },
  },
  created(){
    // console.log(dataSource)
  }
};
</script>
