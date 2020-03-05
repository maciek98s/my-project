<template>
  <div class="hello">
    <b-container fluid>

      <p>
        <img style="width: 35%;" src="../assets/SLV.png" />
      </p>

      <div>
        <b-card-group deck>
          <b-card border-variant="dark">

            <template v-slot:header>
              <h6 class="mb-0">HyperScalers</h6>
            </template>

            <b-card-text>
              <table style="width:100%">
                <tr>
                  <th>Members</th>
                  <td>6</td>
                </tr>
                <tr>
                  <th>Repositories</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th>Open Tasks</th>
                  <td>7</td>
                </tr>
              </table>
            </b-card-text>

            <template v-slot:footer>
              <b-button variant="secondary">
                <router-link id="buttons" to="/HyperScalers">HyperScalers</router-link>
              </b-button>
            </template>

          </b-card>

          <b-card title header-tag="header" footer-tag="footer" border-variant="dark">

            <template v-slot:header>
              <h6 class="mb-0">Databases</h6>
            </template>

            <b-card-text>
              <table style="width:100%">
                <tr>
                  <th>Members</th>
                  <td>6</td>
                </tr>
                <tr>
                  <th>Repositories</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th>Open Tasks</th>
                  <td>7</td>
                </tr>
              </table>
            </b-card-text>

            <template v-slot:footer>
              <b-button href="#" variant="secondary">Go somewhere</b-button>
            </template>
          </b-card>

          <b-card title header-tag="header" footer-tag="footer" border-variant="dark">

            <template v-slot:header>
              <h6 class="mb-0">Infrastructure Tools</h6>
            </template>

            <b-card-text>
              <table style="width:100%">
                <tr>
                  <th>Members</th>
                  <td>6</td>
                </tr>
                <tr>
                  <th>Repositories</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th>Open Tasks</th>
                  <td>7</td>
                </tr>
              </table>
            </b-card-text>

            <template v-slot:footer>
              <b-button href="#" variant="secondary">Go somewhere</b-button>
            </template>
          </b-card>

          <b-card title header-tag="header" footer-tag="footer" border-variant="dark">

            <template v-slot:header>
              <h6 class="mb-0">Validation Tools</h6>
            </template>

            <b-card-text>
              <table style="width:100%">
                <tr>
                  <th>Members</th>
                  <td>6</td>
                </tr>
                <tr>
                  <th>Repositories</th>
                  <td>5</td>
                </tr>
                <tr>
                  <th>Open Tasks</th>
                  <td>7</td>
                </tr>
              </table>
            </b-card-text>

            <template v-slot:footer>
              <b-button href="#" variant="secondary">Go somewhere</b-button>
            </template>
            
          </b-card>
        </b-card-group>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "HelloWorld2",
  props: {
    msg: String
  }
};
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
