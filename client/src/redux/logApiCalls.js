import {addLog, deleteActiveLog, editLog, saveEdittedLog} from "./goalRedux";
import {clearActiveDrafts, setActive} from "./logRedux";
import {userRequest} from "../requestMethods";
import {REACT_APP_DEMO_EMAIL} from "../conf";


// TODO: skip request if demouser, check with the server about the correct response to send back to redux
export const sendLog = async (dispatch, log) => {
	try {
		let newLog;
		if (log.user !== REACT_APP_DEMO_EMAIL) {
			newLog = await userRequest().post('api/log', log);
			dispatch(addLog(newLog.data));
		} else {
			newLog = log;
		}
		dispatch(setActive(false));
		dispatch(clearActiveDrafts());
		return newLog;
	} catch (err) {
		return err;
	}
};

export const updateLog = async (dispatch, log) => {
	// console.log("updating log for " + log._id);
	// console.log(log)
	try {
		let newLog;
		if (log.user !== REACT_APP_DEMO_EMAIL) {
			newLog = await userRequest().put(`api/log/${log._id}`, log);
			await dispatch(saveEdittedLog(newLog.data.log));
		} else {
			log._id = Math.random();
			await dispatch(saveEdittedLog(log));
		}
		await dispatch(editLog(false));
		return newLog;
	} catch (err) {
		return err;
	}
};

export const deleteLog = async (dispatch, log) => {
	// console.log(log)
	try {
		if (log.user === REACT_APP_DEMO_EMAIL) {
			const response = await userRequest().post(`api/log/${log._id}`, log);
			if (response.status === 200) {
				await dispatch(deleteActiveLog());
			} else {
				await dispatch(deleteActiveLog());
			}
		}
	} catch (err) {
		return err;

	}
};
