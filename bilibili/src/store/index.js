import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    model:{}
  },
  mutations: {
    increment(state) {
      console.log(state.model,'hahah');
    }
  }
})

export default store