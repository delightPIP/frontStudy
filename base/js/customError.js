"use strict"

class CustomError extends Error {
    constructor(status, statusText, url) {
        super(`${status}, ${statusText}, ${url}`);

        this.status = status;
        this.statusText = statusText;
        this.url = url;
    }

    get name() {
        return "CustomError";
    }
}

// let error = new CustomError(404, "message", "/error.jsp");
