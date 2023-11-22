# Leader Board 🏆

![App Screenshot](screenshot.png)

[Leader Board](https://leader-board-app.firebaseapp.com) is a web based application which allows users to log and store entries in an interactive scoreboard.

# Tech stack

    - Typescript
    - React
    - Firebase

# CICD pipeline
Uses github actions to deploy into PROD and TEST environments:

## Pull requests
    - Deploy code from the PR to a firebase preview
    - Configures app to point towards TEST env
    - Configures env file using github secrets
    - Scans and checks for EOL dependencies

## Merges to main
    - Deploy code from main to the firebase PROD hosting
    - Configures app to point towards PROD env
    - Configures env file using github secrets
