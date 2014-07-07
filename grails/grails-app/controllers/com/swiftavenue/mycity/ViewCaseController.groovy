package com.swiftavenue.mycity

import grails.rest.RestfulController
import grails.transaction.Transactional

import com.swiftavenue.mycity.DataRetrievalService

@Transactional(readOnly = true)
class ViewCaseController extends RestfulController {
    static responseFormats = ['json', 'xml']
	
    def  dataRetrievalService

    ViewCaseController() {
    }

    def caseTypesForArea() {
	   println "Parameter: ${params.areaName}"
	   def results = dataRetrievalService.retrieveCaseTypeSummariesForLocalArea(params.areaName)
	   respond results
    }
	
	def caseTypesMonthlyForArea() {
		println "Parameter: ${params.areaName}"
		def results = dataRetrievalService.retrieveMonthlyCaseTypeSummariesForLocalArea(params.areaName)
		respond results

	}
	
	def casesInAreaForCaseType() {
		println "Parameters: ${params.areaName} - ${params.caseTypeId}"
		def results = dataRetrievalService.retrieveCasesForLocalAreaAndCaseType(params.areaName, params.caseTypeId)
			respond results			
	}
}