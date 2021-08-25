<template>
  <div class="about">
    <div class="title">{{detail.title || ''}} <span>{{detail.create_date}}</span></div>
    <div v-html="detail.content" class="content"></div>
    <div class="text-rt" style="margin-top:20px;">
      <Button type="text" size="small" @click="edit">{{detail? '去编辑' : '去添加'}}</Button>
    </div>
  </div>
</template>
<script>
  import {
    Button
  } from 'element-ui'
  export default {
    data() {
      return {
        detail: null
      }
    },
    components:{
        Button
    },
    mounted() {
      this.get()
    },
    methods: {
      get() {
        this.$http.get(this.api.findAbout, {}, res => {
          this.detail = res.data || {}
          console.log(res.data)
        })
      },
      edit() {
        this.$router.push('/editor?type=3')
      }
    },
  }

</script>

<style lang="scss" scoped>
    .title{
        margin-bottom: 20px;
        span{
            font-size: 12px;
            color: rgba(0,0,0,.45);
            float: right;
        }
    }

    .content{
        p,img,span{
            display: block;
        }

        img{
            width: 550px;
            margin: 0 auto;
        }
    }
</style>