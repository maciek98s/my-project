<template>
  <div>
    <b-container fluid>
      <b-row class="text-center">
        <b-col xl="2">
          <NavBar />
        </b-col>
        <b-col cols="8" xl="8">
          <CategoryMain />
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
import CategoryMain from "@/components/CategoryMain.vue";

import SideView from "@/components/SideView.vue";

export default {
  name: "Categories",
  components: {
    NavBar,
    SideView,
    CategoryMain
  },
   created() {
    console.log(this.$route.query.plan);
    this.cat = this.$route.query.plan
  },
  data() {
    return {
      cat: ''
    }

  }
};
</script>
