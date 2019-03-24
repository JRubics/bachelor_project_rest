/*
 * perk.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	TREES: '/trees',
};

export default class AuthApi {
	static getTrees() {
		return Axios.get(ENDPOINTS.TREES);
	}

	static getPerks(tree) {
		return Axios.get(ENDPOINTS.TREES + `/${tree}`);
	}

	static uploadPerks(data) {
		return Axios.put(ENDPOINTS.TREES, data);
	}
}

