# Scouting site 😁

## How to run locally
First of all, clone this repo. After that, intall the dependancies with ```npm i``` or ```yarn add```. You will need to have a ```.env.local``` file to store a ```DB_URI```, ```ACCESS_TOKEN_SECRET```, and a ```REFRESH_TOKEN_SECRET```. The DB uri variable should be the uri of your mongodb server (usually at mongodb://localhost/scouting).

## Feature Checklist
- [x] Can fill out and submit forms
- [x] Can create account
- [x] Certain pages can be locked behind authentication (requires an account)
- [ ] Page to show the preformance of a specific team
- [ ] Admin panel
- [ ] Saving submitted form when offline

## Deployment
The site is temporarily [deployed at scouting.ibomb.website](https://scouting.ibomb.website).
