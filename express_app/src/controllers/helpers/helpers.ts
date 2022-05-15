import {IJsonMessage} from "./interfaces";


export const fullTrim = (str: string) => {
    return str.replace(/ +/g, ' ').trim();
}

export const instanceOfIJsonMessage = (jsonObject: any): jsonObject is IJsonMessage => {
    return 'error' in jsonObject;
}

export const createTimeStamp = (date: string) => {
    const utcString = new Date(date).toUTCString();
    return Date.parse(utcString) / 1000;
}