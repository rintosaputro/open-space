import api from '../../utils/api';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsers } from '../users/action';

const asyncPopulateUsersAndTalks = () => async (dispatch) => {
  try {
    const users = await api.getAllUsers();
    const talks = await api.getAllTalks();

    dispatch(receiveUsers(users));
    dispatch(receiveTalksActionCreator(talks));
  } catch (err) {
    alert(err.message);
  }
};

export { asyncPopulateUsersAndTalks };
