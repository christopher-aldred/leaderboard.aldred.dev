# Intro

1. npm i
2. npm start
3. update pckage.json name
4. npm update --save

# CICD

1. npm install -g firebase-tools
2. firebase login
3. firebase init

```
You will be prompted to respond to some questions.
- Choose hosting: Configure files for Firebase hosting and (optionally) set up GitHub Action deploys.
- Use an existing project: Select the Firebase project you created earlier (react-firebase-app).
- Enter 'build' as the public directory.
- Configure as a single-page app: Yes.
- Set up automatic builds and deploys with GitHub: No. For this tutorial, we are using CircleCI to run tests and handle deployment.
```

4. In Circle CI set up a project and link it to the github repo
5. Run the following command in terminal `firebase login:ci`
6. In Circle CI set the envirment variable FIREBASE_TOKEN to the token output in the previous step
