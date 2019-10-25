define([], function(){	

	function LandingPageVM(){

		var self = this;
		self.showPage = ko.observable(true)
		
		self.applyDefaultImage = function(data, e){
			
			var defaultImg = $(e.target).attr("data-img");
			$($(e.target).find("img")[0]).attr('src', defaultImg)
		}
		
		 self.applyHoverImage = function(data, e){
			 var defaultImg = $(e.target).attr("data-hover");
			 $($(e.target).find("img")[0]).attr('src', defaultImg)
		 }

		self.showBomPage = function(){		
			
			g_BaseVM.showBomPage()
		}

		self.showRulesPage = function(){

			g_BaseVM.showRulesPage()
		}

		self.onLoad = function(){
		}

		self.onExit = function(){

		}


	}
	return{
		getInstance: function(){

			return new LandingPageVM()
		}
	}	
})