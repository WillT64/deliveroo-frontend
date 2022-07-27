import { useState, useEffect } from "react";
import axios from "axios";

import "./App.scss";
import Cart from "./Component/cart";
import Lunch from "./Component/lunchs";
import Banner from "./Component/banner";

import logoDeliveroo from "./assets/imgs/images/logo-teal.svg";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faCircleMinus,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faStar, faCircleMinus, faCirclePlus);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [foodCart, setFoodCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(2.5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://willt64-deliveroo-backend.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let newPrice = 0;
    for (let i = 0; i < foodCart.length; i++) {
      newPrice = newPrice + foodCart[i].quantity * foodCart[i].price;
    }
    setCartPrice(newPrice);
  }, [foodCart]);

  const addFood = (foodName, foodPrice) => {
    const newFood = [...foodCart];
    const foodExist = newFood.find((element) => element.name === foodName);

    if (!foodExist) {
      // si la food n'existe pas
      newFood.push({ name: foodName, price: foodPrice, quantity: 1 });
      setFoodCart(newFood);
    } else {
      // si la food existe
      const indexFoodName = newFood.indexOf(foodExist);
      newFood[indexFoodName] = {
        name: foodExist.name,
        price: foodExist.price,
        quantity: foodExist.quantity + 1,
      };
      setFoodCart(newFood);
    }
  };

  return isLoading ? (
    <span>data loading ...</span>
  ) : (
    <>
      <div className="header">
        <div className="header--logo">
          <img src={logoDeliveroo} alt="logo deliveroo" />
        </div>
      </div>

      <div className="body">
        <div className="top">
          <Banner data={data} />
        </div>

        <div className="mid">
          <Lunch
            data={data}
            addFood={addFood}
            FontAwesomeIcon={FontAwesomeIcon}
          />
          <Cart
            foodCart={foodCart}
            setFoodCart={setFoodCart}
            cartPrice={cartPrice}
            deliveryPrice={deliveryPrice}
            FontAwesomeIcon={FontAwesomeIcon}
          />
        </div>

        <div className="bot"></div>
      </div>
      <div className="footer"></div>
    </>
  );
}

export default App;
