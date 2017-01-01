var webpack = require("webpack"); // we pull in Webpack
var path = require("path"); // we pull in 'path' which is the default NodeJS library, globally available once we install NodeJS. It basically allows to resolve the path of our applicaiton.

var DIST_DIR = path.resolve(__dirname, "dist"); // we set up our Distribution directory, the directory where we want to copy all our transpiled, prepared and bundled files to. the directory from which we'll actually serve our app. We use the 'path' package. '__dirname' is a global variable and 'dist' is a folder. Bottom line, this line means: copy everything which has been prepared for serving it, into the 'dist' folder, which doesn't exist yet but will be created automatically.

var SRC_DIR = path.resolve(__dirname, "src"); // tells Webpack where to find the un-transpiled source code, namely in the 'src' folder

var config = { // JS object that holds the Webpack configuration, and will be exported thereafter. Webpack will then pull in this object, read it and configure itself accordingly
  entry: SRC_DIR + "/app/index.js", // the entry point tell Webpack which file is the first file it should start transpiling and bundling. Webpack's logic is that the project has one or multiple entry files, and then it looks on the dependencies of these files (ie the 'import' statements at the top) and pulls in these imports, ie it builds up a bundle starting at some entry point and then bundles all the required imports; it automatically also makes sure that they are all put in the right order. In this case, we are only using 1 entry point, our source directory, and then a file we have yet to create in the 'app' folder, our root file aka the file that starts our application.
  output: { // tells Webpack where to output everything
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/" // the folder where we'd output in a REAL server. Note: our app lives in the 'app' folder
  },
  module: { // we define in this object all the modules that we want to use in the Webpack process
    loaders: [ // with 'entry' and 'output' we already bundle everything but don't transpile ES6 to ES5; this last thing we set up in the module object. 'module' doesn't need to be specified provided that we don't have to transpile (change) anything
      {
        test: /\.js?/, // the 'test' key tells Webpack which files should it look upon regarding this loader
        include: SRC_DIR, // the 'include' key say which files should be scanned for such files
        loader: "babel-loader", //the actual loader, the one we pulled via NPM
        query: { // the 'query' key is a JS object with some presets
          presets: ["react", "es2015", "stage-2"]
        }
      }
    ]
  }
};

module.exports = config;
