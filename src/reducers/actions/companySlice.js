import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/companies";

const initialState = {
	data: [],
	loading: true,
	error: null,
};

export const getCompanies = createAsyncThunk(
	"companies/getCompanies",
	async () => {
		// ini hanya response ketika berhasil, jika tidak berhasil maka response akan otomatis dihandle createAsyncThunk?
		const response = await axios.get(BASE_URL);
		// console.log(response.data)
		return response.data;
	},
);

// new code
export const findOneCompanies = createAsyncThunk(
	"companies/findOneCompanies",
	async (id) => {
		// ini hanya response ketika berhasil, jika tidak berhasil maka response akan otomatis dihandle createAsyncThunk?
		const response = await axios.get(`${BASE_URL}/${id}`);
		return response.data;
	},
);
// end code

export const companyPartners = createAsyncThunk(
	"companies/companyPartner",
	async () => {
		const token = localStorage.getItem("access_token");

		const response = await axios.get(`${BASE_URL}/partners`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	},
);

export const createCompany = createAsyncThunk(
	"companies/createCompany",
	async (data) => {
		const token = localStorage.getItem("access_token");

		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("phone", data.phone);
		formData.append("address", data.address);
		formData.append("img", data.img);

		const response = await axios.post(`${BASE_URL}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	},
);

export const approvedCompany = createAsyncThunk(
	"companies/updateApproved",
	async (data) => {
		const token = localStorage.getItem("access_token");
		// console.log(data)

		const response = await axios.put(
			`${BASE_URL}/${data.id}`,
			{ is_approved: data.approved },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			},
		);

		return response.data;
	},
);

export const updateCompany = createAsyncThunk(
	"companies/updateCompany",
	async ({ form, companyId }) => {
		const token = localStorage.getItem("access_token");

		const formData = new FormData();
		formData.append("name", form.name);
		formData.append("description", form.description);
		formData.append("phone", form.phone);
		formData.append("address", form.address);
		formData.append("img", form.img);

		const response = await axios.put(`${BASE_URL}/${companyId}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	},
);

const companiesSlice = createSlice({
	name: "companies",
	initialState,
	extraReducers: {
		[getCompanies.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
			// console.log(state.data)
		},
		[getCompanies.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		// new code
		[findOneCompanies.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
		},
		[findOneCompanies.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		// end code
		// companyPartner
		[companyPartners.fulfilled]: (state, action) => {
			state.loading = false;
			state.data = action.payload.data;
		},
		[companyPartners.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		// endCompanyPartner
	},
});

export const getAllCompanies = (state) => state.company;

// new code
export const findOne = (state) => state.company;
// end code

// companyPartners
export const getCompanyPartner = (state) => state.company;
// end companyPartners

export default companiesSlice.reducer;
