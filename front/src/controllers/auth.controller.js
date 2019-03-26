/*
 * auth.controller.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import * as _ from 'lodash';

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
		const access = AuthController.getLocalStorageToken().access;
		if (access) {
			AuthApi.setAuthHeader(access);
			store.commit('login');
		}
	}

	static login(data) {
		return AuthApi.login(data).then((response) => {
			AuthController.setLocalStorageToken(response.data);
			AuthController.setupToken(response.data);
		});
	}

	static logout() {
		AuthController.clearLocalStorageToken();
		store.commit('logout');
		AuthApi.setAuthHeader('');
	}

	static changePassword(data) {
		return AuthApi.changePassword(data);
	}

	static verifyToken() {
		const token = AuthController.getLocalStorageToken().access;
		if (token === null) {
			router.push('login');
		}
		return AuthApi.verifyToken({ token });
	}

	static refreshToken() {
		if (!AuthController.getLocalStorageRefresh()) {
			return Promise.reject(new Error('No token'));
		}

		const refresh = {
			refresh: AuthController.getLocalStorageToken().refresh,
		};

		_.delay(AuthController.refreshToken, 240000);

		return AuthApi.refreshToken(refresh).then((response) => {
			AuthController.setLocalStorageToken(response.data);
			AuthController.setupToken();
		});
	}

	static getAuthStatus() {
		const token = AuthController.getLocalStorageToken().access;
		return Boolean(token);
	}
}