export const UserAction = {
  LoginSuccess: "Login",
  Logout: "Logout",
};
//User Login
export const LoginSuccess = (user) => ({
  type: UserAction.LoginSuccess,
  payload: user,
});

export const Logout = () => ({ type: UserAction.Logout });
