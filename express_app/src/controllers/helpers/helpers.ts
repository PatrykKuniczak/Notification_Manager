import {IJsonMessage} from "./interfaces";


export const toTitle = (str: string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });
};

export const fullTrim = (str: string) => {
    return str.replace(/ +/g, ' ').trim();
}

export const instanceOfIJsonMessage = (jsonObject: any): jsonObject is IJsonMessage => {
    return 'error' in jsonObject;
}