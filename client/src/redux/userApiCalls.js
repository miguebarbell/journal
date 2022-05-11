import {loginFailure, loginSuccess, loginStart} from "./userRedux";
import {publicRequest} from "../requestMethods";
import {setLogs, setGoals} from "./goalRedux";


// user calls
export const login = async (dispatch, user) => {

	dispatch(loginStart());
	try {
		const res = await publicRequest.post("api/auth/login", user);
		dispatch(loginSuccess(res.data.user));
		dispatch(setGoals(res.data.goals));
		dispatch(setLogs(res.data.logs));
	} catch (err) {
		console.log(err);
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

export const edit = async (dispatch, user) => {

	try{
		await publicRequest.put("api/auth/", {user});
	} catch (err) {
		console.log(err);
	}
};
