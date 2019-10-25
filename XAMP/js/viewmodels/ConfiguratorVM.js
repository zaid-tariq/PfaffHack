define(["utils", "do/FeatureSetDO", "do/FeatureOptionDO"], function(Utils, FeatureSet, FeatureOption){

	function ConfiguratorVM(){

		var self = this;

		self.marketOptions = ko.observableArray()
		self.selectedMarket = ko.observable()
		self.existingBomOptions = ko.observableArray()
		self.bomToLoad = ko.observable()
		self.featureSets = ko.observableArray()

		self.conflictPopupVM = ko.observable()
		self.exceptionInPopupVM = ko.observable()


		self.loadExceptionInPopup = function(ex){
			
			ex.loadView()
			self.exceptionInPopupVM(ex)
		}

		self.getParent = function(aFeatureOption){

			var featureSets_temp = self.featureSets()
			for(var i = 0; i < featureSets_temp.length ; i++){

				if( featureSets_temp[i].number == aFeatureOption.parent )
					return featureSets_temp[i]
			}
		}

		self.fireComplexRules = function(data, e){

			//first check for min/max violation
			var myParent = self.getParent(data)

			try{
				myParent.checkRangeViolation()	
			}
			catch(ex){

				console.info(ex)
				myParent.addException(ex)
			}
			
		}

		self.openConflictResolutionPopup = function(data){

			console.info(data)
			self.conflictPopupVM(data);
			$("#conflictResolutionPopup").modal()
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
							featureOption.fireSimpleRule();
							self.featureSets.push(featureOption)
							featureObj.features[j] = featureOption;
						}
					}
				}
			}	

		}

		self.loadExistingBom = function(bom){

			var callback = function(){

				g_BaseVM.showLoadingPopup("loading...");
				
				self.featureSets([])

				var req = new Object()
				req.searchParam = self.bomToLoad()
				req.market = self.selectedMarket()
				req = JSON.stringify(req)

				$.post("GetSearchResults", "command=loadModelBOMForConfigurator&params="+req, function(response){
						console.info(response);

						if(response.status == "success"){

							self.addFeaturesToBom(response.modelBOM.featureSets)		
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

		self.onLoad = function(){

			alert("Crate LONAD");
			g_BaseVM.showMenuButtons(false)
			self.getExistingBomsAndMarkets();			
		}

		self.reset = function(){

			self.marketOptions([])
			self.selectedMarket()
			self.existingBomOptions([])
			self.bomToLoad()
			self.featureSets([])
		}

		self.onExit = function(){

			self.reset()		
		}

	}

	return {

		getInstance: function(){

			return new ConfiguratorVM()
		}
	}
})