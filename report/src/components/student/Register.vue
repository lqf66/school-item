<template>
  <div id="register">
    <div class="header">全国人事考试服务平台</div>
    <div class="content">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="登录名：" size="small" prop="username">
          <el-col :span="6">
            <el-input v-model="form.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码：" size="small" prop="password">
          <el-col :span="6">
            <el-input v-model="form.password" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认密码：" size="small" prop="confirm">
          <el-col :span="6">
            <el-input v-model="form.confirm" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="考生姓名：" size="small" prop="name">
          <el-col :span="6">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="证件类型：" size="small" prop="type">
          <el-select v-model="form.type" placeholder="请选择...">
            <el-option label="居民身份证" value="1"></el-option>
            <el-option label="护照" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码：" size="small" prop="number">
          <el-col :span="6">
            <el-input v-model="form.number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮箱：" size="small" prop="email">
          <el-col :span="6">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="密码找回问题：" size="small" prop="question">
          <el-select v-model="form.question" placeholder="请选择...">
            <el-option label="我就读的第一所学校的名称？" value="1"></el-option>
            <el-option label="爸爸的名字是？" value="2"></el-option>
            <el-option label="妈妈的名字是？" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答案：" size="small" prop="answer">
          <el-col :span="6">
            <el-input v-model="form.answer"></el-input>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="手机号码：" size="small" prop="phone">
          <el-col :span="6">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">注册</el-button>
          <el-button @click="back">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import router from "../../router.js";
import config from "../../config.js";
export default {
  name: "Register",
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        confirm: "",
        name: "",
        // type: "1",
        // number: "",
        // email: "",
        question: "1",
        answer: "",
        // phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            pattern: /^\w{5,20}$/,
            message: "请填写5至20位数字、字母或下划线",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9]{6,16}$/,
            message: "请输入不少于6位的数字、字母",
            trigger: "blur",
          },
        ],
        confirm: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入考生姓名", trigger: "blur" }],
        // type: [{ required: true, message: "请输入证件类型", trigger: "blur" }],
        // number: [
        //   { required: true, message: "请输入证件号码", trigger: "blur" },
        //   {
        //     pattern: /^[1-9]\d{14}(\d{2}[0-9x])?$/i,
        //     message: "请输入正确的身份证号码",
        //   },
        // ],
        // email: [
        //   { required: true, message: "请输入电子邮箱", trigger: "blur" },
        //   {
        //     pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        //     message: "请输入正确的电子邮箱",
        //     trigger: "blur",
        //   },
        // ],
        question: [{ required: true, message: "", trigger: "blur" }],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
        // phone: [
        //   { required: true, message: "请输入手机号码", trigger: "blur" },
        //   { pattern: /^1[3456789]d{9}$/, message: "请输入正确的手机号码" },
        // ],
      },
    };
  },
  methods: {
    onSubmit(form) {
      let that = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.request({
            methods: "get",
            url: `${config.url}/user/register`,
            params: {
              username: this.form.username,
              password: this.form.password,
              name: this.form.name,
              question: this.form.question,
              answer: this.form.answer,
            },
          }).then(function (res) {
            if (res.status === 200) {
              if (res.data === 1) {
                that.$message({
                  message: "注册成功！",
                  type: "success",
                  center: "true",
                });
                router.push("/");
              } else {
                that.$message({
                  message: "请填写正确的信息",
                  type: "warning",
                  center: "true",
                });
              }
            }
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
    back() {
      router.push("/");
    },
  },
};
</script>

<style scoped>
#register {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: linear-gradient(rgb(140, 140, 230), white);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  height: 100px;
  font-size: 28px;
  text-align: center;
  line-height: 100px;
  color: white;
}
.footer {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
}
.content {
  box-sizing: border-box;
  width: 1250px;
  height: 500px;
  background: rgb(241, 235, 235);
  padding: 60px 0 0 320px;
  border-radius: 8px;
}
</style>
