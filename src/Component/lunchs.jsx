const Lunch = (props) => {
  const { data, addFood, FontAwesomeIcon } = props;

  return (
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
                        <p className="lunch--description">{elem.description}</p>
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
                      {elem.picture && (
                        <div className="lunch--picture">
                          <img src={elem.picture} alt="lunch" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          );
        }
      })}
    </div>
  );
};

export default Lunch;
