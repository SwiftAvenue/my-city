package com.swiftavenue.mycity

import grails.rest.RestfulController
import grails.transaction.Transactional;

@Transactional(readOnly = true)
class ViewCaseTypeController extends RestfulController{
	static responseFormats = ['json', 'xml']
	
	def  dataRetrievalService
	
	ViewCaseTypeController(){
		
	}
	
    def index() {
		def results = dataRetrievalService.retrieveCaseTypes()
		respond results
	}
}
