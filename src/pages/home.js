import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../components/filter";
import panimage from "../vinted-front2.jpg";
import GlobalContext from "../store/context-store";
import SEO from "../components/seo";

const Home = () => {
  
  //extract searchStr from Context store..
  const {searchStr} = useContext(GlobalContext)
  
  //set initial states, offers, offercount and query filters
  const [offers, setOffers] = useState();
  const [offerCount, setOfferCount] = useState();
  const [isLoading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "price",
    ascending: true,
    range: [10, 1000],
    resultsPerPage: 10,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      const { sortBy, ascending, range, resultsPerPage, page } = filters;
      const sortorder = ascending ? "asc" : "desc";

      // Get number of document that matches query.. for pagination..
      try {
              const offerCount = await axios(
                `${process.env.REACT_APP_API}/offers?title=${searchStr}&priceMin=${range[0]}&priceMax=${range[1]}&count=count`
              );

              //Execute query..
              const offerData = await axios(
                `${process.env.REACT_APP_API}/offers?title=${searchStr}&priceMin=${range[0]}&priceMax=${range[1]}&sortby=product_${sortBy}&sortorder=${sortorder}&results_per_page=${resultsPerPage}&page=${page}`
              );

              setOffers(offerData.data);
              setOfferCount(offerCount.data.count);
              setLoading(false);

      } catch (err) {
        console.log(err.message)

      }

    })();
  }, [filters, searchStr]);

  return isLoading ? (
    <div className='loading'>
      <img
        src='https://media.giphy.com/media/PUYgk3wpNk0WA/giphy.gif'
        alt='Loading'
      />
    </div>
  ) : (
    <div>
      <SEO
        title='Vinted by Masood: Home'
        page='Home'
        description='Vinted project by Masood @ LE REACTEUR, PARIS'
        keywords={`Vinted, Le Reacteur, Paris`}
        robots={`index, follow`}
        link={`https://vinted.cloudi.fr/`}
        type='website'
        creator='Masood AHMAD'
        image='https://vinted.cloudi.fr/logo192.png'
      />
      <Filter
        filters={filters}
        searchStr={searchStr}
        setFilters={setFilters}
        offerCount={offerCount}
      />
      <img className='pan-image' src={panimage} alt='' />
      <div className='offers container'>
        {offers.map((offer, index) => {
          return (
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <div className='card'>
                <div>
                  <p>{offer.owner.account.username}</p>
                </div>
                <div>
                  <img
                    className='card-image'
                    src={offer.product_image.secure_url}
                    alt=''
                  />
                </div>
                <p>{offer.product_price} €</p>
                <p>{offer.product_name}</p>
                <p>{offer.product_details[1].taille}</p>
                <p>{offer.product_details[0].marque}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
