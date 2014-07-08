class UrlMappings {
    static mappings = {
        "/api/localAreas" (controller:"viewLocalArea", action: "index")
		"/api/caseTypes" (controller:"viewCaseType", action: "index")
        "/api/cases/area/$areaName" (controller:"viewCase", action: "caseTypesForArea")
        "/api/cases/area/$areaName/m" (controller:"viewCase", action: "caseTypesMonthlyForArea")
        "/api/cases/area/$areaName/caseType/$caseTypeId" (controller:"viewCase", action: "casesInAreaForCaseType")
        "/api/localAreasSummaries" (controller:"viewLocalAreaSummaries", action: "index")
        "/api/localAreasSummaries/area/$id" (controller:"viewLocalAreaSummaries", action: "show")
        "/"(view:"/index")
        "500"(view:'/error')
    }
}
