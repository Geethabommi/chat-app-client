export const host = () => {
  let hostvar =
    process.env.environment == 'prod'
      ? 'https://chat-area-server.herokuapp.com/'
      : 'http://localhost:5000';
  return hostvar;
};
export const loginRoute = `${host()}/api/auth/login`;
export const registerRoute = `${host()}/api/auth/register`;
export const logoutRoute = `${host()}/api/auth/logout`;
export const allUsersRoute = `${host()}/api/auth/allusers`;
export const sendMessageRoute = `${host()}/api/messages/addmsg`;
export const recieveMessageRoute = `${host()}/api/messages/getmsg`;
export const setAvatarRoute = `${host()}/api/auth/setavatar`;
