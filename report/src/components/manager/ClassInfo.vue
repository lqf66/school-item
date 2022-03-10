<template>
  <div class="classInfo">
    <Header></Header>
    <content>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%; text-align: center"
        @row-click="jump"
      >
        <el-table-column type="index" width="300" label="序号">
        </el-table-column>
        <el-table-column prop="className" label="班级"> </el-table-column>
        <el-table-column prop="num" label="报名人数"> </el-table-column>
      </el-table>
    </content>
  </div>
</template>

<script>
import router from "../../router";
import config from "../../config";
import Header from "./Header.vue";
export default {
  name: "ClassInfo",
  components: {
    Header,
  },
  mounted() {
    this.request({
      methods: "get",
      url: `${config.url}/admin/get_class_information`
    }).then(res => {
      if(res.data) {
        for(let j of res.data) {
          this.tableData.push({
            className: j.name,
            num: j.sum
          })
        }
      }
    })
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    jump(row) {
      router.push(`/studentInfo/${row.className}`);
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
  background: rgb(241, 247, 247);
  border: none;
  padding: 50px;
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