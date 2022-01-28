import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = () => {

  const { id } = useParams();
  const [offer, setOffer] = useState();
  const [isloading, setLoading] = useState(true);

  // Query to get product data
  useEffect(() => {
    let active = true;
    (async () => {
      const offerData = await axios(
        `https://myvintedapi.herokuapp.com/offer/${id}`
      );
      if (active) {
        setOffer(offerData.data);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  return isloading ? (
     <div className="loading">
      <img
        src="https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif"
        alt="Loading"
      />
    </div>
  ) : (
    <div className="product">
      <div className=" product-card">
        <div className="product-image">
          <img
            className="product-image"
            src={offer.product_image.secure_url}
            alt=""
          />
        </div>

        <div className="product-info">
          <div>{offer.product_price} €</div>
          <ul>
            {/* Iterate over Product details array */}
            {offer.product_details.map((elem, index) => {
              const keys = Object.keys(elem);
              // Over object contains a single key, otherwise a map should be considered
              const key = keys[0];
              return (
                <li className="product-keys" key={index}>
                  <span>{key.toLocaleUpperCase()}</span>
                  <span>{elem[key].toLocaleUpperCase()}</span>
                </li>
              );
            })}
          </ul>
          <div>{offer.product_description}</div>
          <Link className="btn-checkout" to={`/offer/checkout/${id}`}>
            <button type="submit" className="btn-login">
              Acheter <FontAwesomeIcon icon="shopping-cart" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
