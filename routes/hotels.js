function hotels(app) {
  
    // Getting some hotels for the location
    // Append this below the main get locationID code in locations.js
    
  var options_for_hot = {
    method: "GET",
    hotel_class: "https://tripadvisor1.p.rapidapi.com/hotels/list",
    qs: {
      offset: "0",
      lang: "en_US",
      currency: "USD",
      sort: "recommended",
      limit: "30",
      adults: "2",
      rooms: "1",
      location_id: locationId,
    },
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "498e1b27camshc4cc7fcfd3fd06cp1c6b58jsnc3d33dff5f94",
    },
  };

  console.log("locationId is: " + locationId);

  request(options_for_hot, function(error, response, body) {
    if (error) {
      throw new Error(error);
    }
    var hotel_data = JSON.parse(body);
    var hotels = [1, 2, 3, 4, 5];
    for (i = 0; i < 5; i++) {
      hotels[i] = [
        hotels_data.data[i].name,
        hotels_data.data[i].ranking,
        hotels_data.data[i].hotel_class,
      ];
    }

    // Clean up five JSON responses

    hotel_one_name = hotels[0][0];
    hotel_one_ranking = hotels[0][1];
    hotel_one_hotel_class = hotels[0][2];

    hotel_two_name = hotels[1][0];
    hotel_two_ranking = hotels[1][1];
    hotel_two_hotel_class = hotels[1][2];

    hotel_three_name = hotels[2][0];
    hotel_three_ranking = hotels[2][1];
    hotel_three_hotel_class = hotels[2][2];

    hotel_four_name = hotels[3][0];
    hotel_four_ranking = hotels[3][1];
    hotel_four_hotel_class = hotels[3][2];

    hotel_five_name = hotels[4][0];
    hotel_five_ranking = hotels[4][1];
    hotel_five_hotel_class = hotels[4][2];

    res.render("traveler.handlebars", {
      layout: "main",
      hotel_one: hotel_one_name,
      hotel_one_ranking: hotel_one_ranking,
      hotel_one_hotel_class: hotel_one_hotel_class,

      hotel_two: hotel_two_name,
      hotel_two_ranking: hotel_two_ranking,
      hotel_two_hotel_class: hotel_two_hotel_class,

      hotel_three: hotel_three_name,
      hotel_three_ranking: hotel_three_ranking,
      hotel_three_hotel_class: hotel_three_hotel_class,

      hotel_four: hotel_four_name,
      hotel_four_ranking: hotel_four_ranking,
      hotel_four_hotel_class: hotel_four_hotel_class,

      hotel_five: hotel_five_name,
      hotel_five_ranking: hotel_five_ranking,
      hotel_five_hotel_class: hotel_five_hotel_class,
    });
  });
}
module.exports = hotels;
