import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = `http://localhost:3000/api/users/courses`;

const initialState = {
	data: [],
	loading: true,
	error: null,
};

export const getUserCourses = createAsyncThunk(
	"userCourses/getUserCourses",
	async () => {
		const token = localStorage.getItem("access_token");

		const response = await axios.get(BASE_URL, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

export const createUserCourses = createAsyncThunk(
	"userCourses/createUserCourses",
	async (data) => {
		const token = localStorage.getItem("access_token");
		console.log(data);

		const response = await axios.post(`${BASE_URL}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

export const updateUserCourses = createAsyncThunk(
	"userCourses/updateUserCourses",
	async ({ id, approved }) => {
		const token = localStorage.getItem("access_token");

		const response = await axios.put(
			`${BASE_URL}/${id}`,
			{ is_approved: approved },
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);

		return response.data;
	},
);

export const deleteUserCourses = createAsyncThunk(
	"userCourses/deleteUserCourses",
	async (id) => {
		const token = localStorage.getItem("access_token");
		console.log(id);
		const response = await axios.delete(`${BASE_URL}/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

const userCoursesSlice = createSlice({
	name: "userCourses",
	initialState,
	extraReducers: {
		[getUserCourses.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
		},
		[getUserCourses.rejected]: (state, action) => {
			state.loading = false;
			state.data = action.error.message;
		},
	},
});

export const getAllUserCourses = (state) => state.userCourse;

export default userCoursesSlice.reducer;
