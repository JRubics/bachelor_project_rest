import {
  API_ROUTE,
  ENVIRONMENTS,
  BACKEND_HOSTNAMES,
} from './constants';

const config = {
  getEnv() {
    return ENVIRONMENTS[window.location.hostname] || 'prod';
  },

  getHostName() {
    return BACKEND_HOSTNAMES[this.getEnv()];
  },

  getApiUrl() {
    return this.getHostName() + API_ROUTE;
  },
};

export { config };

