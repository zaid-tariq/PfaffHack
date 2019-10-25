define(["utils", "do/FeatureSetDO", "do/FeatureOptionDO", "do/ComplexRuleDO",  "globals", "helper/DataObjects"], 
		function(Utils, FeatureSet, FeatureOption, ComplexRule){

	function CreateRulesVM(){

		var self = this;
		self.marketOptions = ko.observableArray()
		self.selectedMarket = ko.observable()
		self.existingBomOptions = ko.observableArray()
		self.bomToLoad = ko.observable()
		self.featureSets = ko.observableArray()		
		self.complexRulesList = ko.observableArray()	
		self.complexRuleInPopup = ko.observable()
		self.listOfAllFeatureOptions = []
		//self.showtabs = ko.observable(false)


		self.showComplexRulesPopup = function(){

			var newComplexRule = ComplexRule.getInstance()
			newComplexRule.initScope(self.featureSets())

			newComplexRule.addToLHS()
			newComplexRule.addToRHS()

			self.complexRuleInPopup(newComplexRule);		
			$("#complexRulesPopup").modal('show');
		}

		self.persistRule = function(newRule, e, passedRule){

			/*
				The first 2 attribs are passed when called by knockout.
				The next one is passed when called locally. Which will be the case when existing
				rules are being loaded.
			*/

			var ruleToPersist = passedRule? passedRule: newRule;

			var callback = function(aAutoNumber){

					ruleToPersist.id = aAutoNumber;
					ruleToPersist.showSaveButton = false;
					ruleToPersist.initialExpressionText = ruleToPersist.expressionText()
					self.complexRulesList.push(ruleToPersist)				
				};


			if(newRule)
				self.getAutoNumberForExpression(callback);		

			else callback(passedRule.id);
		}

		self.getAutoNumberForExpression = function(callback) {
			
			var req = new Object();
			req.className = "expression"

			req = JSON.stringify(req);

			$.post("GetAdminData", "command=getAutoNumber&params="+req, function(response) {

				console.info(response)

				if(response.status == "error")								
					g_BaseVM.setFootNote("There was some error in fetching the AutoNumber. " +  response.statusMessage, "error");

				else if(callback)
					callback(response.autoNumber)

				
			});
		}

		self.openExistingRuleInPopup = function(ruleObj){

			ruleObj.initScope(self.featureSets())
			self.complexRuleInPopup(ruleObj)
			$("#complexRulesPopup").modal('show');
		}

		self.getExpressionObjectFromRules = function(){

			var rulesList = self.complexRulesList()
			var expressions = []

			for(var i = 0; i < rulesList.length; i++){

				var newExpression = new Object();
				newExpression.number = rulesList[i].id;
				newExpression.scope = rulesList[i].selectedScope();
				newExpression.parameters = [];

				var findNumCount = 1;

				var tempLHS = rulesList[i].LHS();

				for(var j = 0; j < tempLHS.length; j++){

					var tempParam = new Object()
					tempParam.number = tempLHS[j].selectedFeature()
					tempParam.simpleRule = null
					tempParam.paramType = "Input"
					tempParam.condition = tempLHS[j].selectedOperatorForFeature()
					tempParam.logicOperation = tempLHS[j].selectedLogicalOperator()
					tempParam.findNo = findNumCount++;
					newExpression.parameters.push(tempParam)				
				}

				var tempRHS = rulesList[i].RHS()

				for(var j = 0; j < tempRHS.length; j++){

					var tempParam = new Object()

					tempParam.number = tempRHS[j].selectedFeature()
					tempParam.simpleRule = tempRHS[j].selectedOperatorForFeature()
					tempParam.paramType = "Output"
					tempParam.condition = null
					tempParam.logicOperation = tempRHS[j].selectedLogicalOperator()?tempRHS[j].selectedLogicalOperator():"null"
					tempParam.findNo = findNumCount++;

					newExpression.parameters.push(tempParam)				
				}

				if(rulesList[i].expressionText() != rulesList[i].initialExpressionText)
					newExpression.isModified = true
				else
					newExpression.isModified = false

				expressions.push(newExpression)
			}

			return expressions;
		}

		self.saveRules = function(){

			g_BaseVM.showLoadingPopup("saving...")

			var req = new Object()
			req.modelBOM = new Object()
			req.modelBOM.number = self.bomToLoad()
			req.modelBOM.market =self.selectedMarket()
			req.modelBOM.expressions = self.getExpressionObjectFromRules()
			req.modelBOM.featureSets = []

			var myFeatureSets = self.featureSets()

			var lastFeatureSetIndex = -1;

			for(var i = 0; i < myFeatureSets.length; i++){

				if(myFeatureSets[i].rowType == "featureSet"){
					
					var tempFeatureSet = new Object()
					tempFeatureSet.max = myFeatureSets[i].max();
					tempFeatureSet.min = myFeatureSets[i].min();
					tempFeatureSet.number = myFeatureSets[i].number
					tempFeatureSet.features = []

					req.modelBOM.featureSets.push(tempFeatureSet)
					lastFeatureSetIndex++;
				}

				else if(myFeatureSets[i].rowType == "featureOption"){
					
					var tempFeatureOption = new Object()
					tempFeatureOption.number = myFeatureSets[i].number;
					tempFeatureOption.simpleRule = myFeatureSets[i].simpleRule()?(myFeatureSets[i].simpleRule().length?myFeatureSets[i].simpleRule():"null"):"null"

					req.modelBOM.featureSets[lastFeatureSetIndex].features.push(tempFeatureOption)
				}
			}

			console.info(req)
			
			req = JSON.stringify(req)

			console.info(req)

			$.post("CreateRules", "command=setRules&params="+req, function(response){
				
				console.info(response);

				if(response.status == "success")
					g_BaseVM.setFootNote("All the updates saved successfully.", "success");
				else
					g_BaseVM.setFootNote("Server returned an error while saving the BOM. "+response.statusMessage, "error");

				g_BaseVM.hideLoadingPopup();
				
			})
		}

		self.getExistingBomsAndMarkets = function(){

			g_BaseVM.showLoadingPopup("loading");

			var req = new Object()
			req.searchParam = "*"
			req.classes = ["market", "model"]
			req = JSON.stringify(req)

			$.post("GetSearchResults", "command=getDataObjectsList&params="+req, function(response){
				
				console.info(response)
				if(response.status == "success"){

					self.existingBomOptions(response.modelBOMs)
					self.marketOptions(response.markets)				
					g_BaseVM.setFootNote("Operation Complete.", "success")
				}
				else
					g_BaseVM.setFootNote("Server returned an error while fetching existing Bom Options. "+response.statusMessage, "error")

				g_BaseVM.hideLoadingPopup()
			});
		}

		self.addFeaturesToBom = function(arr){		

			for(var i = 0; i < arr.length; i++){
				
				if(Utils.featureInArray(arr[i], self.featureSets(), "number"))
					console.info("This element is already in array")
				else{				
					
					var featureObj = FeatureSet.getInstance(arr[i])
					self.featureSets.push(featureObj)

					if(featureObj.features && featureObj.features.length){

						for(var j = 0; j < featureObj.features.length; j++){

							var featureOption = FeatureOption.getInstance({
													number:featureObj.features[j].number,
													parent: featureObj.number,
													simpleRule: featureObj.features[j].simpleRule
												})
							self.featureSets.push(featureOption)
							self.listOfAllFeatureOptions.push(featureObj.features[j].number)
							featureObj.features[j] = featureOption;
						}
					}
				}
			}	

		}

		self.loadExistingExpressions = function(expressions){

			for(var i = 0; i < expressions.length; i++){

				var tempRuleObject = ComplexRule.getInstance({
									featureSets: self.featureSets(),
									id: expressions[i].number,
									scope: expressions[i].scope
				});
				// tempRuleObject.initScope(self.featureSets())

				// tempRuleObject.id = expressions[i].number;

				for(var j = 0; j < expressions[i].parameters.length; j++){

					if(expressions[i].parameters[j].paramType == "Input")
						tempRuleObject.addToLHS(expressions[i].parameters[j])
					
					else
						tempRuleObject.addToRHS(expressions[i].parameters[j])
					
				}
				
				self.persistRule(null, null, tempRuleObject)
			}
		}

		self.loadExistingBom = function(bom){

			var callback = function(){

				g_BaseVM.showLoadingPopup("loading...");
				
				self.featureSets([])
				self.complexRulesList([])
				self.listOfAllFeatureOptions = []

				var req = new Object()
				req.searchParam = self.bomToLoad()
				req.market = self.selectedMarket()
				req = JSON.stringify(req)

				$.post("GetSearchResults", "command=loadModelBOM&params="+req, function(response){
						console.info(response);

						if(response.status == "success"){

							self.addFeaturesToBom(response.modelBOM.featureSets)	
							self.loadExistingExpressions(response.modelBOM.expressions)		
							g_BaseVM.setFootNote("Bom loaded.", "success")		
							//self.showtabs(true)
						}
						else
							g_BaseVM.setFootNote("Server returned an error while loading bom. "+response.statusMessage, "error")

					g_BaseVM.hideLoadingPopup()
					
				})
			}

			if(self.featureSets().length > 0)
				g_BaseVM.proceedWithWarning("Any unsaved BOM Data and rules will be lost. Do you want to continue?", callback)
			else
				callback()
		}


		self.onLoad = function(){

			alert("Crate Reules");
			self.getExistingBomsAndMarkets();
		}

		self.reset = function(){

			self.marketOptions([])
			self.selectedMarket()
			self.existingBomOptions([])
			self.bomToLoad()
			self.featureSets([])
			self.complexRulesList([])
			self.complexRuleInPopup(null)
			self.listOfAllFeatureOptions = []
			//self.showtabs = ko.observable(false)
		}

		self.onExit = function(){
			
			self.reset()		
		}
	}

	return {
		
		getInstance: function(){

			return new CreateRulesVM()
		}
	}
});