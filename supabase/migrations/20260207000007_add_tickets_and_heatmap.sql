-- =============================================
-- Migration to add heatmap coordinates when scanning tickets
-- =============================================

ALTER TABLE wallet_items
ADD COLUMN scanned_latitude DOUBLE PRECISION,
ADD COLUMN scanned_longitude DOUBLE PRECISION;
