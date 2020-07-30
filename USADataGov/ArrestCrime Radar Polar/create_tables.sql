CREATE TABLE "stateCrimes" (
	"Region" VARCHAR (20) NOT NULL,
	"State" VARCHAR (50) NOT NULL,
	"Crimes" INT NOT NULL
	);

CREATE TABLE "regionCrimes" (
	"Region" VARCHAR (20) NOT NULL,
	"Crimes" INT NOT NULL
	);
	
CREATE TABLE "stateArrests" (
	"Region" VARCHAR (20) NOT NULL,
	"State" VARCHAR (50) NOT NULL,
	"Arrests" INT NOT NULL
	);
	
CREATE TABLE "regionArrests" (
	"Region" VARCHAR (20) NOT NULL,
	"Arrests" INT NOT NULL
	);
	
CREATE TABLE "statePoliceEmployment" (
	"Region" VARCHAR (20) NOT NULL,
	"State" VARCHAR (50) NOT NULL,
	"Police Employment" INT NOT NULL
	);
	
CREATE TABLE "regionPoliceEmployment" (
	"Region" VARCHAR (20) NOT NULL,
	"Police Employment" INT NOT NULL
	);