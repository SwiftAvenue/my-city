// Place your Spring DSL code here
// Note: See http://jolorenz.wordpress.com/2014/02/28/improve-the-restservice-api-part-1/#more-1691

import grails.rest.render.xml.*
import grails.rest.render.json.*
import com.swiftavenue.mycity.ViewLocalAreaSummary

beans = {
	// Exclude some properties from being returned by rest service
	localAreaSummaryXmlRenderer(XmlRenderer, ViewLocalAreaSummary) {
	    excludes = ['class', 'id']
	}
	localAreaSummaryJsonRenderer(JsonRenderer, ViewLocalAreaSummary) {
	    excludes = ['class', 'id']
	}
	localAreaSummaryXmlCollectionRenderer(XmlCollectionRenderer, ViewLocalAreaSummary) {
	    excludes = ['class', 'id']
	}
	localAreaSummaryJsonCollectionRenderer(JsonCollectionRenderer, ViewLocalAreaSummary) {
	    excludes = ['class', 'id']
	}
}
