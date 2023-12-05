import { useMutation, useQueryClient } from "react-query";
import axios from "../api/axios";

// ======== Add project ============
export const addProject = (values) => {
  console.log(values);
  return axios.post(`/projects/add-project`, values);
};
export const updateProject = async (values) => {
  console.log(values);
  const id = values.formId;
  try {
    const response = await axios.post(`/projects/update-project/${id}`, values);
    return response;
  } catch (err) {
    return err;
  }
};

export const allProject = async () => {
  try {
    const response = await axios.post(`/projects/all-project`);
    return response;
  } catch (err) {
    return err;
  }
};
export const singleProject = async (projectId) => {
  console.log(projectId);
  try {
    const response = await axios.post(`/projects/project/${projectId}`);
    return response;
  } catch (err) {
    return err;
  }
};

export const DeleteProject = async (id) => {
  try {
    const res = await axios.delete(`/projects/delete-project/${id}`);

    return res;
  } catch (err) {
    return err;
  }
};

export const AddProjectData = () => {
  return useMutation(addProject);
};
export const UpdateProjectData = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProject, {
    onSuccess: () => {
      return queryClient.invalidateQueries("projects");
    },
  });
};
