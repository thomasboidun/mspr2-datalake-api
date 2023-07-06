# DATALAKE API

## Installations
1. `npm i`
2. `npm start`
3. Go to : http://localhost:3000/data

## Routes
The **POST**, **PUT** and **DELETE** routes require an API key.
To do that, add the "api_key" header to your HTTP requests with the value "myapikey". [#stubcode]()

### /candidate
- **GET** http://localhost:3000/candidate
- **GET** http://localhost:3000/candidate/:id
- **POST** http://localhost:3000/candidate
JSON Body: `{ "firstname": "John", "lastname": "Doe" }`
- **PUT** http://localhost:3000/candidate/:id
JSON Body: `{ "firstname": "John", "lastname": "Doe" }`
- **DELETE** http://localhost:3000/candidate/:id

### /commune
- **GET** http://localhost:3000/commune
- **GET** http://localhost:3000/commune/:id
- **POST** http://localhost:3000/commune     
JSON Body: `{ "code": "33000", "label": "Bordeaux", "location": "44.8378° N, -0.5792° W" } `
- **PUT** http://localhost:3000/commune/:id
JSON Body: `{ "code": "33000", "label": "Bordeaux", "location": "44.8378° N, -0.5792° W" }`
- **DELETE** http://localhost:3000/commune/:id

### /data
- **GET** http://localhost:3000/data
- **GET** http://localhost:3000/data?communeId=1
- **GET** http://localhost:3000/data?year=2017
- **GET** http://localhost:3000/data?communeId=1&year=2017

### /insecurity-rate
- **GET** http://localhost:3000/insecurity-rate
- **GET** http://localhost:3000/insecurity-rate?communeId=1&year=2017
- **POST** http://localhost:3000/insecurity-rate
JSON Body: `{ "communeId": 1, "insecurityRate": 10, "year": 2017 }`
- **PUT** http://localhost:3000/insecurity-rate?communeId=1&year=2017 
JSON Body: `{ "communeId": 1, "insecurityRate": 10, "year": 2017 }`
- **DELETE** http://localhost:3000/insecurity-rate?communeId=1&year=2017

### /jobless-rate
- **GET** http://localhost:3000/jobless-rate
- **GET** http://localhost:3000/jobless-rate?communeId=1&year=2017
- **POST** http://localhost:3000/jobless-rate
JSON Body: `{ "communeId": 1, "joblessRate": 10.5, "year": 2017 }`
- **PUT** http://localhost:3000/jobless-rate?communeId=1&year=2017 
JSON Body: `{ "communeId": 1, "joblessRate": 10.5, "year": 2017 }`
- **DELETE** http://localhost:3000/jobless-rate?communeId=1&year=2017

### /median-living-standard
- **GET** http://localhost:3000/median-living-standard
- **GET** http://localhost:3000/median-living-standard?communeId=1&year=2017
- **POST** http://localhost:3000/median-living-standard
JSON Body: `{ "communeId": 1, "medianLivingStandard": 19200, "year": 2017 }`
- **PUT** http://localhost:3000/median-living-standard?communeId=1&year=2017 
JSON Body: `{ "communeId": 1, "medianLivingStandard": 19200, "year": 2017 }`
- **DELETE** http://localhost:3000/median-living-standard?communeId=1&year=2017

### /povrety-rate
- **GET** http://localhost:3000/povrety-rate
- **GET** http://localhost:3000/povrety-rate?communeId=1&year=2017
- **POST** http://localhost:3000/povrety-rate
JSON Body: `{ "communeId": 1, "povretyRate": 16, "year": 2017 }`
- **PUT**    http://localhost:3000/povrety-rate?communeId=1&year=2017 
JSON Body: `{ "communeId": 1, "povretyRate": 16, "year": 2017 }`
- **DELETE** http://localhost:3000/povrety-rate?communeId=1&year=2017

### /voice-count
- **GET** http://localhost:3000/voice-count
- **GET** http://localhost:3000/voice-count?candidateId=1&communeId=1&year=2017
- **POST** http://localhost:3000/voice-count
JSON Body: `{ "candidateId": 1, "communeId": 1, "voiceCount": 0, "year": 2017 }`
- **PUT** http://localhost:3000/voice-count?candidateId=1&communeId=1&year=2017 (API key required)
JSON Body: `{ "candidateId": 1, "communeId": 1, "voiceCount": 0, "year": 2017 }`
- **DELETE** http://localhost:3000/voice-count?candidateId=1&communeId=1&year=2017 (API key required)