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
        url: '/static/data/lowheaddams.geojson',
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
          title: "{DAM_NAME}",
          content: "<b>Dam Name:</b> {DAM_NAME}<br><b>River:</b> {RIVER_NAME}<br><b>State:</b> {STATE}<br><b>Height (ft):</b> {HEIGHT_FT}<br><b>Purpose:</b> {PURPOSE}"
        }
      })

      map.addMany([rfsLayer, lowheadDamsLayer])
    })
  }
)
