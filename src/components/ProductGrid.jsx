export default function ProductGrid({ products, listA, listB, onToggle }) {
  return (
    <div className="grid">
      {products.map((p) => {
        const inA = Boolean(listA.items[p.id]);
        const inB = Boolean(listB.items[p.id]);
        return (
          <div className="card" key={p.id}>
            <img className="product-img" src={p.image} alt={p.name} loading="lazy" />
            <span className={`badge badge-${p.category}`}>{p.category}</span>
            <h3>{p.name}</h3>
            <p className="blurb">{p.blurb}</p>
            <div className="row">
              <span className="price">${p.price}</span>
              <div className="heart-buttons">
                <button
                  className={`heart-btn ${inA ? "active" : ""}`}
                  aria-label={`${inA ? "Remove from" : "Add to"} List A`}
                  onClick={() => onToggle("A", p)}
                >
                  ♥ A
                </button>
                <button
                  className={`heart-btn ${inB ? "active" : ""}`}
                  aria-label={`${inB ? "Remove from" : "Add to"} List B`}
                  onClick={() => onToggle("B", p)}
                >
                  ♥ B
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}