import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    email:null,
    idToken:null
  },
  getters:{
    email: state => state.email,
    idToken: state => state.idToken
  },
  mutations:{
    updateEmail(state,email){
      state.email = email;
      console.log(email)
    },
    updateIdToken(state,idToken){
      state.idToken = idToken;
      console.log(idToken)
    },
  },
  actions:{
    updateEmail({commit},email){
      commit('updateEmail',email)
      console.log(email)
    },
    updateIdToken({commit},idToken){
      commit('updateIdToken',idToken)
      console.log(idToken)
    },
  },
  plugins: [createPersistedState()]
})
