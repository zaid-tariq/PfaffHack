define([], function() {
  function UserSearchGivenEndPoints() {
    var self = this;
    self.myName = ko.observable("User Search given end points");
    self.username = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.ridesList = ko.observableArray();
    self.myStartPos = ko.observable();
    self.myEndPos = ko.observable();
    self.myLocationText = ko.observable();
    self.APP_ID = "WpwySCOwyFoixH4fFs0B";
    self.APP_CODE = "SDh1tnEiV0cj1ZYtojznQA";

    self.onLoad = function() {
      if (null === sessionStorage.getItem("start")) {
      } else {
        console.info(sessionStorage.getItem("start"));
        console.info(sessionStorage.getItem("end"));
        self.myLocationText(
          sessionStorage.getItem("start") +
            "  <br> ->" +
            sessionStorage.getItem("end")
        );

        self.sendRequestToHereAPI(sessionStorage.getItem("start"), function(
          start
        ) {
          self.myStartPos(start);
          console.info(self.myStartPos());
          self.sendRequestToHereAPI(sessionStorage.getItem("end"), function(end) {
            self.myEndPos(end);
            console.info(self.myEndPos());
            var startPoint; //start address
            var endPoint; //end address
      
            //query API for rides
            var res = [
              {
                id: "1",
                by: "Khurram",
                from: "Deutschland, Düsseldorf, Stadtmitte",
                to: "Deutschland, Rickling, Meisenweg",
                distance: ko.observable(4),
                seats: ko.observable(4)
              },
              {
                id: "2",
                by: "Ahmed",
                from: "Deutschland, Berlin, Fraunhoferstraße",
                to: "Deutschland, Kamen, Kaiserau, Max-Planck-Straße",
                distance: ko.observable(4),
                seats: ko.observable(2)
              }
            ];
      
            self.ridesList(res);
            self.getLongAndLat();
          });
        });


      }


    };

    self.sendRequestToHereAPI = function(query, callback) {
      url =
        "https://geocoder.api.here.com/6.2/geocode.json?app_id=" +
        self.APP_ID +
        "&app_code=" +
        self.APP_CODE +
        "&searchtext=" +
        encodeURI(query);
      // +"&gen=8";

      $.ajax({
        url: url,
        success: callback,
        error: function(res) {
          console.info("ERROR");
          console.info(res);
        }
      });
    };

    self.getLongAndLat = function() {
      var arr = self.ridesList().forEach(function(item, i) {
        self.sendRequestToHereAPI(item.from, function(res) {
          try {
            console.info(res);
            lat =
              res.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
            long =
              res.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
            console.info("lat" + lat + ", long" + long);

            val = self.calcCrow(
              {
                lat: lat,
                lng: long
              },
              {
                lat: self.myStartPos().Response.View[0].Result[0].Location
                  .DisplayPosition.Latitude,
                lng: self.myStartPos().Response.View[0].Result[0].Location
                  .DisplayPosition.Longitude
              }
            );

            console.info(val);
            item.distance(Math.round(val, 2));
          } catch (e) {
            console.info(e);
          }
        });
      });
    };

    self.selectRide = function(arg) {
      arr = self.ridesList();
      g_BaseVM.proceedWithWarning(
        arg.by + " - " + arg.from + " - " + arg.to,
        function() {
          for (i in arr) {
            var objj = arr[i];
            if (objj.id == arg.id) {
              newseats = objj.seats() - 1;
              objj.seats(newseats);
              g_BaseVM.setFootNote("RIDE BOOKED", "success");
              break;
            }
          }
        }
      );
    };
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    self.calcCrow = function(coords1, coords2, R) {
      var R = 6.371; // km
      var R = 6371000;
      var dLat = self.toRad(coords2.lat - coords1.lat);
      var dLon = self.toRad(coords2.lng - coords1.lng);
      var lat1 = self.toRad(coords1.lat);
      var lat2 = self.toRad(coords2.lat);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    };
    // Converts numeric degrees to radians
    self.toRad = function(Value) {
      return (Value * Math.PI) / 180;
    };

    self.ridesListComputed = ko.computed(function() {
      //sort
    });

    self.reset = function() {
      // alert("reset");
    };

    self.onExit = function() {
      // alert("onexit");
      self.reset();
    };

    self.submit = function() {
      console.info(self.firstName());
      console.info(self.lastName());
      console.info(self.username());
    };
  }

  return {
    getInstance: function() {
      return new UserSearchGivenEndPoints();
    }
  };
});
