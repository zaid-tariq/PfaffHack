define(["helper/DataObjects"], function(){

	function FeatureOptionDO(initObj){

		var self = this

		self.rowType = "featureOption"		
		self.number = null
		self.parent = null
		self.attrClass = null
		self.simpleRuleOptions = g_SimpleRules.options;
		self.simpleRule = ko.observable()
		self.isSelected = ko.observable(false)
		self.isDisabled = ko.observable(false)
		self.exceptions = ko.observableArray()

		self.init = function(initObj){

			self.simpleRule(initObj.simpleRule)
			self.number = initObj.number
			self.parent = initObj.parent
			self.attrClass = "childOf-"+self.parent
		}

		self.cloneCopy = function(clone){

			self.simpleRule(clone.simpleRule())
			self.number = clone.number
			self.parent = clone.parent
			self.attrClass = "childOf-"+clone.parent
			self.isSelected(clone.isSelected())
			self.isDisabled(clone.isDisabled())
		}

		self.fireSimpleRule = function(){

			if(self.simpleRule() == g_SimpleRules.required){
				self.isSelected(true);
				self.isDisabled(true);
			}
			else if(self.simpleRule() == g_SimpleRules.notAvailable){
				self.isDisabled(true);
			}
		}

		self.addException = function(ex){

			ex.id = self.exceptions().length;

			self.exceptions.push(ex)
		}


		self.changeHandler = function(){
			/*
				this change handler works in admin-mode create-rules page to validate min-max.
			*/

			$("#"+self.parent+" #min").trigger("change");
		};

		//default constructor
		(function(){

			if(initObj)
				self.init(initObj)

		})();
	}

	return {
		getInstance: function(initObj){
					
			return	new FeatureOptionDO(initObj)
		}
	}
})