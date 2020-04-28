<template>
  <div class="tecam">
    <b-row class="text-center">
      <b-col>
        <NavBar />
      </b-col>
      <b-col cols="8">

        <AddRepoMain/>
      </b-col>
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
import AddRepoMain from "@/components/AddRepoMain.vue";

export default {
  name: "TeamMembers",
  components: {
    NavBar,
    SideView,
    AddRepoMain
  }
};
</script>
