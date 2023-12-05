import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

// ======== Add project ============
export const addUser = (values) => {
  return axios.post(`/users/add-user`, values);
};
export const addTestimonial = (values) => {
  return axios.post(`users/add-testimonial`, values);
};
export const allTestimonial = async () => {
  try {
    const response = await axios.post(`/users/all-testimonial`);
    return response;
  } catch (err) {
    return err;
  }
};
const loginUser = async (values) => {
  try {
    const response = await axios.post(`/checkUser`, values);
    return response;
  } catch (err) {
    return err;
  }
};
export const getLoginCheck = async () => {
  try {
    const response = await axios.get(`/loginCheck`);
    return response;
  } catch (err) {
    return err;
  }
};

export const AddUserData = () => {
  const navigate = useNavigate();
  return useMutation(addUser, {
    onSuccess: () => {
      navigate("/login");
    },
  });
};
export const AddTestimonialData = () => {
  return useMutation(addTestimonial);
};
export const UserLogin = () => {
  return useMutation(loginUser);
};
