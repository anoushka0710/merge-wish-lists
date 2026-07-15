export default function WishlistPanel({ list, products, onRemove }) {
  const items = Object.entries(list.items)
    .map(([productId, meta]) => {
      const product = products.find((p) => p.id === productId);
      return product ? { ...product, addedAt: meta.addedAt } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.addedAt - b.addedAt);

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{list.name}</h2>
        <span className="count">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="empty">No items yet — add something from the shop.</p>
      ) : (
        <ul className="panel-list">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.name}</span>
                <span className="mini-badge">{item.category}</span>
              </div>
              <span className="price">${item.price}</span>
              <button className="remove" aria-label={`Remove ${item.name}`} onClick={() => onRemove(item.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}