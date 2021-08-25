<template>
  <div>
    <Table :data="list" style="width: 100%">
      <TableColumn prop="create_date" label="日期" width="180">
      </TableColumn>
      <TableColumn prop="name" label="姓名" width="180">
      </TableColumn>
      <TableColumn prop="tel" label="电话">
      </TableColumn>
      <TableColumn prop="address" label="地址">
      </TableColumn>
      <TableColumn width="100" label="操作">
        <template slot-scope="scope">
          <Button type="text" size="small" class="danger" @click="del(scope.row)">删除</Button>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>


<script>
  import {
    Table,
    TableColumn,
    Button,
    MessageBox
  } from 'element-ui'
export default {
    data(){
        return {
            list:[]
        }
    },
    components:{
      Table,
      TableColumn,
      Button,
      MessageBox
    },
    mounted() {
      this.$http.get(this.api.getCustomerDate,{},res => {
          this.list = res.data
        })
    },
    methods: {
      del(row) {
          console.log(row);
          MessageBox.confirm('确定删除指定记录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post(this.api.deleteCustomer(row.id),{}, (res) => {
              this.getData()
            })
          }).catch(() => {});
        }
    },
}
</script>
