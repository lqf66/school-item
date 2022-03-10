<template>
  <div class="changeNotify">
    <Header></Header>
    <content>
      <el-row>
        <el-col :span="22">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="notify"
          >
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            type="info"
            @click="modify"
            size="big"
            style="margin-top: 10px; margin-left: 10px"
            >修改公告</el-button
          >
        </el-col>
      </el-row>

      <!-- <el-form ref="formC" label-width="120px">
        <el-form-item size="small">
          <el-col :span="22">
            <el-button type="primary" @click="add">新增班级</el-button>
            <el-button type="primary" @click="deleteC">删除空行</el-button>
          </el-col>
        </el-form-item>
        <el-form-item
          v-for="(form, index) in formC"
          :key="index"
          label="C班级："
          size="small"
          prop="form"
        >
          <el-col :span="22">
            <el-input v-model="form.description"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <el-form ref="formCPlus" label-width="120px">
        <el-form-item
          v-for="(form, index) in formCPlus"
          :key="index"
          label="C++班级："
          size="small"
          prop="form"
        >
          <el-col :span="22">
            <el-input v-model="form.description"></el-input>
          </el-col>
        </el-form-item>
      </el-form>

      <el-form ref="formP" label-width="120px">
        <el-form-item
          v-for="(form, index) in formP"
          :key="index"
          label="Pascal班级："
          size="small"
          prop="form"
        >
          <el-col :span="22">
            <el-input v-model="form.description"></el-input>
          </el-col>
        </el-form-item>
      </el-form> -->
      <div class="button">
        <el-button type="info" @click="add" size="big" style="margin-top: 10px"
          >新增班级</el-button
        >
      </div>
      <el-table :data="tableData" stripe style="width: 100%" @row-click="jump">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="班级名称"> </el-table-column>
        <el-table-column prop="people" label="适合人群"> </el-table-column>
        <el-table-column prop="learntime" label="班级课时"> </el-table-column>
        <el-table-column prop="maxsum" label="班级容量"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
      </el-table>
    </content>
  </div>
</template>

<script>
import Header from "./Header.vue";
import config from "../../config";
import router from "../../router";
export default {
  name: "ChangeNotify",
  components: {
    Header,
  },
  mounted() {
    this.request({
      methods: "get",
      url: `${config.url}/announce/get_announce`,
    }).then((res) => {
      if (res.data) {
        this.notify = res.data.content;
      }
    });

    this.request({
      methods: "get",
      url: `${config.url}/admin/get_class_information`,
    }).then((res) => {
      if (res.data) {
        res.data.forEach((v) => {
          if (v.name && v.name.toLowerCase().startsWith("c++")) {
            this.formCPlus.push({
              name: v.name,
              price: v.price,
              people: v.people,
              learntime: v.learntime,
              maxsum: v.maxsum,
            });
          } else if (v.name && v.name.toLowerCase().startsWith("pascal")) {
            this.formP.push({
              name: v.name,
              price: v.price,
              people: v.people,
              learntime: v.learntime,
              maxsum: v.maxsum,
            });
          } else if (v.name && v.name.toLowerCase().startsWith("c")) {
            this.formC.push({
              name: v.name,
              price: v.price,
              people: v.people,
              learntime: v.learntime,
              maxsum: v.maxsum,
            });
          }
        });
        this.tableData = [...this.formC, ...this.formCPlus, ...this.formP];
      }
    });
  },
  data() {
    return {
      notify: "",
      formC: [],
      formCPlus: [],
      formP: [],
      tableData: [],
    };
  },
  methods: {
    add() {
      router.push(`/addClass`);
    },
    modify() {
      let that = this;
      this.request({
        methods: "get",
        url: `${config.url}/announce/change_announce`,
        params: {
          content: this.notify,
        },
      }).then((res) => {
        if (res.data) {
          that.$message({
            message: "修改成功！",
            type: "success",
            center: "true",
          });
        }
      });
    },
    jump(row) {
      router.push(`/changeClass/${row.name}`);
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
  height: 100%;
  background: linear-gradient(rgb(241, 247, 247), white);
  border: none;
  padding: 50px;
  display: flex;
  flex-direction: column;
}
.button {
  margin-bottom: 10px;
}

/deep/ .el-table {
  border-radius: 8px;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>