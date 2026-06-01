import React from 'react';
import { Plane, Home, Hotel, Car, Bell, CalendarDays, Bot, Gift, ShieldCheck, Search, Heart, Star, Globe2, Crown, SlidersHorizontal, ArrowRight, Lock, Settings, User, WalletCards } from 'lucide-react';

const flights = [
  ['Air France', '08:30', '20:45', '$487', 'BEST VALUE'],
  ['Delta Air Lines', '10:20', '22:40', '$432', 'CHEAPEST'],
  ['Lufthansa', '18:45', '09:30', '$532', 'COMFORT'],
  ['Emirates', '23:10', '17:05', '$698', 'PREMIUM']
];

const destinations = [
  ['Bali', 'Indonesia', '$621', '4.8'],
  ['Tokyo', 'Japan', '$712', '4.7'],
  ['Santorini', 'Greece', '$583', '4.9'],
  ['Cape Town', 'South Africa', '$689', '4.6']
];

export default function App() {
  return (
    <div className="board-app">
      <div className="stars" />
      <section className="design-board">
        <HomeBoard />
        <ResultsBoard />
        <DetailsBoard />
        <AIPlannerBoard />
        <TripsBoard />
        <AlertsBoard />
        <CheckoutBoard />
        <ProfileBoard />
      </section>
    </div>
  );
}

function Badge({ n, title }) { return <div className="screen-label"><b>{n}.</b> {title}</div>; }
function Card({ children, className = '' }) { return <div className={`glass ${className}`}>{children}</div>; }

function HomeBoard() {
  return <div className="screen home-board">
    <SideNav />
    <main className="home-main">
      <div className="home-topbar"><div className="search-pill"><Search size={14}/> Search destinations, flights... <kbd>⌘K</kbd></div><div className="currency"><Globe2 size={13}/> USD 🔔 <span className="face">EJ</span></div></div>
      <section className="hero-ref"><div><p>Good evening, Emily 👋</p><h1>Where will your<br/>next <span>adventure</span> take you?</h1></div><div className="weather-ref"><b>Paris, France</b><strong>24°C</strong><small>Mostly Cloudy</small></div></section>
      <SearchStrip />
      <div className="home-lower">
        <Card className="destinations-panel"><PanelHead title="Top Destinations" sub="Recommended for you" /> <div className="dest-row">{destinations.map((d)=><Destination key={d[0]} d={d}/>)}</div></Card>
        <Card className="trend-panel"><PanelHead title="Price Trends" sub="New York → Paris" /><MiniChart /></Card>
      </div>
      <div className="mini-dock"><button>Score</button><button>Notes</button><button>♡</button><button>☆</button><button>⚙</button></div>
    </main>
  </div>
}

function SideNav(){const items=[['Home',Home],['Flights',Plane],['Hotels',Hotel],['Stays',Home],['Cars',Car],['Price Alerts',Bell],['Trips',CalendarDays],['AI Planner',Bot],['Rewards',Gift],['Visa Assistant',ShieldCheck]];return <aside className="side-ref"><div className="brand-ref"><Plane/><h2>AeroNova</h2></div>{items.map(([t,I],i)=><button className={i===0?'active':''} key={t}><I size={12}/>{t}</button>)}<div className="premium-ref"><p>AeroNova</p><h3>Premium <Crown size={12}/></h3><small>Unlimited deals<br/>Priority support<br/>No hidden fees</small><button>Upgrade Now</button></div></aside>}
function SearchStrip(){return <Card className="search-ref"><div className="tabs-ref"><button>Round Trip</button><button>One Way</button><button>Multi City</button></div><div className="fields-ref"><Field l="From" v="New York (JFK)" s="John F. Kennedy Intl."/><button className="swap-ref">↔</button><Field l="To" v="Paris, France" s="Charles de Gaulle (CDG)"/><Field l="Depart" v="15 Jun, 2025" s="Sun"/><Field l="Return" v="22 Jun, 2025" s="Sun"/><Field l="Travelers" v="1 Traveler" s="Economy"/><button className="search-btn-ref">Search Flights <ArrowRight size={12}/></button></div><div className="filters-row"><button>Flexible Dates</button><button>Nearby Airports</button><button>Direct Flights</button><button>Add Bags</button><button>More Filters</button></div></Card>}
function Field({l,v,s}){return <div className="field-ref"><small>{l}</small><b>{v}</b><span>{s}</span></div>}
function PanelHead({title,sub}){return <div className="panel-head-ref"><div><h3>{title}</h3><p>{sub}</p></div><button>View all</button></div>}
function Destination({d}){return <div className="dest-ref"><div className={`dest-img ${d[0].toLowerCase().replace(' ','-')}`}/><Heart size={11} className="heart"/><h4>{d[0]}</h4><p>{d[1]}</p><footer><span><Star size={10} fill="currentColor"/> {d[3]}</span><b>{d[2]}</b></footer></div>}
function MiniChart(){return <div className="chart-ref"><svg viewBox="0 0 300 120"><path d="M0 65 C30 20 55 105 83 70 C115 32 142 45 170 74 C205 112 220 18 250 52 C270 80 288 36 300 30" fill="none" stroke="#a855f7" strokeWidth="4"/></svg><div className="tip-ref">Best time to buy<br/><b>$432</b></div></div>}

function ResultsBoard(){return <div className="screen results-board"><Badge n="2" title="Search Results"/><div className="results-route"><h2>New York → Paris</h2><p>15 Jun - 22 Jun · 1 Traveler · Economy</p><button>Change Search</button></div><div className="results-content"><aside className="filters-ref"><h3>Filters</h3>{['Non-stop ($612)','1 Stop ($432)','2+ Stops ($389)'].map((x,i)=><label key={x}><input type="checkbox" defaultChecked={i===1}/> {x}</label>)}<h4>Airlines</h4>{['Delta $432','Air France $487','Lufthansa $532','Emirates $698'].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}<div className="range-ref"/></aside><main className="flight-list-ref"><div className="sort-ref"><button>Best $432</button><button>Cheapest $389</button><button>Fastest $612</button><button>Recommended $487</button><button><SlidersHorizontal size={10}/> Sort</button></div>{flights.map((f,i)=><FlightLine key={f[0]} f={f} first={i===0}/>)}</main></div></div>}
function FlightLine({f,first}){return <div className="flight-line-card">{first&&<span className="best-tag">{f[4]}</span>}<div className="airmark">{f[0][0]}</div><div><b>{f[0]}</b><small>AF 023 · Airbus A350</small></div><div className="time"><b>{f[1]}</b><span>JFK</span></div><div className="plane-line"><Plane size={10}/><i/></div><div className="time"><b>{f[2]}</b><span>CDG</span></div><div><small>Non-stop</small><p>7h 15m</p></div><div className="price"><strong>{f[3]}</strong><button>Select</button><a>View details</a></div></div>}

function DetailsBoard(){return <div className="screen details-board"><Badge n="3" title="Flight Details"/><div className="plane-hero-ref"><button>←</button><div><b>Air France</b><p>AF 023 · Airbus A350-900</p><span>Best Value</span></div></div><Card className="timeline-ref"><div><h2>JFK</h2><p>New York</p><b>08:30</b><small>Sun, 15 Jun</small></div><div className="center-line"><Plane/><i/><span>7h 15m<br/>Non-stop</span></div><div><h2>CDG</h2><p>Paris</p><b>20:45</b><small>Sun, 15 Jun</small></div></Card><div className="fare-grid"><Fare active name="Economy" price="$487"/><Fare name="Premium Economy" price="$782"/><Fare name="Business" price="$1,432"/></div><button className="continue-ref">Continue to Booking <ArrowRight size={12}/></button></div>}
function Fare({name,price,active}){return <Card className={active?'fare-ref active':'fare-ref'}><h3>{name}</h3><b>{price}</b><p>30kg baggage<br/>Free meal<br/>Seat selection<br/>Free Wi‑Fi</p></Card>}

function AIPlannerBoard(){return <div className="screen ai-board"><Badge n="4" title="AI Trip Planner"/><div className="ai-shell"><aside><h2>AI Trip Planner ✨</h2><div className="prompt-ref">I want to go somewhere warm for a week in July under $700.</div><div className="chips-ref"><span>Warm</span><span>1 Week</span><span>July</span><span>Under $700</span></div>{['Bali, Indonesia','$621','Phuket, Thailand','$612','Maldives','$689'].reduce((acc,cur,i,arr)=>i%2?acc:[...acc,[cur,arr[i+1]]],[]).map(([t,p])=><div className="ai-option" key={t}><div className="small-photo"/><div><b>{t}</b><p>4.8 · 7 nights</p></div><strong>{p}</strong></div>)}<button>View full itinerary <ArrowRight size={12}/></button></aside></div></div>}

function TripsBoard(){return <div className="screen trips-board"><Badge n="5" title="Trips & Wishlist"/><div className="trip-tabs"><button>Upcoming Trips</button><button>Saved (12)</button><button>Completed</button></div>{['Paris, France','Tokyo, Japan','Bali, Indonesia'].map((t,i)=><div className="trip-row-ref" key={t}><div className="trip-img"/><div><h3>{t}</h3><p>{i===0?'15 Jun - 22 Jun, 2025':'10 Jul - 17 Jul, 2025'}</p></div><span>{i===0?'Confirmed':i===1?'Upcoming':'Planning'}</span></div>)}<Card className="average-ref">Average prices are <b>18% lower</b> than last month for flights to Europe.</Card></div>}

function AlertsBoard(){return <div className="screen alerts-board"><Badge n="6" title="Price Alerts"/><h3>Active Alerts</h3>{alerts.map((a,i)=><div className="alert-ref" key={a[0]}><div><b>{a[0]}</b><p>{a[3]}</p></div><strong>{a[1]}</strong><span className={i===3?'bad':'good'}>{a[2]}</span><div className="spark-ref"/><button className="toggle-ref"/></div>)}<Card className="insight-ref"><h3>Price Insights</h3><MiniChart/></Card></div>}

function CheckoutBoard(){return <div className="screen checkout-board"><Badge n="7" title="Checkout"/><div className="steps-ref"><span>1 Review</span><span>2 Traveler</span><span>3 Payment</span><span>4 Confirm</span></div><Card className="checkout-card"><h3>Your Trip</h3><p>New York (JFK) → Paris (CDG)</p><b>Air France · Economy · Non-stop</b><hr/><p>Base Fare <span>$420.00</span></p><p>Taxes & Fees <span>$67.00</span></p><h2>Total Amount <span>$487.00</span></h2><button>Proceed to Payment <ArrowRight size={12}/></button></Card><Card className="secure-ref"><Lock size={25}/><b>Secure Booking</b><small>256-bit SSL encryption</small></Card></div>}

function ProfileBoard(){return <div className="screen profile-board"><Badge n="8" title="Profile & Preferences"/><Card className="profile-head"><div className="profile-pic">EJ</div><div><h2>Emily Johnson</h2><p>Premium Member</p></div></Card><div className="profile-stats"><Stat n="18" t="Trips"/><Stat n="12,450" t="Points"/><Stat n="12" t="Saved"/></div><Card className="profile-menu">{['Personal Information','Payment Methods','Travel Preferences','Notifications','Privacy & Security','Help & Support','Logout'].map(x=><button key={x}>{x}<span>›</span></button>)}</Card></div>}
function Stat({n,t}){return <div><b>{n}</b><span>{t}</span></div>}
