package com.swiftavenue.mycity

import groovy.transform.EqualsAndHashCode;
import groovy.transform.ToString

@ToString(includeNames = true, includeFields = true, excludes = '')
@EqualsAndHashCode
class Case {
	String caseId;
	String loggedAt;
	String loggedOn;
	CaseType type;
	
	static constraints = {
	}

}
