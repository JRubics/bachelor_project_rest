/*
 * perk.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	ASSIGNMENTS: '/students/assignments/',
	LAST_ASSIGNMENT: '/students/assignments/last/',
	FIXTURES: '/students/fixtures/',
};

export default class StudentsApi {
	static uploadFile(data) {
		return Axios.post(ENDPOINTS.ASSIGNMENTS, data);
	}

	static getAssignments() {
		return Axios.get(ENDPOINTS.ASSIGNMENTS);
	}

	static getFixtures() {
		return Axios.get(ENDPOINTS.FIXTURES);
	}

	static getFixture(id) {
		return Axios.get(ENDPOINTS.FIXTURES + id);
	}

	static getLastAssignment() {
		return Axios.get(ENDPOINTS.LAST_ASSIGNMENT);
	}
}

