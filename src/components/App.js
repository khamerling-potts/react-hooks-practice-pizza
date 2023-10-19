import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [currentPizza, setCurrentPizza] = useState({
    topping: "",
    size: "Small",
    vegetarian: true,
  });

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((r) => r.json())
      .then((data) => setPizzas(data));
  }, []);

  function handleEditPizza(pizza) {
    setCurrentPizza({ ...pizza });
  }

  function handleSubmitPizza(e) {
    e.preventDefault();
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(currentPizza),
    };
    fetch(`http://localhost:3001/pizzas/${currentPizza.id}`, configObj)
      .then((r) => r.json())
      .then((editedPizza) => {
        const updatedPizzas = pizzas.map((pizza) => {
          if (pizza.id === editedPizza.id) return editedPizza;
          return pizza;
        });
        setPizzas(updatedPizzas);
      });
  }

  //console.log(currentPizza);
  return (
    <>
      <Header />
      <PizzaForm
        currentPizza={currentPizza}
        setCurrentPizza={setCurrentPizza}
        onSubmitPizza={handleSubmitPizza}
      />
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPizza} />
    </>
  );
}

export default App;

/* 
App (holds pizzas state, form data state)
  PizzaForm 
  PizzaList (onEditPizza)
    Pizza (onEditPizza)
*/
