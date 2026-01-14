import pandas as pd
import geopandas as gpd
import json


df = pd.read_csv('./lowheaddams.csv')
df = df[[
    'name',
    # 'city',
    # 'county',
    # 'state',
    'latitude',
    'longitude',
    'linkno',
    # 'reach_id',
    'num_fatalities',
    'Qmin',
    'Qmax',
]].rename(columns={
    'num_fatalities': 'deaths',
    'linkno': 'river',
})

geojson = (
    gpd
    .GeoDataFrame(
        df.drop(columns=['latitude', 'longitude']),
        geometry=gpd.points_from_xy(df.longitude, df.latitude)
    )
    .set_crs(epsg=4326)
    .to_json()
)

with open('../public/lowheaddams.geojson', "w") as f:
    json.dump(json.loads(geojson), f, separators=(",", ":"))
