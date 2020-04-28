<template>
  <div>
    <div id="nav">
      <b-nav vertical class="w-25">

        <p style="font-size: 60px;">
          <b-icon-list v-b-toggle.sidebar-variant></b-icon-list>
        </p>

        <b-sidebar id="sidebar-variant" title="" bg-variant="white" text-variant="dark" shadow>

            
      <p>
        <img style="width: 35%;" src="../assets/SLV.png" />
      </p>
     
          <b-nav-item @click="Github()" active>GitHub</b-nav-item> <br>
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item><br>
          <b-nav-item>
            <router-link to="/Teams">Teams</router-link>
          </b-nav-item><br>
          <b-nav-item>
            <router-link to="/AddRepo">AddRepo</router-link>
          </b-nav-item><br>
          <b-nav-item @click="JamPage()">JamPage</b-nav-item>
          
        </b-sidebar>

      </b-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {},
  methods: {
    JamPage: function() {
      window.open(
        "https://jam4.sapjam.com/groups/wall/3kRSpEReWvAOpr3Qyf70Qj",
        "_blank"
      );
    },
    Github: function() {
      window.open("https://github.wdf.sap.corp/SLV-Tools", "_blank");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
