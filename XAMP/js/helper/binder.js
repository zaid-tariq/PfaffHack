define(["globals"], function(){


	function isViewAlreadyLoaded(viewFileName){

		if(g_CurrentPage)
			
			if(g_CurrentPage.viewFileName == viewFileName)
				return true;

		return false
	}

	function callExitFunctionOfCurrentPage(){

		if(g_CurrentPage)
			if(g_CurrentPage.viewModel.onExit)
				g_CurrentPage.viewModel.onExit()
	}

	function loadBaseView(loadHomepage){

		require(["viewmodels/BaseVM"], function(vm){
		
			g_BaseVM = vm.getInstance();
			ko.applyBindings(g_BaseVM)

			if(loadHomepage)
				g_BaseVM.showLandingPage()
		});
	}

	function loadView(viewFileName, viewModelFileName, containerToBind, templateContainer){

		if(!isViewAlreadyLoaded(viewFileName)){

			callExitFunctionOfCurrentPage();				

			templateContainer = templateContainer?templateContainer:"pageContainer"
			containerToBind = containerToBind?containerToBind:templateContainer

			var viewTemplateFile = "text!views/"+viewFileName+".html"
			var viewModelToLoad = "viewmodels/"+viewModelFileName

			require([viewTemplateFile, viewModelToLoad], function(view, vm){

				$("#"+templateContainer).html(view)

				var pageVM = vm.getInstance()

				ko.applyBindings(pageVM, document.getElementById(containerToBind))

				//update current page info
				g_CurrentPage = {
					viewFileName: viewFileName,
					viewModel: pageVM
				}

				pageVM.onLoad()
			})
		}
	}

	function loadPartialView(viewFileName, containerId, callback){

		var viewFileToLoad = "text!views/"+viewFileName+".html"

		require([viewFileToLoad], function(view){

			containerId = containerId?containerId:"exceptionPaneInPopup"
			$("#"+containerId).html(view)

			if(callback)
				callback()
		});

	}

	function loadConfigurator(){

		require(["text!views/Configurator.html","viewmodels/ConfiguratorVM"], function(view, vm){
			
			$("#pageContainer").html(view)	
			var pageVM = vm.getInstance();	
			ko.applyBindings(pageVM, document.getElementById("configuratorPage"))
			pageVM.onLoad()
		});
	}

	return{

		loadView: loadView,
		loadBaseView: loadBaseView,
		loadConfigurator: loadConfigurator,
		loadPartialView: loadPartialView
	}

});
