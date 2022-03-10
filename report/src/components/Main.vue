<template>
  <div class="main">
    <div class="box">
      <div class="title">信奥培训网上报名平台</div>
      <div class="content">
        <el-avatar
          icon="el-icon-user-solid"
          style="margin: 15px auto"
        ></el-avatar>

        <div class="accounts">
          <el-col :span="4"> 帐号： </el-col>
          <el-col :span="18">
            <el-input
              v-model="form.username"
              placeholder="请输入帐号"
              size="small"
            ></el-input>
          </el-col>
        </div>
        <div class="password">
          <el-col :span="4"> 密码： </el-col>
          <el-col :span="18">
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              size="small"
              show-password
            ></el-input>
          </el-col>
        </div>
        <div class="login">
          登录方式：
          <el-radio-group v-model="form.userLevel" style="marginleft: 15px">
            <el-radio label="1">考生登录</el-radio>
            <el-radio label="2">管理员登录</el-radio>
          </el-radio-group>
        </div>
        <div class="bottons">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="warning" @click="register">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import config from "../config";
export default {
  name: "Main",
  data() {
    return {
      form: {
        username: "",
        password: "",
        userLevel: "1",
      },
    };
  },
  methods: {
    register() {
      router.push("/register");
    },
    onSubmit() {
      let that = this;
      if (!this.form.username || !this.form.password) {
        that.$message({
          message: "请填写帐号和密码",
          type: "warning",
          center: "true",
        });
        return;
      }
      this.request({
        methods: "get",
        url: `${config.url}/user/login`,
        params: {
          username: this.form.username,
          password: this.form.password,
          userLevel: this.form.userLevel,
        },
      }).then(function (res) {
        if (res) {
          if (res.data && res.data.userLevel === "1") {
            that.$store.state.name = res.data.name;
            router.push(`/student/${that.$store.state.name}`);
          } else if (res.data && res.data.userLevel === "2") {
            router.push(`/changeNotify`);
          } else {
            that.$message({
              message: "帐号或密码错误",
              type: "warning",
              center: "true",
            });
            return;
          }
        } else {
          that.$message({
            message: "帐号或密码错误",
            type: "warning",
            center: "true",
          });
          return;
        }
      });
    },
  },
};
</script>

<style scoped>
.main {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgb(140, 140, 230), white);
}
.title {
  font-size: 28px;
  color: white;
  text-align: center;
  margin-bottom: 15px;
}
.content {
  position: relative;
  box-sizing: border-box;
  height: 300px;
  width: 500px;
  border-radius: 5px;
  box-shadow: 5px 5px 3px #b19797;
  background: #f5f1f1;
  padding: 20px 40px 40px 60px;
  display: flex;
  flex-direction: column;
}
.login {
  margin-bottom: 20px;
}
.accounts,
.password {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.bottons {
  display: flex;
  justify-content: center;
}
a {
  color: #42b983;
}
.box {
  cursor: pointer;
}
</style>
