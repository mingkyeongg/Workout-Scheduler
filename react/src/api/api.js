import axios from 'axois';
const API = axios.create();

export const scheduleData = () => API.get("/api/schedule/");
export const scheduleCreate = ((id,title, location) => API.post("/api/schedule/", {
id: id,
title: title,
location: location
}));