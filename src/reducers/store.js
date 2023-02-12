import { configureStore } from "@reduxjs/toolkit";
import companiesSlice from './actions/companySlice'
import paymentsSlice from "./actions/paymentSlice";
import coursesSlice from "./actions/courseSlice";

export default configureStore({
  reducer: {
    company: companiesSlice,
    payment: paymentsSlice,
    course: coursesSlice
  }
})