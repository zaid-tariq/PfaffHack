define([], function() {
  function VM() {
    var self = this;
    self.myName = ko.observable("Ride Offer");
    self.username = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.searchQuery = ko.observable("");
    self.addressSuggestions = ko.observableArray();
    self.selectedAddress = ko.observable();
    self.searchQuery2 = ko.observable("");
    self.addressSuggestions2 = ko.observableArray();
    self.selectedAddress2 = ko.observable();
    self.APP_ID = "WpwySCOwyFoixH4fFs0B";
    self.APP_CODE = "SDh1tnEiV0cj1ZYtojznQA";

    self.onLoad = function() {};

    self.searchAddress = function() {
      self.sendRequestToHereAPI(self.searchQuery(), function(res){
        self.addressSuggestions(res["suggestions"]);
      })
    };

    self.searchAddress2 = function() {
        self.sendRequestToHereAPI(self.searchQuery2(), function(res){
          self.addressSuggestions2(res["suggestions"]);
        })
      };

    self.sendRequestToHereAPI = function(query, callback){

        url =
        "http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=" +
        self.APP_ID +
        "&app_code=" +
        self.APP_CODE +
        "&query=" +
        query +
        "&beginHighlight=<b>&endHighlight=</b>";
      $.ajax({
        url: url,
        success: callback,
        error: function(res) {
          console.info("ERROR");
          console.info(res);
        }
      });

    }

    self.chooseThisPlace = function(point) {
      self.selectedAddress(point);
      console.info(self.selectedAddress());
    };

    self.chooseThisPlace2 = function(point) {
        self.selectedAddress2(point);
        console.info(self.selectedAddress2());
      };

    self.reset = function() {
    };

    self.onExit = function() {
      self.reset();
    };

    self.submit = function() {

        sessionStorage.setItem('start', self.selectedAddress())
        sessionStorage.setItem('start', self.selectedAddress2())
        
    };
  }

  return {
    getInstance: function() {
      return new VM();
    }
  };
});
