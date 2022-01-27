import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const StripeForm = ({ userID, productID }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handlePayment = async (event) => {
    event.preventDefault();
    const cardNumber = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardNumber, {
      name: userID,
    });

    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://myvintedapi.herokuapp.com/offer/pay",
      {
        stripeToken,
        productID,
      }
    );
    console.log(response.data);
    if ((response.data.status = "scceeded")) {
      setFeedback("Paiement effectué avec success.");
      setCompleted(true);
    }
  };

  return !completed ? (
    <>
      <form className="stripe-form" action="" onSubmit={handlePayment}>
        <CardElement className="card-stripe" />
        <div className="btn-pay">
          <button className="btn-checkout" type="submit" className="btn-login">
            Payer <FontAwesomeIcon icon="shopping-cart" />
          </button>
        </div>
      </form>
    </>
  ) : (
    <p className="newsletter">{feedback}</p>
  );
};

export default StripeForm;
