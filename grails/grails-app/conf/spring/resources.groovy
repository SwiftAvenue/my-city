// Place your Spring DSL code here
// Note: See http://jolorenz.wordpress.com/2014/02/28/improve-the-restservice-api-part-1/#more-1691

import grails.rest.render.xml.*
import grails.rest.render.json.*
import com.swiftavenue.mycity.ViewLocalAreaSummary
import com.swiftavenue.mycity.ViewCaseType

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
	caseTypeXmlRenderer(XmlRenderer, ViewCaseType) {
		excludes = ['class', 'id']
	}
	caseTypeJsonRenderer(JsonRenderer, ViewCaseType) {
		excludes = ['class', 'id']
	}
	caseTypeXmlCollectionRenderer(XmlCollectionRenderer, ViewCaseType) {
		excludes = ['class', 'id']
	}
	caseTypeJsonCollectionRenderer(JsonCollectionRenderer, ViewCaseType) {
		excludes = ['class', 'id']
	}

}
