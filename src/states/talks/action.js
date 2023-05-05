import api from '../../utils/api';

const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

const receiveTalksActionCreator = (talks) => ({
  type: ActionType.RECEIVE_TALKS,
  payload: {
    talks,
  },
});

const addTalkActionCreator = (talk) => ({
  type: ActionType.ADD_TALK,
  payload: {
    talk,
  },
});

const toggleLikeTalkActionCreator = ({ talkId, userId }) => ({
  type: ActionType.TOGGLE_LIKE_TALK,
  payload: {
    talkId, userId,
  },
});

const asyncAddTalk = ({ text, replyTo = '' }) => async (dispatch) => {
  try {
    const talk = await api.createTalk({ text, replyTo });
    dispatch(addTalkActionCreator(talk));
  } catch (err) {
    alert(err.message);
  }
};

const asyncToggleLikeTalk = (talkId) => async (dispatch, getState) => {
  // Line 42 & 43 is for better user experience using "optimistically apply action"
  const { authUser } = getState();
  dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));

  try {
    await api.toggleLikeTalk(talkId);
  } catch (err) {
    alert(err.message);
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id }));
  }
};

export {
  ActionType,
  receiveTalksActionCreator,
  addTalkActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToggleLikeTalk,
};
