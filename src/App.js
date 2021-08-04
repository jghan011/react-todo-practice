import React from 'react';
import './App.css';


function App() {
const [shoppingItem,setShoppingItem] = React.useState([]);
const [itemName,setItemName] = React.useState("");
const [editItem,setEditItem] = React.useState(null);
const [newItemText,setNewItemText] = React.useState('')


function handleSubmit(e) {
  e.preventDefault();
  var date = new Date();
  var string = date.toLocaleTimeString();
  const newItems ={
    id:string,
    name:itemName,
    completed:false,

  }
  setShoppingItem([...shoppingItem].concat(newItems));
  setItemName('')
}

 function deleteItem(id1) {

  const updatedFromDelete = [...shoppingItem].filter((cartItem)=>{
    return cartItem.id !== id1

  });
  setShoppingItem(updatedFromDelete);
}

function submitItem(id1) {
  const updatedFromSubmit = [...shoppingItem].map((cartItem)=>{
    if(cartItem.id === id1) {
      cartItem.name = newItemText
    }
    return cartItem
  })
  setEditItem(updatedFromSubmit)


}


return (
  <div>

    <form onSubmit={handleSubmit}>

    <input type="text" onChange={((e)=> setItemName(e.target.value))} value={itemName}/>
    <button type="submit">add button</button>

    </form>
 
     {shoppingItem.map((todo)=>
      <div key={todo.id}>
        {editItem === todo.id ? <input
          type="text"
          onChange={(e)=>setNewItemText(e.target.value)}
          value={newItemText}
        
        />:<div>{todo.name}</div>}
       
         <button onClick={()=> deleteItem(todo.id)}>delete</button> 

        <button onClick={()=> setEditItem(todo.id)}>Edit</button>
        <button onClick={()=> submitItem(todo.id)}>submit</button>
        </div>

    )} 

  </div>
 
  

)



}

export default App;
