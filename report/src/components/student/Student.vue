<template>
  <div class="student">
    <Header></Header>
    <content>
      <div @click="intoClass">
        <el-card class="notify" shadow="hover"
          >{{ notify }}
        </el-card>
      </div>
      <el-card class="className" shadow="hover">班级信息 </el-card>

      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(classs, index) in classes" :key="index">
          <div class="classType" @click="jump(classs.id)">
            <div class="title">{{ classs.name }}</div>
            <div>{{ classs.description }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </content>
  </div>
</template>

<script>
import router from "../../router";
import Header from "./Header.vue";
import config from '../../config';
export default {
  name: "Student",
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
  },
  data() {
    return {
      notify: "",
      classes: [
        {
          id: 1,
          name: "C 语言班",
          description:
            "C语言简介：C语言是一门面向过程、抽象化的通用程序设计语言，广泛应用于底层开发。C语言具有高效、灵活、功能丰富、表达力强和较高的可移植性等特点，在程序设计中备受青睐。",
        },
        {
          id: 4,
          name: "C++ 班",
          description:
            "C++简介：C++是一种面向对象的计算机程序设计语言，它是一种静态数据类型检查的、支持多重编程范式的通用程序设计语言，支持过程化程序设计、数据抽象、面向对象程序设计、泛型程序设计等多种程序设计风格.C++是C语言的继承，进一步扩充和完善了C语言，成为一种面向对象的程序设计语言。",
        },
        {
          id: 7,
          name: "Pascal 班",
          description:
            "Pascal 简介：Pascal语言是一种算法语言，它是一种结构化的程序设计语言。它的功能强、编译程序简单。Pascal语言语法严谨，层次分明，程序易写，可读性强，是第一个结构化编程语言。它一出世就受到广泛欢迎，迅速地从欧洲传到美国。",
        },
      ],
    };
  },
  methods: {
    intoClass() {
      router.push("/notify");
    },
    jump(id) {
      router.push(`/sclass/${id}`);
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
  border: none;
  padding: 50px;
}
.notify {
  background: rgb(228, 227, 236);
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-radius: 10px;
  padding: 0 20px;
}
.className {
  width: 100%;
  border-radius: 10px;
  font-size: 28px;
  background: rgb(216, 183, 223);
  line-height: 60px;
  text-align: center;
  margin-top: 20px;
}
.class {
  display: flex;
}
.classType {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 25px;
}
.title {
  font-size: 28px;
}
a {
  text-decoration: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>