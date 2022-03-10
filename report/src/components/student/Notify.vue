<template>
  <div class="notify">
    <Header></Header>
    <content>
      <div @click="back">
        <el-card class="notify" shadow="hover"
          >{{ notify }}
        </el-card>
      </div>
    </content>
  </div>
</template>

<script>
import router from "../../router";
import config from "../../config";
import Header from "./Header.vue";
export default {
  name: "Notify",
  components: {
    Header,
  },
  mounted(){
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
    };
  },
  methods: {
    back() {
      router.go(-1);
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
  padding: 100px;
}
.notify {
  background: rgb(215, 213, 231);
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-radius: 10px;
  padding: 0 20px;
}
</style>