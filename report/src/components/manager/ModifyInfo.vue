<template>
  <div id="modifyInfo">
    <Header></Header>
    <content>
      <div class="content">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名：" size="small" prop="name">
                <el-col :span="14">
                  <el-input v-model="form.name" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" size="small" prop="sex">
                <el-col :span="14">
                  <el-input v-model="form.sex"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" size="small" prop="age">
                <el-col :span="14">
                  <el-input v-model="form.age"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱：" size="small" prop="email">
                <el-col :span="14">
                  <el-input v-model="form.email"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="电话：" size="small" prop="phone">
                <el-col :span="14">
                  <el-input v-model="form.phone"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="监护人姓名：" size="small" prop="guardian">
                <el-col :span="14">
                  <el-input v-model="form.guardian"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="监护人电话：" size="small" prop="gdPhone">
                <el-col :span="14">
                  <el-input v-model="form.gdPhone"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级：" size="small" prop="className">
                <el-col :span="14">
                  <el-select v-model="form.className" placeholder="请选择...">
                    <el-option
                      v-for="(item, index) in stack"
                      :key="index"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="金额：" size="small" prop="price">
                <el-col :span="14">
                  <el-input v-model="form.price" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12"> </el-col>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >确认修改</el-button
            >
            <el-button type="info" @click="reset">重置密码</el-button>
            <el-button type="warning" @click="deleteStudent"
              >删除学生</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </content>
  </div>
</template>

<script>
import Header from "./Header.vue";
import config from "../../config";
import router from '../../router';
export default {
  name: "ModifyInfo",
  components: {
    Header,
  },
  mounted() {
    let that = this;
    this.request({
      methods: "get",
      url: `${config.url}/student/get_information`,
      params: {
        name: this.$route.params.name,
      },
    }).then(function (res) {
      if (res.data) {
        that.flag = true;
        that.form.name = res.data.name;
        that.form.sex = res.data.sex;
        that.form.age = res.data.age;
        that.form.email = res.data.mail;
        that.form.phone = res.data.telphone;
        that.form.guardian = res.data.parents;
        that.form.gdPhone = res.data.parentstel;
        that.form.className = res.data.option;
      } else {
        that.flag = false;
        return;
      }
    });
    this.request({
      methods: "get",
      url: `${config.url}/admin/get_class_information`,
    }).then((res) => {
      if (res.data) {
        res.data.forEach((v) => {
          if(that.form.className === v.name) {
            that.form.price = v.price;
          }
          this.stack.push({
            name: v.name,
            price: v.price,
          });
        });
      }
    });
  },
  data() {
    return {
      stack: [],
      form: {
        name: "",
        sex: "",
        age: "",
        email: "",
        phone: "",
        guardian: "",
        gdPhone: "",
        className: "",
        price: "",
      },
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请填写性别", trigger: "blur" }],
        age: [{ required: true, message: "请填写年龄", trigger: "blur" }],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的电子邮箱",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号码" },
        ],
        guardian: [
          { required: true, message: "请填写监护人姓名", trigger: "blur" },
        ],
        gdPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号码" },
        ],
        className: [{ required: true, message: "请选择班级", trigger: "blur" }],
        price: [{ required: true, message: "请填写金额", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit(form) {
      let that = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$confirm("确定修改吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.request({
                methods: "get",
                url: `${config.url}/student/change_information`,
                params: {
                  name: this.form.name,
                  sex: this.form.sex,
                  age: this.form.age,
                  mail: this.form.email,
                  telphone: this.form.phone,
                  parents: this.form.guardian,
                  parentstel: this.form.gdPhone,
                  option: this.form.className,
                },
              }).then(function (res) {
                if (res.status === 200) {
                  if (res.data === 1) {
                    that.$message({
                      message: "修改成功！",
                      type: "success",
                      center: "true",
                    });
                  } else {
                    that.$message({
                      message: "请填写正确的信息",
                      type: "warning",
                      center: "true",
                    });
                  }
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
    reset() {
      let that = this;
      this.$confirm("确定重置密码嘛？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.request({
            methods: "get",
            url: `${config.url}/admin/reset_passwrod`,
            params: {
              name: this.$route.params.name,
            },
          }).then(function () {
            that.$message({
              message: "重置成功！",
              type: "success",
              center: "true",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置",
          });
        });
    },
    deleteStudent() {
      let that = this;
      this.$confirm("确定删除学生嘛?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.request({
            methods: "get",
            url: `${config.url}/admin/delete`,
            params: {
              name: this.$route.params.name,
            },
          }).then(function () {
            that.$message({
              message: "删除成功！",
              type: "success",
              center: "true",
            });
            router.push('/classInfo');
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  watch: {
    "form.className"(newValue) {
      this.stack.forEach((v) => {
        if (v.name === newValue) {
          this.form.price = v.price;
          return;
        }
      });
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
  background: rgb(241, 247, 247);
  display: flex;
  flex-direction: column;
  border: none;
}
.content {
  box-sizing: border-box;
  flex: 1;
  padding: 50px 150px;
}
</style>
