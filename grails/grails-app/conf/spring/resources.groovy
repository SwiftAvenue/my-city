// Place your Spring DSL code here
// Note: See http://jolorenz.wordpress.com/2014/02/28/improve-the-restservice-api-part-1/#more-1691

import grails.rest.render.xml.*
import grails.rest.render.json.*
import com.swiftavenue.mycity.LocalAreaSummary

beans = {
	// Exclude some properties from being returned by rest service
	localAreaSummaryXmlRenderer(XmlRenderer, LocalAreaSummary) {
	    excludes = ['class', 'id']
	}
	localAreaSummaryJsonRenderer(JsonRenderer, LocalAreaSummary) {
	    excludes = ['class', 'id']
	}
	localAreaSummaryXmlCollectionRenderer(XmlCollectionRenderer, LocalAreaSummary) {
	    excludes = ['class', 'id']
	}
	localAreaSummaryJsonCollectionRenderer(JsonCollectionRenderer, LocalAreaSummary) {
	    excludes = ['class', 'id']
	}
}
