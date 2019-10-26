define([], function() {
    function VM() {
      var self = this;
      self.myName = ko.observable("Chat");
      self.username = ko.observable();
      self.firstName = ko.observable();
      self.lastName = ko.observable();

   
  
      self.onLoad = function() {
  
          
      };
  
     
  
      self.reset = function() {};
  
      self.onExit = function() {
        self.reset();
      };
  
      self.submit = function() {
        
  
      };
    }
  
    return {
      getInstance: function() {
        return new VM();
      }
    };
  });
  