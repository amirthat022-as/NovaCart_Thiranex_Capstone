import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {id:1,name:"Aero Wireless Headphones",category:"Audio",price:79.99,rating:4.8,emoji:"🎧"},
  {id:2,name:"Pulse Smart Watch",category:"Wearables",price:129.99,rating:4.7,emoji:"⌚"},
  {id:3,name:"Orbit Mechanical Keyboard",category:"Accessories",price:94.50,rating:4.9,emoji:"⌨️"},
  {id:4,name:"Luma Desk Lamp",category:"Home",price:42.00,rating:4.6,emoji:"💡"},
  {id:5,name:"Vertex Laptop Stand",category:"Accessories",price:55.75,rating:4.8,emoji:"💻"},
  {id:6,name:"Echo Portable Speaker",category:"Audio",price:64.99,rating:4.5,emoji:"🔊"},
  {id:7,name:"Nova Fitness Band",category:"Wearables",price:49.99,rating:4.4,emoji:"🏃"},
  {id:8,name:"Zen Travel Mug",category:"Home",price:28.90,rating:4.7,emoji:"☕"}
];

function App() {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const [cart,setCart] = useState([]);
  const [dark,setDark] = useState(false);

  const categories = ["All", ...new Set(products.map(p=>p.category))];
  const filtered = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ), [query,category]);

  const add = (p) => setCart(c => [...c,p]);
  const total = cart.reduce((s,p)=>s+p.price,0);

  return (
    <div className={dark ? "app dark" : "app"}>
      <header className="nav">
        <div className="brand"><span>✦</span> NovaCart</div>
        <nav>
          <a href="#home">Home</a><a href="#products">Products</a><a href="#about">About</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?"☀️":"🌙"}</button>
          <button className="cart-btn">🛒 Cart <b>{cart.length}</b></button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div>
            <p className="eyebrow">SMART SHOPPING • SIMPLE EXPERIENCE</p>
            <h1>Discover products<br/><span>made for you.</span></h1>
            <p className="hero-text">A fast, responsive product catalog built as a full-stack deployment capstone.</p>
            <a href="#products" className="primary">Explore Products →</a>
          </div>
          <div className="hero-card"><div className="orb">✦</div><p>New arrivals</p><strong>Curated tech & lifestyle</strong></div>
        </section>

        <section id="products" className="catalog">
          <div className="section-head">
            <div><p className="eyebrow">OUR COLLECTION</p><h2>Featured products</h2></div>
            <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." /></div>
          </div>
          <div className="filters">{categories.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="grid">
            {filtered.map(p=>(
              <article className="product" key={p.id}>
                <div className="product-image">{p.emoji}</div>
                <div className="product-info">
                  <small>{p.category}</small><h3>{p.name}</h3>
                  <div className="rating">★ {p.rating}</div>
                  <div className="buy"><strong>${p.price.toFixed(2)}</strong><button onClick={()=>add(p)}>Add to cart</button></div>
                </div>
              </article>
            ))}
          </div>
          {!filtered.length && <div className="empty">No products found. Try another search.</div>}
        </section>

        <section className="stats">
          <div><strong>8+</strong><span>Curated products</span></div>
          <div><strong>4.7★</strong><span>Average rating</span></div>
          <div><strong>100%</strong><span>Responsive design</span></div>
          <div><strong>Fast</strong><span>Optimized UI</span></div>
        </section>

        <section id="about" className="about">
          <div><p className="eyebrow">ABOUT THE PROJECT</p><h2>Built for the modern web.</h2></div>
          <p>NovaCart demonstrates modular React components, client-side filtering and navigation, responsive UI, optimized assets, and production-ready Vite deployment.</p>
        </section>
      </main>

      {cart.length > 0 && <div className="cart-drawer"><strong>Cart: {cart.length} item(s)</strong><span>Total ${total.toFixed(2)}</span><button onClick={()=>setCart([])}>Clear</button></div>}
      <footer>© 2026 NovaCart • Full-Stack Deployment & Project Architecture</footer>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
