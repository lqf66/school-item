<template>
  <div id="app">
    <div>
      <router-link to="/"></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
    margin: 0;
    padding: 0;
}
ul,
li {
  list-style: none;
}
</style>
