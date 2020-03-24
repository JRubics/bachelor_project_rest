/*
 * perk.api.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Axios from 'axios';

const ENDPOINTS = {
	ASSIGNMENTS: '/students/assignments/',
	FIXTURES: '/students/fixtures/',
};

export default class StudentsApi {
	static uploadFile(data) {
		const formData = new FormData();
		formData.append('file', data.file);
		formData.append('fixture_id', data.fixture_id);
		return Axios.post(ENDPOINTS.ASSIGNMENTS, formData);
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

	static checkResults(assignment_id) {
		return Axios.get(`${ENDPOINTS.ASSIGNMENTS}${assignment_id}`);
	}
}
