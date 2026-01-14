import pandas as pd
import geopandas as gpd

df = pd.read_csv('./lowheaddams.csv')
df = df[[
    'name',
    'city',
    'county',
    'state',
    'latitude',
    'longitude',
    'linkno',
    'reach_id',
    'num_fatalities',
    'Qmin',
    'Qmax',
]]
(
    gpd
    .GeoDataFrame(
        df.drop(columns=['latitude', 'longitude']),
        geometry=gpd.points_from_xy(df.longitude, df.latitude)
    )
    .set_crs(epsg=4326)
    .to_file('../public/lowheaddams.geojson', driver='GeoJSON')
)
