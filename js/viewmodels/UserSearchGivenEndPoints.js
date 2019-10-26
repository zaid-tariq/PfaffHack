define([], function() {
  function UserSearchGivenEndPoints() {
    var self = this;
    self.myName = ko.observable("User Search given end points");
    self.username = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.ridesList = ko.observableArray();

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(coords1, coords2, R) {
      // var R = 6.371; // km
      //var R = 6371000;
      var dLat = toRad(coords2.lat - coords1.lat);
      var dLon = toRad(coords2.lng - coords1.lng);
      var lat1 = toRad(coords1.lat);
      var lat2 = toRad(coords2.lat);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    }
    // Converts numeric degrees to radians
    function toRad(Value) {
      return (Value * Math.PI) / 180;
    }

    self.onLoad = function() {
      var startPoint; //start address
      var endPoint; //end address

      //query API for rides
      var res = [
        {
          id: "1",
          by: "user1",
          from: "startlocation",
          to: "endlocation",
          seats: ko.observable(4)
        },
        {
          id: "2",
          by: "user2",
          from: "startlocation",
          to: "endlocation",
          seats: ko.observable(2)
        }
      ];

      self.ridesList(res);
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
