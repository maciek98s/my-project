import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        organization: 'testgithub',
        githubApiKey: '8a8302d19b07f9f198b4af444581682688661795',//'14b3c5e726cf964c79c5f80674a82dc3fcb1c0f7',
        zenhubApiKey: '130ca1a7df7b77e69a3fda3cd54a9d1ad6ecd3b09801a3082ab29d80807e1d3b8f885fb58be4f3db'
    },
})