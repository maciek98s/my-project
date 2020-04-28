<template>
  <div class="team">
    <b-row class="text-center">
      <b-col>
        <NavBar />
      </b-col>
      <b-col cols="8">

        <TeamsMain/>
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
import TeamsMain from "@/components/TeamsMain.vue";

export default {
  name: "teams",
  components: {
    NavBar,
    SideView,
    TeamsMain
  }
};
</script>
