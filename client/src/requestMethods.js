import axios from 'axios';

const BASE_URL = "http://73.100.97.89:8082"; // LIVE SERVER
// const BASE_URL = "http://192.168.0.6:8082"; // LIVE SERVER
// const BASE_URL = "http://192.168.0.6:5000"; // LIVE SERVER
// const BASE_URL = "https://journal-debloat.herokuapp.com:443/"; // LIVE SERVER
// const BASE_URL = "http://localhost:5000/"; // DEVELOPMENT SERVER
// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const userRequest = () => {
	const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
	const currentUser = user && JSON.parse(user).currentUser;
	const TOKEN = currentUser?.accessToken;
	return axios.create(
		{
			baseURL: BASE_URL,
			headers: {token: `Bearer ${TOKEN}`}
		}
	);
}

export const publicRequest = axios.create(
	{
		baseURL: BASE_URL,
	}
);
