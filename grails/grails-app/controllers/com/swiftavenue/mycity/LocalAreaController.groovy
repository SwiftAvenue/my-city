package com.swiftavenue.mycity

import grails.rest.RestfulController

class LocalAreaController extends RestfulController{

	static responseFormats = ['json','xml']
	
    LocalAreaController(){
		super(LocalArea)
	}
	
}
