import React, { useState } from 'react';
import {
  Plane,
  Home,
  Hotel,
  Car,
  Bell,
  CalendarDays,
  Bot,
  Gift,
  ShieldCheck,
  Search,
  MapPin,
  Heart,
  Star,
  Globe2,
  Moon,
  Filter,
  SlidersHorizontal,
  ArrowRight,
  CreditCard,
  User,
  Lock,
  CheckCircle2,
  WalletCards,
  Settings,
  Headphones,
  Compass,
  Crown,
  Luggage,
  Clock3,
  TrendingDown,
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'results', label: 'Flights', icon: Plane },
  { key: 'hotels', label: 'Hotels', icon: Hotel },
  { key: 'stays', label: 'Stays', icon: Home },
  { key: 'cars', label: 'Cars', icon: Car },
  { key: 'alerts', label: 'Price Alerts', icon: Bell },
  { key: 'trips', label: 'Trips', icon: CalendarDays },
  { key: 'ai', label: 'AI Planner', icon: Bot },
  { key: 'rewards', label: 'Rewards', icon: Gift },
  { key: 'visa', label: 'Visa Assistant', icon: ShieldCheck },
];

const destinations = [
  { city: 'Bali', country: 'Indonesia', price: 621, rating: 4.8, tag: 'Best match' },
  { city: 'Tokyo', country: 'Japan', price: 712, rating: 4.7, tag: 'Popular' },
  { city: 'Santorini', country: 'Greece', price: 583, rating: 4.9, tag: 'Premium' },
  { city: 'Cape Town', country: 'South Africa', price: 689, rating: 4.6, tag: 'Adventure' },
];

const flights = [
  { airline: 'Air France', depart: '08:30', arrive: '20:45', price: 487, code: 'AF 023', craft: 'Airbus A350-900', tag: 'Best value', stops: 'Non-stop', duration: '7h 15m' },
  { airline: 'Delta Air Lines', depart: '10:20', arrive: '22:40', price: 432, code: 'DL 218', craft: 'Boeing 767', tag: 'Cheapest', stops: '1 stop', duration: '9h 20m' },
  { airline: 'Lufthansa', depart: '18:45', arrive: '09:30', price: 532, code: 'LH 402', craft: 'Airbus A330', tag: 'Comfort', stops: '1 stop', duration: '8h 45m' },
  { airline: 'Emirates', depart: '23:10', arrive: '17:05', price: 698, code: 'EK 204', craft: 'A380', tag: 'Premium', stops: 'Non-stop', duration: '7h 55m' },
];

const alerts = [
  { route: 'New York → Paris', price: 487, change: '-12%', status: 'Price drops below $450' },
  { route: 'New York → Tokyo', price: 712, change: '-8%', status: 'Price drops below $750' },
  { route: 'New York → Bali', price: 621, change: '-5%', status: 'Fare watch active' },
  { route: 'New York → London', price: 432, change: '+3%', status: 'Price above target' },
];

const trips = [
  { title: 'Paris, France', date: '15 Jun — 22 Jun, 2025', status: 'Confirmed', image: 'paris' },
  { title: 'Tokyo, Japan', date: '10 Jul — 17 Jul, 2025', status: 'Upcoming', image: 'tokyo' },
  { title: 'Bali, Indonesia', date: '5 Aug — 12 Aug, 2025', status: 'Planning', image: 'bali' },
];

export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <div className="app">
      <div className="space-bg" />
      <Sidebar screen={screen} setScreen={setScreen} />
      <main className="main">
        <TopBar />
        {screen === 'home' && <HomeScreen setScreen={setScreen} />}
        {screen === 'results' && <SearchResults setScreen={setScreen} />}
        {screen === 'ai' && <AIPlanner />}
        {screen === 'alerts' && <PriceAlerts />}
        {screen === 'trips' && <TripsWishlist setScreen={setScreen} />}
        {screen === 'checkout' && <Checkout />}
        {screen === 'profile' && <Profile />}
        {!['home', 'results', 'ai', 'alerts', 'trips', 'checkout', 'profile'].includes(screen) && (
          <Placeholder title={navItems.find((item) => item.key === screen)?.label || 'Coming Soon'} />
        )}
      </main>
    </div>
  );
}

function Sidebar({ screen, setScreen }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo-mark"><Plane size={25} /></div>
        <div>
          <h1>AeroNova</h1>
          <p>Smart Travel, Limitless Destinations.</p>
        </div>
      </div>
      <nav>
        {navItems.map(({ key, label, icon: Icon }) => (
          <button key={key} className={screen === key ? 'active' : ''} onClick={() => setScreen(key)}>
            <Icon size={17} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="premium-box">
        <h3>AeroNova <span>Premium</span> <Crown size={14} /></h3>
        <p>Unlock exclusive deals, priority support, and more.</p>
        <button>Upgrade Now</button>
      </div>
      <div className="sidebar-bottom">
        <button><Headphones size={16} /> Support</button>
        <button><Settings size={16} /> Settings</button>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="topbar">
      <div className="global-search"><Search size={18} /><span>Search destinations, flights...</span><kbd>⌘ K</kbd></div>
      <div className="top-actions"><Globe2 size={18} /><span>USD</span><Moon size={18} /><Bell size={18} /><button className="avatar" onClick={() => {}}>EJ</button></div>
    </header>
  );
}

function HomeScreen({ setScreen }) {
  return (
    <section className="screen home-grid">
      <div className="hero-panel">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="ai-pill">✦ AI-powered travel</span>
          <h2>Where will your<br />next <em>adventure</em> take you?</h2>
          <SearchBox onSearch={() => setScreen('results')} />
        </div>
      </div>
      <div className="panel destination-panel">
        <div className="panel-head"><div><h3>Top Destinations</h3><p>Recommended for you</p></div><button>View all</button></div>
        <div className="destination-grid">
          {destinations.map((destination) => <DestinationCard key={destination.city} destination={destination} />)}
        </div>
      </div>
      <div className="panel trends-panel">
        <div className="panel-head"><div><h3>Price Trends</h3><p>New York → Paris</p></div><button>Next 6 months</button></div>
        <PriceTrendChart />
      </div>
      <div className="panel alerts-mini">
        <div className="panel-head"><div><h3>Price Alerts</h3><p>Active drops</p></div><button>View all</button></div>
        {alerts.slice(0, 2).map((alert) => <MiniAlert key={alert.route} alert={alert} />)}
      </div>
      <BottomDock />
    </section>
  );
}

function SearchBox({ onSearch }) {
  return (
    <div className="search-card">
      <div className="trip-tabs"><button className="selected">Round Trip</button><button>One Way</button><button>Multi City</button></div>
      <div className="search-fields">
        <InputBlock label="From" value="New York (JFK)" note="John F. Kennedy Intl." />
        <InputBlock label="To" value="Paris, France" note="Charles de Gaulle (CDG)" />
        <InputBlock label="Depart" value="15 Jun, 2025" note="Sun" />
        <InputBlock label="Return" value="22 Jun, 2025" note="Sun" />
        <InputBlock label="Travelers" value="1 Traveler" note="Economy" />
        <button className="primary-btn" onClick={onSearch}>Search Flights <ArrowRight size={17} /></button>
      </div>
      <div className="quick-filters"><button>Flexible Dates</button><button>Nearby Airports</button><button>Direct Flights</button><button>Add Bags</button><button>More Filters</button><button className="ai-search">Ask AI to find the best trip for you...</button></div>
    </div>
  );
}

function InputBlock({ label, value, note }) {
  return <div className="input-block"><small>{label}</small><strong>{value}</strong><span>{note}</span></div>;
}

function DestinationCard({ destination }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="destination-card">
      <div className={`destination-image ${destination.city.toLowerCase()}`} />
      <div className="destination-info"><span>{destination.tag}</span><Heart size={15} /></div>
      <h4>{destination.city}</h4>
      <p>{destination.country}</p>
      <div><Star size={14} fill="currentColor" /> {destination.rating}<strong>${destination.price}</strong></div>
    </motion.div>
  );
}

function SearchResults({ setScreen }) {
  return (
    <section className="screen results-layout">
      <div className="results-header panel">
        <h2>New York → Paris</h2>
        <p>15 Jun — 22 Jun · 1 Traveler · Economy</p>
        <button>Change Search</button>
      </div>
      <aside className="panel filters-panel">
        <div className="panel-head"><h3>Filters</h3><button>Clear all</button></div>
        <FilterGroup title="Stops" items={['Non-stop $612', '1 Stop $432', '2+ Stops $389']} />
        <FilterGroup title="Airlines" items={['Air France $487', 'Delta $432', 'Lufthansa $532', 'Emirates $698']} />
        <FilterGroup title="Departure Time" items={['00:00–23:59']} />
        <div className="slider"><span>Price Range</span><div /><p>$200 — $900</p></div>
      </aside>
      <div className="results-list">
        <div className="sort-row"><button className="selected">Best $432</button><button>Cheapest $389</button><button>Fastest $612</button><button>Recommended $487</button><button><SlidersHorizontal size={16} /> Sort & Filter</button></div>
        {flights.map((flight) => <FlightResult key={flight.airline} flight={flight} onSelect={() => setScreen('checkout')} />)}
      </div>
    </section>
  );
}

function FilterGroup({ title, items }) {
  return <div className="filter-group"><h4>{title}</h4>{items.map((item, index) => <label key={item}><input type="checkbox" defaultChecked={index === 1} /> {item}</label>)}</div>;
}

function FlightResult({ flight, onSelect }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flight-result panel">
      <div className="airline"><div className="airline-mark">{flight.airline[0]}</div><div><h3>{flight.airline}</h3><p>{flight.code} · {flight.craft}</p></div></div>
      <div className="route-times"><strong>{flight.depart}</strong><span>JFK</span><div><Plane size={15} /><i /></div><strong>{flight.arrive}</strong><span>CDG</span></div>
      <div className="flight-meta"><b>{flight.stops}</b><span>{flight.duration}</span><small>Free meal · Free Wi‑Fi · 30kg baggage</small></div>
      <div className="fare"><strong>${flight.price}</strong><span>/person</span><button onClick={onSelect}>Select</button><a>View details</a></div>
    </motion.div>
  );
}

function AIPlanner() {
  return (
    <section className="screen ai-layout">
      <div className="panel ai-chat">
        <h2>AI Trip Planner ✦</h2>
        <div className="prompt">I want to go somewhere warm for a week in July under $700.</div>
        <p>Got it. I found one amazing destination for you.</p>
        {destinations.slice(0, 3).map((item) => <MiniItinerary key={item.city} item={item} />)}
        <button className="primary-btn wide">View full itinerary <ArrowRight size={16} /></button>
      </div>
      <div className="panel map-panel"><div className="world-map"><span>Bali $621</span><span>Phuket $612</span><span>Maldives $689</span></div></div>
      <div className="panel itinerary-detail"><h3>Bali, Indonesia <b>92%</b></h3><p>7 nights · AI confidence</p>{['Arrival in Bali', 'Ubud Exploration', 'Waterfall Adventure', 'Nusa Penida Island'].map((x, i) => <div className="day" key={x}><span>Day {i + 1}</span><strong>{x}</strong><p>Curated activity based on your budget and weather preference.</p></div>)}</div>
    </section>
  );
}

function MiniItinerary({ item }) {
  return <div className="mini-itinerary"><div className={`mini-img ${item.city.toLowerCase()}`} /><div><strong>{item.city}, {item.country}</strong><p>From ${item.price} · Best beach & culture match</p></div><Heart size={16} /></div>;
}

function PriceAlerts() {
  return (
    <section className="screen alerts-screen">
      <div className="section-title"><h2>Price Alerts Dashboard</h2><button>Create New Alert +</button></div>
      <div className="alert-grid">{alerts.map((alert) => <AlertCard key={alert.route} alert={alert} />)}</div>
      <div className="panel"><h3>Price Insights</h3><PriceTrendChart /></div>
    </section>
  );
}

function AlertCard({ alert }) {
  return <div className="panel alert-card"><div><h3>{alert.route}</h3><p>{alert.status}</p></div><strong>${alert.price}</strong><span className={alert.change.startsWith('+') ? 'up' : 'down'}>{alert.change}</span><div className="sparkline" /><button className="toggle-on" /></div>;
}

function TripsWishlist({ setScreen }) {
  return (
    <section className="screen trips-screen">
      <div className="section-title"><h2>Trips & Wishlist</h2><button>+ New Trip</button></div>
      <div className="trips-layout">
        <div className="panel trip-list">{trips.map((trip) => <TripRow key={trip.title} trip={trip} onClick={() => setScreen('checkout')} />)}</div>
        <div className="panel wishlist-map"><h3>My Wishlist</h3><div className="world-map small"><span>Iceland</span><span>Santorini</span><span>New Zealand</span></div><div className="stats-grid"><div><b>12</b><span>Saved</span></div><div><b>3</b><span>Upcoming</span></div><div><b>5</b><span>Visited</span></div><div><b>$1,842</b><span>Total Saved</span></div></div></div>
      </div>
    </section>
  );
}

function TripRow({ trip, onClick }) {
  return <button className="trip-row" onClick={onClick}><div className={`trip-thumb ${trip.image}`} /><div><h3>{trip.title}</h3><p>{trip.date}</p></div><span>{trip.status}</span><a>View Details</a></button>;
}

function Checkout() {
  return (
    <section className="screen checkout-layout">
      <div className="panel trip-summary"><h3>Your Trip</h3><FlightSummary /><button>Edit Search</button></div>
      <div className="panel form-panel"><h3>Passenger Details</h3><FormInput label="Full Name" value="Emily Johnson" /><FormInput label="Email" value="emily.johnson@email.com" /><FormInput label="Phone" value="+1 (555) 123-4567" /><FormInput label="Passport Number" value="A12345678" /></div>
      <div className="panel form-panel"><h3>Payment</h3><FormInput label="Card Number" value="4242 4242 4242 4242" /><div className="two-inputs"><FormInput label="Expiry" value="12 / 27" /><FormInput label="CVV" value="123" /></div><button className="primary-btn wide">Pay $487 <Lock size={15} /></button></div>
      <div className="panel secure-box"><ShieldCheck size={54} /><h3>Order Securely</h3><p>Best price guarantee, flexible options, and 24/7 support.</p></div>
    </section>
  );
}

function FlightSummary() {
  return <div className="flight-summary"><div><strong>New York (JFK)</strong><span>15 Jun · Sun</span></div><Plane size={18} /><div><strong>Paris (CDG)</strong><span>22 Jun · Sun</span></div><hr /><p>Air France · Economy · Non-stop</p><h2>$487.00</h2></div>;
}

function FormInput({ label, value }) {
  return <label className="form-input"><span>{label}</span><input defaultValue={value} /></label>;
}

function Profile() {
  return (
    <section className="screen profile-layout">
      <aside className="panel profile-menu">{['Profile', 'Personal Info', 'Payment Methods', 'Travel Preferences', 'Notifications', 'Privacy & Security', 'Help & Support'].map((item, i) => <button key={item} className={i === 0 ? 'active' : ''}>{item}</button>)}</aside>
      <div className="panel profile-card"><div className="profile-avatar">EJ</div><h2>Emily Johnson</h2><p>Premium Member</p><button>Edit Profile</button></div>
      <div className="panel membership-card"><h3>AeroNova Premium</h3><p>Member since Jan 2024</p><ul><li>Exclusive flight deals</li><li>Priority customer support</li><li>No hidden fees</li><li>Flexible booking</li></ul><button>Manage Membership</button></div>
      <div className="panel preferences"><h3>Travel Preferences</h3>{['Economy Class', 'Window Seat', 'Any Meal', 'English'].map((item) => <button key={item}>{item}</button>)}</div>
    </section>
  );
}

function Placeholder({ title }) {
  return <section className="screen"><div className="panel placeholder"><Compass size={56} /><h2>{title}</h2><p>This module is ready for the next development phase.</p></div></section>;
}

function MiniAlert({ alert }) {
  return <div className="mini-alert"><div><strong>{alert.route}</strong><p>{alert.status}</p></div><span>${alert.price}</span><button className="toggle-on" /></div>;
}

function PriceTrendChart() {
  return <div className="chart"><svg viewBox="0 0 500 180" preserveAspectRatio="none"><path d="M0 95 C40 40 70 150 110 92 C145 45 170 42 205 88 C240 135 270 70 305 72 C350 75 365 30 410 65 C450 105 470 65 500 52" fill="none" stroke="url(#g)" strokeWidth="4"/><defs><linearGradient id="g"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#22d3ee"/></linearGradient></defs></svg><div className="chart-tip">Jul 10–22<br /><b>$432</b></div></div>;
}

function BottomDock() {
  return <div className="bottom-dock"><button>Beats</button><button>Notes</button><button><Heart size={15} /></button><button><CalendarDays size={15} /></button><button><WalletCards size={15} /></button></div>;
}
