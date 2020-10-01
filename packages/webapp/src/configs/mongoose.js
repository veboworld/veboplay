"use strict";
exports.__esModule = true;
exports["default"] = {
    url: process.env.MONGOOSE_URL || null,
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};
