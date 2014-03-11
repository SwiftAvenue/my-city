package com.swiftavenue.mycity

import grails.rest.*

@Resource(uri='localArea')
class LocalArea {

	String name
	
    static constraints = {
		name blank:false
    }
}
