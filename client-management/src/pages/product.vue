<template>
    <Table :data="tableData" border style="width: 100%">
      <TableColumn prop="img_url" label="缩略图" width="180">
        <template slot-scope="scope">
          <div>
            <img :src="$globalImg + scope.row.img_url" class="img" />
          </div>
        </template>
      </TableColumn>
      <TableColumn prop="title" label="标题" width="180">
      </TableColumn>
      <TableColumn prop="create_date" label="日期">
      </TableColumn>
      <TableColumn width="100">
        <template slot="header" slot-scope="scope">
          <Button size="mini" type="text" @click="add">添加</Button>
        </template>
        <template slot-scope="scope">
          <Button type="text" size="small" @click="edit(scope.row)">编辑</Button>
          <Button type="text" size="small" class="danger" @click="del(scope.row)">删除</Button>
        </template>
      </TableColumn>
    </Table>
  </template>
  
  <script>
    import {
    Button,
    Table,
    TableColumn,
    MessageBox
  } from 'element-ui'
    export default {
      data() {
        return {
          tableData: []
        }
      },
      components:{
        Button,
        Table,
        TableColumn,
        MessageBox
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
          console.log(this.$router);
          this.$router.push(`/editor?id=${row.id}&type=1`)
        },
        add(){
          this.$router.push(`/editor?type=1`)
        },
        del(row) {
          console.log(row);
          MessageBox.confirm('确定删除指定记录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.api.delProductById(row.id),{}, (res) => {
              this.getData()
            })
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
  