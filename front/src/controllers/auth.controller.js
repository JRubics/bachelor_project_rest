/*
 * perks.controller.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import AuthApi from '../apis/auth.api';
import router from '../router';
import store from '../store';

export default class AuthController {
	static setLocalStorageToken(data) {
		if (data.refresh) {
			localStorage.setItem('refresh', data.refresh);
		}
		if (data.access) {
			localStorage.setItem('access', data.access);
		}
	}

	static getLocalStorageToken() {
		const tokens = {
			access: localStorage.getItem('access'),
			refresh: localStorage.getItem('refresh'),
		};

		return tokens;
	}

	static getLocalStorageRefresh() {
		return localStorage.getItem('access');
	}

	static clearLocalStorageToken() {
		localStorage.removeItem('refresh');
		localStorage.removeItem('access');
	}

	static setupToken() {
		const access = this.getLocalStorageToken().access;
		AuthApi.setAuthHeader(access);
		store.commit('setToken', access);
	}

	static login(data) {
		return AuthApi.login(data).then((response) => {
			this.setLocalStorageToken(response.data);
			this.setupToken(response.data);
		});
	}

	static signup(data) {
		return AuthApi.signup(data);
	}

	static logout() {
		this.clearLocalStorageToken();
		store.commit('clearToken');
		AuthApi.setAuthHeader('');
	}

	static changePassword(data) {
		return AuthApi.changePassword(data);
	}

	static verifyToken() {
		const token = this.getLocalStorageToken().access;
		if (token === null) {
			router.push('login');
		}
		return AuthApi.verifyToken({ token });
	}

	static refreshToken() {
		if (!this.getLocalStorageRefresh()) {
			return Promise.reject(new Error('No token'));
		}

		const refresh = {
			refresh: this.getLocalStorageToken().refresh,
		};

		return AuthApi.refreshToken(refresh).then((response) => {
			this.setLocalStorageToken(response.data);
			this.setupToken();
		});
	}

	static getAuthStatus() {
		const token = this.getLocalStorageToken().access;
		return Boolean(token);
	}
}
