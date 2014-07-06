package com.swiftavenue.mycity



import spock.lang.*

/**
 *
 */
class DataRetrievalServiceSpec extends Specification {

    def dataRetrievalService
    
    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
    }
    
    void "test retrieve local areas"() {
		when: 'create service'
		   def results = dataRetrievalService.retrieveLocalAreas()
		then: 'service should return results'
		   assert results  // results should not be null or empty
		   assert results.size() > 0
		results.each() { println it}
    }
    
   void "test retrieve local area summaries"() {
		when: 'create service and retrieve data'
		   def results = dataRetrievalService.retrieveLocalAreaSummaries()
		then: 'service should return results'
		   assert results
		   assert results.size() > 0
		results.each() { println "Local Area: ${it.areaName} - Num Cases: ${it.numCases}"}
    }
	
	void "test retrieve specific local area summaries"() {
		when: 'create service and retrieve data'
		   def areaId = "Fairview"
		   def result = dataRetrievalService.retrieveLocalAreaSummary(areaId)
		then: 'service should return results'
		   assert result
		   assert result.areaName.equals(areaId)
		   println "Local Area: ${result.areaName} - Num Cases: ${result.numCases}"
	}

	void "test retrieve case types for a specific local area"() {
		when: 'create service and retrieve data'
		   def areaId = "Fairview"
		   def results = dataRetrievalService.retrieveCaseTypeSummariesForLocalArea(areaId)
		then: 'service should return results'
		   assert results
		   assert results.size() > 0
		   results.each() { println "Case Type: ${it.caseTypeName} - Num Cases: ${it.numCases}" }
	}
	
	void "test retrieve case types grouped by month for a specific local area"() {
		when: 'create service and retrieve data'
		   String areaId = "Fairview"
		   def results = dataRetrievalService.retrieveMonthlyCaseTypeSummariesForLocalArea(areaId)
		then: 'service should return results'
		   assert results
		   assert results.size() > 0
		   results.each() { println "Case Type: ${it.month}: ${it.caseTypeName} - Num Cases: ${it.numCases}" }
	}
	
	void "test retrieve cases for a specific local area and case type"() {
		when: 'create service and retrieve data'
		   def areaId = "Fairview"
		   def caseTypeId = 14
		   def results = dataRetrievalService.retrieveCasesForLocalAreaAndCaseType(areaId, caseTypeId)
		then: 'service should return results'
		   assert results
		   assert results.size() > 0
		   results.each() { println "Case: ${it.caseId} - Logged on: ${it.loggedOn} - Type: ${it.type.name}" }
	}
    
}
