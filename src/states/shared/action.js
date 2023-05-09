import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsers } from '../users/action';

const asyncPopulateUsersAndTalks = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const users = await api.getAllUsers();
    const talks = await api.getAllTalks();

    dispatch(receiveUsers(users));
    dispatch(receiveTalksActionCreator(talks));
  } catch (err) {
    alert(err.message);
  }
  dispatch(hideLoading());
};

export { asyncPopulateUsersAndTalks };
