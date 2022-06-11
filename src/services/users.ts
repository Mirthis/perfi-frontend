import axios from 'axios';

const baseUrl = '/api/users';

// TODO: sourt out error handling
const signup = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${baseUrl}`, credentials);
  return response.data;
};

const usersService = {
  signup,
};

export default usersService;
