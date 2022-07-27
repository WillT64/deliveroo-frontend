const Cart = (props) => {
  const { foodCart, setFoodCart, cartPrice, deliveryPrice, FontAwesomeIcon } =
    props;

  return (
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
                <p>{(elem.price * elem.quantity).toFixed(2)} €</p>
              </div>
            );
          })}
        </div>
        <div className="panier--result">
          <div className="panier--result--item">
            <p>Sous-total</p>
            <p>{cartPrice.toFixed(2)} €</p>
          </div>
          <div className="panier--result--item">
            <p>Frais de livraison</p>
            <p>{deliveryPrice.toFixed(2)} €</p>
          </div>
        </div>
        <div className="panier--total">
          <span>Total</span>
          <span>{(cartPrice + deliveryPrice).toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
