import React, { useState } from 'react';
import {
  Plane, Home, Hotel, Car, Bell, CalendarDays, Bot, Gift, ShieldCheck,
  Search, Heart, Star, Globe2, User, Settings, Headphones, Crown, Filter,
  SlidersHorizontal, ArrowRight, CreditCard, Lock, Compass, MapPin, Clock3,
  Luggage, WalletCards, CheckCircle2, ChevronRight, Sparkles
} from 'lucide-react';

const nav = [
  ['home', 'Home', Home], ['results', 'Flights', Plane], ['hotels', 'Hotels', Hotel],
  ['stays', 'Stays', Home], ['cars', 'Cars', Car], ['alerts', 'Price Alerts', Bell],
  ['trips', 'Trips', CalendarDays], ['ai', 'AI Planner', Bot], ['rewards', 'Rewards', Gift],
  ['visa', 'Visa Assistant', ShieldCheck]
];

const destinations = [
  ['Bali', 'Indonesia', 621, '4.8', 'Best match'],
  ['Tokyo', 'Japan', 712, '4.7', 'Popular'],
  ['Santorini', 'Greece', 583, '4.9', 'Premium'],
  ['Cape Town', 'South Africa', 689, '4.6', 'Adventure']
];

const flights = [
  ['Air France', 'AF 023', 'Airbus A350-900', '08:30', '20:45', '7h 15m', 'Non-stop', 487, 'BEST VALUE'],
  ['Delta Air Lines', 'DL 218', 'Boeing 767', '10:20', '22:40', '9h 20m', '1 Stop', 432, 'CHEAPEST'],
  ['Lufthansa', 'LH 402', 'Airbus A330', '18:45', '09:30', '8h 45m', '1 Stop', 532, 'COMFORT'],
  ['Emirates', 'EK 204', 'Airbus A380', '23:10', '17:05', '7h 55m', 'Non-stop', 698, 'PREMIUM']
];

const alerts = [
  ['New York → Paris', 487, '-12%', 'Price drops below $450'],
  ['New York → Tokyo', 712, '-8%', 'Price drops below $750'],
  ['New York → Bali', 621, '-5%', 'Fare watch active'],
  ['New York → London', 432, '+3%', 'Price above target']
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const content = {
    home: <HomeScreen setScreen={setScreen} />,
    results: <ResultsScreen setScreen={setScreen} />,
    details: <FlightDetails setScreen={setScreen} />,
    ai: <AIPlanner />,
    trips: <TripsScreen setScreen={setScreen} />,
    alerts: <AlertsScreen />,
    checkout: <CheckoutScreen />,
    profile: <ProfileScreen />,
    design: <DesignSystem />
  }[screen] || <Placeholder title={nav.find(([k]) => k === screen)?.[1] || 'Coming Soon'} />;

  return <div className="nova-app"><Sidebar screen={screen} setScreen={setScreen} /><main><TopBar setScreen={setScreen} />{content}</main></div>;
}

function Sidebar({ screen, setScreen }) {
  return <aside className="nova-sidebar">
    <div className="nova-brand"><Plane /><div><h1>AeroNova</h1><p>Premium AI travel platform</p></div></div>
    <nav>{nav.map(([key, label, Icon]) => <button key={key} onClick={() => setScreen(key)} className={screen === key ? 'active' : ''}><Icon size={16}/><span>{label}</span></button>)}</nav>
    <div className="premium"><h3>AeroNova Premium <Crown size={14}/></h3><p>Unlimited deals, priority support, no hidden fees.</p><button>Upgrade Now</button></div>
    <div className="side-actions"><button><Headphones size={15}/>Support</button><button><Settings size={15}/>Settings</button></div>
  </aside>;
}

function TopBar({ setScreen }) {
  return <header className="nova-topbar">
    <div className="top-search"><Search size={17}/><span>Search destinations, flights...</span><kbd>⌘ K</kbd></div>
    <div className="top-right"><Globe2 size={17}/><span>USD</span><Bell size={17}/><button onClick={() => setScreen('profile')} className="avatar">EJ</button></div>
  </header>;
}

function ScreenBadge({ n, title }) { return <div className="screen-badge"><b>{n}.</b> {title}</div>; }

function HomeScreen({ setScreen }) {
  return <section className="nova-page home-page">
    <div className="hero-card">
      <div className="hero-sky" />
      <div className="hero-copy"><p>Good evening, Emily 👋</p><h2>Where will your<br/>next <span>adventure</span> take you?</h2></div>
      <WeatherCard />
      <SearchPanel onSearch={() => setScreen('results')} />
    </div>
    <Panel className="top-destinations" title="Top Destinations" sub="Recommended for you" action="View all">
      <div className="destination-row">{destinations.map((d) => <Destination key={d[0]} data={d}/>)}</div>
    </Panel>
    <Panel className="price-trends" title="Price Trends" sub="New York → Paris" action="Next 6 months"><Chart /></Panel>
    <BottomDock />
  </section>;
}

function WeatherCard(){return <div className="weather"><b>Paris, France</b><strong>24°C</strong><span>Mostly Cloudy</span></div>}

function SearchPanel({ onSearch }) {
  return <div className="search-panel-ref">
    <div className="segmented"><button className="active">Round Trip</button><button>One Way</button><button>Multi City</button></div>
    <div className="search-grid-ref">
      <MiniField label="From" value="New York (JFK)" sub="John F. Kennedy Intl." />
      <button className="swap">↔</button>
      <MiniField label="To" value="Paris, France" sub="Charles de Gaulle (CDG)" />
      <MiniField label="Depart" value="15 Jun, 2025" sub="Sun" />
      <MiniField label="Return" value="22 Jun, 2025" sub="Sun" />
      <MiniField label="Travelers" value="1 Traveler" sub="Economy" />
      <button onClick={onSearch} className="search-flight">Search Flights <ArrowRight size={15}/></button>
    </div>
    <div className="quick-row"><button>Flexible Dates</button><button>Nearby Airports</button><button>Direct Flights</button><button>Add Bags</button><button>More Filters</button></div>
  </div>
}
function MiniField({label,value,sub}){return <div className="mini-field"><small>{label}</small><b>{value}</b><span>{sub}</span></div>}

function Destination({ data }) { const [city,country,price,rating,tag]=data; return <div className="dest-card"><div className={`photo ${city.toLowerCase().replace(' ','-')}`}/><button><Heart size={14}/></button><span>{tag}</span><h4>{city}</h4><p>{country}</p><footer><em><Star size={13} fill="currentColor"/> {rating}</em><b>${price}</b></footer></div> }

function ResultsScreen({ setScreen }) {
  return <section className="nova-page result-page">
    <ScreenBadge n="2" title="Search Results" />
    <div className="route-summary"><div><h2>New York → Paris</h2><p>15 Jun — 22 Jun · 1 Traveler · Economy</p></div><button>Change Search</button></div>
    <aside className="filters-ref"><FilterHead/><FilterBlock title="Stops" rows={['Non-stop ($612)','1 Stop ($432)','2+ Stops ($389)']} /><FilterBlock title="Airlines" rows={['Delta $432','Air France $487','Lufthansa $532','Emirates $698']} /><div className="range"><p>Price Range</p><span/></div></aside>
    <div className="results-ref"><div className="sort-tabs"><button className="active">Best $432</button><button>Cheapest $389</button><button>Fastest $612</button><button>Recommended $487</button><button><SlidersHorizontal size={14}/> Sort & Filter</button></div>{flights.map((f,i)=><FlightRow key={f[0]} f={f} i={i} onSelect={()=>setScreen('details')}/>)}</div>
  </section>
}
function FilterHead(){return <div className="filter-head"><h3>Filters</h3><button>Clear all</button></div>}
function FilterBlock({title,rows}){return <div className="filter-block"><h4>{title}</h4>{rows.map((r,i)=><label key={r}><input type="checkbox" defaultChecked={i===1}/> {r}</label>)}</div>}
function FlightRow({ f, i, onSelect }) { return <div className="flight-row"><div className="airline-logo">{f[0][0]}</div><div><strong>{f[0]}</strong><small>{f[1]} · {f[2]}</small></div><div className="time-block"><b>{f[3]}</b><span>JFK</span></div><div className="flight-line"><Plane size={14}/><i/></div><div className="time-block"><b>{f[4]}</b><span>CDG</span></div><div className="meta"><b>{f[6]}</b><span>{f[5]}</span><small>Free Meal · Wi‑Fi · 30kg Baggage</small></div><div className="fare"><strong>${f[7]}</strong><button onClick={onSelect}>Select</button><a>View details</a></div>{i===0&&<em className="tag">{f[8]}</em>}</div> }

function FlightDetails({ setScreen }) {
  return <section className="nova-page details-page"><ScreenBadge n="3" title="Flight Details" />
    <div className="plane-hero"><div><h2>Air France</h2><p>AF 023 · Airbus A350-900</p><span>Best Value</span></div></div>
    <div className="timeline-card"><div><h2>JFK</h2><p>New York</p><b>08:30</b><span>Sun, 15 Jun</span></div><div className="route-line"><Plane/><i/><small>7h 15m · Non-stop</small></div><div><h2>CDG</h2><p>Paris</p><b>20:45</b><span>Sun, 15 Jun</span></div></div>
    <div className="fare-options"><Fare name="Economy" price="487" active/><Fare name="Premium Economy" price="782"/><Fare name="Business" price="1,432"/></div>
    <button className="continue" onClick={()=>setScreen('checkout')}>Continue to Booking <ArrowRight size={16}/></button>
  </section>
}
function Fare({name,price,active}){return <div className={active?'fare-option active':'fare-option'}><h3>{name}</h3><b>${price}</b><p>30kg baggage · free meal · seat selection · Wi‑Fi</p></div>}

function AIPlanner(){return <section className="nova-page ai-page"><ScreenBadge n="4" title="AI Trip Planner"/><div className="ai-left"><h2>AI Trip Planner ✨</h2><div className="prompt-box">I want to go somewhere warm for a week in July under $700.</div><p>Here are the best options for you.</p>{['Bali, Indonesia','Phuket, Thailand','Maldives'].map((x,i)=><div className="ai-trip" key={x}><div className="photo bali"/><div><b>{x}</b><p>From ${[621,612,689][i]} · 4.8 rating</p></div><Heart size={15}/></div>)}<button>View full itinerary <ArrowRight size={15}/></button></div><div className="ai-right"><h2>Bali, Indonesia <span>92%</span></h2>{['Arrival in Bali','Ubud Exploration','Waterfall Adventure','Nusa Penida Island'].map((d,i)=><div className="day-card" key={d}><b>Day {i+1}</b><h4>{d}</h4><p>Personalized activity from your AI assistant.</p></div>)}</div></section>}

function TripsScreen({setScreen}){return <section className="nova-page trips-page"><ScreenBadge n="5" title="Trips & Wishlist"/><div className="trip-list-panel"><Tabs/><TripItem title="Paris, France" status="Confirmed"/><TripItem title="Tokyo, Japan" status="Upcoming"/><TripItem title="Bali, Indonesia" status="Planning"/><button onClick={()=>setScreen('details')}>View Details</button></div><div className="map-wishlist"><h3>My Wishlist</h3><div className="world"><span>Iceland</span><span>Dubai</span><span>New Zealand</span><span>Brazil</span></div><div className="stat-grid"><Stat n="12" t="Saved"/><Stat n="3" t="Upcoming"/><Stat n="5" t="Visited"/><Stat n="$1,842" t="Total Saved"/></div></div></section>}
function Tabs(){return <div className="tabs"><button className="active">Upcoming Trips</button><button>Saved (12)</button><button>Completed</button></div>}
function TripItem({title,status}){return <div className="trip-item"><div className="thumb"/><div><h3>{title}</h3><p>15 Jun — 22 Jun, 2025</p></div><span>{status}</span></div>}
function Stat({n,t}){return <div><b>{n}</b><span>{t}</span></div>}

function AlertsScreen(){return <section className="nova-page alerts-page"><ScreenBadge n="6" title="Price Alerts"/><div className="section-line"><h2>Active Alerts</h2><button>Create New Alert +</button></div>{alerts.map(a=><div className="alert-row" key={a[0]}><div><b>{a[0]}</b><p>{a[3]}</p></div><strong>${a[1]}</strong><span className={a[2].startsWith('+')?'red':'green'}>{a[2]}</span><div className="spark"/><button className="toggle"/></div>)}<div className="insights"><h3>Price Insights</h3><Chart/></div></section>}

function CheckoutScreen(){return <section className="nova-page checkout-page"><ScreenBadge n="7" title="Checkout"/><div className="stepper"><span>1 Review</span><span>2 Traveler</span><span>3 Payment</span><span>4 Confirm</span></div><div className="checkout-grid"><div className="summary"><h3>Your Trip</h3><p>New York (JFK) → Paris (CDG)</p><b>$487.00</b></div><FormPanel title="Passenger Details"/><PaymentPanel/><div className="secure"><ShieldCheck size={54}/><h3>Order Securely</h3><p>Best price guarantee, flexible options and 24/7 support.</p></div></div></section>}
function FormPanel({title}){return <div className="form-panel-ref"><h3>{title}</h3>{['Full Name','Email','Phone','Passport Number'].map(x=><label key={x}>{x}<input defaultValue={x==='Full Name'?'Emily Johnson':''}/></label>)}</div>}
function PaymentPanel(){return <div className="form-panel-ref"><h3>Payment</h3><label>Card Number<input defaultValue="4242 4242 4242 4242"/></label><div className="two"><label>Expiry<input defaultValue="12 / 27"/></label><label>CVV<input defaultValue="123"/></label></div><button>Pay $487 USD <Lock size={14}/></button></div>}

function ProfileScreen(){return <section className="nova-page profile-page"><ScreenBadge n="8" title="Profile & Preferences"/><div className="profile-card-ref"><div className="profile-photo">EJ</div><h2>Emily Johnson</h2><p>Premium Member</p><div className="profile-stats"><Stat n="18" t="Trips"/><Stat n="12,450" t="Points"/><Stat n="12" t="Saved"/></div></div><div className="menu-card">{['Personal Information','Payment Methods','Travel Preferences','Notifications','Privacy & Security','Help & Support'].map(x=><button key={x}>{x}<ChevronRight size={15}/></button>)}</div></section>}

function DesignSystem(){return <section className="nova-page design-page"><ScreenBadge n="1" title="Design System"/><div className="system-grid"><Panel title="Colors"><div className="swatches"><i/><i/><i/><i/><i/></div></Panel><Panel title="Buttons"><button className="continue">Primary Button</button><button>Secondary Button</button></Panel><Panel title="Cards"><Destination data={destinations[0]}/></Panel><Panel title="Data Visualization"><Chart/></Panel></div></section>}
function Placeholder({title}){return <section className="nova-page"><div className="placeholder"><Compass size={50}/><h2>{title}</h2><p>This module is ready for the next phase.</p></div></section>}
function Panel({title,sub,action,className='',children}){return <div className={`panel-ref ${className}`}><div className="panel-title"><div><h3>{title}</h3>{sub&&<p>{sub}</p>}</div>{action&&<button>{action}</button>}</div>{children}</div>}
function Chart(){return <div className="chart-ref"><svg viewBox="0 0 500 180" preserveAspectRatio="none"><path d="M0 95 C40 42 70 150 110 92 C145 45 170 42 205 88 C240 135 270 70 305 72 C350 75 365 30 410 65 C450 105 470 65 500 52" fill="none" stroke="#a855f7" strokeWidth="4"/></svg><div className="tip">Jul 10–22<br/><b>$432</b></div></div>}
function BottomDock(){return <div className="bottom-dock-ref"><button>Score</button><button>Notes</button><button><Heart size={14}/></button><button><CalendarDays size={14}/></button><button><WalletCards size={14}/></button></div>}
