define(["utils", "do/FeatureSetDO", "do/FeatureOptionDO", "globals", "helper/DataObjects"], 
		function(Utils, FeatureSet, FeatureOption){


	function CreateBomVM(){

		var self = this;
		self.showPage = ko.observable(true)
		self.searchQuery = ko.observable('')
		self.bomId = ko.observable('')
		self.featureSets = ko.observableArray()
		self.filterFeatureSetSearchQuery = ko.observable()
		self.searchResults = ko.observableArray()
		self.existingBomOptions = ko.observableArray()
		self.bomToLoad = ko.observable()
		self.disableBomNumber = ko.observable(false)	

		self.filterFeatureSetSearchQuery.subscribe( function(query){
			//Filter Feature Sets in Search Popup

			var tempSearchResults = self.searchResults();
			query = query? query: self.filterFeatureSetSearchQuery()

			query = query.toLowerCase()

			for(var i = 0; i < tempSearchResults.length; i++){

				if( query.length > 0 && tempSearchResults[i].number.toLowerCase().indexOf(query) < 0)
					tempSearchResults[i].showThis(false)
				else
					tempSearchResults[i].showThis(true)

			}
		
		}, self);

		self.saveBom = function(){
			
			g_BaseVM.showLoadingPopup("saving...")

			var req = new Object()
			req.number = self.bomId()
			req.featureSets = [];

			var tempFeatureSets = self.featureSets()

			for(var i = 0; i < tempFeatureSets.length; i++){

				if(tempFeatureSets[i].rowType == "featureSet" ){

					var featureObj = new Object()
					featureObj.agileNumber = tempFeatureSets[i].agileNumber
					featureObj.number = tempFeatureSets[i].number

					req.featureSets.push(featureObj)
				}
			}

			req = JSON.stringify(req)

			$.post("CreateModelBOM", "command=createBaseModel&params="+req, function(response){
				
				if(response.status == "success"){

					self.disableBomNumber(true)
					g_BaseVM.setFootNote("BOM saved successfully.", "success");
				}
				else 
					g_BaseVM.setFootNote("There was some error in saving BOM - " +  response.statusMessage, "error");

				g_BaseVM.hideLoadingPopup()
			})

		}

		self.addFeaturesToBom = function(koDO, clickEvent, passedListOfFeatures){

			var listOfFeatures_temp = passedListOfFeatures?passedListOfFeatures:self.searchResults();

			for(var i = 0; i < listOfFeatures_temp.length; i++){
				
				if(clickEvent)
					listOfFeatures_temp[i].appendBomIdToNumber()			

				if(Utils.featureInArray(listOfFeatures_temp[i], self.featureSets(), "number"))
					console.info("This element is already in array")

				else if(passedListOfFeatures || listOfFeatures_temp[i].checkBoxValue()){
									
					var featureObj = FeatureSet.getInstance(listOfFeatures_temp[i])

					if(passedListOfFeatures)
						featureObj.splitAndSetAgileNumber()

					self.featureSets.push(featureObj)

					if(featureObj.features && featureObj.features.length){

						for(var j = 0; j < featureObj.features.length; j++){

							var featureOption = FeatureOption.getInstance({
													number:featureObj.features[j].number,
													parent: featureObj.number,
													simpleRule: featureObj.features[j].simpleRule
												})

							self.featureSets.push(featureOption)						
							featureObj.features[j] = featureOption;
						}
					}
				}
			}

		}

		self.clearBom = function(){
			self.featureSets([])
		}

		self.removeFeatureSet = function(data, e){
			
			var tempFeatureSets = self.featureSets()

			var deleteCount = 0;
			var featureSetIndex = null;

			for(var i = 0; i < tempFeatureSets.length; i++)
				if(tempFeatureSets[i].number == data.number){

					featureSetIndex = i;
					deleteCount++;
					i++;

					while( i < tempFeatureSets.length && tempFeatureSets[i].parent == data.number){					
						deleteCount++;					
						i++;
					}

					break;
				}

			tempFeatureSets.splice(featureSetIndex, deleteCount);
			self.featureSets(tempFeatureSets)
		}

		self.populateFeatureSetsInPopup = function(list){

			g_BaseVM.hideLoadingPopup()
			$("#featureSetsModal").modal();

			self.searchResults([])

			for(var i = 0; i < list.length; i++)
				self.searchResults.push( FeatureSet.getInstance({
					agileNumber: list[i],				
					bomId: self.bomId()
				}))		
		}

		self.openFeatureSetsPopup = function(){
			
			g_BaseVM.showLoadingPopup("loading...")
			self.getSearchResults("*", self.populateFeatureSetsInPopup);
		}

		self.getSearchResults = function(searchQuery, aCallback){

			var callback = aCallback? aCallback: self.populateSearchResultsInPopup;

			var req = new Object()
			req.searchParam = searchQuery? searchQuery: self.searchQuery();
			req.classes = ["featureset"]

			if(req.searchParam && req.searchParam.length > 0){

				req = JSON.stringify(req)
				//console.info(req)

				$.post("GetSearchResults", "command=getDataObjectsList&params="+req, function(response){
					
					if(response.status == "success"){
					
						callback(response.featureSets);
						g_BaseVM.setFootNote("Search results loaded.", "success");
					}

					else
						g_BaseVM.setFootNote("There was some error in performing search - " +  response.statusMessage, "error");				

				})
			}
			else 
				alert("Enter a search string first, genius!")

		}

		self.createNewBom = function(){

			var callback = function(){

				g_BaseVM.showLoadingPopup("loading...");
				self.clearBom();

				self.getAutoNumber(function(autoNumber){

					self.bomId(autoNumber);
					self.disableBomNumber(false);				
					g_BaseVM.hideLoadingPopup();

				});
			}

			if(self.featureSets().length > 0)
				g_BaseVM.proceedWithWarning(
					"You are about to create a new BOM. Existing data will be lost. Do you want to continue?",
				 	callback);
			else
				callback();


		}



		self.getAutoNumber = function(callback) {
			
			var req = new Object();
			req.className = "model"

			req = JSON.stringify(req);
			//console.info(req);

			$.post("GetAdminData", "command=getAutoNumber&params="+req, function(response) {
				
				//console.info(response);

				if(response.status == "success")				
					g_BaseVM.setFootNote("Autonumber plugged.", "success");
				else
					g_BaseVM.setFootNote("There was some error in fetching the AutoNumber - " +  response.statusMessage, "error");

				if(callback)
					callback(response.autoNumber)			
				
			});
		}

		self.getExistingBoms = function(callback){

			var req = new Object()
			req.searchParam = "*"
			req.classes = ["model"]
			req = JSON.stringify(req)		

			$.post("GetSearchResults", "command=getDataObjectsList&params="+req, function(response){
							
				//console.info(response)
				if(response.status == "success"){
					self.existingBomOptions(response.modelBOMs)
					$(".chosen-select").trigger("chosen:updated")
					g_BaseVM.setFootNote(response.modelBOMs.length+" BOMs found.", "success");
				}
				else
					g_BaseVM.setFootNote("Error occurred while looking for existing BOMs. " +  response.statusMessage, "error");
				
				if(callback)
						callback();		

			});
		}

		self.openLoadExistingBomPopup = function(){
			
			var callback = function(){
				
				g_BaseVM.showLoadingPopup("loading...");
				self.featureSets([]);

				self.getExistingBoms(function(response){				

					g_BaseVM.hideLoadingPopup();
					$("#chooseExistingBom select").trigger("chosen:updated")
					$("#loadExistingBomPopup").modal()
				})	
			}

			if(self.featureSets().length > 0)
				g_BaseVM.proceedWithWarning(
					"Loading another BOM will erase any existing data. Do you want to continue?",
					 callback);	
			else
				callback();
			
		}

		self.loadBom = function(bom){
					
			self.bomId(self.bomToLoad())
			self.disableBomNumber(true)

			g_BaseVM.showLoadingPopup("loading...")		

			var req = new Object()
			req.searchParam = self.bomToLoad()		
			req = JSON.stringify(req)

			$.post("GetSearchResults", "command=loadModelBOM&params="+req, function(response){
					
					console.info(response);

					if(response.status == "success"){				
						self.addFeaturesToBom(null, null, response.modelBOM.featureSets)
						g_BaseVM.setFootNote("BOM loaded.", "success")
					}
					
					else
						g_BaseVM.setFootNote("Error in loading BOM. "+response.statusMessage, "error")

					g_BaseVM.hideLoadingPopup()
			})
		}
		
		self.onLoad = function(){
			alert("Crate BOM");
			
			$(".chosen-select").chosen({
				width: "100%"
			})
			$("#chooseExistingBom select").chosen({
				width: "80%"
			})
			

			//console.info("CreateBom Page loaded.")
		}

		self.reset = function(){
			
			self.featureSets([])
			self.searchQuery('')
			self.bomId('')
			self.searchResults([])
			self.existingBomOptions([])
			self.bomToLoad('')
			self.disableBomNumber(false)
		}

		self.onExit = function(){

			self.reset()
		}
	}


	return {
		
		getInstance: function(){

			return new CreateBomVM()
		}
	}
})

