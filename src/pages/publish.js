import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Publish = ({ token }) => {
  const [errMessage, seterrMessage] = useState("");
  const [imageFile, setImageFile] = useState({});

  const navigate = useNavigate();
  //Handle form submit

  const handlePublish = async (event) => {
    event.preventDefault();

    //Select form and and image element
    const form = event.target;
    // const form = event.target;

    //creat offer data object with form inputs .. append image file
    const offerData = new FormData(form);
    offerData.append("offerImage", imageFile);

    try {
      const response = await axios.post(
        "https://myvintedapi.herokuapp.com/offer/publish",
        offerData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      navigate(`/offer/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-pan">
      <form id="offer-form" onSubmit={handlePublish}>
        <div id="offer-label">Publier une annonce</div>
        <div>
          <label for="title">Title</label>
          <input className="input-txt" type="text" name="title" id="title" />
        </div>

        <div>
          <label for="description">Description</label>
          <input
            className="input-txt"
            type="text"
            name="description"
            id="description"
          />
        </div>
        <div>
          <label for="price">Price</label>
          <input className="input-txt" type="number" name="price" id="price" />
        </div>

        <div>
          <label for="condition">Condition</label>
          <input
            className="input-txt"
            type="text"
            name="condition"
            id="condition"
          />
        </div>

        <div>
          <label for="city">City</label>
          <input className="input-txt" type="text" name="city" id="city" />
        </div>

        <div>
          <label for="brand">Brand</label>
          <input className="input-txt" type="text" name="brand" id="brand" />
        </div>

        <div>
          <label for="size">Size</label>
          <input className="input-txt" type="text" name="size" id="size" />
        </div>

        <div>
          <label for="color">Couleur</label>
          <input className="input-txt" type="text" name="color" id="color" />
        </div>

        <div>
          <label for="picture">Photo</label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={(event) => setImageFile(event.target.files[0])}
          />
        </div>

        <button id="btn-publish" className="btn-login" type="submit">
          Publier l'annonce
        </button>
      </form>
      <p>{errMessage}</p>
    </div>
  );
};

export default Publish;
