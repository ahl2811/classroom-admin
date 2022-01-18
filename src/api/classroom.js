import { getAuthorization, request } from "./utils";

export const getClassrooms = async ({ page = 1, search = null }) => {
  let queryString = `/classrooms?page=${page}&limit=10`;
  if (search) {
    queryString += `&search=${search}`;
  }
  const { data } = await request.get(`${queryString}`, getAuthorization());
  return data;
};

export const getClassDetail = async (id) => {
  const { data } = await request.get(`/classrooms/${id}`, getAuthorization());
  return data;
};
