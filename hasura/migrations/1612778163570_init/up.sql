CREATE SCHEMA playground;
CREATE TABLE playground.points (
    point_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    point_geog geography(Point,4326) NOT NULL
);
COMMENT ON TABLE playground.points IS 'Geographic points for fun';
COMMENT ON COLUMN playground.points.point_id IS 'The ID of the point';
COMMENT ON COLUMN playground.points.point_geog IS 'The geography of the point';
