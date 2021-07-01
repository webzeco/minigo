import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch  } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import Home from "./Home";
import { CollectionContext } from "./contexts/CollectionContext";
import {UserContext} from './contexts/UserContext';
import "./style/global.css";
import ShowProductDetail from "./ShowProductDetail";
import ShowComponents from "./ShowCardsComponents";
import Signup from "./Signup";
import { productData } from "./data";
import Login from "./Login";
import Forgot from "./Forgot";
import Account from "./Account";
import { ProductDetailContext } from "./contexts/ProductDetailContext";
import { retry } from "async";
const Main = () => {
  const history=useHistory();
  const [user,setUser]=useState();
  const [collection, setColl] = useState("");
  const [items, setItems] = useState([]);
  const [product,setProduct]=useState();

  useEffect(() => {
    setItems(productData);
  }, []);

  const setCollectionHandler = (coll) => {
    setColl(coll);
  };
  const loginHandler=(user)=>{
    setUser(user);
    history.push('/');
  }
  const signUpHandler=(user)=>{
    setUser(user);
    history.push('/');
  }
  const forgotHandler=(user)=>{
    console.log('email sent!!!!');
    history.push('/');
  }

  const productDetailHandler=(prod)=>{
    setProduct(prod);
    console.log(prod);
    history.push('/showProductDetail');
  }
  return (
    <UserContext.Provider value= {{user:user}}>
          <ProductDetailContext.Provider value= {{product,productDetailHandler}}>
    <CollectionContext.Provider value={{ coll: collection, setCollectionHandler }}>
        <div>
          <Header />
          <hr />
          <Switch>
            {/* <Route path="/showProduct"   component={ ShowComponents} /> */}
            <Route
            exact
              path="/"
              render={(props) => <Home bestSells={productData} {...props} />}
            />
            <Route
              path="/showProduct"
              render={(props) => (
                <ShowComponents productData={productData} {...props} />
              )}
            />
            <Route
              path="/showProductDetail"
              render={(props) => (
                <ShowProductDetail product={product} {...props} />
              )}
            />
             <Route
              path="/signup"
              render={(props) => (
                <Signup onSignUp={signUpHandler} {...props} />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <Login onLogin={loginHandler} {...props} />
              )}
            />
            <Route
              path="/forgot"
              render={(props) => (
                <Forgot onForgot={forgotHandler} {...props} />
              )}
            />
            <Route
              path="/account"
              render={(props) => (
                <Account onForgot={forgotHandler} {...props} />
              )}
            />
            <Route  component={NotFound} />
          </Switch>
          <Footer />
        </div>
    </CollectionContext.Provider>
</ProductDetailContext.Provider>
    </UserContext.Provider>
  );
};

export default Main;
