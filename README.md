# Leader Board 🏆

![App Screenshot](screenshot.png)

[Demo site](https://leader-board-app.firebaseapp.com)

Leader Board is a web based application which allows users to log and store entries in an interactive scoreboard.

# Install and run

Designed to be hosted in Google Firebase simple steps to set up are below:

    1. Clone or fork this repo
    2. CD to the local project root dir
    3. Create Firebase project
    4. Create web app in the project and enable hosting
    5. Replace firebaseConfig var in firebaseConfig.ts with generated config
    6. `npm install -g firebase-tools`
    7. `firebase login`
    8. `firebase init`
    9. `firebase deploy`

This will deploy the code in main branch to your firebase hosting. You can then access the app via your project url.

# Tech stack

    - Typescript
    - React
    - Firebase

# CICD pipeline
Using github actions we deploy to tywo environments PROD and TEST as below:

## Pull requests
    - Deploy code from the PR to a firebase preview
    - Configures app to point towards TEST env
    - Configures env file using github secrets
    - Scans and checks for EOL dependencies

## Merges to main
    - Deploy code from main to the firebase PROD hosting
    - Configures app to point towards PROD env
    - Configures env file using github secrets
