import axios from 'axios'
import { store }  from '../store.js'
export default{
  category      : [{}], 
  foundMember   : false,
  RepoName      : '',
  RepoTopic     : '',
  organization  : store.state.organization,
  // method to retrieve data from the API and return the data
  async getData(url) {
    var apiKey = store.state.githubApiKey;
    let data;
    // axis retrieve data from the API
    // the headers are defined in the GitHub API documentation
    return axios.get(url, {
      headers: {
        "Accept"        : `application/vnd.github.nebula-preview+json`,
        "Authorization" : `token ${apiKey}`
      }
    }).then(response => {
      data = response.data;
      return data;
    });
  },
  copySsh(ssh){
    // create a input in order to copy to clipboard and then delete it
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.value = ssh;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.style.display = "none";
  },
  // if the text is '*' then I am looking for all the categories, otherwise that will be the name of the repository I am looking for  
  async getCategory(getRepos,text,members){
    this.category = [{}];
    // split the repos into categories 
    for (var i = 0; i < getRepos.length; i++){
      // split the name of the repository into category and name and assign them to a varaible  
      this.RepoName  = getRepos[i].name;
      this.RepoTopic = this.RepoName.split("-")[0];
      
      if (text == '*'){
        getRepos = await this.addRepo(getRepos,i,members);
      }
      else if(this.RepoTopic == text) {
        getRepos = await this.addRepo(getRepos,i,members);
      }
       
    }
    // check if ifrst element is empty
    if (Object.keys(this.category[0]).length === 0){
      // delete the first element in the array (when we initialize we create an element inside the array that is empty)
      this.category.splice(0,1);
    }
    return this.category;
  },

  // add each repo to the category 
  async addRepo(getRepos,i,members){
    getRepos[i].contributors = [{
      name  : "",
      id    : ""
    }];
    getRepos[i].nContributors = 0;

    if(members == "*"){
      // get the repos contributors (local and anonymous)
      let url2 = `https://github.wdf.sap.corp/api/v3/repos/${this.organization}/${this.RepoName}/contributors?anon=1`;
      let getContributors = await this.getData(url2); 
      // check if there are contributors (there are two answers for the call one for unknown and one for registered)
      if (getContributors.length > 0){
        // get number of contributors for each repo
        getRepos[i].nContributors = getContributors.length;
        // loop through the contributors
        for (let k = 0; k < getContributors.length; k++){
          // since the array is not empty, we need to override the first element 
          if (k == 0){
            // check if the login field is undefined for user that are unknown
            if (typeof(getContributors[k].login) == `undefined`) {
              getRepos[i].contributors[k].name = getContributors[k].name;
            }
            // get the id of the urer that is the contributor
            else {
              let userUrl = `https://github.wdf.sap.corp/api/v3/users/${getContributors[k].login}`;
              let getUser = await this.getData(userUrl);
              getRepos[i].contributors[k].id = getContributors[k].login;
              getRepos[i].contributors[k].name = getUser.name;
            }
          } 
          // add all the other contributors to the array
          else{
            // again check if the user is known or unknown to the organization
            if (typeof(getContributors[k].login) == `undefined`) {
              getRepos[i].contributors.push({
                name: getContributors[k].name,
              })
            }
            else {
              let userUrl = `https://github.wdf.sap.corp/api/v3/users/${getContributors[k].login}`;
              let getUser = await this.getData(userUrl);
              getRepos[i].contributors.push({
                id: getContributors[k].login,
                name : getUser.name
              })
            }
          }
        }
      }
    }

    // continue the Api request for more data
    getRepos[i].topic = this.RepoTopic;
    getRepos[i].shortName = this.RepoName.split("-")[1];
    // check the category array and split the repos into it
    let j = 0;
    let found = false;
    // check if the category is already in the array
    for (j = 0; j < this.category.length; j++){
      if (this.RepoTopic == this.category[j].name){
        found = true;
        break;
      }
    }
    // if the category is meet for the first time, create the category and add the element
    if (found == false){
      this.category.push({
        name          : this.RepoTopic,
        element       : 1,
        totalIssue    : getRepos[i].open_issues,
        totalMembers  : getRepos[i].nContributors, 
        cMembers      : JSON.parse(JSON.stringify(getRepos[i].contributors)), // take away the connection between the 2 elements
        repo          : [{
                          id          : getRepos[i].id,
                          longName    : getRepos[i].name,
                          shortName   : getRepos[i].shortName,
                          openIssues  : getRepos[i].open_issues, // we need just the number of all issues
                          rMembers    : JSON.parse(JSON.stringify(getRepos[i].contributors)), // take away the connection between the 2 arrays
                          tMembers    : getRepos[i].nContributors,
                          url         : getRepos[i].html_url,
                          ssh         : getRepos[i].ssh_url
        }]
      });
    }
    // else add the repo inside the category
    else{
      this.category[j].element += 1; 
      this.category[j].totalIssue += getRepos[i].open_issues;
      //add members from repo to category without repetition
      for(var z = 0; z < getRepos[i].nContributors; z++){
        // mock variable to search 
        this.foundMember = false;
        // if the repo does not have a contributor, just skip it (double insurance one with nContributors and this with first element that is empty)
        if (getRepos[i].contributors[z].name == ""){
          continue;
        }
        // compare the each repo contributor with the category contributor/member 
        else{
          for (var x = 0; x < this.category[j].cMembers.length; x++){
            // if the contributor is already in the category list, change the mock variable
            if (this.category[j].cMembers[x].name == getRepos[i].contributors[z].name ){
              this.foundMember = true;
              break;
            }
          }
        }
        // add the contributor if not in the list
        if (this.foundMember == false){
          this.category[j].totalMembers += 1;
          this.category[j].cMembers.push({
            name  : getRepos[i].contributors[z].name,
            id    : getRepos[i].contributors[z].id
          })
          // delete the empty row in the array (make sure the array is updated)
          if(this.category[j].cMembers[0].name == ""){
            this.category[j].cMembers.splice(0,1);           
          }
        }
      }
      // add the repo to the category 
      this.category[j].repo.push({
        id          : getRepos[i].id,
        longName    : getRepos[i].name,
        shortName   : getRepos[i].shortName,
        openIssues  : getRepos[i].open_issues,
        rMembers    : JSON.parse(JSON.stringify(getRepos[i].contributors)),
        tMembers    : getRepos[i].nContributors,
        url         : getRepos[i].html_url,
        ssh         : getRepos[i].ssh_url
      }); 
    }
    return getRepos;
  },
  async getDataZenhub(url){
    var ZenhubApiKey = store.state.zenhubApiKey;
    let data;
    // axis retrieve data from the API
    // the headers are defined in the GitHub API documentation
    return axios.get(url, {
      headers: {
        'X-Authentication-Token' : ZenhubApiKey
      }
    }).then(response => {
      data = response.data;
      return data;
    });
  },
  // method to retrieve data from the API and return the data
  async postData(url,form) {
    var apiKey = store.state.githubApiKey;
    // axis retrieve data from the API
    try{
      // the headers are defined in the GitHub API documentation
      var createRepo = await axios({
        method  : 'post',
        url     : url,
        headers : {
          "Accept"        : `application/vnd.github.nebula-preview+json`,
          "Authorization" : `token ${apiKey}`
        },
        data    : {
          "name"          : form.Repo,
          "private"       : form.privacy,
          "has_issues"    : true,
          "has_projects"  : true,
          "has_wiki"      : true
        }
      });
      await axios({
        method   : 'put',
        url      : `https://github.wdf.sap.corp/api/v3/repos/${store.state.organization}/${form.Repo}/collaborators/${form.iNumber}`,
        headers  : {
          "Accept"        : `application/vnd.github.nebula-preview+json`,
          "Authorization" : `token ${apiKey}`
        },
        data: {
          "permission" : 'admin'
        }
      });
      await axios({
        method  : 'post',
        url     : `https://github.wdf.sap.corp/api/v3/repos/${store.state.organization}/${form.Repo}/labels`,
        headers : {
          "Accept"        : `application/vnd.github.nebula-preview+json`,
          "Authorization" : `token ${apiKey}`
        },
        data: {
          "name"         : 'high-issue',
          "description"  : "prioritize the issue",
          "color"        : "CD3333"
        }
      });
    }
    catch (e){
      return e;
    }
    return createRepo;
  },
}