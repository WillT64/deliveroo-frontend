import { useState, useEffect } from "react";
import axios from "axios";

import "./App.scss";

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

  const [foodCart, setFoodCart] = useState([
    { name: "Fromage blanc bio au miel", price: 10, quantity: 3 },
    { name: "Brunch authentique 1 personne", price: 22, quantity: 6 },
  ]);
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
          <div className="resto">
            <div className="resto--infos">
              <h1>{data.restaurant.name}</h1>
              <p>{data.restaurant.description}</p>
            </div>
            <div className="resto--picture">
              <img src={data.restaurant.picture} alt="resto" />
            </div>
          </div>
        </div>

        <div className="mid">
          <div className="categories">
            {data.categories.map((elem, index) => {
              if (elem.meals.length > 0) {
                return (
                  <>
                    <h2>{elem.name}</h2>
                    <div className="menu" key={index}>
                      {elem.meals.map((elem, index2) => {
                        const foodName = elem.title;
                        const foodPrice = elem.price;

                        return (
                          <div
                            className="lunch"
                            key={index2}
                            value={foodName}
                            onClick={() => {
                              addFood(foodName, foodPrice);
                            }}
                          >
                            <div className="lunch--infos">
                              <h3 className="lunch--title">{elem.title}</h3>
                              <p className="lunch--description">
                                {elem.description}
                              </p>
                              <div className="lunch--pp">
                                <p className="lunch--price">{elem.price} €</p>
                                {elem.popular && (
                                  <p className="lunch--popular">
                                    <FontAwesomeIcon icon="star" />
                                    <span> Populaire </span>
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="lunch--picture">
                              <img src={elem.picture} alt="lunch" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }
            })}
          </div>
          <div className="panier">
            <div className="panier--card">
              <button className="panier--button">Valider mon panier</button>
              <div className="panier--infos">
                {foodCart.map((elem, index) => {
                  return (
                    <div className="panier--infos--item">
                      <p>
                        <FontAwesomeIcon
                          icon="circle-minus"
                          onClick={() => {
                            const newCart = [...foodCart];

                            if (newCart[index].quantity === 1) {
                              newCart.splice(index, 1);
                            } else {
                              newCart[index].quantity--;
                            }

                            setFoodCart(newCart);
                          }}
                        />
                        <span> {elem.quantity} </span>
                        <FontAwesomeIcon
                          icon="circle-plus"
                          onClick={() => {
                            const newCart = [...foodCart];
                            newCart[index].quantity++;
                            setFoodCart(newCart);
                          }}
                        />
                      </p>
                      <p>{elem.name}</p>
                      <p>{Math.round(elem.price * elem.quantity)} €</p>
                    </div>
                  );
                })}
              </div>
              <div className="panier--result">
                <div className="panier--result--item">
                  <p>Sous-total</p>
                  <p>{Math.round(cartPrice)} €</p>
                </div>
                <div className="panier--result--item">
                  <p>Frais de livraison</p>
                  <p>{Math.round(deliveryPrice)} €</p>
                </div>
              </div>
              <div className="panier--total">
                <span>Total</span>
                <span>{Math.round(cartPrice + deliveryPrice)} €</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bot"></div>
      </div>
      <div className="footer"></div>
    </>
  );
}

export default App;
