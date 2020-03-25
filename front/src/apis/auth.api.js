/*
 * auth.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	LOGIN: '/token',
	SIGNUP: '/students/signup/',
};
const AUTH_HEADER = 'Authorization';

export default class AuthApi {
  static setAuthHeader(token) {
    if (token) {
      Axios.defaults.headers.common[AUTH_HEADER] = `Bearer ${token}`;
    } else {
      Reflect.deleteProperty(Axios.defaults.headers.common, AUTH_HEADER);
    }
  }

  static login(data) {
    return Axios.post(ENDPOINTS.LOGIN, data);
	}

	static signup(data) {
    return Axios.post(ENDPOINTS.SIGNUP, data);
  }
}
