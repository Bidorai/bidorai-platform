-- Sample data for Bidorai customer portal
-- This will populate the database with realistic data for testing all features

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM notifications;
-- DELETE FROM reviews;
-- DELETE FROM orders;
-- DELETE FROM bids;
-- DELETE FROM menus;
-- DELETE FROM restaurants;
-- DELETE FROM users;

-- Insert sample users
INSERT INTO users (email, password_hash, role) VALUES
('customer1@example.com', '$2a$10$example.hash.customer1', 'customer'),
('customer2@example.com', '$2a$10$example.hash.customer2', 'customer'),
('restaurant1@example.com', '$2a$10$example.hash.restaurant1', 'restaurant'),
('restaurant2@example.com', '$2a$10$example.hash.restaurant2', 'restaurant'),
('restaurant3@example.com', '$2a$10$example.hash.restaurant3', 'restaurant'),
('admin@bidorai.com', '$2a$10$example.hash.admin', 'admin'),
('delivery1@example.com', '$2a$10$example.hash.delivery1', 'delivery')
ON CONFLICT (email) DO NOTHING;

-- Insert sample restaurants
INSERT INTO restaurants (name, owner_id, description, approved) VALUES
('Pizza Palace', 3, 'Authentic Italian pizza and pasta for your party needs', true),
('Sushi Express', 4, 'Fresh sushi and Japanese cuisine for special occasions', true),
('BBQ House', 5, 'Southern-style BBQ with all the fixings', true)
ON CONFLICT DO NOTHING;

-- Insert sample menus with categories and images
INSERT INTO menus (restaurant_id, name, description, price, category, image_url) VALUES
-- Pizza Palace menus
(1, 'Supreme Party Pizza', 'Large 18-inch pizza with pepperoni, sausage, mushrooms, bell peppers, onions, and olives. Serves 8-10 people.', 45.99, 'main-courses', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'),
(1, 'Margherita Party Pizza', 'Classic 18-inch pizza with fresh mozzarella, basil, and tomato sauce. Perfect for vegetarian guests.', 38.99, 'main-courses', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'),
(1, 'Garlic Bread Platter', 'Fresh baked garlic bread with herbs and butter. Serves 6-8 people.', 12.99, 'appetizers', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
(1, 'Caesar Salad Tray', 'Fresh romaine lettuce, parmesan cheese, croutons, and Caesar dressing. Serves 8-10 people.', 18.99, 'appetizers', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'),
(1, 'Tiramisu Dessert', 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream. Serves 8 people.', 24.99, 'desserts', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'),

-- Sushi Express menus
(2, 'Sushi Party Platter', 'Assorted sushi rolls including California, spicy tuna, salmon, and vegetable rolls. Serves 6-8 people.', 65.99, 'main-courses', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'),
(2, 'Sashimi Deluxe', 'Fresh sashimi assortment with salmon, tuna, yellowtail, and white fish. Serves 4-6 people.', 55.99, 'main-courses', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400'),
(2, 'Edamame Appetizer', 'Steamed soybeans with sea salt. Perfect party starter.', 8.99, 'appetizers', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400'),
(2, 'Miso Soup Tray', 'Traditional Japanese miso soup with tofu and seaweed. Serves 8 people.', 15.99, 'appetizers', 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400'),
(2, 'Green Tea Ice Cream', 'Premium green tea ice cream with mochi. Serves 6 people.', 16.99, 'desserts', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'),

-- BBQ House menus
(3, 'BBQ Ribs Platter', 'Slow-cooked pork ribs with BBQ sauce, coleslaw, and cornbread. Serves 6-8 people.', 75.99, 'main-courses', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'),
(3, 'Pulled Pork Sandwich Tray', 'Tender pulled pork with BBQ sauce on brioche buns. Serves 8-10 people.', 45.99, 'main-courses', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400'),
(3, 'BBQ Wings', 'Crispy chicken wings with choice of BBQ, buffalo, or honey mustard sauce. Serves 6-8 people.', 28.99, 'appetizers', 'https://images.unsplash.com/photo-1567620832904-9d64b182de67?w=400'),
(3, 'Mac and Cheese Side', 'Creamy macaroni and cheese with breadcrumb topping. Serves 6-8 people.', 18.99, 'appetizers', 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=400'),
(3, 'Apple Pie Dessert', 'Homemade apple pie with vanilla ice cream. Serves 8 people.', 22.99, 'desserts', 'https://images.unsplash.com/photo-1535920527002-b35e3f412d4f?w=400')
ON CONFLICT DO NOTHING;

-- Insert sample bids
INSERT INTO bids (user_id, restaurant_id, menu_id, amount, status) VALUES
(1, 1, 1, 42.00, 'active'),
(2, 1, 1, 44.50, 'active'),
(1, 2, 6, 60.00, 'active'),
(2, 2, 6, 62.00, 'active'),
(1, 3, 11, 70.00, 'active'),
(2, 3, 11, 72.50, 'active')
ON CONFLICT DO NOTHING;

-- Insert sample orders
INSERT INTO orders (user_id, restaurant_id, menu_id, bid_id, price, status, payment_status, order_status) VALUES
(1, 1, 1, 1, 42.00, 'confirmed', 'paid', 'preparing'),
(2, 2, 6, 3, 60.00, 'confirmed', 'paid', 'ready'),
(1, 3, 11, 5, 70.00, 'confirmed', 'pending', 'preparing')
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (order_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Amazing pizza! Perfect for our party. Will order again!'),
(2, 2, 4, 'Great sushi platter. Fresh and delicious.')
ON CONFLICT DO NOTHING;

-- Insert sample notifications
INSERT INTO notifications (user_id, owner_id, message, type) VALUES
(1, 3, 'Your bid of $42.00 on Supreme Party Pizza has been accepted!', 'bid_accepted'),
(2, 4, 'Your bid of $60.00 on Sushi Party Platter has been accepted!', 'bid_accepted'),
(1, 3, 'Your order #1 is ready for pickup!', 'order_ready'),
(2, 4, 'Your order #2 is being prepared.', 'order_status'),
(1, 3, 'New menu item available: BBQ Wings!', 'new_menu')
ON CONFLICT DO NOTHING; 