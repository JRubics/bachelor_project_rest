import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import assignments from './assignments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    assignments,
  },
});
