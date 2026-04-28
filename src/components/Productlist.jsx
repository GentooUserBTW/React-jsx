import { useState } from 'react';
import './productlist.css';

const garageData = Array.from({length: 256}, (_,i) => ({
    id: i + 1,
    part: `component #${i + 1}`,
    car: `component ${1960 + (i % 70)}`,
    price: (Math.random() * 3500 + 150).toFixed(2),
    stock: Math.floor(Math.random() * 50) + 1,
    location: `bay ${String.fromCharCode(97 + (i % 26))}-${(i % 12) + 1}`,
    img: `https://loremflickr.com/600/500/mechanical,engine,garage?lock=${i}`,
    phone: "555-0" + (i + 100),
    email: "warehouse=${i}@gmail.com"
}));


const ProductList = () => {
  const[search, setSearched] = useState("")
  const[flipped, setFlipped] = useState({})

  const togglePage = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };



  const filtered = garageData.filter(item => 
    item.part.toLowerCase().includes(search.toLowerCase()) || 
    item.car.toLowerCase().includes(search.toLowerCase())
  );

return (
  <div className="binder-wrap">
  <header className="binder-header">
  <h1 className="massive-text">Auto part entries:</h1>
  <input
    className="massive-search"
    placeholder='searching for parts...'
    onChange={(e) => setSearched(e.target.value)}
  />
  </header>
  <div className="ledger-container">
    {filtered.map((item) => (
      <div
      key={item.id}
      className={`ledger-page ${flipped[item.id] ? 'is-flipped' : ''}`}
      onClick={() => togglePage(item.id)} 
      >
      <div className= "page-content">
      <img src={item.img} alt="part-scan" className="raw-photo"/>
      <div className="front-data">
      <span className="ref-data">id: {item.id}</span>
      <h1 className="item-title">{item.part}</h1>
      <p className="car-title">Compatible: {item.car}</p>
      <div className="price-massive">${item.price}</div>
      </div>
      </div>
              
      <div className="page-back">
      <p className="tab-label">current stock level</p>
      <div className="stock-massive">{item.stock}</div>
      <p className="location-tag">stored: {item.location}</p>
                
      <div className="interaction-links">
      <a href={`tel:${item.phone}`} className="link-box">call warehouse</a>
      <a href={`https://wa.me/${item.phone}`} target="_blank" rel="noreferrer" className="link-box">whatsapp</a>
      <a href={`mailto:${item.email}`} className="link-box outline">email log</a>
      </div>
      <span className="turn-hint">tap to turn back</span>
      </div>
      </div>
      ))}
      </div>
    </div>
  );
};

export default ProductList;