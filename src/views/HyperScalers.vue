<template>
  <div>
    <b-container fluid>
      <b-row class="text-center">
        <b-col xl="1">
          <NavBar />
        </b-col>
        <b-col cols="8" xl="9">
          <HyperMain />
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
import HyperMain from "@/components/HyperMain.vue";

import SideView from "@/components/SideView.vue";

export default {
  name: "HyperScalers",
  components: {
    NavBar,
    SideView,
    HyperMain
  }
};
</script>
