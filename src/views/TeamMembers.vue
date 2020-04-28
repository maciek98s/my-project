<template>
  <div class="tecam">
    <b-row class="text-center">
      <b-col>
        <NavBar />
      </b-col>
      <b-col cols="8">

        <MembersMain/>
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
import MembersMain from "@/components/MembersMain.vue";

export default {
  name: "TeamMembers",
  components: {
    NavBar,
    SideView,
    MembersMain
  }
};
</script>
