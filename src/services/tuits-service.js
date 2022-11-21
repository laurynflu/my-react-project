import axios from "axios";
const BASE_URL = "http://localhost:3000/api"
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;

export const findAllTuits = async() => {
    const res = await axios.get(TUITS_API)
    return res.data
}

export const findTuitById = async (tid) => {
    const url = TUITS_API + "/" + tid
    const res = await axios.get(url)
    return res.data
}

export const findTuitByUser = async (uid) => {
    const targetUrl = BASE_URL + `/api/users/${uid}/tuits`
    const res = await axios.get(targetUrl)
    return res.data
}

export const createTuit = async (uid, tuit) => {
    const url = `${USERS_API}/${uid}/tuits`
    const resp = await axios.post(url, tuit)
    return resp.data
}

export const updateTuit = (tid, tuit) =>
  axios.post(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = async (tid) => {
    const targetUrl = `${TUITS_API}/${tid}`
    const resp = await axios.delete(targetUrl)
    return resp.data
}
