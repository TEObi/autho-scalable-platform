import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState([1, 2, 3, 4, 5]);

  // Shift left: [1,2,3,4,5] → [2,3,4,5,1]
  const shiftLeft = () => {
    setBoxes(prev => {
      const arr = [...prev];
      arr.push(arr.shift());
      return arr;
    });
  };

  // Shift right: [1,2,3,4,5] → [5,1,2,3,4]
  const shiftRight = () => {
    setBoxes(prev => {
      const arr = [...prev];
      arr.unshift(arr.pop());
      return arr;
    });
  };

  let zz = true;
  if(zz) {
    var x = 10;
  }
  console.log('=xx-const= ', x);



  //ES6 usage:
  const a = [1, 2];
  const b = [3, 4];
  const mergedNo = [...a, ...b];
  const nums = [7, 1, 2, 3, 4];
  console.log('==MAXXX== ', Math.max(...nums));
  //const results = [...data]; //...spread is used to merge 
  // or combine array values  
  console.log('=mergedNo== ', mergedNo);

  const defaults = { theme: 'light', lang: 'en'};
  const userSettings = { lang: 'fr' };
  const final = {...defaults, ...userSettings};

  console.log('=zfinal= ', final);
  //rslt= {theme: 'light', lang: 'fr'}

  //rest parameters - ... //used in a fxn as a parameter to 
  // assemble all params into 1 array
  function sum(...numbers) {
      return numbers.reduce((acc, n) => acc + n, 0);
  }
  sum(1, 2, 3, 4);

  const [first, second, ...rest] = [1, 2, 3, 4, 5];
  console.log(first); // 1
  console.log(second); //2
  console.log(rest); // 3, 4, 5
  //Rest = many things collected or assembled into one.

  const orders = [
        { id: 1, status: 'pending',   amount: 100 },
        { id: 2, status: 'completed', amount: 200 },
        { id: 3, status: 'pending',   amount: 150 },
        { id: 4, status: 'cancelled', amount: 50  },
        { id: 5, status: 'completed', amount: 300 },
      ];
  
    const results = orders.reduce((acc, order) => {
        //acc[order.status] = acc[order.status] || [];

        if(!acc[order.status]) {
            acc[order.status] = [];
        }
        acc[order.status].push(acc);

        console.log('=acc= ', acc);
        return acc;
    }, {});

  //1. A reduce() that groups items. 
  // The brings or groups array data together - 
  const rslts = orders.reduce((acc, order) => {
      if (!acc[order.status]) {
          acc[order.status] = [];
      }
      acc[order.status].push(acc);
      return a;
  });
  //2. A spread merge of two objects
  //spread is used to merge two objects.
  const aa = [1, 2, 3];
  const bb = [4, 5, 6];
  const aabb = [...aa, ...bb];
  console.log('--aabb-- ', aabb);
  //rest param
function resultVal(...data) {
  console.log('==rest-paramzz= ', data);
}
const data = ['x', 'y', 'z'];
resultVal(...data);

//useEffect() hooks
useEffect(() => {
    console.log('-runs on every render run call--');
}); // no dependency array - runs repeatedy

useEffect(() => {
   console.log('--runs once on page load or page mount--');
}, []);//with empty depency array [] 

useEffect(() => {
    console.log('--runs per every [count] value change-')
}, [count]); ///with a [count] as depency array 

//with [count]
useEffect(() => {
    fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data));
}, [userId]);  // re-fetches again when userId changes

useEffect(() => {
    fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data));
}, [userId]);

useEffect(() => {
    fetchProducts();
});

const fetchProducts = () => {
  fetch(`/api/users/${userId}`)
  .then(res=>res.json())
  .then(data => setUser(data));
}

const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [isClose, setIsClose] = useState(true);
const [number, setNumber] = useState(0);

function cartReducer(state, action) {
    switch(action. type) {
        case 'ADD_ITEM':
          return [...state, action.item];
        case 'REMOVE_ITEM':
          return state.filter(item => item.id !== action.id);
        case 'CLEAR_CART':
          return [];
        default:
          return state;
    }
}

//use the above reducer in a component using useReducer()
function Cart() {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
      <div>
        <button onClick={() => dispatch({ type: 'ADD_ITEM', item: { id: 1, name: 'Shoes' } })}>
            Add Shoes
        </button>
        <button onClick={() => dispatch({ type: 'CLEAR_CART'})}>
            Clear
        </button>
      </div>
    );
}

//using the hooks
setCount(count + 1);

//use the useReducer way
dispatch({ type: 'INCREMENT' });

  return (
    <div className="App">
      <h1>Frontend Task</h1>
      <div className="task-row">
        <div className="left-shift-button">
          <button onClick={shiftLeft}>&lt;&lt;</button>
        </div>
        <div className="boxes">
          {boxes.map((num, i) => (
            <div className="box" key={i}>{num}</div>
          ))}
        </div>
        <div className="right-shift-button">
          <button onClick={shiftRight}>&gt;&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default App;
