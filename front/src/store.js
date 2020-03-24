/*
 * store.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import StudentsApi from './apis/students.api';
import * as _ from 'lodash';
Vue.use(Vuex);

const state = {
	authStatus: false,
	assignments: [],
	fixtures: [],
	interval: null,
	errors: [],
};

const getters = {
	authStatus: (state) => state.authStatus,
	assignments: (state) => state.assignments,
	fixtures: (state) => state.fixtures,
	errors: (state) => state.errors,
	loading: (state) => Boolean(state.interval),
};

const mutations = {
	login() {
		state.authStatus = true;
	},
	logout() {
		state.authStatus = false;
	},
	addAssignment(state, assignment) {
		state.assignments.push(assignment);
	},
	initAssignments(state, assignments) {
		state.assignments = assignments;
	},
	addResult(state, data) {
		state.assignments.forEach((assignment) => {
			if (assignment.id === data.assignment_id) {
				assignment.result = data.result;
			}
		});
	},
	addInterval(state, interval_id) {
		state.interval = interval_id;
	},
	removeInterval(state) {
		clearInterval(state.interval);
		state.interval = null;
	},
	initFixtures(state, fixtures) {
		state.fixtures = fixtures;
	},
	addError(state, error) {
		state.errors.push(error);
	},
	clearErrors(state) {
		state.errors = [];
	},
};

const actions = {
	async addAssignment(context, data) {
		context.commit('clearErrors');
		try {
			const response = await StudentsApi.uploadFile(data);
			context.commit('addAssignment', response.data);
			context.dispatch('watchAssignment', response.data.id);
		} catch (error) {
			context.commit('addError', error.response.data);
		}
	},
	async watchAssignment(context, assignment_id) {
		const intervalID = setInterval((assignment_id) => {
			context.dispatch('checkAssignment', assignment_id);
		}, 2000, assignment_id);
		context.commit('addInterval', intervalID);
	},
	async checkAssignment(context, assignment_id) {
		try {
			const response = await StudentsApi.checkResults(assignment_id);
			if (response.status === 200) {
				context.commit('addResult', { result: response.data, assignment_id });
				context.commit('removeInterval');
			}
		} catch (error) {
			context.commit('addError', error.response.data);
		}
	},
	async initAssignments(context) {
		try {
			const response = await StudentsApi.getAssignments();
			const assignment = _.last(response.data);
			if (!assignment.result) {
				context.dispatch('watchAssignment', assignment.id);
			}
			context.commit('initAssignments', response.data);
		} catch (error) {
			context.commit('addError', error.response.data);
		}
	},
	async initFixtures(context) {
		try {
			const response = await StudentsApi.getFixtures();
			context.commit('initFixtures', response.data);
		} catch (error) {
			context.commit('addError', error.response.data);
		}
	},
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
});
