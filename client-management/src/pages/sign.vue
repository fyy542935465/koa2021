<template>
  <div class="sign">
    <vue-particles
      color="#ccc"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#ccc"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="sign-pop">
      <div class="tip">请登录</div>
      <div class="wrapper">
        <Form
          :model="ruleForm"
          :rules="rules"
          ref="signForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <FormItem label="账号" prop="name" label-width="52px">
            <Input v-model="ruleForm.name"></Input>
          </FormItem>
          <FormItem label="密码" prop="pwd" label-width="52px">
            <Input v-model="ruleForm.pwd" type="password"></Input>
          </FormItem>
          <div class="btn-wrapper">
            <Button type="primary" @click="submitForm" id="submit">登录</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Button,
    Input,
    Form,
    FormItem
  } from 'element-ui'
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components:{
    Button,
    Input,
    Form,
    FormItem
  },
  methods: {
    submitForm() {
      let me = this
      this.$refs["signForm"].validate((valid) => {
        if (valid) {
          this.$http.post(me.api.sign, {
            account:me.ruleForm.name,
            password:me.ruleForm.pwd
          }, (res) => {
            if(res.data.id){
              localStorage.token = res.data.id
              me.$router.replace("/index")
            }else{
               me.$message.error('账号密码有误')
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["signForm"].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.sign {
  width: 100%;
  height: 100%;
  background: #0084ff;
  .sign-pop {
    width: 400px;
    padding: 20px;
    background: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    .tip {
      margin-bottom: 20px;
    }
    .btn-wrapper {
      width: 100%;
      text-align: right;
    }
  }
  #particles-js {
    height: 100%;
  }
}
</style>