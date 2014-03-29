class UrlMappings {
    static mappings = {
        "/api/localAreas" (controller:"localArea", action: "index")
        "/api/localAreasSummaries" (controller:"localAreaSummaries", action: "index")
        "/api/localAreasSummaries/area/$id" (controller:"localAreaSummaries", action: "show")
        "/"(view:"/index")
        "500"(view:'/error')
    }
}
