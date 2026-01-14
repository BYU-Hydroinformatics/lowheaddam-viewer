require(
  // naad mapimagelayer and geojsonlayer
  ["esri/layers/MapImageLayer", "esri/layers/GeoJSONLayer"],
  (MapImageLayer,  GeoJSONLayer) => {
    document.querySelector('arcgis-map').addEventListener('arcgisViewReadyChange', () => {
      const mapContainer = document.querySelector('arcgis-map')
      const map = mapContainer.map

      const rfsLayer = new MapImageLayer({
        url: 'https://livefeeds3.arcgis.com/arcgis/rest/services/GEOGLOWS/GlobalWaterModel_Medium/MapServer',
        title: "GEOGLOWS River Forecast System v2",
        sublayers: [{id: 0, definitionExpression: "rivercountry='United States' OR outletcountry='United States'"}]
      })

      // add the lowheaddam.geojson layer from the public folder
      const lowheadDamsLayer = new GeoJSONLayer({
        url: '/lowheaddams.geojson',
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
  }
)
