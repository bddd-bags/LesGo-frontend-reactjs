import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/payments";

const initialState = {
	data: [],
	loading: true,
	error: null,
};

export const createPayments = createAsyncThunk(
	"payments/createPayments",
	async (data) => {
		const { provider_service, account_number, name, companyId } = data;
		const token = localStorage.getItem("access_token");

		const response = await axios.post(
			`${BASE_URL}`,
			{ provider_service, account_number, name, company_id: companyId },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return response.data;
	},
);

export const findPayments = createAsyncThunk(
	"payments/findPayments",
	async ({ paymentId }) => {
		const token = localStorage.getItem("access_token");

		const response = await axios.get(`${BASE_URL}/${paymentId}`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

export const updateUserPayments = createAsyncThunk(
	"payments/createUserPayments",
	async (id) => {
		const token = localStorage.getItem("access_token");
		console.log(`${BASE_URL}/pay/${id}`);
		console.log(`Bearer ${token}`);
		const response = await axios.put(`${BASE_URL}/pay/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

export const deletePayments = createAsyncThunk(
	"payments/deletePayments",
	async (id) => {
		const token = localStorage.getItem("access_token");

		const response = await axios.delete(`${BASE_URL}/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

export const updatePayments = createAsyncThunk(
	"payments/updatePayments",
	async ({ data, id }) => {
		const token = localStorage.getItem("access_token");

		const response = await axios.put(`${BASE_URL}/${id}`, data, {
			headers: { Authorization: `Bearer ${token}` },
		});

		return response.data;
	},
);

const paymentsSlice = createSlice({
	name: "payments",
	initialState,
	extraReducers: {
		[findPayments.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
		},
		[findPayments.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
			console.log(action);
		},
	},
});

export const findOnePayments = (state) => state.payment;

export default paymentsSlice.reducer;
