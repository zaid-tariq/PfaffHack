require(["config/config"], function() {
  require(["binder", "globals"], function(loader) {
    loader.loadBaseView(true);

    Sammy(function() {
      //Catch all possible patterns of hash.
      this.get(/\#(.*)/, function() {
        var allParams = this.params.splat[0].split("/");
        var url = allParams[0].toLowerCase();

        switch (url) {
          case "Config".toLowerCase():
            loader.loadConfigurator();
            break;

          case "CreateBom".toLowerCase():
            g_BaseVM.showBomPage();
            break;

          case "CreateRules".toLowerCase():
            g_BaseVM.showRulesPage();
            break;

          case "SignUp".toLowerCase():
            g_BaseVM.showSingUpPage();
            break;

          case "SignIn".toLowerCase():
            g_BaseVM.showSignInPage();
            break;

          case "RideOffer".toLowerCase():
            g_BaseVM.showRideOfferPage();
            break;

          case "RideSearch".toLowerCase():
            g_BaseVM.showRideSearchPage();
            break;

          case "UserSearchGivenEndPoints".toLowerCase():
            g_BaseVM.showUserSearchGivenEndPointspage();
            break;

          case "UpcomingRides".toLowerCase():
            g_BaseVM.showUpcomingRidespage();
            break;

<<<<<<< HEAD
=======
          case "RideReview".toLowerCase():
            g_BaseVM.showRideReviewpage();
            break;

          case "RideRequests".toLowerCase():
            g_BaseVM.showRideRequestspage();
            break;

>>>>>>> f5e9955c52e310210f110bc83114a673e04d9862
          case "Admin".toLowerCase():
          case "Home".toLowerCase():
            if (g_BaseVM) g_BaseVM.showLandingPage();
            break;

          default:
            alert("The URL doesn't exist.");
        }
      });
    }).run();
  });
});
