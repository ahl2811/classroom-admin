import { getAuthorization, request } from "./utils";

export const getUsers = async ({ page = 1, search = null }) => {
  let queryString = `/user/all?page=${page}&limit=10`;
  if (search) {
    queryString += `&search=${search}`;
  }
  const { data } = await request.get(`${queryString}`, getAuthorization());
  return data;
};

export const updateUserStatus = async ({ userId, status }) => {
  return await request.patch(`/user/${userId}`, { status }, getAuthorization());
};

export const updateStudentId = async ({ userId, studentId }) => {
  return await request.patch(
    `/user/${userId}`,
    { studentId },
    getAuthorization()
  );
};
