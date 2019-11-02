import axios from "axios";
import { MapType } from "./QuestionnaireTypes";

const API = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000
});


export const getHistory = async (user, type) => {

    let data = [];
    let result = undefined;

    switch (MapType(type)) {
        case "Organisational Culture":
            result = await API.get(`getOrganHistoryScore/${user}`);
            data = result.data;
            break;
        case "Work Self Confidence":
            result = await API.get(`getConfidenceHistoryScore/${user}`);
            data = result.data;
            break;
        case "Adjustments":
            result = await API.get(`getAdjusmentsHistory/${user}`);
            data = result.data;
            break;
        case "Mental Health":
            result = await API.get(`getMentalHistoryScore/${user}`);
            data = result.data;
            break;
        default:
            break;
    }
    console.log(data);
    return data;
};