<template>
  <div>
    <div id="nav">
      <b-nav vertical class="w-25">

        <p style="font-size: 60px;">
          <b-icon-list v-b-toggle.collapse-1></b-icon-list>
        </p>

        <b-collapse id="collapse-1" class="mt-2">

          <b-nav-item @click="Github()" active>GitHub</b-nav-item>
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/about">About</router-link>
          </b-nav-item>
          <b-nav-item @click="JamPage()">JamPage</b-nav-item>
          
        </b-collapse>

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
