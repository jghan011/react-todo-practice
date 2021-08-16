import React from "react";
import "./App.css";

function App() {
  const [shoppingItems, setShoppingItems] = React.useState([]);
  const [itemName, setItemName] = React.useState("");
  const [editItem, setEditItem] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  React.useEffect(() => {
    const temp = localStorage.getItem("shoppingItemAccess");
    const loadedItems = JSON.parse(temp);

    if (loadedItems) {
      setShoppingItems(loadedItems);
    }
  }, []);

  React.useEffect(() => {
    const jsonTing = JSON.stringify(shoppingItems);
    localStorage.setItem("shoppingItemAccess", jsonTing);
  }, [shoppingItems]); //how we save the data inb to local

  //will run once when component is mounted right when page is loaded the code will be loaded basically. if you
  function handleSubmit(e) {
    e.preventDefault();

    let dates = new Date();
    let times = dates.toLocaleTimeString();

    const newItems = {
      id: times,
      name: itemName,
      completed: false,
    };

    setShoppingItems([...shoppingItems].concat(newItems));
    setItemName("");
  }

  function handleDelete(idOne) {
    const updateAfterDelete = [...shoppingItems].filter((cartItem) => {
      return cartItem.id !== idOne;
    });
    setShoppingItems(updateAfterDelete);
    setItemName("");
  }

  function submitItem(idTwo) {
    const submitItems = [...shoppingItems].map((cartItemTwo) => {
      if (cartItemTwo.id === idTwo) {
        cartItemTwo.name = editText;
      }
      return cartItemTwo;
    });
    setShoppingItems(submitItems);
    setEditItem(null);
    setEditText("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
        />
        <button>Add Something</button>
      </form>
      {shoppingItems.map((todo) => {
        return (
          <div key={todo.name}>
            {editItem === todo.id ? (
              <input
                type="text"
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
              />
            ) : (
              <div>{todo.name}</div>
            )}

            <button onClick={() => handleDelete(todo.id)}>delete</button>
            {editItem === todo.id ? (
              <button onClick={() => submitItem(todo.id)}>Submit</button>
            ) : (
              <button onClick={() => setEditItem(todo.id)}>Edit</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
