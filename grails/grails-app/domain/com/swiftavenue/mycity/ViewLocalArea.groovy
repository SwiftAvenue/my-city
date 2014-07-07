package com.swiftavenue.mycity

import grails.rest.Resource
import groovy.transform.EqualsAndHashCode;
import groovy.transform.ToString

@ToString(includeNames = true, includeFields = true, excludes = '')
@EqualsAndHashCode
class ViewLocalArea {
	String name
	String areaId
	
    static constraints = {
		areaId nullable:true
    }
}
