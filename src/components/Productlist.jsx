import { useState } from 'react';
import './productlist.css';

const garageData = Array.from({length: 256}, (_, i) => {
const searchTerms = `https://loremflickr.com/600/400/engine,parts,mechanical/all=${i}`;
    return {
        id: i + 1,
        part: `listing #${i + 1}`,
        car: `listing ${1960 + (i % 70)}`,
        price: (Math.random() * 10000 + 150).toFixed(2),
        stock: Math.floor(Math.random() * 50) + 1,
        location: `bay ${String.fromCharCode(97 + (i % 26))}-${(i % 12) + 1}`,
        img: searchTerms,
        phone: "555-0" + (i + 100),
        email: `warehouse${i}@gmail.com`
    };
});

const ProductList = () => {
  // --- STATE HOOKS ---
  const [inventory, setInventory] = useState(garageData);
  const [basket, setBasket] = useState([]);
  const [quantities, setQuantities] = useState({}); // Tracking { id: number }
  const [search, setSearch] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [flipped, setFlipped] = useState({});
  const [checkoutStep, setCheckoutStep] = useState('basket');

  const clearBasket = () => {
  if (window.confirm("Clear all items from the BASKET?")) {
    setBasket([]);
    setShowPayment(false);
    }
  }
  // --- DERIVED STATE (The Filter) ---
  const filtered = inventory.filter(item =>
    item.part.toLowerCase().includes(search.toLowerCase()) || 
    item.car.toLowerCase().includes(search.toLowerCase())
  );

  const username = localStorage.getItem("user");

  const updatebasketQty = (itemId, delta) => {
    setBasket(prevBasket => {
      return prevBasket.map(item => {
      if(item.id == itemId)
      {
        const newQty = item.orderQty + delta;
        const stockRef = inventory.find(i => i.item == item.id).stock + newQty;
        if(newQty > 0 && newQty <= stockRef)
        {
          return{...item, orderQty : newQty};
        }
      }
    });
  });
  };

  
  const togglePage = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Handles + / - buttons with stock safety
  const updateQty = (id, delta, e) => {
    if (e) e.stopPropagation(); 
    
    const itemInInv = inventory.find(i => i.id === id);
    const maxAvailable = itemInInv ? itemInInv.stock : 0;

    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = current + delta;
      if (next < 1 || next > maxAvailable) return prev;
      return { ...prev, [id]: next };
    });
  };

  const addToBasket = (item, e) => {
  if (e) e.stopPropagation();

  const qtyToOrder = quantities[item.id] || 1;

  // validation
  if (qtyToOrder > item.stock) {
    alert("Not enough stock!");
    return;
  }

  // update inventory
  setInventory(prevInv =>
    prevInv.map(invItem =>
      invItem.id === item.id
        ? {
            ...invItem,
            stock: invItem.stock - qtyToOrder
          }
        : invItem
    )
  );

  // update basket
  setBasket(prevBasket => {
    const existingItem = prevBasket.find(
      bItem => bItem.id === item.id
    );

    if (existingItem) {
      return prevBasket.map(bItem =>
        bItem.id === item.id
          ? {
              ...bItem,
              orderQty: bItem.orderQty + qtyToOrder
            }
          : bItem
      );
    }

    return [
      ...prevBasket,
      {
        ...item,
        orderQty: qtyToOrder
      }
    ];
  });

  // reset quantity selector
  setQuantities(prev => ({
    ...prev,
    [item.id]: 1
  }));

  console.log(`ORDER Updated: Added ${qtyToOrder} of ${item.part}`);
};

return (
    <div className="binder-wrap">
      <div className="welcome-text">
        Welcome, {username || "Guest"}
      </div>
      <div className="basket-header">
        <span className="yellow-text">BASKET: {basket.length} ITEMS</span>
        <button className="checkout-btn" onClick={() => setShowPayment(true)}>
          [ GO TO CHECKOUT ]
        </button>
      </div>
      <header className="binder-header">
        <h1 className="massive-text">AutoParts.co Vault:</h1>
        <input
          className="massive-search"
          placeholder="searching for parts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </header>

      <div className="ledger-container">
        {filtered.map((item) => (
          <div 
            key={item.id} 
            className={`ledger-page ${flipped[item.id] ? 'is-flipped' : ''}`}
            onClick={() => togglePage(item.id)}
          >
            {/* FRONT SIDE */}
            <div className="page-content">
              <img 
                src={`https://loremflickr.com/600/400/dodge,vintage-cars/all?lock=${item.id}`}
                alt="part-scan" 
                className="raw-photo"
                loading="lazy"
              />
              
              <div className="front-data">
                <span className="ref-data">ID: {item.id}</span>
                <h1 className="item-title">{item.part}</h1>
                <p className="car-title">COMPATIBLE: {item.car}</p>
                <div className="price-massive">${item.price}</div>
                
                <div className="qty-controls" onClick={(e) => e.stopPropagation()}>
                  <button type="button" onClick={(e) => updateQty(item.id, -1, e)}>-</button>
                  <input type="text" readOnly value={quantities[item.id] || 1} />
                  <button type="button" onClick={(e) => updateQty(item.id, 1, e)}>+</button>
                </div>

                <button
                  className="add-btn"
                  disabled={item.stock === 0}
                  onClick={(e) => addToBasket(item, e)}
                >
                
                  {item.stock > 0 ? "[ ADD TO BASKET ]" : "[ OUT OF STOCK ]"}
                </button>  
                <p className="stock-count">WAREHOUSE STOCK: {item.stock}</p>
              </div>
            </div>
            
           
            <div className="page-back">
              <p className="tab-label">CURRENT VAULT STATUS</p>
              <div className="stock-massive">{item.stock}</div>
              <p className="location-tag">STORED: {item.location}</p>
                    
              <div className="interaction-links" onClick={(e) => e.stopPropagation()}>
                <a href={`tel:${item.phone}`} className="link-box">CALL</a>
                <a href={`mailto:${item.email}`} className="link-box outline">EMAIL</a>
              </div>
              <span className="turn-hint">CLICK TO FLIP BACK</span>
            </div>
          </div>
        ))}
      </div>
    

    {showPayment && (

    <div className="vault-overlay">
    <div className="payment-window large">
    <div className="modal-header">
    <h2 className="yellow-text">ORDER LISTS: {basket.length} ITEMS</h2>
    <div className="header-actions">
      <button className="clear-btn" onClick={clearBasket}>[ CLEAR ]</button>
      <button className="close-x" onClick={() => setShowPayment(false)}>X</button>
      </div>
      </div>
      <div className="order-scroll">
        {basket.length > 0 ? (
        basket.map((item, index) => (
        <div key={`${item.id}-${index}`} className="order-items">
          <span className="mini-id">#{item.id}</span>
          <img
            src={`https://loremflickr.com/200/200/cars,vintage-cars?lock=${item.id}`}
            alt="part-thumbnail"
            className="mini-photo"
            onError={(e) => {e.target.src = 'https://via.placeholder.com/200?text=Part+Scan';}}
          />
          <div className="item-details">
            <span className="part-name">{item.part}</span>
            <span className="part-price">${item.price}</span>
          </div>
          <div className="qty-controls">
            <button onClick={() => updateBasketQty(item.id, -1)}>-</button>
          <span className="qty-val">{item.orderQty}</span>
          <button onClick={() => updateBasketQty(item.id, 1)}>+</button>
          </div>
          <div className="item-total">
          ${(item.price * item.orderQty).toFixed(2)}
          </div>
        </div>
        ))
      ) : (
        <p className="empty-msg">"STOCK EMPTY - NO PARTS SELECTED"</p>
      )}
    </div>
    </div>
    </div>
    )}
  </div>
);
}; 
export default ProductList;