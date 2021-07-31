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
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="signForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="name" label-width="52px">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd" label-width="52px">
            <el-input v-model="ruleForm.pwd"></el-input>
          </el-form-item>
          <div class="btn-wrapper">
            <el-button type="primary" @click="submitForm" id="submit"
              >登录</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
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
  methods: {
    submitForm() {
      this.$refs["signForm"].validate((valid) => {
        if (valid) {
          this.$router.replace("/index");
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