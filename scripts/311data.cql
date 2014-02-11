// Unique constraints
CREATE CONSTRAINT ON (n:Case) ASSERT n.caseId IS UNIQUE;
CREATE CONSTRAINT ON (n:CaseType) ASSERT n.caseType IS UNIQUE;

// Create the 'type' nodes
CREATE (AnimalControl:Division {divName:'Animal Control'})
CREATE (Sanitation:Division {divName: 'Sanitation'})
CREATE (TrafficAndDataManagement:Division {divName: 'Traffic and Data Management'})
CREATE (GeneralParkBoardInformation:Division {divName: 'General Park Board Information'})
CREATE (License:Department {category:'CSG'})
CREATE (AnimalControl) -[:RESPONSIBILITY_OF]->(License)
CREATE (DAPC:CaseType {caseType:'Dead Animal Pickup Case'})
CREATE (DAPC)-[:HANDLED_BY]->(AnimalControl)
CREATE (C0100001:Case {caseId:'C0100001', logged_on:'20140101', logged_at:'0721'})
CREATE (C0100001) -[:OF_TYPE]->(DAPC)
CREATE (C0100002:Case {caseId:'C0100002', logged_on:'20140102', logged_at:'0832'})
CREATE (C0100002) -[:OF_TYPE]->(DAPC)
CREATE (C0100003:Case {caseId:'C0100003', logged_on:'20140102', logged_at:'0905'})
CREATE (C0100003) -[:OF_TYPE]->(DAPC)
CREATE (C0100004:Case {caseId:'C0100004', logged_on:'20140103', logged_at:'1005'})
CREATE (C0100004) -[:OF_TYPE]->(DAPC)
CREATE (C0100005:Case {caseId:'C0100005', logged_on:'20140103', logged_at:'1105'})
CREATE (C0100005) -[:OF_TYPE]->(DAPC)

// Add a new case
match (DAPC:CaseType {caseType:'Dead Animal Pickup Case'})
CREATE (C0100006:Case {caseId:'C0100006', logged_on:'20140103', logged_at:'1205'})
CREATE (C0100006) -[:OF_TYPE]->(DAPC)
RETURN DAPC

// Create area and city
CREATE (SunsetArea:LocalArea {name:'Sunset'})
CREATE (ArbutusRidgeArea:LocalArea {name:'Arbutus Ridge'})
CREATE (KerrisdaleArea:LocalArea {name:'Kerrisdale'})

CREATE (Vancouver:City {name:'Vancouver'})

CREATE (SunsetArea)-[:AN_AREA_IN]->(Vancouver)
CREATE (ArbutusRidgeArea)-[:AN_AREA_IN]->(Vancouver)
CREATE (KerrisdaleArea)-[:AN_AREA_IN]->(Vancouver)

// Create address 
CREATE (a1:Address {hundredBlock:'Intersection', street_name:'E 64TH AV and PRINCE ALBERT ST'})
CREATE (a2:Address {hundredBlock:'26##', street_name:'W 31ST AV'})
CREATE (a3:Address {hundredBlock:'14##', street_name:'E 49TH AV'})

CREATE (a1)-[:IS_WITHIN_AREA]->(SunsetArea)
CREATE (a2)-[:IS_WITHIN_AREA]->(ArbutusRidgeArea)
CREATE (a3)-[:IS_WITHIN_AREA]->(KerrisdaleArea)

match (c:Case), (a:Address)
where c.caseId='C0100001' AND a.hundredBlock='Intersection' AND a.street_name='E 64TH AV and PRINCE ALBERT ST'
CREATE (c)-[:REPORTED_FOR]->(a)

match (c:Case), (a:Address)
where c.caseId='C0100002' AND a.hundredBlock='26##' AND a.street_name='W 31ST AV'
CREATE (c)-[:REPORTED_FOR]->(a)

match (c:Case), (a:Address)
where c.caseId='C0100003' AND a.hundredBlock='14##' AND a.street_name='E 49TH AV'
CREATE (c)-[:REPORTED_FOR]->(a)
