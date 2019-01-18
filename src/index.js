import "./styles.css";
import deepFreeze from "deepfreeze";
import expect from "expect";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
`;
const InitailObj = { id: 1, name: "Nike", quantity: 1 };
const stateBefore = [InitailObj];
deepFreeze(stateBefore);

const cartItems = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (state.id !== action.id) return state;
      return { ...state, quantity: state.quantity + 1 };
    case "DECREMENT":
      if (state.id !== action.id) return state;
      return { ...state, quantity: state.quantity - 1 };
    case "UPDATE_ITEM":
      if (state.id !== action.id) return state;
      return { ...state, quantity: action.quantity };

    default:
      return state;
  }
};

const cart = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state,
        { id: action.id, name: action.name, quantity: action.quantity }
      ];
    case "UPDATE_ITEM":
    case "INCREMENT":
    case "DECREMENT":
      return state.map(item => cartItems(item, action));
    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
function AddQuantity() {
  const newObj = { id: 2, name: "adidas", quantity: 2 };
  const action = { type: "ADD_TO_CART", ...newObj };
  const stateAfter = [InitailObj, newObj];
  expect(cart(stateBefore, action)).toEqual(stateAfter);
}

function IncrementQuantity() {
  const action = { type: "INCREMENT", id: 1 };
  const stateAfter = [{ id: 1, name: "Nike", quantity: 2 }];
  expect(cart(stateBefore, action)).toEqual(stateAfter);
}

function DecrementQuantity() {
  const action = { type: "DECREMENT", id: 1 };
  const stateAfter = [{ id: 1, name: "Nike", quantity: 0 }];
  expect(cart(stateBefore, action)).toEqual(stateAfter);
}

function RemoveItem() {
  const acttion = { type: "REMOVE_ITEM", id: 1 };
  const stateAfter = [];
  expect(cart(stateBefore, acttion)).toEqual(stateAfter);
}
function UpdateItem() {
  const stateBefore1 = [InitailObj, { id: 2, name: "Adidas", quantity: 1 }];
  const action = { type: "UPDATE_ITEM", id: 2, quantity: 0 };
  const stateAfter = [InitailObj, { id: 2, name: "Adidas", quantity: 0 }];
  expect(cart(stateBefore1, action)).toEqual(stateAfter);
}
AddQuantity();
IncrementQuantity();
DecrementQuantity();
RemoveItem();
UpdateItem();

console.log("All tests passed!");
