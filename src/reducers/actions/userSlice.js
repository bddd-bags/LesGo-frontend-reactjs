import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = `http://localhost:3000/api/users`;

const initialState = {
	data: [],
	loading: true,
	error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
	const token = localStorage.getItem("access_token");

	const response = await axios.get(BASE_URL, {
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
});

export const findUsers = createAsyncThunk("users/findUsers", async (id) => {
	const token = localStorage.getItem("access_token");

	const response = await axios.get(`${BASE_URL}/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});

	return response.data;
});

export const updateUsers = createAsyncThunk(
	"users/updateUsers",
	async ({ id, data }) => {
		const token = localStorage.getItem("access_token");

		const formData = new FormData();
		formData.append("username", data.username);
		formData.append("address", data.address);
		formData.append("age", data.age);
		formData.append("gender", data.gender);
		formData.append("img", data.img);

		const response = await axios.put(`${BASE_URL}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	},
);

const usersSlice = createSlice({
	name: "users",
	initialState,
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload;
		},
		[getUsers.rejected]: (state, action) => {
			state.loading = false;
			state.data = action.error.message;
		},
		[findUsers.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
		},
		[findUsers.rejected]: (state, action) => {
			state.loading = false;
			state.data = action.error.message;
		},
	},
});

export const getAllUsers = (state) => state.user;

export const findOneUsers = (state) => state.user;

export default usersSlice.reducer;
