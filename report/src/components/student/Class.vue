<template>
  <div class="class">
    <Header></Header>
    <content>
      <el-card class="className" shadow="hover">{{
        message.description
      }}</el-card>
      <div class="classType">
        <div v-for="(fo, index) in form" :key="index">
          <el-card shadow="hover">{{ fo.name }} <br />适合人群：{{ fo.people }}<br />培养课时：{{ fo.learntime }}课时<br />价格：{{ fo.price }}</el-card>
        </div>
      </div>
    </content>
  </div>
</template>

<script>
import config from "../../config";
import Header from "./Header.vue";
export default {
  name: "Student",
  components: {
    Header,
  },
  mounted() {
    this.message = this.messages.find((v) => v.id == this.$route.params.id);
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
            });
          } else if (v.name && v.name.toLowerCase().startsWith("pascal")) {
            this.formP.push({
              name: v.name,
              price: v.price,
              people: v.people,
              learntime: v.learntime,
            });
          } else if (v.name && v.name.toLowerCase().startsWith("c")){
            this.formC.push({
              name: v.name,
              price: v.price,
              people: v.people,
              learntime: v.learntime,
            });
          }
        });
      }
    });
    if(this.message.title === 'C') this.form = this.formC;
    else if(this.message.title === 'Pascal') this.form = this.formP;
    else this.form = this.formCPlus;
  },
  data() {
    return {
      form: [],
      formC: [],
      formCPlus: [],
      formP: [],
      message: {},
      // 渲染课程
      messages: [
        {
          id: 1,
          description:
            "C语言简介：C语言是一门面向过程、抽象化的通用程序设计语言，广泛应用于底层开发。C语言具有高效、灵活、功能丰富、表达力强和较高的可移植性等特点，在程序设计中备受青睐。",
          title: "C",
        },
        {
          id: 4,
          description:
            "C++简介：C++是一种面向对象的计算机程序设计语言，它是一种静态数据类型检查的、支持多重编程范式的通用程序设计语言，支持过程化程序设计、数据抽象、面向对象程序设计、泛型程序设计等多种程序设计风格.C++是C语言的继承，进一步扩充和完善了C语言，成为一种面向对象的程序设计语言。",
          title: "C++",
        },
        {
          id: 7,
          description:
            "Pascal 简介：Pascal语言是一种算法语言，它是一种结构化的程序设计语言。它的功能强、编译程序简单。Pascal语言语法严谨，层次分明，程序易写，可读性强，是第一个结构化编程语言。它一出世就受到广泛欢迎，迅速地从欧洲传到美国。",
          title: "Pascal",
        },
      ],
    };
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
  border: none;
  padding: 100px;
}
.className {
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  background: rgb(216, 183, 223);
  line-height: 40px;
  padding: 0 20px;
  text-align: center;
}
.classType {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 5px;
}
.classType div {
  flex: 1;
  /* height: 100%; */
  background-color: #d3dce6;
  border-radius: 10px;
}
</style>