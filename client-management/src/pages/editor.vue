<template>
  <div>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :autoCrop="true"
            :info="true"
            :full="false"
            outputType="png"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :outputSize="option.outputSize"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rotate">旋转</el-button>
        <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
    <div class="title">
      <el-input placeholder="请输入标题" v-model="title" style="width: 500px" />
    </div>
    <div class="upload-img" v-show="type != 3">
      <div class="img-wrapper">
        <img :src="tempImg" alt="" v-show="tempImg" />
        <div class="del" @click="delImg"><span>×</span></div>
      </div>
      <el-button type="primary" @click="selectImg" v-show="!tempImg">上传展示图</el-button>
      <input
        type="file"
        @change="changeImage"
        id="fileInput"
        style="display: none"
      />
    </div>
    <div class="upload-img" v-show="type == 2">
      <div class="img-wrapper video-wrapper">
        <video
          :src="tempVideo"
          alt=""
          v-show="tempVideo"
          controls
        />
        <div class="del" @click="delVideo"><span>×</span></div>
      </div>
      <el-button type="primary" @click="selectVideo" v-show="!tempVideo">上传视频</el-button>
      <input
        type="file"
        @change="changeVideo"
        id="videoInput"
        style="display: none"
      />
    </div>
    <div id="editor"></div>
    <div id="save">
      <el-button type="normal" @click="back">返回</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import { VueCropper } from "vue-cropper";
export default {
  name: "editor",
  data() {
    return {
      title: "",
      content: "",
      tempImg: null,
      tempVideo: null,
      type: 3,
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量 0.1 - 1
        outputType: 'png', //	裁剪生成图片的格式 jpeg || png || webp
        canScale: true, // 图片是否允许滚轮缩放 默认true
        autoCrop: true, // 是否默认生成截图框 默认false
        canMove: true, //上传图片是否可以移动 默认true
        autoCropWidth: 375, //默认生成截图框宽度	容器的80%	0~max
        autoCropHeight: 220, //默认生成截图框高度	容器的80%	0~max
        // fixedBox: true, // 固定截图框大小 不允许改变	false	true | false
        fixed: true, //是否开启截图框宽高固定比例
        original: false, // 上传图片按照原始比例渲染	false	true | false
        infoTrue: false, // 为展示真实输出图片宽高 false 展示看到的截图框宽高	false	true | false
        centerBox: true, // 截图框是否被限制在图片里面	false	true | false
        canMoveBox: true, //截图框能否拖动	true	true | false
        fixedNumber: [1, 1] // 截图框的宽高比例 [宽度, 高度]
      },
      picsList: [], //页面显示的数组
      // 防止重复提交
      loading: false,
    };
  },
  components: {
    VueCropper,
  },
  mounted() {
    /**
     * type 根据类型保存
     * { 1 产品 2 新闻动态 3 公司简介}
     */
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.editor = new E("#editor");
    this.editor.config.showLinkImg = false;
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
    this.editor.create();
    this.getDetail();
  },
  methods: {
    getDetail() {
      let url = "";
      switch (this.type) {
        case "1":
          url = this.api.findProductById(this.id);
          break;
        case "2":
          url = this.api.findNewsById(this.id);
          break;
        case "3":
          url = this.api.findAbout;
          break;
      }

      if ((this.type == "1" || this.type == "2") && !this.id) return;
      this.$http.get(url, {}, (res) => {
        res = res.data || {};
        this.title = res.title || "";
        this.fileObj = res.img_url || "";
        this.videoObj = res.video_url || "";
        this.tempImg = res.img_url ? this.$globalImg + res.img_url : "";
        this.tempVideo = res.video_url ? this.$globalImg + res.video_url : "";
        this.editor.txt.html(res.content || "");
        console.log(res);
      });
    },
    back(){
      this.$router.go(-1)
    },
    save() {
      if (this.type != 3) {
        if (!this.fileObj) {
          this.$message({
            message: "请上传展示图",
            type: "warning",
          });
          return;
        }
      }
      let title = this.title;
      let content = this.editor.txt.html();
      let imgFile = this.fileObj;
      let forms = new FormData();
      let configs = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      forms.append("imgFile", imgFile);
      forms.append("title", title);
      forms.append("content", content);
      if (this.videoObj) {
        forms.append("videoFile", this.videoObj);
      }
      let url = "";
      switch (this.type) {
        case "1":
          url = this.api.saveProduct;
          break;
        case "2":
          url = this.api.saveNews;
          break;
        case "3":
          url = this.api.saveAbout;
          break;
      }

      this.$http.post(
        url,
        forms,
        (res) => {
          switch (this.type) {
            case "1":
              this.$router.push("/product");
              break;
            case "2":
              this.$router.push("/news");
              break;
            case "3":
              this.$router.push("/about");
              break;
          }
        },
        configs
      );
    },
    selectImg() {
      document.getElementById("fileInput").click();
    },
    selectVideo() {
      document.getElementById("videoInput").click();
    },
    changeImage() {
      let me = this;
      let tmpFile = this.tempImgFile = document.getElementById("fileInput");
      let files = tmpFile.files[0];
      // this.fileObj = tmpFile.files[0]

      if (!/\.(jpeg|jpg|png|JPEG|JPG|PNG)$/.test(tmpFile.value)) {
        tmpFile.value = "";
        this.$message.error("图片类型必须是.jpeg,.jpg,.png中的一种");
        return;
      }
      if (files.size > 2 * 1024 * 1000) {
        this.$message.error("大小不能超过2M");
        tmpFile.value = "";
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(tmpFile.files[0]);
      reader.onload = function (e) {
        me.changeUpload(this.result);
      };
    },
    delImg() {
      this.tempImgFile.value = ''
      this.tempImg = null;
      this.fileObj = null;
    },
    changeVideo() {
      let me = this;
      let tmpFile = this.tempVideoFile = document.getElementById("videoInput");
      this.videoObj = tmpFile.files[0];
      if (!/\.(MP4|mp4)$/.test(tmpFile.value)) {
        tmpFile.value = "";
        this.$message.error("只支持mp4格式");
        return;
      }
      if (this.videoObj.size > 5 * 1024 * 1000) {
        this.$message.error("大小不能超过5M");
        tmpFile.value = "";
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(tmpFile.files[0]);
      reader.onload = function (e) {
        me.tempVideo = this.result;
      };
    },
    delVideo() {
      this.tempVideoFile.value = ''
      this.tempVideo = null
      this.videoObj = null
    },
    changeUpload(file) {
      this.option.img = file;
      this.dialogVisible = true;
    },
    rotate(){
      this.$refs.cropper.rotateRight()
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        this.fileObj = data;
      })
      this.$refs.cropper.getCropData((data) => {
        this.tempImg = data
        this.option.img = ""
        this.dialogVisible = false
      })
    },
  },
};
</script>

<style lang="scss" scoped>
#editor {
  margin: 20px 0;
}

#save {
  text-align: right;
}

.upload-img {
  margin-top: 20px;

  .img-wrapper {
    width: 375px;
    position: relative;
    overflow: hidden;
    &.video-wrapper{
      width: 200px;
      video{
        width: 100%;
      }
    }
    .del {
      display: block;
      width: 50px;
      height: 50px;
      background: #409eff;
      color: #fff;
      position: absolute;
      right: -28px;
      top: -25px;
      transform: rotate(45deg);
      cursor: pointer;
      span {
        position: absolute;
        bottom: -1px;
        left: 19px;
        transform: rotate(45deg);
      }
    }

    img {
      width: 375px;
      height: 177.5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
}

.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}
</style>
