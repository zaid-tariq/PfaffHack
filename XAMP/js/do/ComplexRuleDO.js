define(["do/ComplexRuleScope", "do/ComplexRuleConditionDO"], function(ComplexRuleScope, ComplexRuleCondition){


	function ComplexRuleDO(obj){	

		var self = this;

		self.init = function(obj){

			self.initScope(obj.featureSets)
			self.selectedScope(obj.scope)
			self.id = obj.id
		}

		self.updateExpressionText = function(){

			self.expressionText(self.convertRuleIntoExpression())
		}

		self.addToLHS = function(initObj){

			var tempRule = ComplexRuleCondition.getInstance({
								featuresList: self.scope.getOptionsForScope(self.selectedScope()),
								alreadySelectedFeatures: self.alreadySelectedFeatures,
								data: initObj
							});

			tempRule.useFeatureOptionsOperators()

			if(self.LHS().length > 0)
				tempRule.showLogicalOperators = true;
			
			tempRule.findNum = self.LHS().length+1;
			tempRule.seqNo = self.totalConditions++;

			self.LHS.push(tempRule)
		}

		self.addToRHS = function(initObj){

			var tempRule = ComplexRuleCondition.getInstance({
								featuresList: self.scope.getOptionsForScope(self.selectedScope()),
								alreadySelectedFeatures: self.alreadySelectedFeatures,
								data: initObj
							});

			tempRule.useSimpleRulesOperators()

			if(self.RHS().length > 0)
				tempRule.showLogicalOperators = true;
			
			tempRule.findNum = self.RHS().length+1;
			tempRule.seqNo = self.totalConditions++;

			self.RHS.push(tempRule)
		}

		self.convertRuleIntoExpression = function(expObj){
			
			expObj = expObj?expObj:self;
			var expStr = null

			var LHS = expObj.LHS()
			var RHS = expObj.RHS()

			if(LHS.length && RHS.length){
				
				expStr = "IF ";

				for(var i = 0; i < LHS.length; i++){
					
					if(LHS[i].showLogicalOperators)
						expStr += LHS[i].selectedLogicalOperator() + " ";

					expStr += LHS[i].selectedFeature() + " is " + LHS[i].selectedOperatorForFeature() + " ";
				}

				expStr += " - THEN "

				for(var i = 0; i < RHS.length; i++){
					
					if(RHS[i].showLogicalOperators)
						expStr += RHS[i].selectedLogicalOperator() + " ";

					expStr += RHS[i].selectedFeature() + " is " + RHS[i].selectedOperatorForFeature() + " ";
				}
			}

			return expStr;
		}

		self.changeScope = function(data, e){

			self.clearConditions();
		}

		self.initScope = function(listOfFeatureSets){

			if(!self.scope)
				self.scope = ComplexRuleScope.getInstance()

			//self.scope.reset()
			self.scope.init(listOfFeatureSets)
			self.scopeOptions = self.scope.getScopeOptions()
		}

		self.clearConditions = function(){	

			self.alreadySelectedFeatures = []
			self.LHS([])
			self.RHS([])

			//There must always be at least one condition in both 'if' and 'then' sections.
			//Just like there must always be a Stark in Winterfell.
			self.addToLHS()
			self.addToRHS()
		}

		self.updateAvailableFeaturesInAllConditions = function(conditionObj){

			console.info(conditionObj);

			var bothSides = [self.LHS(), self.RHS()]
			
			for(var i = 0; i < bothSides.length; i++){

				for(var j = 0; j < bothSides[i].length; j++){

					if(bothSides[i][j].seqNo != conditionObj.seqNo){

						Utils.removeItemFromArray(conditionObj.lastSelectedFeature, self.alreadySelectedFeatures);
						bothSides[i][j].removeFeatureFromExclusionList(conditionObj.lastSelectedFeature);

						self.updateSelectedFeaturesList(conditionObj.selectedFeature());
						bothSides[i][j].addFeatureToExclusionList(conditionObj.selectedFeature());
					}

				}
			}

			conditionObj.updateLastSelectedFeature();
		}

		self.updateSelectedFeaturesList = function(feature){

			if(!featureInArray(feature, self.alreadySelectedFeatures))
				self.alreadySelectedFeatures.push(feature)
		}

		self.removeCondition = function(conditionObj){

			//var
		}

		self.LHS = ko.observableArray();
		self.RHS = ko.observableArray();
		self.id = null
		self.showSaveButton = ko.observable(true)
		//self.showUpdateButton = ko.observable(false)
		self.initialExpressionText = null
		self.expressionText = ko.computed(self.convertRuleIntoExpression, self)
		self.scope = null;
		self.selectedScope = ko.observable("Global");
		self.scopeOptions = null;
		self.totalConditions = 0;
		self.alreadySelectedFeatures = [];

		//default constructor
		(function(){

			if(obj)
				self.init(obj)

		})();
	}

	return {

		getInstance: function(initObj){

			return new ComplexRuleDO(initObj)
		}
	}

})
