console.log('init');

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVta2FudG9yIiwiYSI6ImNrYXl3NnUzbzBiMzEyc3Nkc3A4dXhqcW8ifQ.WOUnXJXfoY5BqP1nzhPJOA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 11,
    center: [-93.2650, 44.9866]
});

// Fetch stores from MongoDB
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();
  
    const stores = data.data.map(store => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    store.location.coordinates[0],
                    store.location.coordinates[1]
                ]
            },
            properties: {
                storeId: store.storeId,
                icon: 'castle'
            }
        };
    });
    loadMap(stores);
};

// display map to DOM
function loadMap(stores) {
    map.on('load', function() {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: stores
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeId}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
};

getStores();

