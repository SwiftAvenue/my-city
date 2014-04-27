class UrlMappings {
    static mappings = {
        "/api/localAreas" (controller:"localArea", action: "index")
        "/api/cases/area/$areaName" (controller:"case", action: "caseTypesForArea")
        "/api/cases/area/$areaName/caseType/$caseTypeId" (controller:"case", action: "casesInAreaForCaseType")
        "/api/localAreasSummaries" (controller:"localAreaSummaries", action: "index")
        "/api/localAreasSummaries/area/$id" (controller:"localAreaSummaries", action: "show")
        "/"(view:"/index")
        "500"(view:'/error')
    }
}
