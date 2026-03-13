# PlayersApp

A React Native mobile application for cricket players to connect, browse player listings, chat in real-time, and find nearby players using location-based features. Built with Redux for state management and Firebase as the backend.

> **Note:** This repo has been imported from my Bitbucket account, mostly for code viewing and is not necessarily up to date.

## Features

- **Login & Signup** - User authentication with email validation
- **Player Listing & Browsing** - Browse and search through player profiles
- **In-App Chat** - Real-time messaging between players using Gifted Chat
- **Location-Based Discovery** - Find nearby players with GeoFire-powered location queries
- **User Profile Management** - View and edit your player profile
- **Match Listing** - Browse available cricket matches

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native 0.44.0 |
| UI Library | React 16.0.0-alpha.6 |
| State Management | Redux + React-Redux + Redux Thunk |
| Backend / Database | Firebase |
| Location Queries | GeoFire |
| Navigation | React Native Router Flux |
| Chat UI | React Native Gifted Chat |
| UI Components | NativeBase |
| Utilities | Lodash, Email Validator |

## Project Structure

```
src/
├── App.js                  # App entry point
├── Router.js               # Route/navigation configuration
├── ChatBackend.js          # Firebase chat integration
├── actions/                # Redux action creators
│   ├── LoginActions.js
│   ├── SignupActions.js
│   ├── PlayersListActions.js
│   ├── types.js
│   └── index.js
├── reducers/               # Redux reducers
│   ├── AuthReducer.js
│   ├── GeoReducer.js
│   ├── PlayerReducer.js
│   ├── SignupReducer.js
│   └── index.js
├── components/             # React Native components
│   ├── LoginForm.js
│   ├── SignupForm.js
│   ├── PlayerList.js
│   ├── PlayerItem.js
│   ├── PlayerChat.js
│   ├── MatchList.js
│   ├── UserMain.js
│   ├── UserEditProfile.js
│   ├── LocationButton.js
│   ├── LocationModal.js
│   └── common/             # Reusable UI components
│       ├── Button.js
│       ├── Card.js
│       ├── CardSection.js
│       ├── Confirm.js
│       ├── Header.js
│       ├── Input.js
│       └── Spinner.js
├── images/                 # Static image assets
│   ├── avatar.png
│   ├── batsman.png
│   └── splash.jpg
└── utils/
    └── GeocodingUtil.js    # Geocoding helper utilities
android/                    # Native Android project
ios/                        # Native iOS project
```

## Getting Started

### Prerequisites

- Node.js and npm
- React Native CLI
- Xcode (for iOS) and/or Android Studio (for Android)
- A configured Firebase project

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Moebats/PlayersApp.git
   cd PlayersApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   # iOS
   react-native run-ios

   # Android
   react-native run-android
   ```
