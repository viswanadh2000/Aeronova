import React, { useState } from 'react'
import {
  Plane, Building, BedDouble, Car, Heart, Bell, User, Settings, Search,
  Compass, Sparkles, MapPin, Calendar, DollarSign, Shield, CreditCard,
  ChevronRight, ArrowRight, Star, Clock, Wifi, Briefcase, Luggage,
  Check, Plus, Minus, Send, Bot, Map, TrendingDown, AlertTriangle,
  Info, LogOut, HelpCircle, Crown, Zap, Menu, X, ThumbsUp, Eye,
  ShoppingBag, Globe, Anchor, Coffee, Sun, CloudRain, Snowflake, Wind,
  Sunrise, Sunset, ThermometerSun, Umbrella, Navigation, BatteryCharging
} from 'lucide-react'
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

// ── Data ──────────────────────────────────────────────────────────
const destinations = [
  { name: 'Bali', country: 'Indonesia', price: 621, rating: 4.8, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=500&fit=crop', temp: 29 },
  { name: 'Tokyo', country: 'Japan', price: 712, rating: 4.7, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=500&fit=crop', temp: 22 },
  { name: 'Santorini', country: 'Greece', price: 583, rating: 4.9, img: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4284?w=400&h=500&fit=crop', temp: 26 },
  { name: 'Cape Town', country: 'South Africa', price: 689, rating: 4.6, img: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=500&fit=crop', temp: 18 },
]

const flights = [
  { airline: 'Air France', code: 'AF', logoColor: '#002157', dep: '08:30', arr: '20:45', from: 'JFK', to: 'CDG', duration: '7h 15m', stops: 'Non-stop', price: 487, tag: 'BEST VALUE', features: ['Free Meal', 'Free Wi-Fi', '30kg Baggage'] },
  { airline: 'Delta', code: 'DL', logoColor: '#E31937', dep: '19:30', arr: '10:50', from: 'JFK', to: 'CDG', duration: '9h 20m', stops: '1 stop (AMS)', price: 432, tag: '', features: ['Free Meal', 'Free Wi-Fi', '30kg Baggage'] },
  { airline: 'Lufthansa', code: 'LH', logoColor: '#05164D', dep: '17:45', arr: '09:15', from: 'JFK', to: 'CDG', duration: '8h 30m', stops: '1 stop (MUC)', price: 472, tag: '', features: ['Free Meal', 'Free Wi-Fi', '30kg Baggage'] },
  { airline: 'Norse', code: 'N0', logoColor: '#1B1B1B', dep: '21:15', arr: '13:55', from: 'JFK', to: 'CDG', duration: '10h 40m', stops: '1 stop (OSL)', price: 389, tag: 'CHEAPEST', features: ['Free Wi-Fi', '23kg Baggage'] },
]

const priceTrendData = [
  { month: 'Jun', price: 420 }, { month: 'Jul', price: 432 }, { month: 'Aug', price: 510 },
  { month: 'Sep', price: 480 }, { month: 'Oct', price: 390 }, { month: 'Nov', price: 360 },
]

const alertSparklines = {
  'New York → Paris': [{v:460},{v:455},{v:450},{v:448},{v:452},{v:445},{v:440},{v:438},{v:435},{v:432},{v:430},{v:487}],
  'New York → Tokyo': [{v:720},{v:715},{v:712},{v:708},{v:710},{v:705},{v:700},{v:698},{v:695},{v:692},{v:690},{v:712}],
  'New York → Bali': [{v:650},{v:645},{v:640},{v:638},{v:635},{v:630},{v:628},{v:625},{v:622},{v:620},{v:618},{v:621}],
  'New York → London': [{v:450},{v:445},{v:440},{v:438},{v:435},{v:432},{v:430},{v:428},{v:425},{v:422},{v:420},{v:432}],
}

const seatMap = Array.from({ length: 20 }, (_, r) =>
  Array.from({ length: 10 }, (_, c) => {
    if (r < 2) return c < 2 || c > 7 ? 'extra' : 'available'
    if (Math.random() > 0.7) return 'occupied'
    return 'available'
  })
)

const reviewStars = [5, 4, 3, 2, 1]
const reviewDistribution = [65, 18, 10, 5, 2]

// ── Shared Components ─────────────────────────────────────────────
const BoardLabel = ({ num, text }) => (
  <div className="board-label">
    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800 }}>{num}</span>
    {text}
  </div>
)

const LogoMark = () => (
  <div className="logo-mark">
    <Plane size={22} style={{ transform: 'rotate(25deg)' }} />
  </div>
)

const AirlineLogo = ({ code, color }) => (
  <div className="airline-logo" style={{ background: color, color: 'white', fontSize: 11 }}>
    {code}
  </div>
)

const Sparkline = ({ data, color = '#7C3AED', width = 200, height = 50 }) => {
  const values = data.map(x => x.v)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d.v - min) / range) * (height - 4) - 2
    return [x, y]
  })
  const lineD = `M${points[0][0]},${points[0][1]} ` + points.slice(1).map(p => `L${p[0]},${p[1]}`).join(' ')
  const areaD = `M${points[0][0]},${height} ` + points.map(p => `L${p[0]},${p[1]}`).join(' ') + ` L${points[points.length-1][0]},${height} Z`
  const gradId = `grad-${color.replace('#','')}`

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradId})`} />
      <path d={lineD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Screen 1: Home ────────────────────────────────────────────────
const HomeBoard = () => {
  const [tripType, setTripType] = useState('Round Trip')

  return (
    <div className="board-card" style={{ minWidth: 580 }}>
      <BoardLabel num={1} text="Home" />
      <div className="home-grid">
        {/* Hero */}
        <div className="hero-panel panel">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="ai-pill">
              <Sparkles size={14} /> AI Powered
            </div>
            <h2>Where will your next <em>adventure</em> take you?</h2>
          </div>
          <div className="weather-widget">
            <h4>Paris, France</h4>
            <div className="temp">24°C</div>
            <p>Mostly Cloudy</p>
          </div>
        </div>

        {/* Search Card */}
        <div className="search-card">
          <div className="trip-tabs">
            {['Round Trip', 'One Way', 'Multi City'].map(t => (
              <button
                key={t}
                className={tripType === t ? 'selected' : ''}
                onClick={() => setTripType(t)}
              >{t}</button>
            ))}
          </div>
          <div className="search-fields">
            <div className="input-block">
              <small>From</small>
              <strong>New York (JFK)</strong>
              <span>John F. Kennedy Intl.</span>
            </div>
            <div className="input-block">
              <small>To</small>
              <strong>Paris, France</strong>
              <span>Charles de Gaulle (CDG)</span>
            </div>
            <div className="input-block">
              <small>Depart</small>
              <strong>15 Jun, 2025</strong>
              <span>Sun</span>
            </div>
            <div className="input-block">
              <small>Return</small>
              <strong>22 Jun, 2025</strong>
              <span>Sun</span>
            </div>
            <div className="input-block">
              <small>Travelers</small>
              <strong>1 Traveler</strong>
              <span>Economy</span>
            </div>
            <button className="btn-primary">
              <Search size={18} /> Search Flights
            </button>
          </div>
          <div className="quick-filters">
            <button><Calendar size={14} /> Flexible Dates</button>
            <button><MapPin size={14} /> Nearby Airports</button>
            <button><Navigation size={14} /> Direct Flights</button>
            <button><Luggage size={14} /> Add Bags</button>
            <button className="ai-search"><Sparkles size={14} /> More Filters</button>
          </div>
        </div>

        {/* Destinations */}
        <div className="panel destination-panel">
          <div className="panel-head">
            <div>
              <h3>Top Destinations</h3>
              <p>Recommended for you</p>
            </div>
            <button>View all <ChevronRight size={14} /></button>
          </div>
          <div className="dest-grid">
            {destinations.map(d => (
              <div key={d.name} className="dest-card">
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="dest-overlay">
                  <button className="heart-btn"><Heart size={14} /></button>
                  <h4>{d.name}</h4>
                  <p>{d.country}</p>
                  <div className="dest-price">from ${d.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Trends */}
        <div className="panel trends-panel">
          <div className="panel-head">
            <div>
              <h3>Price Trends</h3>
              <p>Next 6 months</p>
            </div>
            <button><X size={14} /></button>
          </div>
          <div className="trend-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrendData}>
                <defs>
                  <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: 'rgba(124,58,237,0.9)', border: 0, borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 700 }}
                  itemStyle={{ color: 'white' }}
                  formatter={(v) => [`$${v}`, 'Price']}
                />
                <Area type="monotone" dataKey="price" stroke="#7C3AED" strokeWidth={3} fill="url(#priceGrad)" dot={{ r: 4, fill: '#7C3AED', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Alerts */}
        <div className="panel alerts-mini">
          <div className="panel-head">
            <div>
              <h3>Price Alerts</h3>
              <p>4 active alerts</p>
            </div>
            <button>View all</button>
          </div>
          <div className="mini-alert">
            <div>
              <strong>New York → Paris</strong>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94A3B8' }}>Price dropped 12% — now $487</p>
            </div>
            <button>Book Now</button>
          </div>
          <div className="mini-alert">
            <div>
              <strong>New York → Tokyo</strong>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94A3B8' }}>Price dropped 8% — now $712</p>
            </div>
            <button>Book Now</button>
          </div>
        </div>

        {/* Dock */}
        <div className="dock">
          {[
            { icon: Search, active: true },
            { icon: Compass },
            { icon: Calendar },
            { icon: Heart },
            { icon: User },
            { icon: Settings },
          ].map((d, i) => (
            <button key={i} className={d.active ? 'active' : ''}>
              <d.icon size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Screen 2: Search Results ──────────────────────────────────────
const ResultsBoard = () => {
  const [sortBy, setSortBy] = useState('Best')
  const sortOptions = ['Best', 'Cheapest', 'Fastest', 'Recommended']

  return (
    <div className="board-card" style={{ minWidth: 620 }}>
      <BoardLabel num={2} text="Search Results" />
      <div className="results-header">
        <div>
          <h2>New York → Paris</h2>
          <p>15 Jun – 22 Jun · 1 Traveler · Economy</p>
        </div>
        <button>Change Search <ChevronRight size={14} /></button>
      </div>

      <div className="results-layout">
        {/* Filter Sidebar */}
        <div className="filter-sidebar">
          <div className="filter-group">
            <h4>Stops</h4>
            {[
              { label: 'Non-stop (45)', count: 612 },
              { label: '1 Stop (32)', count: 432 },
              { label: '2+ Stops (28)', count: 358 },
            ].map(f => (
              <label key={f.label}>
                <input type="checkbox" defaultChecked={f.label.includes('Non-stop')} />
                <span>{f.label}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <input type="range" className="price-slider" min="200" max="1500" defaultValue="1500" />
            <div className="price-range-labels">
              <span>$200</span>
              <span>$1,500+</span>
            </div>
          </div>

          <div className="filter-group">
            <h4>Airlines</h4>
            {[
              { label: 'Air France', price: 432 },
              { label: 'Delta', price: 445 },
              { label: 'Lufthansa', price: 472 },
              { label: 'Emirates', price: 612 },
            ].map(f => (
              <label key={f.label}>
                <input type="checkbox" defaultChecked />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div>
          <div className="sort-tabs">
            {sortOptions.map(s => (
              <button
                key={s}
                className={`sort-tab ${sortBy === s ? 'active' : ''}`}
                onClick={() => setSortBy(s)}
              >{s}</button>
            ))}
          </div>

          {flights.map((f, i) => (
            <div key={i} className={`flight-card ${f.tag ? 'best' : ''}`}>
              <AirlineLogo code={f.code} color={f.logoColor} />
              <div className="flight-info">
                <h4>{f.airline}</h4>
                <p>{f.code} {Math.floor(Math.random()*900)+100} · Airbus A350</p>
              </div>
              <div className="flight-times">
                <span>{f.dep}</span>
                <ArrowRight size={16} className="arrow" />
                <span>{f.arr}</span>
              </div>
              <div className="flight-meta">
                <div className="duration">{f.duration}</div>
                <div className="stops">{f.stops}</div>
              </div>
              <div className="flight-price">
                <div className="price">${f.price}</div>
                <div className="per">/person</div>
                <button className="btn-primary" style={{ marginTop: 8 }}>
                  {f.tag || 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="insights-panel">
          <div className="panel-head">
            <div>
              <h3>Price Trend</h3>
              <p>Next 6 months</p>
            </div>
          </div>
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrendData}>
                <defs>
                  <linearGradient id="insightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
                <Area type="monotone" dataKey="price" stroke="#7C3AED" strokeWidth={2} fill="url(#insightGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="panel-head" style={{ marginTop: 16 }}>
            <div>
              <h3>Fare Insights</h3>
            </div>
          </div>
          <div className="insight-row">
            <Check size={16} color="#34D399" />
            <p><strong>Prices will likely increase in 6 days</strong>Historical trend</p>
          </div>
          <div className="insight-row">
            <Check size={16} color="#34D399" />
            <p><strong>Best time to buy: Now</strong>Based on 60 day prediction</p>
          </div>
          <button className="btn-secondary" style={{ width: '100%', marginTop: 12 }}>
            View full analysis <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Screen 3: Flight Details ──────────────────────────────────────
const DetailsBoard = () => {
  const [activeTab, setActiveTab] = useState('Details')
  const tabs = ['Details', 'Seats', 'Baggage', 'Reviews']
  const [selectedSeats, setSelectedSeats] = useState([])
  const [fareClass, setFareClass] = useState('Economy')

  const toggleSeat = (r, c) => {
    const key = `${r}-${c}`
    setSelectedSeats(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key])
  }

  return (
    <div className="board-card" style={{ minWidth: 620 }}>
      <BoardLabel num={3} text="Flight Details" />

      <div className="details-hero">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=400&fit=crop" alt="Airplane" />
        <div className="details-hero-content">
          <div>
            <div className="airline-tag">
              <AirlineLogo code="AF" color="#002157" />
              Air France
            </div>
            <h2>AF 0123 · Airbus A350-900</h2>
          </div>
          <div className="badge badge-purple">BEST VALUE</div>
        </div>
      </div>

      <div className="route-timeline">
        <div className="route-point">
          <div className="code">JFK</div>
          <div className="city">New York</div>
          <div className="time">08:30</div>
          <div className="date">Sun, 15 Jun</div>
        </div>
        <div className="route-line" />
        <div className="route-point">
          <div className="code">CDG</div>
          <div className="city">Paris</div>
          <div className="time">20:45</div>
          <div className="date">Sun, 15 Jun</div>
        </div>
      </div>

      <div className="details-tabs">
        {tabs.map(t => (
          <button
            key={t}
            className={`details-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >{t}</button>
        ))}
      </div>

      {activeTab === 'Details' && (
        <>
          <div className="fare-cards">
            {[
              { name: 'Economy', price: 487, features: ['30kg Baggage', 'Free Meal', 'Seat Selection', 'Free Wi-Fi'] },
              { name: 'Premium Economy', price: 782, features: ['30kg Baggage', 'Free Meal', 'Seat Selection', 'Free Wi-Fi'] },
              { name: 'Business', price: 1432, features: ['30kg Baggage', 'Free Meal', 'Seat Selection', 'Free Wi-Fi'] },
            ].map(f => (
              <div
                key={f.name}
                className={`fare-card ${fareClass === f.name ? 'selected' : ''}`}
                onClick={() => setFareClass(f.name)}
              >
                <h4>{f.name}</h4>
                <div className="fare-price">${f.price}</div>
                <ul className="fare-features">
                  {f.features.map(feat => (
                    <li key={feat}><Check size={14} color="#34D399" /> {feat}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="panel" style={{ padding: 20 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>Why book this flight?</h4>
              <div className="insight-row">
                <ThumbsUp size={16} color="#34D399" />
                <p><strong>Best price for direct flight</strong>18% cheaper than other direct flights</p>
              </div>
              <div className="insight-row">
                <ThumbsUp size={16} color="#34D399" />
                <p><strong>High on-time performance</strong>95% on-time in past 30 days</p>
              </div>
            </div>
            <div className="panel" style={{ padding: 20 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>Great departure time</h4>
              <div className="insight-row">
                <Clock size={16} color="#60A5FA" />
                <p><strong>Avoid early morning rush</strong>Departure at 08:30 AM</p>
              </div>
            </div>
          </div>

          <div className="trip-summary" style={{ marginTop: 20 }}>
            <div className="summary-flight">
              <div className="airline-icon" style={{ background: '#002157', color: 'white' }}>AF</div>
              <div>
                <div className="route">New York (JFK) → Paris (CDG)</div>
                <div className="meta">Sun, 15 Jun · Air France · Economy · Non-stop · 1 Traveler</div>
              </div>
            </div>
            <div className="fare-breakdown">
              {[
                { label: 'Base Fare', value: '$420.00' },
                { label: 'Taxes & Fees', value: '$67.00' },
                { label: 'Seat Selection', value: '$0.00' },
                { label: 'Baggage (30kg)', value: '$0.00' },
              ].map(row => (
                <div key={row.label} className="breakdown-row">
                  <span className="label">{row.label}</span>
                  <span className="value">{row.value}</span>
                </div>
              ))}
              <div className="breakdown-row total">
                <span className="label">Total Price</span>
                <span className="value">$487.00</span>
              </div>
            </div>
            <button className="btn-primary wide">Continue to Booking <ArrowRight size={16} /></button>
          </div>
        </>
      )}

      {activeTab === 'Seats' && (
        <div className="seat-map">
          <div className="seat-legend">
            {[
              { label: 'Available', color: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.25)', text: '#34D399' },
              { label: 'Selected', color: '#7C3AED', border: '#6D28D9', text: 'white' },
              { label: 'Occupied', color: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.15)', text: '#64748B' },
              { label: 'Extra Legroom', color: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.25)', text: '#FBBF24' },
            ].map(l => (
              <div key={l.label} className="seat-legend-item">
                <div className="seat-legend-dot" style={{ background: l.color, border: `1px solid ${l.border}` }} />
                <span style={{ color: l.text }}>{l.label}</span>
              </div>
            ))}
          </div>
          <div className="seat-grid">
            {seatMap.map((row, r) =>
              row.map((type, c) => {
                const key = `${r}-${c}`
                const isSelected = selectedSeats.includes(key)
                const seatClass = isSelected ? 'selected' : type === 'extra' ? 'extra-legroom' : type === 'occupied' ? 'occupied' : 'available'
                return (
                  <div
                    key={key}
                    className={`seat ${seatClass}`}
                    onClick={() => type !== 'occupied' && toggleSeat(r, c)}
                  >
                    {String.fromCharCode(65 + c)}{r + 1}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="reviews-section">
          <div className="reviews-header">
            <h3>Traveler Reviews</h3>
            <div className="rating-big">
              <span className="score">4.6</span>
              <div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} fill={i <= 4.6 ? '#fde047' : 'transparent'} color={i <= 4.6 ? '#fde047' : 'rgba(148,163,184,0.3)'} />)}
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94A3B8' }}>2,341 reviews</p>
              </div>
            </div>
          </div>
          {reviewStars.map((star, i) => (
            <div key={star} className="star-row">
              <span style={{ fontSize: 13, fontWeight: 700, minWidth: 20 }}>{star}</span>
              <div className="stars">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= star ? '#fde047' : 'transparent'} color={s <= star ? '#fde047' : 'rgba(148,163,184,0.3)'} />)}
              </div>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${reviewDistribution[i]}%` }} />
              </div>
              <span className="pct">{reviewDistribution[i]}%</span>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', marginTop: 16 }}>View all reviews <ChevronRight size={14} /></button>
        </div>
      )}
    </div>
  )
}

// ── Screen 4: AI Trip Planner ─────────────────────────────────────
const PlannerBoard = () => {
  const [messages] = useState([
    { type: 'user', text: 'I want to go somewhere warm for a week in July under $700.' },
    { type: 'ai', text: 'Here are the best options for you!' },
  ])

  const plannerDestinations = [
    { name: 'Bali, Indonesia', desc: '7 nights · Jul 7–14', price: 621, match: 98, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop' },
    { name: 'Phuket, Thailand', desc: '7 nights · Jul 7–14', price: 612, match: 95, img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop' },
    { name: 'Maldives', desc: '7 nights · Jul 7–14', price: 689, match: 92, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop' },
  ]

  const itinerary = [
    { day: 1, title: 'Arrival in Bali', desc: 'Check-in and relax at hotel. Seminyak Beach.' },
    { day: 2, title: 'Ubud Exploration', desc: 'Visit Tegallalang Rice Terrace. Ubud Monkey Forest.' },
    { day: 3, title: 'Waterfall Adventure', desc: 'Tegenungan Waterfall. Coffee Plantation.' },
    { day: 4, title: 'Nusa Penida Island', desc: 'Kelingking Beach. Broken Beach.' },
  ]

  return (
    <div className="board-card" style={{ minWidth: 580 }}>
      <BoardLabel num={4} text="AI Trip Planner" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <div className="planner-chat">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.type}`}>
                <div className={`chat-avatar ${m.type}`}>
                  {m.type === 'ai' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div className="message">{m.text}</div>
              </div>
            ))}
            <div className="suggestion-pills">
              {['Warm', '1 Week', 'July', 'Under $700'].map(tag => (
                <span key={tag} className="suggestion-pill">{tag}</span>
              ))}
            </div>
          </div>

          <div className="planner-input">
            <input type="text" placeholder="Ask anything about your trip..." />
            <button><Send size={16} /></button>
          </div>

          <div className="panel-head" style={{ marginTop: 20 }}>
            <div>
              <h3>Itinerary</h3>
            </div>
          </div>
          {itinerary.map(day => (
            <div key={day.day} className="itinerary-day">
              <div className="day-marker">Day {day.day}</div>
              <div className="day-content">
                <h4>{day.title}</h4>
                <p>{day.desc}</p>
              </div>
            </div>
          ))}
          <button className="btn-secondary" style={{ width: '100%', marginTop: 8 }}>
            See more options <ChevronRight size={14} />
          </button>
        </div>

        <div>
          <div className="panel-head">
            <div>
              <h3>Bali, Indonesia</h3>
              <p>7 nights Trip</p>
            </div>
            <div className="badge badge-success">92% Match</div>
          </div>
          <div className="planner-results">
            {plannerDestinations.map(d => (
              <div key={d.name} className="planner-card">
                <img src={d.img} alt={d.name} loading="lazy" />
                <div className="info">
                  <h4>{d.name}</h4>
                  <p>{d.desc}</p>
                  <div className="price">${d.price}</div>
                  <div className="match">{d.match}% Match</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn-primary wide"><Plus size={16} /> Add to Trips</button>
            <button className="btn-secondary wide">Customize Trip</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Screen 5: Trips & Wishlist ────────────────────────────────────
const TripsBoard = () => {
  const [activeTab, setActiveTab] = useState('Upcoming')
  const tabs = ['Upcoming', 'Saved (12)', 'Completed']

  const trips = [
    { destination: 'Paris, France', dates: '15 Jun – 22 Jun, 2025', ref: 'ANV93421', status: 'Confirmed', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=200&fit=crop' },
    { destination: 'Tokyo, Japan', dates: '10 Jul – 17 Jul, 2025', ref: 'ANV88119', status: 'Upcoming', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&h=200&fit=crop' },
    { destination: 'Bali, Indonesia', dates: '5 Aug – 12 Aug, 2025', ref: 'ANV77211', status: 'Planning', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=200&fit=crop' },
  ]

  return (
    <div className="board-card" style={{ minWidth: 580 }}>
      <BoardLabel num={5} text="Trips & Wishlist" />

      <div className="trips-tabs">
        {tabs.map(t => (
          <button
            key={t}
            className={`trips-tab ${activeTab === t.split(' ')[0] ? 'active' : ''}`}
            onClick={() => setActiveTab(t.split(' ')[0])}
          >{t}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          {trips.map(t => (
            <div key={t.ref} className="trip-card">
              <img src={t.img} alt={t.destination} loading="lazy" />
              <div className="trip-info">
                <h4>{t.destination}</h4>
                <div className="dates">{t.dates}</div>
                <div className="meta">
                  <span>Booking Ref: {t.ref}</span>
                </div>
              </div>
              <div className={`trip-status ${t.status.toLowerCase()}`}>{t.status}</div>
              <button style={{ marginLeft: 'auto', alignSelf: 'center', background: 'transparent', border: 0, color: '#94A3B8' }}>
                <ChevronRight size={18} />
              </button>
            </div>
          ))}

          <div className="panel" style={{ padding: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(124,58,237,0.15)', display: 'grid', placeItems: 'center', color: '#C4B5FD' }}>
                <TrendingDown size={20} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Average prices are 18% lower than last month for flights to Europe.</p>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94A3B8' }}>Best time to book: Jul 10 – Jul 22</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="panel-head">
            <div>
              <h3>My Wishlist (12)</h3>
            </div>
          </div>

          <div className="wishlist-map">
            <svg className="world-map-svg" viewBox="0 0 800 400">
              <path
                fill="rgba(148,163,184,0.2)"
                d="M150,180 Q200,160 250,170 T350,160 T450,170 T550,165 T650,175 T750,180"
              />
              <path
                fill="rgba(148,163,184,0.15)"
                d="M100,250 Q180,230 280,240 T400,235 T520,245 T620,240 T720,250"
              />
            </svg>
            {[
              { left: '28%', top: '35%', label: 'Dubai' },
              { left: '48%', top: '30%', label: 'Switzerland' },
              { left: '58%', top: '55%', label: 'New Zealand' },
              { left: '22%', top: '50%', label: 'Brazil' },
            ].map(pin => (
              <div key={pin.label} className="map-pin" style={{ left: pin.left, top: pin.top }}>
                <MapPin size={14} />
              </div>
            ))}
          </div>

          <div className="wishlist-stats">
            {[
              { number: 12, label: 'Saved' },
              { number: 3, label: 'Upcoming' },
              { number: 5, label: 'Visited' },
            ].map(s => (
              <div key={s.label} className="wishlist-stat">
                <div className="number">{s.number}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={16} color="#FBBF24" fill="#FBBF24" />
              <span style={{ fontSize: 14, fontWeight: 700 }}>1,842</span>
            </div>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Total Saved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Screen 6: Price Alerts ────────────────────────────────────────
const AlertsBoard = () => {
  const alerts = [
    { route: 'New York → Paris', dates: '15 Jun – 22 Jun', current: 487, original: 550, change: -12, data: alertSparklines['New York → Paris'] },
    { route: 'New York → Tokyo', dates: '10 Jul – 17 Jul', current: 712, original: 775, change: -8, data: alertSparklines['New York → Tokyo'] },
    { route: 'New York → Bali', dates: '5 Aug – 12 Aug', current: 621, original: 650, change: -5, data: alertSparklines['New York → Bali'] },
    { route: 'New York → London', dates: '20 Sep – 27 Sep', current: 432, original: 445, change: -3, data: alertSparklines['New York → London'] },
  ]

  return (
    <div className="board-card" style={{ minWidth: 580 }}>
      <BoardLabel num={6} text="Price Alerts" />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Active Alerts (4)</span>
        </div>
        <button className="btn-primary"><Plus size={16} /> Create New Alert</button>
      </div>

      <div className="alert-grid">
        {alerts.map(a => (
          <div key={a.route} className="alert-card">
            <div className="alert-card-header">
              <div>
                <h4>{a.route}</h4>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94A3B8' }}>{a.dates} · Price drops below ${Math.round(a.current * 0.9)}</p>
              </div>
              <button className="alert-toggle active" />
            </div>

            <div className="alert-price-row">
              <span className="current">${a.current}</span>
              <span className="original">${a.original}</span>
              <span className={`change ${a.change < 0 ? 'up' : 'down'}`}>{a.change}%</span>
            </div>

            <div className="sparkline-container">
              <Sparkline data={a.data} />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1, minHeight: 38, fontSize: 13 }}>Book Now</button>
              <button className="btn-secondary" style={{ flex: 1, minHeight: 38, fontSize: 13 }}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="panel" style={{ padding: 20, marginTop: 16 }}>
        <div className="panel-head">
          <div>
            <h3>Price Insights</h3>
            <p>Based on historical data</p>
          </div>
        </div>
        <div style={{ height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceTrendData}>
              <defs>
                <linearGradient id="insightGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <Area type="monotone" dataKey="price" stroke="#22D3EE" strokeWidth={2} fill="url(#insightGrad2)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ── Screen 7: Checkout ────────────────────────────────────────────
const CheckoutBoard = () => {
  const [step, setStep] = useState(1)
  const steps = ['Review', 'Traveler', 'Payment', 'Confirm']

  return (
    <div className="board-card" style={{ minWidth: 620 }}>
      <BoardLabel num={7} text="Checkout" />

      <div className="checkout-stepper">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className={`step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'completed' : ''}`}>
              <div className="circle">{step > i + 1 ? <Check size={16} /> : i + 1}</div>
              <span className="label">{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`step-line ${step > i + 1 ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="checkout-grid">
        <div>
          {step === 1 && (
            <div className="panel" style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Review Your Trip</h3>
              <div className="summary-flight" style={{ marginBottom: 20 }}>
                <div className="airline-icon" style={{ background: '#002157', color: 'white' }}>AF</div>
                <div>
                  <div className="route">New York (JFK) → Paris (CDG)</div>
                  <div className="meta">Sun, 15 Jun · Air France · Economy · Non-stop · 1 Traveler</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
                <div className="checkout-form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Emily Johnson" />
                </div>
                <div className="checkout-form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="emily.johnson@email.com" />
                </div>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="checkout-form-group">
                    <label>Date of Birth</label>
                    <input type="text" defaultValue="04/12/1990" />
                  </div>
                </div>
                <div className="checkout-form-row">
                  <div className="checkout-form-group">
                    <label>Passport Number</label>
                    <input type="text" defaultValue="A12345678" />
                  </div>
                  <div className="checkout-form-group">
                    <label>Country of Residence</label>
                    <input type="text" defaultValue="United States" />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(Math.max(1, step - 1))}>Back</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setStep(step + 1)}>Continue</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="panel" style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Passenger Details</h3>
              <div className="checkout-form-group">
                <label>Adult 1</label>
                <input type="text" defaultValue="Emily Johnson" />
              </div>
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label>Nationality</label>
                  <input type="text" defaultValue="American" />
                </div>
                <div className="checkout-form-group">
                  <label>Gender</label>
                  <input type="text" defaultValue="Female" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(Math.max(1, step - 1))}>Back</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setStep(step + 1)}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="panel" style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700 }}>Payment Method</h3>
              <div className="payment-methods">
                {[
                  { name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex', icon: CreditCard, selected: true },
                  { name: 'PayPal', desc: 'Fast and secure', icon: DollarSign, selected: false },
                ].map(m => (
                  <div key={m.name} className={`payment-method ${m.selected ? 'selected' : ''}`}>
                    <div className="radio" />
                    <div className="icon"><m.icon size={18} /></div>
                    <div className="info">
                      <h5>{m.name}</h5>
                      <p>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout-form-group">
                <label>Card Number</label>
                <input type="text" defaultValue="4242 4242 4242 4242" />
              </div>
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label>Expiry</label>
                  <input type="text" defaultValue="12 / 27" />
                </div>
                <div className="checkout-form-group">
                  <label>CVV</label>
                  <input type="text" defaultValue="123" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(Math.max(1, step - 1))}>Back</button>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setStep(step + 1)}>
                  Pay $864 USD <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="panel" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 20px', color: '#34D399' }}>
                <Check size={40} />
              </div>
              <h3 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 700 }}>Booking Confirmed!</h3>
              <p style={{ margin: '0 0 24px', color: '#94A3B8', fontSize: 14 }}>Your trip to Paris has been successfully booked.</p>
              <div style={{ padding: 16, background: 'rgba(15,23,42,0.5)', borderRadius: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>Booking Reference</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#C4B5FD', marginTop: 4 }}>ANV-2025-8842</div>
              </div>
              <button className="btn-primary wide">View My Trips <ArrowRight size={16} /></button>
            </div>
          )}
        </div>

        {/* Trip Summary Sidebar */}
        <div className="trip-summary">
          <h3>Your Trip</h3>
          <div className="summary-flight">
            <div className="airline-icon" style={{ background: '#002157', color: 'white' }}>AF</div>
            <div>
              <div className="route">New York (JFK) → Paris (CDG)</div>
              <div className="meta">Sun, 15 Jun – Sun, 22 Jun · 1 Traveler</div>
            </div>
          </div>
          <div className="fare-breakdown">
            {[
              { label: 'Base Fare', value: '$420.00' },
              { label: 'Taxes & Fees', value: '$67.00' },
              { label: 'Seat Selection', value: '$0.00' },
              { label: 'Baggage (30kg)', value: '$0.00' },
            ].map(row => (
              <div key={row.label} className="breakdown-row">
                <span className="label">{row.label}</span>
                <span className="value">{row.value}</span>
              </div>
            ))}
            <div className="breakdown-row total">
              <span className="label">Total Amount</span>
              <span className="value">$487.00</span>
            </div>
          </div>
          <button className="btn-primary wide" style={{ marginTop: 16 }}>
            Proceed to Payment <ArrowRight size={16} />
          </button>
          <div className="secure-badge">
            <Shield size={16} /> Secure Booking · 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Screen 8: Profile & Preferences ───────────────────────────────
const ProfileBoard = () => {
  const stats = [
    { number: 18, label: 'Trips' },
    { number: '12,450', label: 'Points' },
    { number: 12, label: 'Saved' },
  ]

  const settings = [
    { icon: User, title: 'Personal Information', desc: 'Name, email, phone' },
    { icon: CreditCard, title: 'Payment Methods', desc: 'Cards, PayPal, Apple Pay' },
    { icon: Compass, title: 'Travel Preferences', desc: 'Seat, meal, airline' },
    { icon: Bell, title: 'Notifications', desc: 'Price alerts, deals' },
    { icon: Shield, title: 'Privacy & Security', desc: 'Password, 2FA' },
    { icon: HelpCircle, title: 'Help & Support', desc: 'FAQ, contact us' },
  ]

  return (
    <div className="board-card" style={{ minWidth: 580 }}>
      <BoardLabel num={8} text="Profile & Preferences" />

      <div className="profile-header">
        <div className="profile-avatar">EJ</div>
        <div className="info">
          <h2>Emily Johnson</h2>
          <div className="member-tag"><Crown size={14} /> Premium Member</div>
        </div>
        <button style={{ marginLeft: 'auto', background: 'transparent', border: 0, color: '#94A3B8' }}>
          <Settings size={20} />
        </button>
      </div>

      <div className="profile-stats">
        {stats.map(s => (
          <div key={s.label} className="profile-stat">
            <div className="number">{s.number}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="settings-menu">
        {settings.map(s => (
          <div key={s.title} className="settings-item">
            <div className="left">
              <div className="icon"><s.icon size={18} /></div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
            <div className="right"><ChevronRight size={18} /></div>
          </div>
        ))}
        <div className="settings-item" style={{ borderTop: '1px solid var(--border-color)', marginTop: 8 }}>
          <div className="left">
            <div className="icon" style={{ color: '#EF4444' }}><LogOut size={18} /></div>
            <div>
              <h4 style={{ color: '#EF4444' }}>Logout</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="membership-card">
        <h3><Crown size={20} color="#FBBF24" fill="#FBBF24" /> AeroNova Premium</h3>
        <p>Unlock exclusive deals, priority support, and more.</p>
        <div className="membership-features">
          {[
            { icon: Zap, label: 'Unlimited deals' },
            { icon: Clock, label: 'Priority support' },
            { icon: DollarSign, label: 'No hidden fees' },
          ].map(f => (
            <div key={f.label} className="membership-feature">
              <div className="icon"><f.icon size={22} /></div>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary wide">Upgrade Now <ArrowRight size={16} /></button>
      </div>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────
export default function App() {
  const [activeItem, setActiveItem] = useState('Home')

  const navItems = [
    { icon: HomeIcon, label: 'Home', active: true },
    { icon: Plane, label: 'Flights' },
    { icon: Building, label: 'Hotels' },
    { icon: BedDouble, label: 'Stays' },
    { icon: Car, label: 'Cars' },
    { icon: Bell, label: 'Price Alerts', badge: 4 },
    { icon: Map, label: 'Trips' },
    { icon: Bot, label: 'AI Planner' },
    { icon: Crown, label: 'Rewards' },
    { icon: HelpCircle, label: 'Visa Assistant' },
  ]

  return (
    <div className="app">
      <div className="space-bg" />

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <LogoMark />
          <div>
            <h1>AeroNova</h1>
            <p>AI Travel OS</p>
          </div>
        </div>

        <nav>
          {navItems.map(item => (
            <button
              key={item.label}
              className={activeItem === item.label ? 'active' : ''}
              onClick={() => setActiveItem(item.label)}
            >
              <item.icon size={18} />
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'var(--danger)',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 800
                }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="premium-box">
          <h3><Crown size={16} fill="#fde047" color="#fde047" /> Go Premium</h3>
          <p>Unlock exclusive deals and priority support.</p>
          <button className="btn-primary" style={{ width: '100%', minHeight: 38, fontSize: 13 }}>
            Upgrade Now <ArrowRight size={14} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button><HelpCircle size={18} /> Support</button>
          <button><Settings size={18} /> Settings</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="topbar">
          <div className="global-search">
            <Search size={18} />
            <span>Search destinations, flights...</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="top-actions">
            <span>USD ▾</span>
            <Globe size={18} />
            <div style={{ position: 'relative' }}>
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: 'var(--danger)',
                color: 'white',
                fontSize: 9,
                fontWeight: 800,
                display: 'grid',
                placeItems: 'center'
              }}>4</span>
            </div>
            <div className="avatar">EJ</div>
          </div>
        </header>

        <section className="design-board">
          <HomeBoard />
          <ResultsBoard />
          <DetailsBoard />
          <PlannerBoard />
          <TripsBoard />
          <AlertsBoard />
          <CheckoutBoard />
          <ProfileBoard />
        </section>
      </main>
    </div>
  )
}

function HomeIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
