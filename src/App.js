import React, { useState, useEffect } from "react";

import ItemName from './components/ItemName';

function App() {
  const [state, setState] = useState({ loading: true, data: undefined });

  useEffect(() => {
    fetch('https://static.walshy.dev/items.json')
      .then(res => res.json())
      .then(json => {
        setState({ loading: false, data: json });
      })
      .catch(err => console.error(err));
  }, [setState]);

  if (state.loading) {
    return <span>Loading...</span>
  }

  return (
    <div className="container">
      <h1>Slimefun Items ({state.data.length})</h1>

      {state.data.map(obj => {
        const { item } = obj;

        return (<div className="item" key={obj.id}>
          <ItemName material={item.material} name={item.name} />
          <span className="item-id">ID: {obj.id}</span>
        </div>)
      })}
    </div>
  );
}

export default App;