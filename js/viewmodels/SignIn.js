define([], function() {
  function SignInVM() {
    var self = this;
    self.myName = ko.observable("Sign In");
    self.username = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();

    self.onLoad = function() {};

    self.reset = function() {
      // alert("reset");
    };

    self.onExit = function() {
      // alert("onexit");
      self.reset();
    };

    self.submit = function() {
        
      // console.info(self.firstName());
      // console.info(self.lastName());
      // console.info(self.username());
      g_BaseVM.showMenuButtons(true);
      g_BaseVM.username(self.username);
      g_BaseVM.showRideSearchPage();
    };
  }

  return {
    getInstance: function() {
      return new SignInVM();
    }
  };
});

