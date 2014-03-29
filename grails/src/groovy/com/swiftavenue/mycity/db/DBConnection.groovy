/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.swiftavenue.mycity.db

import org.neo4j.rest.graphdb.RestAPI
import org.neo4j.rest.graphdb.RestAPIFacade
import org.neo4j.rest.graphdb.query.RestCypherQueryEngine
import org.neo4j.rest.graphdb.util.QueryResult

/**
 *
 * @author DFAULUS
 */
@Singleton
class DBConnection {
    private static RestAPI api 
    private static RestCypherQueryEngine engine 

    // initialize the connection object. 
    def init(url) {
       if (!api) {
	  println "Creating new RestAPIFacade..."
          api = new RestAPIFacade(url)
          engine = new RestCypherQueryEngine(api)
       }
    }

    def query(queryString) { 
        QueryResult<Map<String,Object>> result = engine.query(queryString, Collections.EMPTY_MAP)
	return result
    }

    def display() { println "DBConnection: ${hashCode()}" }
}

