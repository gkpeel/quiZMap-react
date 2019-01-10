## Developers Diary

- 9.28.18: Using our skills with jQuery and knowledge of APIs. Was able to create a front-end only MVP using a large GeoJSON library and with keyup listeners. Unfortunately could not find out how to selectively reveal countries titles after being correctly guessed.

- 1.2.19: While still not being able to selectively reveal labels based on a geographic area. Going to use hover effect and click events to show the country

- 1.5.19: Created React App. Deployed to Heroku. Created Google Maps API Key. Added google-maps-react package. Connected GM to app

- 1.8.19: Using my MVP, I brought in my Map Appearance into the app as MapAppearance.js. Began looking at google-map-react package (notice the spelling difference, cause I didn't) and ran into difficullties finding an easy way to add polygons to the map. Began looking into other packages found react-google-maps had a high popularity but not a lot of recent activity. (Last update was over a year old.) However, in the documentation I found that someone recently picked up where that package left off with react-google-maps-api. However, where it's predecessor had a lot of documentation (albeit abstract) this APIs documentation was lacking.

Found a GeoJSON file of country borders smaller than the one I was previously using for my MVP. (Now only 24 MB)

Reconnected GM to the app using this package manager. Created a test case to show that the app could load GeoJSON of USA onLoad. 

Took a long time but was eventually successful in finding out how to modify the Map's Appearance using GMRA.

Ran into issues with .env variables using 