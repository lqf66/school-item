<template>
  <div class="manager">
    <Header></Header>
    <content>
      <el-table :data="tableData" stripe style="width: 100%" @row-click="jump">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="email" label="电子邮箱"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="guardian" label="监护人姓名"> </el-table-column>
        <el-table-column prop="gdPhone" label="监护人电话"> </el-table-column>
        <el-table-column prop="className" label="班级"> </el-table-column>
      </el-table>
    </content>
  </div>
</template>

<script>
import router from "../../router";
import config from "../../config";
import Header from "./Header.vue";
export default {
  name: "Manager",
  components: {
    Header,
  },
  mounted() {
    this.request({
      methods: "get",
      url: `${config.url}/admin/get_student_basic_information`,
      params: {
        option: this.$route.params.className
      }
    }).then((res) => {
      if (res.data) {
        for (let j of res.data) {
          this.tableData.push({
            name: j.name,
            sex: j.sex,
            age: j.age,
            email: j.mail,
            phone: j.telphone,
            guardian: j.parents,
            gdPhone: j.parentstel,
            className: j.option,
          });
        }
      }
    });
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    jump(row) {
      router.push(`/modifyInfo/${row.name}`);
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
  padding: 50px;
  background: rgb(241, 247, 247);
  border: none;
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