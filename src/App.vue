<template>
  <div id="app">
    <h2 id="h2">
      GitHub Page
      <b-badge>SLV</b-badge>
    </h2>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#h2 {
  font-family: "Times New Roman", Times, serif;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: grey;
}
</style>
