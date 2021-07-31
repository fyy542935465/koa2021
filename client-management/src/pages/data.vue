<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="tel" label="电话">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
    data(){
        return {
            tableData:[
                {
                    date:'2021-09-09',
                    name:'张三',
                    tel:'18889898888',
                    address:'上海市虹口区上海市虹口区上海市虹口区上海市虹口区上海市虹口区上海市虹口区上海市虹口区上海市虹口区上海市虹口区',
                }
            ]
        }
    }
}
</script>
