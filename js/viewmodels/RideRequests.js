define([], function() {
  function RideRequests() {
    var self = this;
    self.myName = ko.observable("Ride Requests");
    self.username = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.ridesList = ko.observableArray();

    self.onLoad = function() {
      var startPoint; //start address
      var endPoint; //end address

      //query API for rides
      var res = [
        {
          id: "1",
          by: "user1",
          from: "startlocation",
          to: "endlocation"
        },
        {
          id: "2",
          by: "user2",
          from: "startlocation",
          to: "endlocation"
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
                arr.splice(i, 1);
                self.ridesList(arr);
                g_BaseVM.setFootNote("RIDE ACCEPTED", "success");
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
      return new RideRequests();
    }
  };
});
