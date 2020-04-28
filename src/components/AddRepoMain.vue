<template>
  <div>
    <div v-if="loading">
      <br><br><br>
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </div>
    <div v-if="!loading">
      <div>
        <b-jumbotron atyle="font-size:12px " class="h-25 w-100 d-inline-block" header="Add Repository">
        </b-jumbotron>
      </div>
      <form @submit="onSubmit" @reset="onReset" > 
        <div class="form-group">
          <label for="exampleFormControlSelect1" style="float:left">Pick Category</label>
          <br><br>
          <b-form-select v-model="form.selected" :options="options" class="w-25" Style="float:left" id="exampleFormControlSelect1"></b-form-select>
        </div>
        <div v-if="form.selected=='Add New Category'"> 
          <br><br>
          <b-form-input class="w-25" id="input-2" v-model="form.Category" required placeholder="Enter New Category" @keydown.space.prevent></b-form-input>
        </div>
        <br><br>

        <label for="exampleFormControlSelect1" style="float:left">Repository Name</label><br><br>
        <b-form-input class="w-25 " id="input-2" v-model="form.Repository" required placeholder="Enter Repository name" @keydown.space.prevent></b-form-input>
        <br>

        <label for="exampleFormControlSelect1" style="float:left" >Privacy</label><br><br>
        <b-form-radio-group v-model="form.privacy" label="Inline radios (default)" style="float:left" required>
          <b-form-radio  name="default" value=true >Private</b-form-radio>
          <b-form-radio  name="radio-inline" value=false >Public</b-form-radio>
        </b-form-radio-group>
        <br><br>

        <label for="exampleFormControlSelect1" style="float:left">Admin User</label><br><br>
        <b-form-input class="w-25 " id="input-2" v-model="form.iNumber" required placeholder="Enter i Number" @keydown.space.prevent></b-form-input>
        <br>
        
        <b-button style="float:left" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" Style="float:left" variant="danger">Reset</b-button>
      </form>
    </div>
  </div> 
</template>

<script>
  // import the Api page in order to use the api calls
  import Api from '../api/api'
  export default {
    name: "AddRepoMain",
    data(){
      return {
        // define and initialize the form elements to save 
        form: {
          Repository  : '',     // name of the Repository without the category
          Category    : '',     // final category name  
          iNumber     : '',     // define the admin user
          selected    : null,   // define the category (with add category options) 
          privacy     : false,  // define if the repo is private (true) or public (false)
          Repo        : '',     // final repository name (category-repository)
        },
        // define the category options (with the option of adding a new category)
        options: [
          { value: null, text: 'Please select some item' , disabled:true},
          "Add New Category",
        ],
        // variable that will contain all the repositories
        getRepos: "",
        // variable that splits the repositories data into categories and makes the data more clean
        category: [{}],
        // variable that is used during the loading phase 
        loading: false
      }
    },
    // used to get the organization name
    computed: {
      organization(){
        return this.$store.state.organization;
      }
    },
    async created(){
      // the variable is set to true until the API call is not finished 
      this.loading = true
      // url to request generic data about the organization data
      var url = `https://github.wdf.sap.corp/api/v3/orgs/${this.organization}/repos?per_page=100`;
      // call to the method to retrive data and wait for the data to come back
      this.getRepos = await Api.getData(url);

      // divide the repos in category ('*' means all the categories)
      this.category = await Api.getCategory(this.getRepos,'*',"0");

      // add all the categories name to the options
      for(let i = 0; i < this.category.length; i++){
        this.options.push(this.category[i].name);
      }

      // finishing the loading phase
      this.loading = false;
    },
    methods: {
      async onSubmit(evt) {
        // prevent from submit 
        evt.preventDefault();
        // be sure of the selected category
        if(this.form.selected){
          // variable to make sure the new category and repository does not exist
          var found = false;
          // varaible to get the index of the category
          var index = -1;
          // if the category is in the array (it is not new)
          if(this.form.selected !== "Add New Category")
          {
            this.form.Category = this.form.selected;
            // use the method tto find already existing category
            index = this.findRepo(this.form.Category);
            // check if the repository name already exists
            for(let i = 0; i < this.category[index].repo.length; i++){
              // make sure that even if the format is not the same, the name is
              if(this.category[index].repo[i].shortName.toUpperCase() == this.form.Repository.toUpperCase()){
                // display error mesage using Sweetalert (swal) 
                found = true;
                this.$swal({
                  title           : "Error",
                  text            : "The Repository already exists. Please use another repository name",
                  icon            : "error",
                  showCloseButton : true
                });
              }
            }
          }
          else{
            // if the category is new, make sure that the category is new... don't need to check for the repository name 
            index = this.findRepo(this.form.Category);
            if(index !== -1){
              found = true;
              this.$swal({
                title           : "Error",
                text            : "The Category already exists. Please use another category name",
                icon            : "error",
                showCloseButton : true
              });
            }
          }
          // continue if no errors found
          if(!found){
            // 
            this.form.Repo = this.form.Category.charAt(0).toUpperCase() + this.form.Category.slice(1) + '-' + this.form.Repository;
            // check if member is inside organiation 
            var membershipUrl = `https://github.wdf.sap.corp/api/v3/orgs/${this.organization}/members/${this.form.iNumber}`;
            
            try{ 
              // be sure that the admin is a memmber of the organization
              await Api.getData(membershipUrl);
              let createUrl = `https://github.wdf.sap.corp/api/v3/orgs/${this.organization}/repos`;
              
              try {
                // create the repository and assign the 
                var success = await Api.postData(createUrl,this.form);
                this.$swal({
                  title             : "Well Done",
                  icon              : "success",
                  html              : `
                                        <p>The operation was succesfull. You created ${this.form.Repo}</p>
                                        <br>
                                        <p> The ssh link is: 
                                        <code type="text" ref="code">${success.data.ssh_url}<code>
                                        </p>
                                      `,
                  confirmButtonText : 'Copy ssh'
                }).then((result) => {
                  if (result.value) {
                    Api.copySsh(success.data.ssh_url);
                    this.$swal.fire(
                      'Copied!',
                      'The ssh path has been copied to the clipboard.',
                      'success'
                    )
                  }
                });
                // add category and repository to the category array
                // if the category doesn't exist add the category and the new repo 
                if (index == -1){
                  let newCategory =  {
                                      name :  this.form.Repo.split("-")[0],
                                      repo  : [{
                                              longName  : this.form.Repo,
                                              shortName : this.form.Repository
                                              }]
                                      }
                  this.category.push(newCategory);
                  this.options.push(newCategory.name);
                }
                // if the category exists add the new repo to the category
                else {
                  let newRepo = {longName : this.form.Repo,
                                shortName : this.form.Repository
                                }
                  this.category[index].repo.push(newRepo);
                }
                // clear the form
                this.clear();
              }
              catch(x){
                console.log(x);
                // display an error if an error occured in the mean time
                this.$swal({
                  title           : "Error",
                  text            : "There was an error in your API request",
                  icon            : "error",
                  showCloseButton : true
                });
              }
            }
            catch (e){
              this.$swal({
                title           : "Error",
                text            : "The admin user is not a member of the organization",
                icon            : "error",
                showCloseButton : true
              });
            }
          }
        }
        else{
          this.$swal({
            title           : "Error",
            text            : "Please select a Category",
            icon            : "error",
            showCloseButton : true
          });
          
        }
      },
      // clear the form 
      onReset(evt) {
        evt.preventDefault()
        this.clear();
      },
      // method to clear the from 
      clear(){
        // Reset our form values
        this.form.Repository  = ''
        this.form.Category    = ''
        this.form.selected    = null
        this.form.iNumber     = ''
        this.form.Repo        = ''
      },
      // find the repo and return the index
      findRepo(categoryName){
        for(let i=0;i<this.category.length;i++){
          if(this.category[i].name.toUpperCase() == categoryName.toUpperCase()){
            return i;
          }
        }
        // return -1 if the category does not exist 
        return -1;
      }
    }
  }
</script>