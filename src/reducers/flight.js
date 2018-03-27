import { SERVER_RESPONSE } from '../actions/send';
import { mapKeys } from 'lodash-es';

export default function (state = {}, action) {
  switch (action.type) {
    case SERVER_RESPONSE:
      return mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}