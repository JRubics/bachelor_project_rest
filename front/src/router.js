/*
 * router.js
 * Copyright (C) 2019 pavle <pavle.portic@tilda.center>
 *
 * Distributed under terms of the BSD-3-Clause license.
 */

import Vue from 'vue';
import Router from 'vue-router';

import store from './store';
import Index from './components/index.component';
import Login from './components/auth/login.component';
import Signup from './components/auth/signup.component';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup,
			meta: {
				guest: true,
			},
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
			path: '/logout',
			name: 'logout',
		},
	],
});

router.isCurrentRoute = (routeName) => {
	return router.currentRoute.name === routeName;
};

router.beforeEach((to, from, next) => {
	store.dispatch('clearAuthErrors');
	store.dispatch('clearErrors');

	if (to.name === 'logout') {
		store.dispatch('logout');
		return next({ name: 'login' });
	}

	if (!to.meta.guest && !store.getters.authStatus) {
		return next({ name: 'login' });
	}

	if (to.meta.guest && store.getters.authStatus) {
		return next({ name: 'index' });
	}

	return next();
});

export default router;
