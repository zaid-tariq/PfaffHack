define([], function() {
  function SignUpVM() {
    var self = this;
    self.myName = ko.observable("Sign Up");
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
        
      console.info(self.firstName());
      console.info(self.lastName());
      console.info(self.username());
    };
  }

  return {
    getInstance: function() {
      return new SignUpVM();
    }
  };
});
