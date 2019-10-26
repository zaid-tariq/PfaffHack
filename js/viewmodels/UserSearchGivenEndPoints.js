define([], function() {
    function UserSearchGivenEndPoints() {
      var self = this;
      self.myName = ko.observable("User Search given end points");
      self.username = ko.observable();
      self.firstName = ko.observable();
      self.lastName = ko.observable();
      self.ridesList = ko.observableArray();

  
      self.onLoad = function() {
        var startPoint; //start address
        var endPoint; //end address

        //query API for rides
        var res = [{
          "id":"1",
          "by":"user1",
          "from":"startlocation",
          "to":"endlocation",
          "seats":"4"
        },
        {
          "id":"2",
          "by":"user2",
          "from":"startlocation",
          "to":"endlocation",
          "seats":"2"
        }
        ];
        
        self.ridesList(res);

      };

      self.selectRide = function(arg) {
        g_BaseVM.proceedWithWarning(arg.by + " - " + arg.from + " - " + arg.to)
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
  