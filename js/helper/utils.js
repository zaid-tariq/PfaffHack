define([], function(){

	
	function featureInArray(obj, featureList, key){

		if(key){
			
			for(var i = 0; i < featureList.length; i++){

				if(obj[key] == featureList[i][key])
					return true
				}
		}
		else{

			for(var i = 0; i < featureList.length; i++){

				if(obj == featureList[i])
					return true
			}
		}		

		return false
	}

	function removeItemFromArray(item, arr){

		if(item && arr){
			for(var i = 0; i < arr.length; i++)
				if(item == arr[i]){
						
					arr.splice(i, 1);			
					break;
				}
		}	

		return arr;
	}

	return {
		featureInArray: featureInArray,
		removeItemFromArray: removeItemFromArray
	}
})