define(["binder"], function(_binder) {
  var binder = _binder;

  function BaseVM() {
    var self = this;
    var loadingSemaphore = 0;

    self.showMenuButtons = ko.observable(false);
    self.loadingText = ko.observable("");
    self.warningText = ko.observable("");
    self.currentTabName = ko.observable("")
    self.username = ko.observable("Guest");

    self.msg = ko.observable("hello!");
    self.showMessage = ko.observable(false);

    self.footerClass = ko.observable("alert alert-info");

    self.setFootNote = function(msg, type, timeout) {
      self.msg(msg);
      self.showMessage(true);

      //if(type)
      switch (type) {
        case "error":
          self.footerClass("alert alert-danger");
          break;

        case "success":
          self.footerClass("alert alert-success");
          break;

        case "warning":
          self.footerClass("alert alert-warning");
          break;

        default:
          self.footerClass("alert alert-info");
      }

      timeout = 5000;
      if (timeout)
        setTimeout(function() {
          self.showMessage(false);
        }, timeout);
    };

    self.warningIgnoredCallback = function() {
      //override this
    };

    self.warningHeededCallback = function() {
      //override this
    };

    self.proceedWithWarning = function(
      warningText,
      callbackIfYes,
      callbackIfNo
    ) {
      self.warningText(warningText);

      if (callbackIfYes) self.warningIgnoredCallback = callbackIfYes;

      //not incorporated in html yet
      if (callbackIfNo) self.warningHeededCallback = callbackIfNo;

      $("#warningPopup").modal("show");
    };

    self.showBomPage = function() {
      self.showMenuButtons(true);
      binder.loadView("Create BOM", "CreateBomVM", "createBomPage");
    };

    self.showRulesPage = function() {
      self.showMenuButtons(true);
      binder.loadView("Create Rules", "CreateRulesVM", "createRulesPage");
    };

    self.showRideReviewpage = function() {
      self.currentTabName("Review Rides")
      self.showMenuButtons(true);
      binder.loadView("RideReview", "RideReview", "ridereview");
    };

    self.showLandingPage = function() {
      // self.showSingUpPage()
      // self.showMenuButtons(false)
      self.currentTabName("")
      binder.loadView("Landing Page", "LandingPageVM", "landingPage");
    };

    self.showRideSearchPage = function() {
      self.currentTabName("Ride Search")
      binder.loadView("RideSearch", "RideSearch", "ridesearch");
	};
	
	self.showMessagePage = function() {
    self.currentTabName("Messages")
		binder.loadView("Message", "Message", "message");
	  };

    self.showUpcomingRidespage = function() {
      self.currentTabName("Upcoming Rides")
      binder.loadView("UpcomingRides", "UpcomingRides", "upcomingrides");
    };

    self.showRideRequestspage = function() {
      self.currentTabName("Ride Requests")
      binder.loadView("RideRequests", "RideRequests", "riderequests");
    };

    self.showSignInPage = function() {
      self.currentTabName("")
      binder.loadView("SignIn", "SignIn", "signin");
    };

    self.showSignUpPage = function() {
      self.currentTabName("")
      binder.loadView("SignUp", "SignUp", "signup");
    };

    self.showRideOfferPage = function() {
      self.currentTabName("Ride Offer")
      binder.loadView("RideOffer", "RideOffer", "RideOffer");
    };

    self.showUserSearchGivenEndPointspage = function() {
      binder.loadView(
        "UserSearchGivenEndPoints",
        "UserSearchGivenEndPoints",
        "usersearchgivenendpoints"
      );
    };

    self.onLoad = function() {
      // alert("BaseVM");
    };

    self.showLoadingPopup = function(text) {
      if (loadingSemaphore == 0);
      $("#loadingPopup").modal("show");

      loadingSemaphore++;

      if (text) self.loadingText(text);
    };

    self.hideLoadingPopup = function() {
      loadingSemaphore--;

      if (loadingSemaphore == 0);
      $("#loadingPopup").modal("hide");

      self.loadingText("");
    };
  }

  return {
    getInstance: function() {
      return new BaseVM();
    }
  };
});
