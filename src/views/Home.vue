<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <div id="nav">
      <router-link to="/calendar">日历</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  display: block;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
