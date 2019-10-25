define(["utils", "helper/DataObjects"], function(Utils){

	function ComplexRuleConditionDO(initObj){

		var self = this;

		self.init = function(initObj){

			self.featuresList(initObj.featuresList);

			if(initObj.data)
				self.prePopulate(initObj.data);

			if(initObj.alreadySelectedFeatures){

				var newList = []
				
				for(var i = 0; i < initObj.alreadySelectedFeatures.length; i++)
					newList.push(initObj.alreadySelectedFeatures[i])

				self.excludedFeaturesList(newList);
			}
		}

		self.prePopulate = function(obj){

			self.lastSelectedFeature = obj.number
			self.selectedFeature(obj.number)
			self.selectedLogicalOperator(obj.logicOperation)
			self.selectedOperatorForFeature(obj.condition?obj.condition:obj.simpleRule)
		}

		self.useSimpleRulesOperators = function(){
			self.operatorsForFeatures = new SimpleRulesDO().options;
		}

		self.useFeatureOptionsOperators = function(){
			self.operatorsForFeatures = new FeatureOptionsOperatorsDO().options;
		}

		self.setFeaturesList = function(featuresList){

			self.featuresList(featuresList);
		}

		self.availableFeaturesForSelection = function(){

			var allFeatures = self.featuresList();
			var excludedFeatures = self.excludedFeaturesList();
			var availableFeatures = [];

			var excludeThisFeature;

			for(var i = 0; i < allFeatures.length; i++){

				excludeThisFeature = false;

				for(var j = 0; j < excludedFeatures.length; j++)
					if(allFeatures[i] == excludedFeatures[j]){

						excludeThisFeature = true;
						break;
					}

				if(!excludeThisFeature)
					availableFeatures.push(allFeatures[i]);			
			}

			return availableFeatures;
		}

		self.addFeatureToExclusionList = function(featureToExclude){

			if(featureToExclude)
				self.excludedFeaturesList.push(featureToExclude);
		}

		self.removeFeatureFromExclusionList = function(feature){

			if(feature){

				var updatedList = Utils.removeItemFromArray(feature, self.excludedFeaturesList())
				self.excludedFeaturesList(updatedList)

				// for(var i = 0; i < exclusionList.length; i++)
				// 	if(feature == exclusionList[i]){
					
				// 		exclusionList.splice(i, 1);
				// 		self.excludedFeaturesList(exclusionList);
				// 		break;
				// 	}			
			}		
		}


		self.updateLastSelectedFeature = function(){

			self.lastSelectedFeature = self.selectedFeature()
		}

		self.findNum = null;
		self.seqNo = null;
		self.lastSelectedFeature = null;
		self.featuresList = ko.observableArray();
		self.excludedFeaturesList = ko.observableArray();
		self.availableFeatures = ko.computed(self.availableFeaturesForSelection, self);

		self.operatorsForFeatures = new FeatureOptionsOperatorsDO().options;	
		self.logicalOperators = ["AND", "OR"]
		self.selectedFeature = ko.observable()
		self.selectedOperatorForFeature = ko.observable()
		self.selectedLogicalOperator = ko.observable()
		self.showLogicalOperators = false;			

		(function(){

			if(initObj){
				self.init(initObj)
			}
		})();
	}

	return {
		getInstance: function(initObj){

			return new ComplexRuleConditionDO(initObj)
		}
	}
})

	