<template>
  <div>
    <header>
      <div class="title">信奥培训网上报名平台</div>
      <div class="box">
        <div class="nav">欢迎您 {{ this.$store.state.name }}</div>
        <a href="/">安全退出</a>
      </div>
    </header>
    <div class="sider">
        <ul>
          <li>
            <div @click="jump('/student')">公告信息</div>
          </li>
          <li>
            <div @click="jump('/signup')">报名 </div>
          </li>
          <li>
            <div @click="jump('/modify')">修改密码 </div>
          </li>
          <li>
            <div @click="jump('/information')">报名信息 </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import router from '../../router';
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    jump(path) {
      let url = path + '/' + this.$store.state.name;
      if(url == this.$route.path) return ;
      router.push(url);
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  color: white;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background: linear-gradient(rgb(144, 144, 214), rgb(209, 207, 224));
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav {
  font-size: 14px;
  margin-right: 10px;
}
.box a {
  font-size: 14px;
  text-decoration: none;
  color: #fff;
}
.sider {
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
  width: 300px;
  background: linear-gradient(rgb(209, 207, 224), rgb(255, 255, 255));
  font-size: 18px;
  transition: 0.5s;
}

ul {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
}

li {
  position: relative;
  width: 100%;
  text-align: center;
  list-style: none;
}

li:hover {
  background: #d1a3b5;
}

li div {
  position: relative;
  display: none;
  width: 100%;
  display: block;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  text-align: center;
  color: rgb(83, 69, 69);
}

/* @media (max-width: 920px) {
  .sider {
    display: none;
  }
} */
</style>