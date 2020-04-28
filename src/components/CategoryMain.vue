<template>
  <div class="CategoryMain">
    <div v-if="loading">
        <br><br><br>
         <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>

    <div v-if="!loading"> 
      <b-jumbotron
        fluid
        bg-variant="dark"
        text-variant="white"
        header= "Hyper Scalors"
        lead="Members:"
      >
       <template v-slot:header>{{nameofCategory}}</template>
        <div v-if="!!mainCategory">
          <div v-for="member in mainCategory.cMembers" :key="member.id" >
            <p :id="member.name" style="display:inline-block">
              {{member.id}}
              <b-icon-person></b-icon-person>
            </p>
            <b-tooltip placement="right" :target="member.name" variant="info">{{member.name}}</b-tooltip>
          </div>
        </div>

        <p>
          <b-badge>Repositories</b-badge>
        </p>
      </b-jumbotron>
      

      <div class="input-group md-form form-sm form-1 pl-0">
        <div class="input-group-prepend">
          <span class="input-group-text lighten-3" id="basic-text1">
            <b-icon icon="search"></b-icon>
          </span>
        </div>
        <input class="form-control my-0 py-1" type="text" placeholder="Search for Repository" aria-label="Search" v-model="search">
      </div>
      <br>

      <b-card-group deck v-for="i in nloops" :key="i">

        <b-card border-variant="dark"  v-for="(c, index) in filteredList.slice((i-1)*3,(i-1)*3+3)" :key="c.id" style="max-width:30.7% ;margin-bottom: 20px">

          <template v-slot:header>
            <h6 class="mb-0">{{c.shortName}}</h6>
          </template>

          <b-card-text>
            <div v-if="getBoard[index].pipelines">
              <table style="width:100%">
                <tr> 
                  <th class="table"> Pipeline Name </th>
                  <th> Number of Issues </th>
                  <th> High </th>
                </tr>
                <tr v-for="x in getBoard[index].pipelines" :key="x.name">
                  <td class="table">{{x.name}}</td>
                  <td>{{x.issues.length}}</td>
                  <td> {{x.high}}</td>
                </tr>
                
              </table>
            </div>
            <div v-else>
              <p>no Zenhub for this repo</p> 
            </div>
          </b-card-text>

          <template v-slot:footer>
            <b-button
              :href="c.url"
              target="_blank"
              variant="secondary"
            >Repo</b-button>  <span></span>
          
            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Issues</b-button> <span></span>
            
            <b-button
              @click="copySsh(c.ssh)"
              target="_blank"
              variant="secondary"
            >Copy SSH</b-button>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import Api from '../api/api'

export default {
  name: "CategoryMain",
  data() {
    return {
      search: '',
      mainCategory: [{}],
      nameofCategory: this.$route.query.plan,
      index: parseInt(this.$route.query.plan2),
      getBoard: [],
      nloops: 0,
      loading: false
    }
  },
  computed: {
    organization(){
      return this.$store.state.organization;
    },
    filteredList(){
      return this.mainCategory.repo.filter(rep => {
          return rep.shortName.toLowerCase().includes(this.search.toLowerCase())
        })
      }
  },
  methods: {
    copySsh(ssh){
      Api.copySsh(ssh);
      this.$swal.fire({
        title: 'Copied!',
        text: 'The ssh path has been copied to the clipboard.',
        icon: 'success',
        timer: 1000
        })
    }
  },
  async mounted(){
    this.loading = true
    this.mainCategory = this.$route.params.category;
    if (typeof(this.category) == 'undefined' || this.category === null){
      // url to request generic data about the organization data
      var url = `https://github.wdf.sap.corp/api/v3/orgs/${this.organization}/repos?per_page=100`;

      // call to the method to retrive data and wait for the data to come back
      this.getRepos = await Api.getData(url);

      // divide the repos in category ('*' means all the categories)
      this.mainCategory = (await Api.getCategory(this.getRepos,this.$route.query.plan,"*"))[0];
    }
    else {
      this.mainCategory = this.mainCategory[this.index];
    }

    for (var i=0; i<this.mainCategory.repo.length; i++){
      // url to request generic data about the organization data
      var urlBoard = `https://zenhub.mo.sap.corp/p1/repositories/${this.mainCategory.repo[i].id}/board`;

      // url to request all the high issues
      var urlPriority = `https://github.wdf.sap.corp/api/v3/repos/${this.organization}/${this.mainCategory.repo[i].longName}/issues?labels=high issue`;

      // url to request closed issues
      var urlClosed = `https://github.wdf.sap.corp/api/v3/repos/${this.organization}/${this.mainCategory.repo[i].longName}/issues?state=closed`;

      // call to the method to retrive data and wait for the data to come back
      try{
        this.getBoard.push(await Api.getDataZenhub(urlBoard));
        // get closed issue and add it to the getBoard
        this.getBoard[i].pipelines.push({name:'Closed',
                                          issues: await Api.getData(urlClosed)});
        // get issues raw data
        var rawIssue = await Api.getData(urlPriority);
        // look over each pipeline
        for( var k=0; k<this.getBoard[i].pipelines.length; k++ ){
          // variable to store each
          var totalForPipeline = 0;
          // initialize high to 0
          this.getBoard[i].pipelines[k].high = 0;
          // look for each error in pipeline 
          for( var z=0; z<this.getBoard[i].pipelines[k].issues.length; z++ ){
            // look at the raw issue array 
            for(var j=0; j<rawIssue.length; j++ ){
              if(rawIssue[j].number == this.getBoard[i].pipelines[k].issues[z].issue_number){
                totalForPipeline++;
              }
            }
            this.getBoard[i].pipelines[k].high = totalForPipeline;
          }
        }
      }
      catch (e){
        this.getBoard.push('error');
        this.loading = false;
      }
    }

    this.nloops = parseInt(this.mainCategory.repo.length / 3) + 1;
    this.loading = false;

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table{
  text-align:left;
}
</style>
