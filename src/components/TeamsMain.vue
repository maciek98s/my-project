<template>
<div>

        <b-jumbotron
        fluid
        text-variant="black"
        header= "Teams"
        lead="List of Teams"
      >
      <p><b>The Current Number of Teams :</b>{{teams.length}} </p>

      </b-jumbotron>


      <b-card-group v-for="i in nloops" :key="i" deck>

        <b-card v-for="team in teams.slice((i-1)*5,(i-1)*5+5)" :key="team.id" border-variant="light" class="mt-4" style="max-width: 17%" >

          <h4 style="font-size:22px"  class=" display-4 rounded-0"> {{team.name}}</h4>
          <b-icon-caret-down-fill v-b-tooltip.hover style title="Click me To Expand"  v-b-toggle="'collapse-'+ team.id" ></b-icon-caret-down-fill>
          <b-collapse :id="'collapse-'+ team.id" >
            <p style="font-size:12px"><b>Team Description: </b> {{team.description}} </P>
            <b-button variant="secondary" >
              <router-link tag="tag" :to="{ name: 'TeamMembers', query:{ plan:team.id } }">Members</router-link>
            </b-button>
          </b-collapse>

        </b-card>
        

      </b-card-group>
       
  </div>
 
</template>
<script>
  import Api from '../api/api'
  export default {
    data: () => ({
      overlay: false,
      nloops: 0,
      loading: false,
      teams: [],
    }),
    computed: {
      organization(){
        return this.$store.state.organization;
      }
    },
    async mounted(){
      this.loading = true;
      var urlTeams = `https://github.wdf.sap.corp/api/v3/orgs/${this.organization}/teams`;
      this.teams = await Api.getData(urlTeams);
      console.log(this.teams.length);
      this.nloops = parseInt(this.teams.length / 5) + 1;
    }
  }
</script>