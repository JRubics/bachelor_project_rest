/*
 * router.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Vue from 'vue';
import Router from 'vue-router';

import Index from './components/index.component';
import Login from './components/auth/login.component';
import Signup from './components/auth/signup.component';
import UploadFile from './components/upload-file.component';
import Assignments from './components/assignments.component';
import Home from './components/home.component';

import AuthController from './controllers/auth.controller';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
			meta: {
				guest: true,
				// moze ako nisilogovan
			},
		},
		{
			path: '/upload-file',
			name: 'upload-file',
			component: UploadFile,
		},
		{
			path: '/home',
			name: 'home',
			component: Home,
		},
		{
			path: '/assignments',
			name: 'assignments',
			component: Assignments,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				guest: true,
			},
		},
		{
			path: '/signup',
			name: 'signpu',
			component: Signup,
			meta: {
				guest: true,
			},
		},
		{
			path: '/logout',
			name: 'logout',
		},
	],
});

router.isCurrentRoute = (routeName) => {
	return router.currentRoute.name === routeName;
};

router.beforeEach((to, from, next) => {
	if (to.name === 'logout') {
		AuthController.logout();
		return next({ name: 'login' });
	}

	if (!to.meta.guest && !AuthController.getAuthStatus()) {
		return next({ name: 'login' });
	}

	return next();
});

export default router;
