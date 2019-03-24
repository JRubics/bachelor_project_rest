/*
 * auth.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	LOGIN: '/token/',
	VERIFY: '/token/verify/',
	REFRESH: '/token/refresh/',
	USER: '/user/',
};
const AUTH_HEADER = 'Authorization';

export default class AuthApi {
	static setAuthHeader(token) {
		Axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
	}

	static login(data) {
		return Axios.post(ENDPOINTS.LOGIN, data);
	}

	static getUser() {
		return Axios.get(ENDPOINTS.USER);
	}

	static signup(data) {
		return Axios.post(ENDPOINTS.USER, data);
	}

	static changePassword(data) {
		return Axios.patch(ENDPOINTS.USER, data);
	}

	static verifyToken(token) {
		return Axios.post(ENDPOINTS.VERIFY, token);
	}

	static refreshToken(refresh) {
		return Axios.post(ENDPOINTS.REFRESH, refresh);
	}
}

