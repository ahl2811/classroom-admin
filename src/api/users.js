import { getAuthorization, request } from "./utils";

export const getUsers = async ({ page = 1, search = null }) => {
  let queryString = `/user/all?page=${page}&limit=10`;
  if (search) {
    queryString += `&search=${search}`;
  }
  const { data } = await request.get(`${queryString}`, getAuthorization());
  return data;
};
