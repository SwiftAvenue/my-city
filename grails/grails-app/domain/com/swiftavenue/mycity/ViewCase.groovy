package com.swiftavenue.mycity

import groovy.transform.EqualsAndHashCode;
import groovy.transform.ToString

@ToString(includeNames = true, includeFields = true, excludes = '')
@EqualsAndHashCode
class ViewCase {
	String caseId;
	String loggedAt;
	String loggedOn;
	ViewCaseType type;
	
	static constraints = {
	}

}
