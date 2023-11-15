# Leader Board 🏆

![App Screenshot](screenshot.png)

Leader Board is a web based application which allows users to log and store entries in an interactive scoreboard.

# Install and run

Designed to be hosted in Google Firebase simple steps to set up are below:

    1. Fork this repo
    2. Install firebase CLI tools `npm install -g firebase-tools`
    3. Log in to firebase CLI `firebase login:ci`
    4. Run `firebase init hosting:github` in your local project dir
    5. Set it in the "Secrets" area of your repository settings and add it as FIREBASE_SERVICE_ACCOUNT: https://github.com/USERNAME/REPOSITORY/settings/secrets
    6. Replace 'firebase.json' with your projects
    7. Merge changes to the 'main' branch

This will deploy the code in main branch to your firebase hosting. You can then access the app via your project url.

# Tech stack

    - Typescript
    - React
    - Firebase
