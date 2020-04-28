<template>
  <div class="main">
    <div v-if="loading">
        <br><br><br>
         <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      </div>
    <div v-if="!loading">
    <b-container fluid>

      <p>
        <img style="width: 35%;" src="../assets/SLV.png" />
      </p>

      <div class="input-group md-form form-sm form-1 pl-0">
        <div class="input-group-prepend">
          <span class="input-group-text lighten-3" id="basic-text1">
            <b-icon icon="search"></b-icon>
          </span>
        </div>
        <input class="form-control my-0 py-1" type="text" placeholder="Search for Category and Repository" aria-label="Search" v-model="search">
      </div>
      <br>

      <div >
        <b-card-group deck v-for="i in nloops" :key="i">
          
          <b-card border-variant="dark" v-for="(c, index) in filteredList.slice((i-1)*4,(i-1)*4+4)" :key="c.id" style="max-width:22.3%; margin-bottom: 20px">
          
            <template v-slot:header>
              <h6 class="mb-0">{{(c.name)}}</h6>
            </template>

            <b-card-text>
              <table style="width:100%">
                <tr>
                  <th>Members</th>
                  <td>{{(c.totalMembers)}}</td>
                </tr>
                <tr>
                  <th>Repositories</th>
                  <td>{{(c.element)}}</td>
                </tr>
                <tr>
                  <th>Open Tasks</th>
                  <td>{{(c.totalIssue)}}</td>
                </tr>
              </table>
            </b-card-text>
            <template v-slot:footer>
              <b-button variant="secondary">
                <router-link tag="tag" :to="{ name: 'Categories', params: { category }, query: { plan: (c.name), plan2: ((i-1)*4+index)}}">{{c.name}}</router-link>
              </b-button>



            </template>
          </b-card>
        </b-card-group>
      </div>
    </b-container>
    </div>
  </div>
</template>

<script>
  // import axios from 'axios'
  import Api from '../api/api'
  export default {
    name: "Main",
    data() {
      return {
        search: '',
        // variable to use for the API request
        getRepos: "",
        // variable that splits the API data into categories and makes the data more clean
        category: [{}],
        nloops: 0,
        loading: false
      }
    },
    computed: {
      organization(){
        return this.$store.state.organization;
      },
      filteredList(){
        return this.category.filter(cat => {
          for(let i=0;i<cat.repo.length;i++){
            if(cat.repo[i].longName.toLowerCase().includes(this.search.toLowerCase())){
              return cat.name;
            }
          }
        })
      }
    },
    props: {
      msg: String,
      categoryArr: Array
    },
    async created(){
      this.loading = true
      // url to request generic data about the organization data
      var url = `https://github.wdf.sap.corp/api/v3/orgs/${this.organization}/repos?per_page=100`;
      // call to the method to retrive data and wait for the data to come back
      this.getRepos = await Api.getData(url);

      // divide the repos in category ('*' means all the categories)
      this.category = await Api.getCategory(this.getRepos,'*',"*");
      
      // code to get the number of rows to display
      this.nloops = parseInt(this.category.length / 4) + 1;

      this.loading = false

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#buttons {
  color: white;
}
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
</style>
