import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

const receiveUsersActionCreator = (users) => ({
  type: ActionType.RECEIVE_USERS,
  payload: { users },
});

const asyncRegisterUser = ({ id, name, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    await api.register({ id, name, password });
  } catch (err) {
    alert(err.message);
  }
  dispatch(hideLoading());
};

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser,
};
