import { lazy } from "react";
import { Link } from "react-router-dom";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);
import {useState} from 'react';

const CartView = () => {
  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
  };

  //write a useToggle hook function, let it use other hooks inside the fxn 
  // & return what the hook is required to return
function useHookName(params) {
    // use useState, useEffect, useReducer, etc
    // return what the component needs
    return [value, action];
}
//real hook
//import { useState } from 'react'; //needed but move to top

function useToggle(initializeValue = false) {
    //we create state internally
    const [value, setValue] = useState(initializeValue);

    //2. create the toggle fxn
    const toggle = () => setValue(prev => !prev);

    //3. return what component needs
    return [value, toggle];
}

//now component can use this hook
function Modal() {
  const [isOpen, toggle] = useTottle(false);

  return (
    <div>
      <button onClick={toggle}>Open Modal</button>
      {isOpen && <div>Modal Content</div>}
    </div>
  );
}

//risky choice-reads value from closure,may be stale
const toggle1 = () => setValue(!value);

//this is safe-uses the latest state.
const toggle = () => setValue(prev => !prev);

// custom hook pattern
function useCustomHook(input) {
    //1. Internal state with useState/useReducer
    const [state, setState] = useState(initialValue);

    //2. Internal effects with useEffect if needed
    useEffect(() => {}, []);

    //3. Functions that manipulate the state
    const doSomeThing = () => setState();

    return [state, doSomeThing];

}

function useFecth(url) {

  const [state, setState] = useState(initialValue);

  const fetchUrl = () => setState;
  return {data, loading, error};
}

//useCallBack memoizes a function, which means 
// that it caches the results of the function 
// to prevent the function from being called again.
//in react functions are recreated in every render

function Parent() {
  const [count, setCount] = useState(0);

  //this fxn is created BRAND NEW on every render
  const handleClick = () => {
    console.log('clicked');
  }

  return <Child onClick={handleClick} />;
}

//with useCallBack which caches response
function Parent() {
    const [count, setCount] = useState(0);

    //now handleClick is the SAME fxn 
    // reference btw renders
    const handleClick = useCallback(() => {
        console.log('clicked');
    }, []);

    //here now Child will get same handleClick data 
    //without re-rendering this faXing.
    
    return <Child onClick={handleClick} />;

}
//1. Passing fxns to memoized child component
const child = React.memo(( { onClick }) => {
    console.log('Child rendered');
    return <buton onClick={onClick}>Click</buton>;
});

function Parent() {
    const [count, setCount] = useState();

    const handleClick = useCallback(() => {
        console.log('clicked');
    }, []);

    return (
      <>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <Child onClick={handleClick} />
      </>
    );
}

const fetchData = useCallback(() => {
    fetch(`/app/user/${id}`)
    .then();
    //.then(...);
}, [id]); //only changed when id changes

useEffect(() => {
    fetchData();
}, [fetchData]); //safe - fetchData is stable

//useCallback - memoizes the function itself
const add = useCallback((a, b) => a + b, []);

// useMemo - memoizes the result of calling a fxn
const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  return (
    <div>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-3 d-none d-md-block">
                            <img
                              src="../../images/products/tshirt_red_480x400.webp"
                              width="80"
                              alt="..."
                            />
                          </div>
                          <div className="col">
                            <Link
                              to="/product/detail"
                              className="text-decoration-none"
                            >
                              Another name of some product goes just here
                            </Link>
                            <p className="small text-muted">
                              Size: XL, Color: blue, Brand: XYZ
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm mw-140">
                          <button
                            className="btn btn-primary text-white"
                            type="button"
                          >
                            <i className="bi bi-dash-lg"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="1"
                          />
                          <button
                            className="btn btn-primary text-white"
                            type="button"
                          >
                            <i className="bi bi-plus-lg"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <var className="price">$237.00</var>
                        <small className="d-block text-muted">
                          $79.00 each
                        </small>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2">
                          <i className="bi bi-heart-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="row">
                          <div className="col-3 d-none d-md-block">
                            <img
                              src="../../images/products/tshirt_grey_480x400.webp"
                              width="80"
                              alt="..."
                            />
                          </div>
                          <div className="col">
                            <Link
                              to="/product/detail"
                              className="text-decoration-none"
                            >
                              Another name of some product goes just here
                            </Link>
                            <p className="small text-muted">
                              Size: XL, Color: blue, Brand: XYZ
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="input-group input-group-sm mw-140">
                          <button
                            className="btn btn-primary text-white"
                            type="button"
                          >
                            <i className="bi bi-dash-lg"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="1"
                          />
                          <button
                            className="btn btn-primary text-white"
                            type="button"
                          >
                            <i className="bi bi-plus-lg"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <var className="price">$237.00</var>
                        <small className="d-block text-muted">
                          $79.00 each
                        </small>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2">
                          <i className="bi bi-heart-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/checkout" className="btn btn-primary float-end">
                  Make Purchase <i className="bi bi-chevron-right"></i>
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <i className="bi bi-chevron-left"></i> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <i className="bi bi-truck"></i> Free Delivery within 1-2 weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-end">$1,568</dd>

                  <dt className="col-6 text-success">Discount:</dt>
                  <dd className="col-6 text-success text-end">-$58</dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted">EXAMPLECODE</span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-end">-$68</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end  h5">
                    <strong>$1,350</strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartView;
