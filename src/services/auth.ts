import axios from 'axios';

const baseUrl = '/api/auth';

// TODO: sourt out error handling
const login = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

// TODO: sourt out error handling
const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`);
  return response;
};

const loginService = {
  login,
  logout,
};

export default loginService;
