package com.swiftavenue.mycity

import grails.rest.Resource

class LocalArea {

	String name
	
    static constraints = {
		name blank:false
    }
}
