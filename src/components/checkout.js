import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./stripeform";

const Checkout = ({ stripePromise }) => {
  const { id } = useParams();

  const [offer, setOffer] = useState();
  const [isloading, setLoading] = useState(true);
  const [protection, setProtection] = useState(1.8);
  const [shipping, setShipping] = useState(2.6);

  //Handle payment with stripe..

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
        console.log(offerData.data.owner.id);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  return isloading ? (
    <div>Loading</div>
  ) : (
    <Elements stripe={stripePromise}>
      <div className="product">
        <div className=" product-card">
          <div className="product-info">
            <div>{offer.product_name}</div>
            <ul>
              {/* Iterate over Product details array */}

              <li className="product-keys-checkout">
                <span>Commande:</span>
                <span>{offer.product_price} €</span>
              </li>
              <li className="product-keys-checkout">
                <span>Frais protection acheteurs:</span>
                <span>{protection} €</span>
              </li>
              <li className="product-keys-checkout">
                <span>Frais de port:</span>
                <span>{shipping} €</span>
              </li>
            </ul>
            <div className="product-keys-checkout cart-total">
              <span>Total</span>
              <span>{offer.product_price + protection + shipping} €</span>
            </div>
            <StripeForm userID={offer.owner._id} productID={offer._id} />
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;
