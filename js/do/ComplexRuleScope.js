//make it a singleton
define(["utils"], function(Utils){

	var ComplexRuleScope = function(){

		var self = this;

		self.globalList = []
		self.scopeAndFeaturesPair = {}
		self.scopeOptions = ["Global"]

		self.reset = function(){

			self.globalList = []
			self.scopeAndFeaturesPair = {}
			self.scopeOptions = ["Global"]
		}

		self.getScopeOptions = function(){

			return self.scopeOptions;
		}

		self.getGlobalList = function(){

			return self.globalList;
		}

		self.getOptionsForScope = function(featureSetNum){

			if(featureSetNum)
				return self.scopeAndFeaturesPair[featureSetNum]
			else
				return null
		}

		self.init = function(listOfAllFeatureSets){

			for(var i = 0; i < listOfAllFeatureSets.length; i++){
				
				if(listOfAllFeatureSets[i].rowType == "featureSet"){

					var listOfOptions_temp = []

					for(var j = 0; j < listOfAllFeatureSets[i].features.length; j++){

						var featureOption = listOfAllFeatureSets[i].features[j]

						//if(featureOption.simpleRule() == "Optional"){
							if(!Utils.featureInArray(featureOption.number, self.globalList)){
								self.globalList.push(featureOption.number)												
							}

							listOfOptions_temp.push(featureOption.number)						
						//}
					}

					var featureSetNum = listOfAllFeatureSets[i].number
					self.scopeAndFeaturesPair[featureSetNum] = listOfOptions_temp;

					if(!Utils.featureInArray(featureSetNum, self.scopeOptions))
						self.scopeOptions.push(featureSetNum)
				}
				
			}

			self.scopeAndFeaturesPair["Global"] = self.globalList;
		}	

	}

	return {

		getInstance: function(){

			return new ComplexRuleScope()
		}
	}
})
	