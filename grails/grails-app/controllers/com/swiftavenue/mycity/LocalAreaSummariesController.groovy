package com.swiftavenue.mycity

import grails.rest.RestfulController
import grails.transaction.Transactional

import com.swiftavenue.mycity.DataRetrievalService

@Transactional(readOnly = true)
class LocalAreaSummariesController extends RestfulController {
    static responseFormats = ['json', 'xml']
    def  dataRetrievalService

    LocalAreaSummariesController() {
    }

    def index() { 
	def results = dataRetrievalService.retrieveLocalAreaSummaries()
	respond results
    }

    def show() {
	println "Parameter: ${params.id}"
	def result = dataRetrievalService.retrieveLocalAreaSummary(params.id)
	respond result
    }
}