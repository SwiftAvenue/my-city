class UrlMappings {
    static mappings = {
        "/localAreas" (controller:"localArea", action: "index")
        "/localAreasSummaries" (controller:"localAreaSummaries", action: "index")
        "/localAreasSummaries/area/$id" (controller:"localAreaSummaries", action: "show")
        "/"(view:"/index")
        "500"(view:'/error')
    }
}
