package com.swiftavenue.mycity

import grails.rest.Resource
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString

// Note: See http://www.intelligrape.com/blog/2012/01/29/groovy-annotations-for-tostring-and-equalsandhashcode/

@ToString(includeNames = true, includeFields = true, excludes = '')
@EqualsAndHashCode
class ViewCaseTypeSummary {
	String month
	String caseTypeId
    String caseTypeName
    Integer numCases

    static constraints = {
    }
}
