define(["binder", "do/FeatureOptionDO"], function(binder, FeatureOption){
	
	function RangeViolationException(initObj){

		var self = this;

		self.name = "Range Violation"
		self.id = 0
		self.savedFeatures = initObj.features
		self.featuresToDisplay = cloneFeatures(self.savedFeatures)
		self.min = initObj.min
		self.max = initObj.max

		self.message = "The total number of selected options must lie between "+
						initObj.min + " and "+initObj.max +
						". Please choose accordingly.";

		//args: features, min, max
		self.validationFunction = initObj.validationFunction;

		self.loadView = function(){

			binder.loadPartialView("RangeViolationException")
		}

		self.saveChanges = function(){

			if(validationFunction(self.featuresToDisplay, self.min, self.max)){

				for(var i = 0; i < self.savedFeatures.length; i++){

					savedFeatures[i].cloneCopy(featuresToDisplay[i]);
				}
			}
			else{
				alert("validation failed.")
			}

		}

	}

	function cloneFeatures(features){

		var clones = []
		for(var i = 0; i < features.length; i++){

			var aClone = FeatureOption.getInstance();
			aClone.cloneCopy(features[i]);

			clones.push(aClone)
		}

		return clones;
	}

	return {

		getInstance: function(initObj){

			return new RangeViolationException(initObj)
		}
	}
})