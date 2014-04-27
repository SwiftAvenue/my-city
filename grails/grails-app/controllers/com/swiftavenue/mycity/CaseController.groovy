package com.swiftavenue.mycity

import grails.rest.RestfulController
import grails.transaction.Transactional

import com.swiftavenue.mycity.DataRetrievalService

@Transactional(readOnly = true)
class CaseController extends RestfulController {
    static responseFormats = ['json', 'xml']
	
    def  dataRetrievalService

    CaseController() {
    }

    def caseTypesForArea() {
	   println "Parameter: ${params.areaName}"
	   def results = dataRetrievalService.retrieveCaseTypeSummariesForLocalArea(params.areaName)
	   respond results
    }
	
	def casesInAreaForCaseType() {
		println "Parameters: ${params.areaName} - ${params.caseTypeId}"
		def results = dataRetrievalService.retrieveCasesForLocalAreaAndCaseType(params.areaName, params.caseTypeId)
			respond results			
	}
}