export const USER_LOGIN = {
  LOGIN: {'user': 'jramonj', 'pass': '123456'},
  CREATE: {'name': 'Ramón', 'surname': 'Dos Jotas', 'birthDate': '1998-01-10', 'user': 'jramonj', 'pass': '123456'}
};

export const URLS_USER = {
  LOGIN: 'users/login',
  BASE: 'users',
  FRIEND_RS: 'friendsRelationship',
  PENDING_RS: 'pendingRelationship',
  BASE_RS: 'relationship',
  SEARCH: 'users/search?value=',
  INVITE_FRIEND: 'inviteFriend?idFriend='
};

export const URLS_MESSAGE = {
  MESSAGES_POST: 'messages',
  ALL_MESSAGES_USER: 'messages/user'
};

export const URLS_EVENTS = {
  BASE: 'events',
  GET_BY_USER: 'events/user',
  YES_ASSISTANCE: 'yesAssistance',
  NOT_ASSISTANCE: 'notAssistance',
  ASSISTANCE_USER: '?user=',
  UPDATE_SCHEDULED_STATE: 'events/refreshEventState'
};
