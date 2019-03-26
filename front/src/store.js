/*
 * store.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	authStatus: false,
};

const getters = {
	authStatus: (state) => state.authStatus,
};

const mutations = {
	login() {
		state.authStatus = true;
	},
	logout() {
		state.authStatus = false;
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
});

