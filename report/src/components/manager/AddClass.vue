<template>
  <div id="addClass">
    <Header></Header>
    <content>
      <div class="content">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="班级名称：" size="small" prop="name">
            <el-col :span="14">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="适合人群：" size="small" prop="people">
            <el-col :span="14">
              <el-input v-model="form.people"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="培养课时：" size="small" prop="learntime">
            <el-col :span="14">
              <el-input v-model="form.learntime"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="价格：" size="small" prop="price">
            <el-col :span="14">
              <el-input v-model="form.price"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="最大班级人数：" size="small" prop="maxsum">
            <el-col :span="14">
              <el-input v-model="form.maxsum"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >确认添加</el-button
            >
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </content>
  </div>
</template>

<script>
import Header from "./Header.vue";
// import router from "../../router";
import config from "../../config";
import router from '../../router';
export default {
  name: "AddClass",
  components: {
    Header,
  },
  data() {
    return {
      form: {
        name: "",
        people: "",
        learntime: "",
        price: "",
        maxsum: "",
      },
      rules: {
        name: [{ required: true, message: "请填写班级名称", trigger: "blur" }],
        people: [
          { required: true, message: "请填写受众人群", trigger: "blur" },
        ],
        learntime: [{ required: true, message: "请填写课时", trigger: "blur" }],
        price: [{ required: true, message: "请填写课程价格", trigger: "blur" }],
        maxsum: [
          { required: true, message: "请填写最大班级人数", trigger: "blur" },
        ],
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
            url: `${config.url}/admin/add_class`,
            params: {
              name: this.form.name,
              people: this.form.people,
              learntime: this.form.learntime,
              price: this.form.price,
              maxsum: this.form.maxsum,
            },
          }).then(function (res) {
            if (res.status === 200) {
              if (res.data === 1) {
                that.$message({
                  message: "添加成功！",
                  type: "success",
                  center: "true",
                });
                router.push('/changeNotify');
              } else {
                that.$message({
                  message: "请填写正确的信息1",
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
    back(){
        router.go(-1);
    }
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
