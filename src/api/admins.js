import { getAuthorization, request } from "./utils";

export const getAdmins = async ({ page = 1, search = null }) => {
  let queryString = `/user/admin?page=${page}&limit=10`;
  if (search) {
    queryString += `&search=${search}`;
  }
  const { data } = await request.get(`${queryString}`, getAuthorization());
  return data;
};

export const addAdmin = async ({ email, name }) => {
  return await request.post(`/user/admin`, { email, name }, getAuthorization());
};
