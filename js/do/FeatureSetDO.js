define(["exceptions/RangeViolationException"], function(RangeViolationException){

	function FeatureSetDO(obj){

		var self = this;
		
		self.toggleChildren = function(){
			$(".childOf-"+self.number).toggle()
			self.isChildrenShown(!self.isChildrenShown())
		}

		self.removeFeature = function(data, e){

			$(".childOf-"+self.number).remove()
			$("."+self.number).remove()
		}

		self.appendBomIdToNumber = function(){

			self.number = self.bomId + "_" + self.agileNumber;
		}

		self.splitAndSetAgileNumber = function(){

			var temp = self.number.split("_")
			
			if(temp.length == 2)
				self.agileNumber = temp[1]
		}

		self.validateMinValue = function(aFeatureSet){	

			var maxPossibleValue = 0;
			var absoulteMin = 0;

			for(var i = 0; i < aFeatureSet.features.length; i++){

				if(aFeatureSet.features[i].simpleRule() != "Not Available")
					maxPossibleValue++;

				if(aFeatureSet.features[i].simpleRule() == "Required")
					absoulteMin++;
			}

			if(parseInt(aFeatureSet.min()) > maxPossibleValue){
			
				aFeatureSet.min(maxPossibleValue)
				g_FootNotes.setFootNote("The minimum value for self feature set cannot exceed "+maxPossibleValue);
			}
			else if(parseInt(aFeatureSet.min()) < absoulteMin){
			
				aFeatureSet.min(absoulteMin)
				g_FootNotes.setFootNote("The minimum value for self feature set cannot be less than "+absoulteMin);
			}

			self.validateMaxValue(aFeatureSet)
		}

		self.validateMaxValue = function(aFeatureSet){

			if(parseInt(aFeatureSet.max()) > aFeatureSet.features.length){
			
				aFeatureSet.max(aFeatureSet.features.length)
				g_FootNotes.setFootNote("The minimum value for self feature set cannot exceed "+aFeatureSet.features.length);
			}
			else if(parseInt(aFeatureSet.max()) < parseInt(aFeatureSet.min())){
			
				aFeatureSet.max(aFeatureSet.min())
				g_FootNotes.setFootNote("The minimum value for self feature set cannot be less than "+aFeatureSet.min());
			}
		}

		self.isRangeViolated = function(featuresToValidate,min, max){

			var count = 0;

			for(var i = 0; i < featuresToValidate.length; i++){

				if(featuresToValidate[i].isSelected())
					count++;
			}

			if(count > max || count < min)
				return true;

			return false;
		}

		self.checkRangeViolation = function(){

			if(self.isRangeViolated(self.features, self.min(), self.max()))

				throw RangeViolationException.getInstance({
					features: self.features,
					min: self.min(),
					max: self.max(),
					validationFunction: self.isRangeViolated
				})		

		}
		self.addException = function(ex){

			ex.id = self.exceptions().length;

			self.exceptions.push(ex)
		}

		
		self.number = obj.number;
		self.agileNumber = obj.agileNumber;
		self.bomId = obj.bomId;
		self.min = ko.observable(obj.min?obj.min:0);
		self.max = ko.observable(obj.max?obj.max:0);		
		self.features = obj.features;	
		self.rowType = "featureSet"
		self.checkBoxValue = ko.observable(false);
		self.showself = ko.observable(true)
		self.attrClass = obj.number;
		self.isChildrenShown = ko.observable(false)
		self.exceptions = ko.observableArray()
	}

	return {
		
		getInstance: function(initObj){
					
			return new FeatureSetDO(initObj)
		}
	}
});