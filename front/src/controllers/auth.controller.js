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
		if (data.token) {
			localStorage.setItem('token', data.token);
		}
	}

	static getLocalStorageToken() {
		const tokens = {
			token: localStorage.getItem('token'),
		};

		return tokens;
	}

	static getLocalStorageRefresh() {
		return localStorage.getItem('token');
	}

	static clearLocalStorageToken() {
		localStorage.removeItem('token');
	}

	static setupToken() {
		const token = this.getLocalStorageToken().token;
		AuthApi.setAuthHeader(token);
		store.commit('setToken', token);
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
		const token = this.getLocalStorageToken().token;
		if (token === null) {
			router.push('login');
		}
		return AuthApi.verifyToken({ token });
	}

	static getAuthStatus() {
		const token = this.getLocalStorageToken().token;
		return Boolean(token);
	}
}
