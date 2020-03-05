<template>
  <div class="HyperMain">
    <div>
      <b-jumbotron
        fluid
        bg-variant="dark"
        text-variant="white"
        header="HyperScalers"
        lead="Members:"
      >
        <p>
          Tonia
          <b-icon-person></b-icon-person>Colm
          <b-icon-person></b-icon-person>Keith
          <b-icon-person></b-icon-person>Derna
          <b-icon-person></b-icon-person>
        </p>

        <p>
          <b-badge>Repositories</b-badge>
        </p>
      </b-jumbotron>

      <b-card-group deck>

        <b-card border-variant="dark">

          <template v-slot:header>
            <h6 class="mb-0">AWS-EKS-Cluster</h6>
          </template>

          <b-card-text>
            <table style="width:100%">
              <tr>
                <th>New</th>
                <td>6</td>
              </tr>
              <tr>
                <th>In-Progress</th>
                <td>5</td>
              </tr>
              <tr>
                <th>Completed</th>
                <td>7</td>
              </tr>
            </table>
          </b-card-text>

          <template v-slot:footer>
            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Repo</b-button>  <span></span>
          
            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Issues</b-button>
          </template>
        </b-card>

        <b-card title header-tag="header" footer-tag="footer" border-variant="dark">

          <template v-slot:header>
            <h6 class="mb-0">Databases</h6>
          </template>

          <b-card-text>
            <table style="width:100%">
              <tr>
                <th>New</th>
                <td>6</td>
              </tr>
              <tr>
                <th>In-Progress</th>
                <td>5</td>
              </tr>
              <tr>
                <th>Completed</th>
                <td>7</td>
              </tr>
            </table>
          </b-card-text>

          <template v-slot:footer>
            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Repo</b-button>  <span></span>

            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Issues</b-button>
          </template>

        </b-card>

        <b-card title header-tag="header" footer-tag="footer" border-variant="dark">

          <template v-slot:header>
            <h6 class="mb-0">Infrastructure Tools</h6>
          </template>

          <b-card-text>
            <table style="width:100%">
              <tr>
                <th>New</th>
                <td>6</td>
              </tr>
              <tr>
                <th>In-Progress</th>
                <td>5</td>
              </tr>
              <tr>
                <th>Completed</th>
                <td>7</td>
              </tr>
            </table>
          </b-card-text>

          <template v-slot:footer>
            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Repo</b-button>  <span></span>

            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Issues</b-button>
          </template>
        </b-card>

        <b-card title header-tag="header" footer-tag="footer" border-variant="dark">

          <template v-slot:header>
            <h6 class="mb-0">Validation Tools</h6>
          </template>

          <b-card-text>
            <table style="width:100%">
              <tr>
                <th>New</th>
                <td>6</td>
              </tr>
              <tr>
                <th>In-Progress</th>
                <td>5</td>
              </tr>
              <tr>
                <th>Completed</th>
                <td>7</td>
              </tr>
            </table>
          </b-card-text>

          <template v-slot:footer>
            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Repo</b-button>  <span></span>

            <b-button
              href="https://github.wdf.sap.corp/SLV-Tools"
              target="_blank"
              variant="secondary"
            >Issues</b-button>
          </template>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "HyperMain",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
