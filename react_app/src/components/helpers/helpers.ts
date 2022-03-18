declare global {
    interface String {
        toTitle(): string
        fullTrim(): string
    }
}

String.prototype.toTitle = function () {
    return this.toLowerCase().replace(/(^|\s)\S/g, function (char) {
        return char.toUpperCase();
    });
};

export {}