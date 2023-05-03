# Plantify 🌱

Plantify is a mobile app that helps users manage and take care of their plants. Users can add their plants to the app, receive watering reminders, and identify unknown plants using the built-in plant identification feature. Implemented real-time image recognition, allowing users to build and manage a personal plant database with full CRUD functionality, including profile management and image uploads.

**Important:** This repository is a new public one created due to security problems in the initial private repository. All the project files have been moved to this repository.

## Authors

- Mihir Araveeti
- Himil Patel

## Features

- Add plant information (name, species, description, and image)
- Identify plants using the built-in plant identification feature (powered by Plant.id API)
- Fetch watering information for plants (powered by Trefle API)
- Store plant data securely using Firebase

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- Firebase account
- Plant.id API key
- Trefle API key

### Installation

1. Clone the repo

2. Install dependencies:

npm install

or

yarn install

3. Create a `.env` file in the root directory and add your API keys:

FIREBASE_API_KEY=your_firebase_api_key
PLANT_ID_API_KEY=your_plant_id_api_key
TREFLE_API_KEY=your_trefle_api_key


4. Start the Expo development server:

expo start


5. Scan the QR code with the Expo Go app on your phone or use an emulator to run the app.

## Built With

- React Native
- Expo
- Firebase
- Plant.id API
- Trefle API

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Special thanks to the Plant.id and Trefle API teams for providing excellent APIs for plant identification and information.




