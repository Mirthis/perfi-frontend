import axios from 'axios';
import { LinkTokenCreateResponse } from 'plaid';

const baseUrl = '/api/plaid';

const getLinkToken = async () => {
  const response = await axios.post<LinkTokenCreateResponse>(
    `${baseUrl}/create_link_token`,
  );
  return response.data;
};

const getAccessToken = async (public_token: string) => {
  const response = await axios.post(`${baseUrl}/set_access_token`, {
    public_token,
  });
  return response.data;
};

export default { getLinkToken, getAccessToken };
