package com.swiftavenue.mycity

import grails.transaction.Transactional
import grails.transaction.Transactional
import groovy.sql.Sql

import com.swiftavenue.mycity.db.DBConnection
import com.swiftavenue.mycity.LocalAreaSummary
import com.swiftavenue.mycity.LocalArea

@Transactional
class DataRetrievalService {

    def grailsApplication   // grails provided object 
    
    def dataSource

	/* 
	 * Retrieves the list of all local areas. Return the list of local area names 
	 */
	def retrieveLocalAreas() {
		def queryStr = "SELECT local_area_name as areaId, local_area_name as areaName FROM mycity.Local_Area"
		def dbc = getDb()
		// dbc.display()
		def qryResults = dbc.rows(queryStr)
		def results = []
		for (entry in qryResults) {
			def la = new LocalArea()
			la.with {
				name = entry.areaName
				areaId = entry.areaId
			}
			results.add(la)
		}
		results // return the results
	}

    /* 
    * Retrieve the summary of all local areas 
    */
    def retrieveLocalAreaSummaries() {
		def queryStr = "SELECT local_area_name as area, count(local_area_name) as total FROM mycity.local_area la, mycity.case c WHERE la.id = c.local_area_id GROUP BY local_area_name"
		def dbc = getDb()
		// dbc.display()    // enable to verify that connection is a singleton
		def qryResults = dbc.rows(queryStr)
		// Query results are a list of rows. Each row is a map of column-value pairs
		// Then we map the results into the list of LocalAreaSummary domain objects
		def results = []
		for (entry in qryResults) {
			def las = new LocalAreaSummary();
			las.with{
				areaName = entry.area ?: "UNDEFINED"
				numCases = entry.total
			}
			results.add(las)
		}
		// qryResults.each{println "Area: ${it.areaName} Total Cases: ${it.totalCase}"}
		results   // return the results
    }


    /* 
    * Retrieve the summary of a specific local area 
    */
    def retrieveLocalAreaSummary(String pAreaId) {
		def queryStr = "SELECT local_area_name as area, count(local_area_name) as total FROM mycity.local_area la, mycity.case c WHERE la.id = c.local_area_id AND la.local_area_name = '${pAreaId}' GROUP BY local_area_name"
		def dbc = getDb()
		// dbc.display()    // enable to verify that connection is a singleton
		def qryResults = dbc.rows(queryStr)
		// Query results are a list of rows. Each row is a map of column-value pairs
		// Then we map the results into the appropriate domain object(s)
		if (qryResults.findAll()) { // check if there is result
			def las = new LocalAreaSummary();
			las.with{
				areaName = qryResults[0].area ?: "UNDEFINED"
				numCases = qryResults[0].total
			}
			las // return the result
		}
    }
	
	/*
	 * Retrieve Case Type summaries for a given local area
	 */
	def retrieveCaseTypeSummariesForLocalArea(String pAreaId) {
		def queryStr = "SELECT ct.id as caseTypeId, ct.case_type_name as typeName, count(ct.id) as totalCases FROM mycity.local_area la, mycity.case c, mycity.case_type ct WHERE la.local_area_name = '${pAreaId}' AND la.id = c.local_area_id AND c.case_type_id = ct.id GROUP BY case_type_name, ct.id"
		def dbc = getDb()
		def qryResults = dbc.rows(queryStr)
		def results = []
		for (entry in qryResults) {
			def cts = new CaseTypeSummary();
			cts.with{
				month = 'N/A'
				caseTypeId = entry.caseTypeId
				caseTypeName = entry.typeName ?: "UNDEFINED"
				numCases = entry.totalCases
			}
			results.add(cts)
		}
		results // return the results
	}
	
	/*
	 * Retrieve Case Type summaries, group by month, for a given local area
	 */
	def retrieveMonthlyCaseTypeSummariesForLocalArea(String pAreaId) {
		def queryStr = "SELECT ct.id as caseTypeId, ct.case_type_name as typeName, count(ct.id) as totalCases, date_trunc('month', c.date_reported ) as month_reported FROM mycity.local_area la, mycity.case c, mycity.case_type ct WHERE la.local_area_name = '${pAreaId}' AND la.id = c.local_area_id AND c.case_type_id = ct.id GROUP BY case_type_name, ct.id, month_reported ORDER BY case_type_name"
		
		def dbc = getDb()
		def qryResults = dbc.rows(queryStr)
		def results = []
		for (entry in qryResults) {
			def cts = new CaseTypeSummary();
			cts.with{
				month = entry.month_reported
				caseTypeId = entry.caseTypeId
				caseTypeName = entry.typeName ?: "UNDEFINED"
				numCases = entry.totalCases
			}
			results.add(cts)
		}
		results // return the results
	}
	
	/*
	 * Retrieve the list of cases of a given case type and for a specific local area
	 */
	def retrieveCasesForLocalAreaAndCaseType(pAreaId, caseTypeId) {
		def queryStr = "SELECT ct.id as caseTypeId, ct.case_type_name as typeName, count(ct.id) as caseTypeCount, date_trunc('month', c.date_reported ) as month_reported FROM mycity.local_area la, mycity.case c, mycity.case_type ct WHERE la.local_area_name = '${pAreaId}' AND la.id = c.local_area_id AND c.case_type_id = ct.id AND ct.id = '${caseTypeId}' GROUP BY case_type_name, ct.id, month_reported ORDER BY case_type_name" 
		
                def dbc = getDb()
		def qryResults = dbc.rows(queryStr)
		def results = []
		for (entry in qryResults) {
			def aCase = new Case();
			aCase.with{
				caseId = entry.caseId ?: "UNDEFINED"
				loggedAt = entry.loggedAt
				loggedOn = entry.loggedOn
				type = new CaseType();
				type.with{
					typeId = entry.caseTypeId
					name = entry.caseTypeName
				}
			}
			results.add(aCase)
		}
		results // return the results
	}

    private def getDb() {
		return new Sql(dataSource);
    }

}
