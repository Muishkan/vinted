import axios from "axios";
import { useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./stripeform";
import GlobalContext from "../store/context-store";


const Checkout = () => {

  //extract stripe promise from context store..
  const {stripePromise} = useContext(GlobalContext);

  const { id } = useParams();

  const [offer, setOffer] = useState();
  const [isloading, setLoading] = useState(true);
  const [protection] = useState(1.8);
  const [shipping] = useState(2.6);

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
