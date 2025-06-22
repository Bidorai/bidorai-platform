-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bidorai_db;

-- Use the database
\c bidorai_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cuisine VARCHAR(100) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Catering Menus Table
CREATE TABLE IF NOT EXISTS catering_menus (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    serves_min INTEGER DEFAULT 10,
    serves_max INTEGER DEFAULT 100,
    category VARCHAR(100),
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bidding Sessions Table
CREATE TABLE IF NOT EXISTS bidding_sessions (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES catering_menus(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    starting_price DECIMAL(10,2) NOT NULL,
    current_price DECIMAL(10,2) NOT NULL,
    min_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'upcoming', -- upcoming, active, ended
    winner_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bids Table
CREATE TABLE IF NOT EXISTS bids (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES bidding_sessions(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    placed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    menu_id INTEGER REFERENCES catering_menus(id) ON DELETE CASCADE,
    session_id INTEGER REFERENCES bidding_sessions(id),
    order_type VARCHAR(20) NOT NULL, -- 'direct', 'bid_won', 'second_chance'
    party_size INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    pickup_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, ready, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_restaurants_city ON restaurants(city);
CREATE INDEX idx_catering_menus_restaurant ON catering_menus(restaurant_id);
CREATE INDEX idx_bidding_sessions_status ON bidding_sessions(status);
CREATE INDEX idx_bidding_sessions_end_time ON bidding_sessions(end_time);
CREATE INDEX idx_bids_session ON bids(session_id);
CREATE INDEX idx_bids_user ON bids(user_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Insert sample data
INSERT INTO restaurants (name, cuisine, rating, city, state) VALUES
('Farm Fresh Kitchen', 'Organic Certified', 4.9, 'Dallas', 'TX'),
('Green Garden Bistro', 'Farm-to-Table', 4.8, 'Dallas', 'TX'),
('Tokyo Sushi', 'Japanese Fresh', 4.7, 'Dallas', 'TX'),
('El Mariachi', 'Mexican Authentic', 4.6, 'Dallas', 'TX'),
('Pasta Palace', 'Italian Classic', 4.5, 'Dallas', 'TX');

INSERT INTO catering_menus (restaurant_id, name, description, base_price, serves_min, serves_max) VALUES
(1, 'Organic Harvest Bowl', 'Fresh seasonal vegetables with quinoa', 289.99, 10, 20),
(2, 'Sustainable Feast Tray', 'Locally sourced ingredients', 249.99, 10, 15),
(3, 'Sushi Platter', 'Assorted fresh sushi rolls', 219.99, 8, 12),
(4, 'Taco Bar Setup', 'Complete taco station with toppings', 329.99, 15, 25),
(5, 'Pasta Buffet Tray', 'Three pasta varieties with sauces', 259.99, 12, 20);