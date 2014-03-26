package com.swiftavenue.mycity

import grails.test.mixin.TestFor
import spock.lang.*

/**
 *
 */
@TestFor(DataRetrievalService)
class DataRetrievalServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test retrieve local areas"() {
	when: 'create service'
	    def results = service.retrieveLocalAreas()
	then: 'service should return results'
	assert results  // results should not be null or empty
	assert results.size() > 0
	results.each() { println it}
    }

    void "test retrieve local area summaries"() {
	when: 'create service and retrieve data'
	    def results = service.retrieveLocalAreaSummaries()
	then: 'service should return results'
	    assert results
	    assert results.size() > 0
	    results.each() { println "Local Area: ${it.areaName} - Num Cases: ${it.numCases}"}
    }

}
