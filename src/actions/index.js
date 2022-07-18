import axios from 'axios';

// event type
export const READ_EVENTS = 'READ_EVENTS';
export const READ_EVENT = 'READ_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1';
const QUERYSTRING = '?token=token123';

/**
 * Action Creators
 * 
 * APIサーバへのリクエスト後にresponseを返却する
 */

// 一覧表示
export const readEvents = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  dispatch({ type: READ_EVENTS, response });
};

// 登録
export const postEvent = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispatch({ type: CREATE_EVENT, response });
};

// 更新
export const putEvent = values => async dispatch => {
  const response = await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values)
  dispatch({ type: UPDATE_EVENT, response })
}

// 詳細表示
export const getEvent = id => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  dispatch({ type: READ_EVENT, response })
}

// 削除
export const deleteEvent = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
  dispatch({ type: DELETE_EVENT, id })
}