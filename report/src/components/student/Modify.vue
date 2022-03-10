<template>
  <div id="mofify">
    <Header></Header>
    <content>
      <!-- <div class="header">修改密码</div> -->
      <div class="content">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="用户名：" size="small" prop="username">
            <el-col :span="6">
              <el-input v-model="form.username"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码找回问题：" size="small" prop="question">
            <el-select v-model="form.question" placeholder="请选择...">
              <el-option label="就读的第一所学校的名称？" value="1"></el-option>
              <el-option label="爸爸的名字是？" value="2"></el-option>
              <el-option label="妈妈的名字是？" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="答案：" size="small" prop="answer">
            <el-col :span="6">
              <el-input v-model="form.answer"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="新密码：" size="small" prop="newPW">
            <el-col :span="6">
              <el-input v-model="form.newPW" show-password></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="确认密码：" size="small" prop="confirm">
            <el-col :span="6">
              <el-input v-model="form.confirm" show-password></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </content>
  </div>
</template>

<script>
import Header from "./Header.vue";
import router from "../../router";
import config from "../../config";
export default {
  name: "Modify",
  components: {
    Header,
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPW) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        question: "1",
        answer: "",
        newPW: "",
        confirm: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        question: [{ required: true, message: "", trigger: "blur" }],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
        newPW: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{6,16}$/,
            message: "请输入不少于6位的数字、字母",
            trigger: "blur",
          },
        ],
        confirm: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(form) {
      let that = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$confirm("请确认修改密码", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.request({
                methods: "get",
                url: `${config.url}/user/change_password`,
                params: {
                  username: this.form.username,
                  password: this.form.newPW,
                  question: this.form.question,
                  answer: this.form.answer,
                },
              }).then(function (res) {
                if (res.data) {
                  that.$message({
                    message: "修改成功！",
                    type: "success",
                    center: "true",
                  });
                  router.push(`/student/${that.$store.state.name}`);
                } else {
                  that.$message({
                    message: "请填写正确的信息",
                    type: "warning",
                    center: "true",
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消修改",
              });
            });
        } else {
          that.$message({
            message: "请填写正确的信息",
            type: "warning",
            center: "true",
          });
          return false;
        }
      });
    },
  },
  watch: {
    "form.confirm"(newValue) {
      return newValue;
    },
  },
};
</script>

<style scoped>
content {
  position: absolute;
  top: 80px;
  bottom: 0;
  right: 0;
  left: 300px;
  background: rgb(241, 235, 235);
  display: flex;
  flex-direction: column;
  border: none;
}
.header {
  height: 60px;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
}
.content {
  box-sizing: border-box;
  flex: 1;
  border-radius: 8px;
  padding: 50px 150px;
}
</style>
