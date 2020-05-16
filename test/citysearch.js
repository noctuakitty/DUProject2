var http = require("https");

var location = process.argv[2];

var options = {
  method: "GET",
  hostname: "tripadvisor1.p.rapidapi.com",
  port: null,
  path:
    "/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" +
    location,
  headers: {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "498e1b27camshc4cc7fcfd3fd06cp1c6b58jsnc3d33dff5f94",
    useQueryString: true
  }
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

// req.end();

var http = require("https");

var options = {
  method: "GET",
  hostname: "tripadvisor1.p.rapidapi.com",
  port: null,
  path:
    "/attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&location_id=" +
    location,
  headers: {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "498e1b27camshc4cc7fcfd3fd06cp1c6b58jsnc3d33dff5f94",
    useQueryString: true
  }
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

var options = {
  method: "GET",
  hostname: "tripadvisor1.p.rapidapi.com",
  port: null,
  path: "/restaurants/get-details?location_id=2233968&lang=en_US&currency=USD",
  headers: {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "498e1b27camshc4cc7fcfd3fd06cp1c6b58jsnc3d33dff5f94",
    useQueryString: true
  }
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();

var options = {
  method: "GET",
  hostname: "tripadvisor1.p.rapidapi.com",
  port: null,
  path:
    "/hotel-filters/list?subcategory=hotel%252Cbb%252Cspecialty&lang=en_US&currency=USD&nights=4&zff=4%252C6&hotel_class=1%252C2%252C3&order=asc&checkin=2020-01-08&amenities=beach%252Cbar_lounge%252Cairport_transportation&sort=recommended&child_rm_ages=7%252C11&adults=1&rooms=1&location_id=293919",
  headers: {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "498e1b27camshc4cc7fcfd3fd06cp1c6b58jsnc3d33dff5f94",
    useQueryString: true
  }
};

var req = http.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function() {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
