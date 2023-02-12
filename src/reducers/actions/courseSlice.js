import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = `http://localhost:3000/api/courses`

const initialState = {
  data: [],
  loading: true,
  error: null
}

export const createCourses = createAsyncThunk('courses/createCourses', async({data}) => {
  const token = localStorage.getItem('access_token')
  console.log(data)
  const formData = new FormData();
  formData.append('company_id', data.company_id)
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('price', data.price)
  formData.append('quota', data.quota)
  formData.append('start_date', data.start_date)
  formData.append('end_date', data.end_date)
  formData.append('img', data.img)

  const response = await axios.post(`${BASE_URL}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
})

export const updateCourses = createAsyncThunk('courses/updateCourses', async({data, courseId}) => {
  const token = localStorage.getItem('access_token')
  
  const formData = new FormData();
  formData.append('company_id', data.company_id)
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('price', data.price)
  formData.append('quota', data.quota)
  formData.append('start_date', data.start_date)
  formData.append('end_date', data.end_date)
  formData.append('img', data.img)

  const response = await axios.put(`${BASE_URL}/${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
})

export const statusCourses = createAsyncThunk('courses/statusCourses', async({is_active, id}) => {
  const token = localStorage.getItem('access_token')
  
  const response = await axios.put(`${BASE_URL}/${id}`, {is_active}, {headers: {Authorization: `Bearer ${token}`}})

  return response.data
})

export const findCourses = createAsyncThunk('courses/findCourses', async(courseId) => {
  const token = localStorage.getItem('access_token');

  const response = await axios.get(`${BASE_URL}/${courseId}`, {headers: {Authorization: `Bearer ${token}`}})

  return response.data
})

export const deleteCourses = createAsyncThunk('courses/deleteCourses', async(id) => {
  const token = localStorage.getItem('access_token');

  const response = await axios.delete(`${BASE_URL}/${id}`, {headers: {Authorization: `Bearer ${token}`}})

  return response.data;
})

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  extraReducers: {
    [findCourses.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data
    },
    [findCourses.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

export const findOneCourses = (state) => state.course

export default coursesSlice.reducer