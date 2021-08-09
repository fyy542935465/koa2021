<template>
  <div>
    <div class="title">
      <el-input placeholder="请输入标题" v-model="title" style="width: 500px" />
    </div>
    <div class="upload-img" v-show="type != 3">
      <div class="img-wrapper">
        <img :src="tempImg" alt="" v-show="tempImg" />
        <div class="del" @click="delImg"><span>×</span></div>
      </div>
      <el-button type="primary" @click="select">上传展示图</el-button>
      <input type="file" @change="changeImage" id="fileInput" style="display: none" />
    </div>

    <div id="editor"></div>
    <div id="save">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import E from "wangeditor";
  export default {
    data() {
      return {
        title: "",
        content: "",
        tempImg: null,
        type: 3,
      };
    },
    mounted() {
      /**
       * type 根据类型保存
       * { 1 产品 2 新闻动态 3 公司简介}
       */
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      this.editor = new E("#editor")
      this.editor.config.showLinkImg = false
      this.editor.config.uploadImgShowBase64 = true;
      this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
      this.editor.create()
      this.getDetail()
    },
    methods: {
      getDetail(){
        let url = ""
        switch (this.type) {
          case '1':
            url = this.api.findProductById(this.id)
            break
          case '2':
            url = this.api.findNewsById(this.id)
            break
          case '3':
            url = this.api.findAbout
            break
        }

        this.$http.get(url,{},res => {
          res = res.data || {}
          this.title = res.title || ''
          this.fileObj = res.img_url || ''
          this.tempImg = res.img_url? (this.$globalImg + res.img_url) : ''
          this.editor.txt.html(res.content || '')
          console.log(res)
        })
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
        let title = this.title
        let content = this.editor.txt.html()
        let file = this.fileObj
        let forms = new FormData()
        let configs = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        };
        forms.append("file", file)
        forms.append("title", title)
        forms.append("content", content)
        let url = ""
        switch (this.type) {
          case '1':
            url = this.api.saveProduct
            break
          case '2':
            url = this.api.saveNews
            break
          case '3':
            url = this.api.saveAbout
            break
        }

        this.$http.post(url, forms, (res) => {
          switch (this.type) {
          case '1':
            this.$router.push('/product')
            break
          case '2':
            this.$router.push('/news')
            break
          case '3':
            this.$router.push('/about')
            break
        }
        }, configs)
      },
      select() {
        document.getElementById("fileInput").click();
      },
      changeImage() {
        let me = this;
        let tmpFile = document.getElementById("fileInput");
        this.fileObj = tmpFile.files[0]
        if (!/\.(jpeg|jpg|png|JPEG|JPG|PNG)$/.test(tmpFile.value)) {
          this.value = ""
          Util.message("图片类型必须是.jpeg,.jpg,.png中的一种");
          return
        }
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile.files[0])
        reader.onload = function (e) {
          me.tempImg = this.result
        };
      },
      delImg() {
        this.tempImg = null
        this.fileObj = null
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
      width: 100px;
      position: relative;
      overflow: hidden;

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
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
      }
    }
  }

</style>
