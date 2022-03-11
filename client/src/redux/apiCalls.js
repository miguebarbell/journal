import {loginFailure, loginSuccess, logOut, loginStart} from "./userRedux";
import {publicRequest} from "../requestMethods";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("api/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const register = async (dispatch, user) => {
	try {
		await publicRequest.post("api/auth/register", user);
		login(dispatch, user);
	} catch (err) {
		dispatch(loginFailure());
	}
};
