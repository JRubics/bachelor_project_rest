/*
 * store.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import AuthApi from '../apis/auth.api';
import router from '../router';

const state = {
	authStatus: false,
	authErrors: [],
};

const getters = {
	authStatus: (state) => state.authStatus,
	authErrors: (state) => state.authErrors,
};

const mutations = {
	setAuthStatus(state, authStatus) {
		state.authStatus = authStatus;
	},
	addAuthError(state, error) {
		state.authErrors.push(error);
	},
	clearAuthErrors(state) {
		state.authErrors = [];
	},
};

const actions = {
	initAuth(context) {
		const token = localStorage.getItem('token');
		if (token) {
			AuthApi.setAuthHeader(token);
			context.commit('setAuthStatus', true);
		}
	},
	async login(context, data) {
		context.commit('clearAuthErrors');
		try {
			const response = await AuthApi.login(data);
			const token = response.data.access;
			if (token) {
				localStorage.setItem('token', token);
				AuthApi.setAuthHeader(token);
				context.commit('setAuthStatus', true);
				router.push({ name: 'index' });
			} else {
				context.dispatch('addAuthError', 'Missing token from response. Try again');
			}
		} catch (error) {
			if (error.response.data.detail) {
				context.dispatch('addAuthError', error.response.data.detail);
			}	else {
				context.dispatch('addAuthError', error);
			}
		}
	},
	async signup(context, data) {
		context.commit('clearAuthErrors');
		try {
			await AuthApi.signup(data);
			router.push({ name: 'login' });
		} catch (error) {
			context.dispatch('addAuthError', error);
		}
	},
	logout(context) {
		context.dispatch('clearAssigmentStore');
		context.commit('clearAuthErrors');
		localStorage.removeItem('token');
		context.commit('setAuthStatus', false);
		AuthApi.setAuthHeader(null);
		router.push({ name: 'login' });
	},
	addAuthError(context, error) {
		console.error(error);
			if (error.response) {
				context.commit('addAuthError', error.response.data);
			} else {
				context.commit('addAuthError', error.toString());
			}
	},
	clearAuthErrors(context) {
		context.commit('clearAuthErrors');
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
