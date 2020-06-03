console.log('init');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVta2FudG9yIiwiYSI6ImNrYXl3NnUzbzBiMzEyc3Nkc3A4dXhqcW8ifQ.WOUnXJXfoY5BqP1nzhPJOA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 11,
    center: [-93.2650, 44.9866]
});

// Fetch parks from MongoDB
async function getParks() {
    const res = await fetch('/api/v1/parks');
    const data = await res.json();
  
    const parks = data.data.map(park => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    park.location.coordinates[0],
                    park.location.coordinates[1]
                ]
            },
            properties: {
                parkId: park.parkId,
                icon: 'skateboard'
            }
        };
    });
    loadMap(parks);
};

// display map to DOM
function loadMap(parks) {
    map.on('load', function() {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: parks
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{parkId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
};

getParks();

