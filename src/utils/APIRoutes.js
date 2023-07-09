export const host = () => {
  console.log('env', process.env);
  let hostvar =
    process.env.REACT_APP_ENV == 'development'
      ? 'http://localhost:5000'
      :  'https://chatarea-app-server.onrender.com';
  return hostvar;
};
export const loginRoute = `${host()}/api/auth/login`;
export const registerRoute = `${host()}/api/auth/register`;
export const logoutRoute = `${host()}/api/auth/logout`;
export const allUsersRoute = `${host()}/api/auth/allusers`;
export const sendMessageRoute = `${host()}/api/messages/addmsg`;
export const recieveMessageRoute = `${host()}/api/messages/getmsg`;
export const setAvatarRoute = `${host()}/api/auth/setavatar`;
