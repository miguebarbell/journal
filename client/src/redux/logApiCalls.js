import {addLog} from "./goalRedux";
import {clearActiveDrafts, setActive} from "./logRedux";
import {publicRequest} from "../requestMethods";


export const sendLog = async (dispatch, log) => {
	console.log(log);
	try {
		const newLog = await publicRequest.post('api/log', log);
		dispatch(addLog(log));
		dispatch(setActive());
		dispatch(clearActiveDrafts());
		return newLog;
	} catch (err) {
		return err;
	}

};
