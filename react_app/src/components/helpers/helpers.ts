export const toTitle = (str: string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    })
};