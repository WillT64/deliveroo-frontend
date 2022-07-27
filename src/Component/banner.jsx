const Banner = (props) => {
  const { data } = props;

  return (
    <div className="resto">
      <div className="resto--infos">
        <h1>{data.restaurant.name}</h1>
        <p>{data.restaurant.description}</p>
      </div>
      <div className="resto--picture">
        <img src={data.restaurant.picture} alt="resto" />
      </div>
    </div>
  );
};

export default Banner;
