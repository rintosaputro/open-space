import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

const receiveUsers = (users) => ({
  type: ActionType.RECEIVE_USERS,
  payload: { users },
});

const asyncRegisterUser = ({ id, name, password }) => async () => {
  try {
    await api.register({ id, name, password });
  } catch (err) {
    alert(err.message);
  }
};

export {
  ActionType,
  receiveUsers,
  asyncRegisterUser,
};
