import { getAuthorization, request } from "./utils";

export const SortType = {
  Desc: "Desc",
  Asc: "Asc",
};

export const getClassrooms = async ({ page = 1, search = null }) => {
  let queryString = `/classrooms?page=${page}&limit=10`;
  if (search) {
    queryString += `&search=${search}`;
  }
  const { data } = await request.get(`${queryString}`, getAuthorization());
  return data;
};
