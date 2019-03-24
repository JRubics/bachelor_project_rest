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
	token: null,
};

const getters = {
	token: (state) => state.token,
};

const mutations = {
	setToken(token) {
		state.token = token;
	},
	clearToken() {
		state.token = '';
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
});

