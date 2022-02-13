import {IJsonMessage} from "./interfaces";

String.prototype.toTitle = function () {
    return this.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });
};

String.prototype.fullTrim = function () {
    return this.replace(/\s\s+/g, ' ').trim();
}

export const instanceOfIJsonMessage = (jsonObject: any): jsonObject is IJsonMessage => {
    return 'error' in jsonObject;
}