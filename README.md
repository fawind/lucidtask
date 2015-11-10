# lucidtask
Minimal Todo list based on Google Tasks and heavily inspired by [Clear](http://realmacsoftware.com/clear/).

#### Installation
Requires the [Google App Engine](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python) and [bower](http://bower.io/#install-bower).

1. [Register your Project and create an API key (Client ID)](https://developers.google.com/google-apps/tasks/firstapp#register-your-project)
2. Edit `public/js/app.js` and fill in your Client ID

2. Install the dependencies:
  ```bash
  bower install
  ```

3. Run the server:
  ```bash
  dev_appserver.py .
  ```

#### Build
To build a minified version install the dev dependencies and run the build chain.

```bash
# Install dev dependencies
npm install
# Rund the build chain
gulp build
```
