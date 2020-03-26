import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import assignments from './assignments';
import modal from './modal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
		assignments,
		modal,
  },
});
