import { configureStore } from "@reduxjs/toolkit";
import companiesSlice from './actions/companySlice'
import paymentsSlice from "./actions/paymentSlice";
import coursesSlice from "./actions/courseSlice";
import usersSlice from "./actions/userSlice";
import userCoursesSlice from "./actions/userCourseSlice";

export default configureStore({
	reducer: {
		company: companiesSlice,
		payment: paymentsSlice,
		course: coursesSlice,
		user: usersSlice,
		userCourse: userCoursesSlice,
	},
});