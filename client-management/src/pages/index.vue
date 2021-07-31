<template>
  <div class="container">
    <el-container>
      <el-header>后台管理</el-header>
      <el-container>
        <el-aside width="200px">
          <ul>
            <router-link tag="li" to="/product">产品</router-link>
            <router-link tag="li" to="/news">新闻动态</router-link>
            <router-link tag="li" to="/about">公司简介</router-link>
            <router-link tag="li" to="/data">数据</router-link>
          </ul>
        </el-aside>
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>copyright@2021</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scope>
header{
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  line-height: 60px;
}
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-aside {
      border-right: 1px solid #cfcfcf;
    ul {
      li {
        list-style: none;
        padding:10px;
        &.router-link-active,&:hover{
            cursor: pointer;
            color: #1890FF;
        }
      }
    }
  }
}

footer{
    line-height: 60px;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
}
</style>