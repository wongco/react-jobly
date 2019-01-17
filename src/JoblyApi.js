import axios from 'axios';

class JoblyApi {
  static async request(endpoint, params = {}, verb = 'GET') {
    // params._token = // for now, hardcode token for "testuser"
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6' +
    //   'InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDE1N' +
    //   'jQ2Nzl9.LYDHSkl81gEm7jfHv9wJhzD4ndpuBkSzBan8Nirb6UY';
    params._token = JSON.parse(localStorage.getItem('token'));
    console.debug('API Call:', endpoint, params, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === 'GET' ? 'params' : 'data']: params
      })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Company route ajax requests */
  static async getCompany({ handle }) {
    let apiResponse = await JoblyApi.request(`companies/${handle}`);
    return apiResponse.company;
  }

  static async getCompanies(dataObj = {}) {
    // dataObj, single param search
    let apiResponse = await JoblyApi.request(`companies/`, dataObj);
    return apiResponse.companies;
  }

  /** Job route ajax requests */
  static async getJob({ id }) {
    let apiResponse = await JoblyApi.request(`jobs/${id}`);
    return apiResponse.job;
  }

  static async getJobs(dataObj = {}) {
    let apiResponse = await JoblyApi.request(`jobs/`, dataObj);
    return apiResponse.jobs;
  }

  /** Base route ajax requests */
  static async loginUser(userDetails = {}) {
    // userDetails props: username, password
    let apiResponse = await JoblyApi.request(`login`, userDetails, 'POST');
    return apiResponse.jobs;
  }

  /** User route ajax requests */
  static async createUser(userDetails = {}) {
    // userDetails props: username, password, firstname, lastname, email, photo_url Opt: isAdmin
    let apiResponse = await JoblyApi.request(`users/`, userDetails, 'POST');
    return apiResponse.job;
  }

  static async getUser({ username }) {
    let apiResponse = await JoblyApi.request(`users/${username}`);
    return apiResponse.jobs;
  }

  static async updateUser({ username, ...userDetails }) {
    // userDetails: firstname, lastname, email, photo_url
    let apiResponse = await JoblyApi.request(
      `users/${username}`,
      userDetails,
      'PATCH'
    );
    return apiResponse.jobs;
  }
}

export default JoblyApi;
