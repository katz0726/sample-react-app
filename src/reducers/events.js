import _ from 'lodash';
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from '../actions';

// 各アクションごとのレスポンス情報の加工、返却を行う
const events = (events = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response.data
      return { ...events, [data.id]: data }
    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENT:
      delete events[action.id]
      return { ...events }
    default:
      return events
  }
}

export default events;