dataSource {
    pooled = true
    driverClassName = "org.postgresql.Driver"
    username = "mycity"
    password = "myC1ty"
    dialect = org.hibernate.dialect.PostgreSQLDialect
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory' // Hibernate 3
//    cache.region.factory_class = 'org.hibernate.cache.ehcache.EhCacheRegionFactory' // Hibernate 4
}

// environment specific settings
environments {
    development {
        dataSource {
            url = "jdbc:postgresql://107.170.174.12:5432/mycitydb"
        }
    }
    test {
        dataSource {
            url = "jdbc:postgresql://107.170.174.12:5432/mycitydb"
        }
    }
    production {
        dataSource {
            url = "jdbc:postgresql://107.170.174.12:5432/mycitydb"
        }
    }
}
