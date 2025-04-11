import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://demotiles.maplibre.org/style.json', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1 // starting zoom
});
const data:GeoJSON.GeoJSON<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.5, 40]
        },
        properties: {
          title: 'My Point'
        }
      }
    ]
  }
map.on('load', function () {
    map.addSource('point-source', {
      type: 'geojson',
      data: data
    });
  
    // Add a layer to display the point
    map.addLayer({
      id: 'point-layer',
      type: 'circle',
      source: 'point-source',
      paint: {
        'circle-radius': 10, // Size of the point
        'circle-color': '#FF5733' // Color of the point
      }
    });
        setInterval(() => {
        //@ts-ignore
        data.features[0].geometry.coordinates[0]++;
            (map.getSource("point-source")as maplibregl.GeoJSONSource).setData(data)
                
        }, 1000);
    
  });