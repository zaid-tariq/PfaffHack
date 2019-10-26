function SimpleRulesDO(){

	this.optional = "Optional"
	this.required = "Required"
	this.notAvailable = "Not Available"

	this.options = [ this.optional, this.required, this.notAvailable];
}

g_SimpleRules = new SimpleRulesDO();

function FeatureOptionsOperatorsDO(){

	this.options = ["Selected", "Not Selected"]
}