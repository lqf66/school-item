<template>
  <div id="signup">
    <Header></Header>
    <content>
      <div class="content" v-if="flag">
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
              >确认报名</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="content_1" v-else>您已经报名！</div>
    </content>
  </div>
</template>

<script>
import Header from "./Header.vue";
import router from "../../router";
import config from "../../config";
export default {
  name: "Signup",
  components: {
    Header,
  },
  data() {
    return {
      flag: true,
      stack: [],
      form: {
        name: this.$store.state.name,
        sex: "",
        age: "",
        email: "",
        phone: "",
        guardian: "",
        gdPhone: "",
        className: "C初级班",
        price: "500",
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
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        guardian: [
          { required: true, message: "请填写监护人姓名", trigger: "blur" },
        ],
        gdPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        className: [{ required: true, message: "请选择班级", trigger: "blur" }],
        price: [{ required: true, message: "请填写金额", trigger: "blur" }],
      },
    };
  },
  mounted() {
    let that = this;
    this.request({
      methods: "get",
      url: `${config.url}/student/get_information`,
      params: {
        name: this.$store.state.name,
      },
    }).then(function (res) {
      if (res.data) {
        that.flag = false;
        return;
      } else {
        that.flag = true;
      }
    });

    this.request({
      methods: "get",
      url: `${config.url}/admin/get_class_information`,
    }).then((res) => {
      if (res.data) {
        res.data.forEach((v) => {
          if (that.form.className === v.name) {
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
  methods: {
    onSubmit(form) {
      let that = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$confirm("是否确认报名？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.request({
                methods: "get",
                url: `${config.url}/admin/get_class_information`,
              }).then((res) => {
                if (res.data) {
                  let clas = res.data.find(
                    (v) => v.name === this.form.className
                  );
                  if (clas.sum >= clas.maxsum) {
                    that.$message({
                      message: "班级人数已满！",
                      type: "info",
                      center: "true",
                    });
                    return;
                  }
                  this.request({
                    methods: "get",
                    url: `${config.url}/student/information`,
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
                          message: "报名成功！",
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
                    }
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消报名",
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
  background: rgb(241, 235, 235);
  display: flex;
  flex-direction: column;
  border: none;
}
.content {
  box-sizing: border-box;
  flex: 1;
  padding: 50px 150px;
}
.content_1 {
  margin: auto;
  font-size: 32px;
}
</style>
