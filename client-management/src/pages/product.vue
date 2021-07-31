<template>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="img_url" label="缩略图" width="180">
        <template slot-scope="scope">
          <div>
            <img :src="$globalImg + scope.row.img_url" class="img" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="create_date" label="日期">
      </el-table-column>
      <el-table-column width="100">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="text">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" class="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
    export default {
      data() {
        return {
          tableData: []
        }
      },
      mounted() {
        this.getData()
      },
      methods: {
        getData(){
          this.$http.get(this.api.getProduct,{},res => {
            this.tableData = res.data
          })
        },
        edit(row) {
          console.log(row);
        },
        del(row) {
          console.log(row);
          this.$confirm('确定删除指定记录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              
          }).catch(() => {});
        }
      },
    }
  
  </script>
  
  <style lang="scss" scoped>
    .img {
      width: 100px;
      height: 50px;
    }
  
    .el-button.danger {
      color: #f56c6c;
    }
  
  </style>
  