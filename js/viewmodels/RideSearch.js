define([], function() {
  function VM() {
    var self = this;
    self.myName = ko.observable("Ride Search");
    self.username = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.searchQuery = ko.observable("");
    self.addressSuggestions = ko.observableArray();
    self.selectedAddress = ko.observable();
    self.APP_ID = "WpwySCOwyFoixH4fFs0B";
    self.APP_CODE = "SDh1tnEiV0cj1ZYtojznQA";
    self.Query = "Pariser+1+Berl";

    self.onLoad = function() {};

    self.searchAddress = function() {
      url =
        "http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=" +
        self.APP_ID +
        "&app_code=" +
        self.APP_CODE +
        "&query=" +
        self.searchQuery() +
        "&beginHighlight=<b>&endHighlight=</b>";
      $.ajax({
        url: url,
        success: function(res) {
          console.info(res);
          self.addressSuggestions(res["suggestions"]);
        },
        error: function(res) {
          console.info("ERROR");
          console.info(res);
        }
      });
    };

    self.chooseThisPlace = function(point) {
      console.info(point);
      self.selectedAddress(point);
      console.info(self.selectedAddress());
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
      return new VM();
    }
  };
});
