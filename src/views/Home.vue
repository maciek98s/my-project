<template>
  <div class="home">
    <b-container fluid>
      <b-row class="text-center">
        <b-col xl="2">
          <NavBar />
        </b-col>
        <b-col cols="8" xl="8">
          <Main msg="Welcome to Your Vue.js App" />
        </b-col>
        <b-col xl="2">
          <SideView />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Main from "@/components/Main.vue";
import SideView from "@/components/SideView.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    Main,
    SideView
  }
};
</script>
