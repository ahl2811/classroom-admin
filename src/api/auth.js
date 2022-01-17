import { request } from "./utils";

export const login = async ({ email, password }) => {
  const { data } = await request.post("/auth/signin", { email, password });
  return data;
};

export const addPassword = async ({ password, token }) => {
  return await request.patch("/auth/password", { password, token });
};

export const validateToken = async (token) => {
  return await request.get(`/auth/validate-token?token=${token}`);
};
