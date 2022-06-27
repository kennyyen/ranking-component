# Rank List

## Introduction

An application with services for displaying real-time update leaderboard

### Technologies used

**React** - "react": "^18.1.0" \
**Typescript** - "typescript": "^4.6.4" \
**requestAnimationFrame** - "react": "^18.1.0"

### Challenges

- Time constrain is one of the most challenging item faced during the completion of this project. \
  - Left rank transition animation not functioning
  - Left out styling details
  - Thorough error case handle is also not handled

### Interesting features for future enhancement

- Complete rank transition animation

- Add special animation and styling for top 3 leaders

- On click query/display streamer detail

### Technoloy choices

- #### requetAnimationFrame Hook vs setTimeout/setInterval:

  - requestAnimationFrame performs a lot better than setTimeout/SetInterval

  - Tradeoffs: ease of implementation and code readability/understanding

* #### Typescript:

  - Typescript provide a significant scalling ability to the application, supports typing \
    better reability and compile time error catching.

  - Tradeoffs: Typescript will require a lot more codes when developing, and type management of \
    external data will be challenging.

### File Structures

    .
    │   .gitignore
    │   package-lock.json
    │   package.json
    │   README.md
    │   tsconfig.json
    │
    ├───public
    │   │   favicon.ico
    │   │   index.html
    │   │   logo192.png
    │   │   logo512.png
    │   │   manifest.json
    │   └───robots.txt
    │
    └───src
        │   App.css
        │   App.test.tsx
        │   App.tsx
        │   index.css
        │   index.tsx
        │   react-app-env.d.ts
        │   reportWebVitals.ts
        │   setupTests.ts
        │
        ├───hooks
        │       useAnimationFrame.ts
        │       useMoveRank.ts
        │
        └───components
            └───rankList
                └───RankList.tsx

## Powered by Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## How to install and run

Recommanded to use React 18 and above, with NodeJS 8.5.5 \

**Note:** as stated above, place replace `REACT_APP_GOOGLE_API_KEY = "Your API Key"` in `.env` before the following steps

1. Run command `npm install` or `npm i`
2. Rum command `npm run start` or `npm start`
3. Open a browser, go to [http://localhost:3000](http://localhost:3000) to see the application running

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Links

[Kenny Yen - LinkedIn Profile](https://www.linkedin.com/in/kenny-yen-22887451/).
