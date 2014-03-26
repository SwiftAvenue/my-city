package com.swiftavenue.mycity

import grails.transaction.Transactional
import grails.transaction.Transactional
import com.swiftavenue.mycity.db.DBConnection
import com.swiftavenue.mycity.LocalAreaSummary

@Transactional
class DataRetrievalService {

    /* 
    * Retrieves the list of all local areas. Return the list of local area names 
    */
    def retrieveLocalAreas() {
	def queryStr = "MATCH (n:LocalArea) return n.areaName as areaName" 
	def dbc = DBConnection.instance
	// dbc.display()
	def qryResults = dbc.query(queryStr)
	def results = []
	for (entry in qryResults) {
		results.add(entry.areaName ?: "UNDEFINED")
	}
	results // return the results
    }

    /* 
    * Retrieve the summary of all local areas 
    */
    def retrieveLocalAreaSummaries() {
	def queryStr = "MATCH (n:LocalArea)-[r]-(b) return n.areaId as area, count(*) as total"
	def dbc = DBConnection.instance
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
    def retrieveLocalAreaSummary(pAreaId) {
	def queryStr = "MATCH (n:LocalArea)-[r]-(b) where n.areaId = '${pAreaId}' return n.areaId as area, count(*) as total"
	def dbc = DBConnection.instance
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
	   las // return the results
	}
    }

}
