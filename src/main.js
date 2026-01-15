import "@arcgis/core/assets/esri/themes/light/main.css"
import "@arcgis/map-components/components/arcgis-map"
import "@arcgis/map-components/components/arcgis-zoom"
import "@arcgis/map-components/components/arcgis-layer-list"
import "@arcgis/map-components/components/arcgis-locate"
import "@arcgis/map-components/components/arcgis-scale-bar"
import "@arcgis/map-components/components/arcgis-expand"
import "@arcgis/map-components/components/arcgis-basemap-gallery"

import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"

import './main.css'

document.querySelector('arcgis-map').addEventListener('arcgisViewReadyChange', () => {
  const mapContainer = document.querySelector('arcgis-map')
  const map = mapContainer.map

  const rfsLayer = new MapImageLayer({
    url: 'https://livefeeds3.arcgis.com/arcgis/rest/services/GEOGLOWS/GlobalWaterModel_Medium/MapServer',
    title: "GEOGLOWS River Forecast System v2",
    sublayers: [{id: 0, definitionExpression: "rivercountry='United States' OR outletcountry='United States'"}]
  })

  const lowheadDamsLayer = new GeoJSONLayer({
    url: new URL('/lowheaddams.geojson', window.location.origin + import.meta.env.BASE_URL).href,
    // url: new URL('/lowheaddams.geojson', import.meta.url).href,
    // url: '/lowheaddams.geojson',
    title: 'Low Head Dams',
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        style: "triangle",
        color: "red",
        size: "12px",
        outline: {
          color: "white",
          width: 1
        }
      }
    },
    popupTemplate: {
      title: "{name}",
      content: "" +
        "<b>Dam Name:</b> {name}<br>" +
        "<b>City</b>: {city}<br>" +
        "<b>County</b>: {county}<br>" +
        "<b>State:</b> {state}<br>" +
        "<b>Known Fatalities</b>: {num_fatalities}<br>" +
        "<b>Minimum Discharge for Hydraulic Jump</b>: {Qmin} m<sup>3</sup>/s<br>" +
        "<b>Maximum Discharge for Hydraulic Jump</b>: {Qmax} m<sup>3</sup>/s<br>"
    }
  })

  map.addMany([rfsLayer, lowheadDamsLayer])
})
