# visionTherapy

Seeded Doctors and Patients:

Joe Smith
Username: joe
Patient: Timmy, Kimmy

Mary Smith
Username: mary
Patient: Jimmy

BCRYPT FOR PASSWORD DISABLED, can log in with username and any non-empty password

Setup:
npm install
createdb project2_app
knex migrate:latest
knex seed:run
generate-secret --yes