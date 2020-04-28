<template>
<div>

        <b-jumbotron
        fluid
        text-variant="black"
        header= "Team Name Members"
        lead="List of Members from the team"
      >

      </b-jumbotron>


      <b-card-group v-for="i in nloops" :key="i">

        <b-card v-for="member in nameMember.slice((i-1)*5,(i-1)*5+5)" :key="member.id" border-variant="light" class="overflow-hidden" style="max-width: 20%;">

        <b-card-img v-b-tooltip.hover title="Click me To Expand"  v-b-toggle="'collapse-'+ member.id" :src="`https://github.wdf.sap.corp/avatars/u/${member.id}?s=200`" class="rounded-0"></b-card-img>
        <b-collapse :id="'collapse-'+ member.id" class="mt-2">
          <p style="font-size:12px"><B>Name: </b>{{member.name}} </P>
          <p style="font-size:10px"><B>iNumber: </b> {{member.login}} </P>
        </b-collapse>

        </b-card>
      </b-card-group>
 
  </div>
 
</template>
<script>
  import Api from '../api/api'
  export default {
    name: "MembersMain",
    data: () => ({
      overlay: false,
      zIndex: 0,
      nloops: 0,
      loading: false,
      teamMembers: [],
      nameMember:[]
    }),
    computed: {
      organization(){
        return this.$store.state.organization;
      }
    },
    async mounted(){
      this.loading = true;
      var urlMembers = `https://github.wdf.sap.corp/api/v3/teams/${parseInt(this.$route.query.plan)}/members`;
      this.teamMembers = await Api.getData(urlMembers);
      for(let i = 0; i < this.teamMembers.length; i++){
        let urlImage = `https://github.wdf.sap.corp/api/v3/users/${this.teamMembers[i].login}`;
        this.nameMember.push(await Api.getData(urlImage));
      }
      
      this.nloops = parseInt(this.teamMembers.length / 5) + 1;
    }
  }

</script>