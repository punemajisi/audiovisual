import axios from 'axios';
let base = 'http://localhost:3000';
export const getVideos = params => { return axios.get(`${base}/available_videos`, { params: params }); };
export const uploadResult = params => { return axios.post(`${base}/upload_result`, params).then(res => res.data); };
