# road-so-far-app

Progressive app for Road So Far

### Getting Started

Compile and launch your app by running:

```shell
$ yarn start                    # Compiles the app and opens it in a browser with "live reload"
```

You can also test your app in release (production) mode by running `yarn start -- --release` or
with HMR and React Hot Loader disabled by running `yarn start -- --no-hmr`. The app should become
available at [http://localhost:8080/](http://localhost:8080/).


### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ yarn lint                     # Check JavaScript and CSS code for potential issues
$ yarn test                     # Run unit tests. Or, `yarn run test:watch`
```


### How to Deploy

Update `publish` script in the [`tools/publish.js`](tools/publish.js) file with your full Firebase
project name as found in your [Firebase console](https://console.firebase.google.com/). Note that
this may have an additional identifier suffix than the shorter name you've provided. Then run:

```shell
$ yarn publish                  # Builds and deployes the app to Firebase
```

The first time you publish, you will be prompted to authenticate with Google and generate an
authentication token in order for the publish script to continue.

![publish](https://koistya.github.io/files/react-static-boilerplate-publish.gif)

If you need to build the project without publishing it, simply run:

```shell
$ yarn build                    # Compiles the app into the /public/dist folder
```
