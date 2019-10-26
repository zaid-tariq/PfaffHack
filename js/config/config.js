require.config({

	baseUrl: "js",
	paths: {
		jQuery: "lib/jquery",
		bootstrap: "lib/bootstrap",
		knockout: "lib/knockout",
		chosen: "lib/chosen",
		sammy: "lib/sammy",
		templates: "../templates",
		views: "../views",
		binder: "helper/binder",
		globals: "helper/globals",
		utils: "helper/utils",
		eventBrokerConnector: "eventBrokerConnector",
		axios: "lib/axios",
		express: "lib/express"
	}
})

require(["config/ko_config"], function(dep){});

