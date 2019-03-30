/*
 * perk.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	FILE: '/students/upload-file/',
	ASSIGNMENTS: '/students/assignments/',
};

export default class StudentsApi {
	static uploadFile(data) {
		return Axios.post(ENDPOINTS.FILE, data);
	}

	static getAssignments() {
		return Axios.get(ENDPOINTS.ASSIGNMENTS);
	}
}

