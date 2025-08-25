const AWS_API_BASE_URL =
  'https://1vqxtaxze2.execute-api.ap-southeast-1.amazonaws.com/dev';

export const AWS_CHIME_API = {
  meeting: {
    create: AWS_API_BASE_URL + '/create-meeting',
    join: AWS_API_BASE_URL + '/join-meeting',
    get: AWS_API_BASE_URL + '/get-meeting',
  },
};
