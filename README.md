# lucidtask [![Build Status](https://travis-ci.org/fawind/lucidtask.svg?branch=master)](https://travis-ci.org/fawind/lucidtask)
Minimal to-do list based on Google Tasks. Built using React/Redux. Heavily inspired by [Clear](http://realmacsoftware.com/clear/).

<p align="center">
  <img height="400" src="https://cloud.githubusercontent.com/assets/7422050/19022122/d12bdc44-88d0-11e6-9332-9738bab301a7.gif" alt="LucidTask"/>
</p>

## Development

LucidTask uses GoogleTasks as a backend. In order to run your own version, you have to [create an API account](https://developers.google.com/identity/sign-in/web/devconsole-project) and fill in your client ID in the `config.js` file.

```
# Install dependencies
npm install

# Run dev server
npm start

# Run test suite
npm test

# Compile and minify
npm build

# Deploy to appengine
npm deploy
```

## Issues

If you find any bugs, please open a [new issue](https://github.com/fawind/lucidtask/issues). Pull requests are always welcome!
