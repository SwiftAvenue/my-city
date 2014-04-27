package com.swiftavenue.mycity

import grails.rest.RestfulController
import grails.transaction.Transactional

import com.swiftavenue.mycity.DataRetrievalService

@Transactional(readOnly = true)
class LocalAreaController extends RestfulController{
    static responseFormats = ['json','xml']
    def dataRetrievalService
	
    LocalAreaController(){
    }

    def index() {
	   def results = dataRetrievalService.retrieveLocalAreas()
	   respond results
    }
	
}
