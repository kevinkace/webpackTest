"use strict";

const fs = require("fs"),
    path = require("path"),

    webpack = require("webpack"),
    CssPlugin = require("modular-css-webpack/plugin"),

    entry = "./app/entry.js",
    bundle = "./dist/bundle.js",
    css = "index.css",
    json = "index.json";

console.log("Webpack starting");

webpack({
    entry,
    output : {
        path     : path.resolve(path.parse(bundle).dir),
        filename : path.parse(bundle).base
    },
    module : {
        rules : [{
            test : /\.css$/,
            use  : "modular-css-webpack/loader"
        }]
    },
    plugins : [
        new CssPlugin({
            css,
            json
        })
    ]
}, (err, stats) => {
    console.log("Webpack finished");
    // webpack configuration errors
    if(err) {
        return console.log(err.details || err.stack || err);
    }

    // webpack bundling errors
    if(stats.hasErrors()) {
        return console.log(stats.toJson().errors);
    }
});

