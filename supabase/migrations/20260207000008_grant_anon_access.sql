-- Allow unauthenticated (anon) users to call get_nearby_events
GRANT EXECUTE ON FUNCTION get_nearby_events(DOUBLE PRECISION, DOUBLE PRECISION, DOUBLE PRECISION) TO anon, authenticated;
