--------NAME YOUR LOCAL DATABASE "open-doors"----------------

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(30) UNIQUE,
	"password" varchar
);

CREATE TABLE "shelter" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(50),
	"location" VARCHAR(100),
	"phone" VARCHAR(15),
	"website" varchar(255),
	"user_id" INT REFERENCES "user" ON DELETE CASCADE,
	"description" VARCHAR(500),
	"timestamp" timestamp with time zone
); 

CREATE TABLE "guest_type" (
	"id" SERIAL PRIMARY KEY,
	"type" varchar(30)
);

CREATE TABLE "shelter_guest_count" (
	"id" SERIAL PRIMARY KEY,
	"shelter_id" INT REFERENCES "shelter" ON DELETE CASCADE,
	"type_id" INT REFERENCES "guest_type" ON DELETE CASCADE,
	"count" integer DEFAULT 0,
	"capacity" integer
);

CREATE TABLE "hours" (
	"id" SERIAL PRIMARY KEY,
	"shelter_id" INT REFERENCES "shelter" ON DELETE CASCADE,
	"day" varchar(30),
	"open" varchar(20),
	"close" varchar(20)
);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tag" VARCHAR(30)
);

CREATE TABLE "shelter_tags" (
	"id" SERIAL PRIMARY KEY,
	"shelter_id" INT REFERENCES "shelter" ON DELETE CASCADE,
	"tag_id" INT REFERENCES "tags" ON DELETE CASCADE
);

INSERT INTO "tags" ("tag") VALUES 
('dinner'),('shower'),('laundry'),('employment'),('no sobriety requirement'),('savings program'),('recovery program'),('wheelchair accessible'),('computer lab'),('storage facilities'),('LGBTQ only'),('mental health support');


INSERT INTO "guest_type" ("type") VALUES 
('adult/male identified'),('adult/female identified'),('family'),('veteran'),('youth'),('nonspecific');



INSERT INTO "shelter"('name','address','phone','website', 'notes') VALUES ('People Serving People','614 3rd St S','Minneapolis',55415,'612-332-4500','http://peopleservingpeople.org/','Shelter','Families with children under the age of 18. Guests are screened and referred by Hennepin County.  accepts ex-offenders reentering general population from a correctional facility.','MinnesotaHelp','Family'),
 ('Simpson Emergency Shelter','2740 1st Ave S, Minneapolis,55408', '612-874-8683','http://www.simpsonhousing.org/','The overnight shelter is for 44 men and 22 women, 28 day stay (with potential expansion to 90 days) for single sober adult men and women; limited number of nightly stay beds.'),
 ('St. Anne''s Place','2634 Russell Ave N','Minneapolis',55411,'612-521-2128','http://www.ascensionplace.org/','Shelter','Emergency shelter for women-led families who are homeless','MinnesotaHelp','Family'),
 ('Mary''s Place','401 7th St N','Minneapolis',55405,'612-338-4640','http://sharingandcaringhands.org/','Shelter','For families with children','MinnesotaHelp','Family'),
 ('St. Stephen''s Emergency Shelter','2211 Clinton Ave S','Minneapolis',55404,'612-874-9292','http://ststephensmpls.org/programs/emergency-shelter','Shelter','Nightly shelter to 45 sober, adult men','MinnesotaHelp','Adult'),
 ('Salvation Army - Harbor Light','1010 Currie Ave N','Minneapolis',55403,'612-767-3100','http://salvationarmynorth.org/community/harbor-light/','Shelter','Emergency shelter for single men and women','MinnesotaHelp','Adult'),
 ('Our Savior''s Shelter','2219 Chicago Ave S','Minneapolis',55404,'612-872-4193','http://oscs-mn.org/','Shelter','28 day stay (with potential expansion to 90 days) for single ans sober adult men and women.','MinnesotaHelp','Adult'),
 ('Avenues for Homeless Youth','7210 76th Ave N','Brooklyn Park',55428,'612-522-1690','http://avenuesforyouth.org/brooklyn-avenues/','Shelter','Homeless youth ages 16 to 21 from the northwestern suburbs of the Twin Cities','MinnesotaHelp','Youth'),
 ('Families Moving Forward','1808 Emerson Ave N','Minneapolis',55411,'612-529-2185','http://www.beaconinterfaith.org/','Shelter','No night-time shelter at site. Daytime shelter and will process clients to local congregations.','Web','Family'),
 ('Hope Street Shelter','1121 46th Street E','Minneapolis',55407,'612-204-8211','https://www.cctwincities.org/locations/hope-street-shelter/','Shelter','For 16 - 20-year-olds. Families are contacted if possible.','MinnesotaHelp','Youth'),
 ('Exodus Residence - Catholic Charities','819 2nd Ave S','Minneapolis',55402,'612-204-8330','http://www.cctwincities.org/Exodus','Supportive Housing','Priority is given to homeless individuals from Hennepin Health and North Memorial, those who are 55-years-old or older and those experiencing acute/chronic medical issues.','Web','Adult'),
 ('The Bridge for Youth Minneapolis','1111 22nd St W','Minneapolis',55405,'612-377-8800','http://www.bridgeforyouth.org','Shelter','Overnight stay only, For 10 - 17-year-olds who may be reunified with family, For 16 - 18-year-olds who are unable to be reunified with family','Web','Youth'),
 ('Avenues for Homeless Youth','1708 Oak Park Avenue North','Minneapolis',55411,'612-522-1690','http://avenuesforyouth.org','Shelter','Homeless youth ages 16 to 21','MinnesotaHelp','Youth'),
 ('St. Joseph''s Home for Children','1121 46th Street E','Minneapolis',55407,'612-204-8250','https://www.cctwincities.org/locations/st-josephs-home-for-children-emergency-shelter/','Shelter','Emergency shelter placement and basic needs for children from birth to 17-years-old,needs referral','MinnesotaHelp','Youth'),
 ('Catholic Charities Higher Ground','165 Glenwood Dr','Minneapolis',55405,'612-204-8552','http://www.cctwincities.org/highergroundshelter','Shelter','Emergency homeless shelter and Pay-for-Stay facility.  Hours 4pm-9am.','MinnesotaHelp','Adult'),
 ('House of Charity','510 South 8th Street','Minneapolis',55404,'612-594-2002','http://www.houseofcharity.org/','Referral Shelter','Individuals wishing to enter House of Charity of Housing must be referred by a case manager, outreach worker, or other professional.','Web','Adult'),
 ('First Covenant Church Salvation Army','810 7th Street S','Minneapolis',55415,'612-332-8093','http://www.1stcov.org/shelter/','Shelter','Shelter for 50 men and women. Open from November to April, 6PM-7AM','Web','Adult'),
 ('Evergreen Residence','177 Glenwood Avenue N','Minneapolis',55405,'612-204-8432','https://www.cctwincities.org/locations/evergreen-residence/','Shelter','Shelter with 88 units of single room occupancy, permanent housing for independent, single adults, recreational activities, with access to Narcotics Anonymous meetings.','Web','Adult'),
 ('Glenwood Residence','173 Glenwood Avenue N','Minneapolis',55405,'612-2048405','https://www.cctwincities.org/locations/glenwood-residence/','Shelter','Shelter with 80 units of permanent housing to late-stage, chronic alcoholics, health care screenings, case management with structured goal planning and three meals.','Web','Adult');
