-- ==============================================================================
-- SEED DATA: 16 OWNER-PROVIDED BABY PHOTOGRAPHS
-- ==============================================================================

-- Clean up existing mock portfolio data (if needed, but usually we just append)
-- DELETE FROM public.portfolio WHERE asset_source = 'studio' AND category IN ('baby', 'newborn');

INSERT INTO public.portfolio (
  title, 
  category, 
  category_label, 
  age_group, 
  theme, 
  image_url, 
  cloudinary_public_id, 
  asset_source, 
  is_published, 
  is_illustrative_placeholder,
  display_order,
  aspect_ratio
) VALUES
('Celestial Cradle Sleep', 'newborn', 'Newborn', '12 Days Old', 'Traditional Woven Basket & Silk Drape', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955112/1.png', '1', 'studio', true, false, 1, '3:4'),
('First Curiosities', 'baby', 'Baby & Child', '7 Months Old', 'Studio Sitter Milestone', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/2.png', '2', 'studio', true, false, 2, '3:4'),
('Lavender Dreams Swaddle', 'newborn', 'Newborn', '10 Days Old', 'Fine Art Swaddle & Floral Crown', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955260/3.png', '3', 'studio', true, false, 3, '3:4'),
('Traditional Cradle Joy', 'baby', 'Baby & Child', '6 Months Old', 'Handcrafted Wood Cradle & Marigolds', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/4.png', '4', 'studio', true, false, 4, '3:4'),
('Little Explorer', 'baby', 'Baby & Child', '8 Months Old', 'Minimalist Studio Floor Session', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/5.png', '5', 'studio', true, false, 5, '3:4'),
('Midnight Blue Serenity', 'newborn', 'Newborn', '14 Days Old', 'Deep Blue Wrap & Moon Prop', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955267/6.png', '6', 'studio', true, false, 6, '3:4'),
('Smiling Sitter', 'baby', 'Baby & Child', '9 Months Old', 'Natural Oak Bench Portrait', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955258/7.png', '7', 'studio', true, false, 7, '3:4'),
('Rustic Basket Slumber', 'newborn', 'Newborn', '8 Days Old', 'Organic Wool Nest & Timber Bowl', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955264/8.png', '8', 'studio', true, false, 8, '3:4'),
('Innocent Gaze', 'baby', 'Baby & Child', '7 Months Old', 'Soft Linen Textures', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955266/9.png', '9', 'studio', true, false, 9, '3:4'),
('Angelic Rest', 'newborn', 'Newborn', '15 Days Old', 'Warm Tones & Fuzzy Rug', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955269/10.png', '10', 'studio', true, false, 10, '3:4'),
('Tummy Time Triumph', 'baby', 'Baby & Child', '6 Months Old', 'Signature Studio Milestone', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955272/11.png', '11', 'studio', true, false, 11, '3:4'),
('Emerald Green Swaddle', 'newborn', 'Newborn', '11 Days Old', 'Luxe Velvet Wrap', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955273/12.png', '12', 'studio', true, false, 12, '3:4'),
('Toddler Wonder', 'baby', 'Baby & Child', '14 Months Old', 'Clean Canvas Backdrop', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955276/13.png', '13', 'studio', true, false, 13, '3:4'),
('Pure Slumber', 'newborn', 'Newborn', '9 Days Old', 'Minimalist White Theme', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955288/14.png', '14', 'studio', true, false, 14, '3:4'),
('Playful Moments', 'baby', 'Baby & Child', '10 Months Old', 'Studio Toy Interaction', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955283/15.png', '15', 'studio', true, false, 15, '3:4'),
('Dusty Rose Newborn', 'newborn', 'Newborn', '12 Days Old', 'Signature Swaddle Technique', 'https://res.cloudinary.com/i2us3kow/image/upload/v1793955282/16.png', '16', 'studio', true, false, 16, '3:4')
ON CONFLICT (cloudinary_public_id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  category_label = EXCLUDED.category_label,
  age_group = EXCLUDED.age_group,
  theme = EXCLUDED.theme,
  image_url = EXCLUDED.image_url,
  asset_source = 'studio',
  is_published = true,
  is_illustrative_placeholder = false;
