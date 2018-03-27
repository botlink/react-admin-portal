import axios from 'axios';

export const SERVER_RESPONSE = 'server_response';

const ROOT_URL = 'http://localhost:3001';

export function submitFlight(props, callback) {
  const { flightId } = props;
  const url = `${ROOT_URL}/flights/${flightId}/retile`;
  const request = axios.post(url, { flightId })
    .then(() => callback());

  return {
    type: SERVER_RESPONSE,
    payload: request
  }
}
