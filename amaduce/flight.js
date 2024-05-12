var Amadeus = require("amadeus");
const config = require("../src/config");
const router = require("express").Router();
const amadeus = new Amadeus({
  clientId: "KV4ZxvRU1upIGoODYEWb4xSVyncIAJrv",
  clientSecret: "NAcfE7wRVIDgZuBz",
});

router.get("/search", async (req, res) => {
  const { origin, subType, keyword } = req.query;
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: "BKK",
      departureDate: "2023-08-01",
      adults: "2",
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

router.get(`/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;
  // API call with params we requested from client app
  console.log(keyword);
  // Sending response for client
  try {
    const response = await amadeus.referenceData.locations.cities.get({
      keyword: keyword,
    });
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

module.exports = router;
