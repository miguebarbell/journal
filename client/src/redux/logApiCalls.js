import {addLog, editLog, saveEdittedLog} from "./goalRedux";
import {clearActiveDrafts, setActive} from "./logRedux";
import {publicRequest} from "../requestMethods";


export const sendLog = async (dispatch, log) => {
	console.log(log);
	try {
		const newLog = await publicRequest.post('api/log', log);
		dispatch(addLog(newLog.data));
		dispatch(setActive());
		dispatch(clearActiveDrafts());
		return newLog;
	} catch (err) {
		return err;
	}
};

export const updateLog = async (dispatch, log) => {
	console.log("updating log for " + log._id);
	try {
		const newLog = await publicRequest.put(`api/log/${log._id}`, log);
		await dispatch(saveEdittedLog(newLog.data.log));
		await dispatch(editLog(false));
		return newLog;
	} catch (err) {
		return err;
	}
};
