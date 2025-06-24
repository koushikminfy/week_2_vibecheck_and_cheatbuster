// API Service - Clean separation of concerns
class ApiService {
  constructor(baseURL = '/api') {
    this.baseURL = baseURL;
  }

  async searchUserByEmail(email) {
    const response = await axios.get(`${this.baseURL}/users/search?email=${encodeURIComponent(email)}`);
    return response.data;
  }

  async searchUserByName(name) {
    const response = await axios.get(`${this.baseURL}/users/search?name=${encodeURIComponent(name)}`);
    return response.data;
  }

  async getAllUsers() {
    const response = await axios.get(`${this.baseURL}/users`);
    return response.data;
  }
}

// Create and export a singleton instance
const apiService = new ApiService();

// Export functions for easier usage
const searchUserByEmail = (email) => apiService.searchUserByEmail(email);
const searchUserByName = (name) => apiService.searchUserByName(name);
const getAllUsers = () => apiService.getAllUsers();