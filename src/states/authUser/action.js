import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'SET_AUTH_USER',
};

const setAuthUserActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

const unsetAuthUserActionCreator = () => ({
  type: ActionType.UNSET_AUTH_USER,
  payload: {
    authUser: null,
  },
});

const asyncSetAuthUser = ({ id, password }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const token = await api.login({ id, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();

    dispatch(setAuthUserActionCreator(authUser));
  } catch (err) {
    alert(err.message);
  }
  dispatch(hideLoading());
};

const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(showLoading());
  dispatch(unsetAuthUserActionCreator());
  api.putAccessToken('');
  dispatch(hideLoading());
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
