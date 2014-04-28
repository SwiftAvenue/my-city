package com.swiftavenue.mycity

import grails.transaction.Transactional
import grails.transaction.Transactional

import com.swiftavenue.mycity.db.DBConnection
import com.swiftavenue.mycity.LocalAreaSummary
import com.swiftavenue.mycity.LocalArea

@Transactional
class DataRetrievalService {

    def grailsApplication   // grails provided object 

	/* 
	 * Retrieves the list of all local areas. Return the list of local area names 
	 */
	def retrieveLocalAreas() {
		def queryStr = "MATCH (n:LocalArea) return n.areaId as areaId, n.areaName as areaName"
		def dbc = getDb()
		// dbc.display()
		def qryResults = dbc.query(queryStr)
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
		def queryStr = "MATCH (n:LocalArea)-[r]-(b) return n.areaId as area, count(*) as total"
		def dbc = getDb()
		// dbc.display()    // enable to verify that connection is a singleton
		def qryResults = dbc.query(queryStr)
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
		def queryStr = "MATCH (n:LocalArea)-[r]-(b) where n.areaId = '${pAreaId}' return n.areaId as area, count(*) as total"
		def dbc = getDb()
		// dbc.display()    // enable to verify that connection is a singleton
		def qryResults = dbc.query(queryStr)
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
		def queryStr = "match (n:LocalArea)<-[:REPORTED_FOR]-(c:Case)-[:OF_TYPE]->(ct) where n.areaId = '${pAreaId}' return " +
		                  "ct.caseTypeId as caseTypeId, " +
		                  "ct.type as typeName, count(*) as totalCases"
		def dbc = getDb()
		def qryResults = dbc.query(queryStr)
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
		def queryStr = "match (n:LocalArea)<-[:REPORTED_FOR]-(c:Case)-[:OF_TYPE]->(ct) where n.areaId = '${pAreaId}'" +
		" return substring(c.logged_on,0,6) as month_reported, ct.caseTypeId as caseTypeId, " + 
		" ct.type as typeName, count(*) as totalCases order by caseTypeId"
		
		def dbc = getDb()
		def qryResults = dbc.query(queryStr)
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
		def queryStr = "match (t:CaseType)<-[:OF_TYPE]-(c:Case)-[:REPORTED_FOR]->(l:LocalArea)" +
		          " where t.caseTypeId = '${caseTypeId}' AND l.areaName = '${pAreaId}' " +
				  " return c.caseId as caseId, c.logged_on as loggedOn, c.logged_at as loggedAt," +
                  " t.caseTypeId as caseTypeId, t.type as caseTypeName"
		def dbc = getDb()
		def qryResults = dbc.query(queryStr)
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
		def dbc = DBConnection.instance
		dbc.init(grailsApplication.config.mycity.dburl)
		return dbc
    }

}
