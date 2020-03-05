<template>
  <div class="about">
    <b-row class="text-center">
      <b-col>
        <NavBar />
      </b-col>
      <b-col cols="8"></b-col>
      <b-col>
        <SideView />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import SideView from "@/components/SideView.vue";

export default {
  name: "about",
  components: {
    NavBar,
    SideView
  }
};
</script>
