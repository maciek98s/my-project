<template>
  <div>
        <p><img style="width: 90%;" src="../assets/SAP.png"></p>
    <b-row>
        <b-col md="auto">
        <b-calendar v-model="value" @context="onContext" locale="en-US"></b-calendar>
        </b-col>
        <b-col>
        </b-col>
  </b-row>
  </div>
</template>

<script>
export default {
  name: 'SideView',
     data() {
      return {
        value: '',
        context: null
      }
    },
    methods: {
      onContext(ctx) {
        this.context = ctx
      }
    }
  }
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
