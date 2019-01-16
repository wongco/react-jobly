import axios from 'axios';

class JoblyApi {
  static async request(endpoint, params = {}, verb = 'GET') {
    console.debug('API Call:', endpoint, params, verb);

    params._token = // for now, hardcode token for "testuser"
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6' +
      'InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDE1N' +
      'jQ2Nzl9.LYDHSkl81gEm7jfHv9wJhzD4ndpuBkSzBan8Nirb6UY';

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        params
      })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Company route ajax requests */
  static async getCompany({ handle }) {
    let apiResponse = await this.request(`companies/${handle}`);
    return apiResponse.company;
  }

  static async getCompanies() {
    let apiResponse = await this.request(`companies/`);
    return apiResponse.companies;
  }

  /** Job route ajax requests */
  static async getJob({ id }) {
    let apiResponse = await this.request(`jobs/${id}`);
    return apiResponse.job;
  }

  static async getJobs() {
    let apiResponse = await this.request(`jobs/`);
    return apiResponse.jobs;
  }

  /** Base route ajax requests */
  static async loginUser(userDetails) {
    // userDetails props: username, password
    let apiResponse = await this.request(`/login`, userDetails, 'POST');
    return apiResponse.jobs;
  }

  /** User route ajax requests */
  static async createUser(userDetails) {
    // userDetails props: username, password, firstname, lastname, email, photo_url Opt: isAdmin
    let apiResponse = await this.request(`users/`, userDetails, 'POST');
    return apiResponse.job;
  }

  static async getUser({ username }) {
    let apiResponse = await this.request(`users/${username}`);
    return apiResponse.jobs;
  }

  static async updateUser({ username, ...userDetails }) {
    // userDetails: firstname, lastname, email, photo_url
    let apiResponse = await this.request(
      `users/${username}`,
      userDetails,
      'PATCH'
    );
    return apiResponse.jobs;
  }
}
