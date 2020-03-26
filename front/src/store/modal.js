/*
 * store.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

const state = {
	dialog: false,
	modalText: null,
};

const getters = {
	dialog: (state) => state.dialog,
	modalText: (state) => state.modalText,
};

const mutations = {
	showModal(state, text) {
		state.modalText = text;
		state.dialog = true;
	},
	closeModal(state) {
		state.dialog = false;
	},
};

const actions = {
	showModal(context, text) {
		context.commit('showModal', text);
	},
	closeModal(context) {
		context.commit('closeModal');
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
