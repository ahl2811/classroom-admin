import { request } from "./utils";

export const login = async ({ email, password }) => {
  const { data } = await request.post("/auth/signin", { email, password });
  return data;
};
