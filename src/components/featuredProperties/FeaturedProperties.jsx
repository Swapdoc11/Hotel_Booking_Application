import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotel/get_hotels?featured=true&limit=3&min=50&max=250")
  
  return (
    <div className="fp">
      {loading ? ('L O A D I N G') : (
        <>
          {data.map((item,i) => (

            <div className="fpItem" key={i}>
              <img
                src={item?.photo[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">{item?.city}</span>
              <span className="fpPrice">Starting Price From Rs.{item?.chepestPrice}</span>
              {item?.rating && <div className="fpRating">
                <button>{item?.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
        )}

    </div>
  );
};

export default FeaturedProperties;
