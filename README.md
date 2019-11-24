# Open Doors

A web app that aims to make it easier to find available emergency housing in your area. Open Doors provides listings of local emergency shelters along with up to date bed availability. Shelter staff can log into the shelter portal to update this information.



## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


### Installing

```
~$ npm install
```

### Spin up the project

```
~$ npm run server
~$ npm run client
```

## Create database and table

Create a new PosgreSQL database called `open-doors`
 
Reference the file database.sql for CREATE TABLE and INSERT queries. 

## Environmental Variables

Create a local file labeled .env and copy/paste the following

```
SERVER_SESSION_SECRET = superSecretString
REACT_APP_API_KEY = 
```

Replace "superSecretString" with a long random string (>8 characters) to keep the application secure.

Get yourself a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) and enable the **Places API** and the **Maps JavaScript API**. Set "REACT_APP_API_KEY" equal to your Google Maps API Key.


## Running the tests

- Nodemon
- Postico
- Jest

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning


## Deployment

Although this app is not yet in use, it is deployed on [Heroku](https://open-doors-housing-resource.herokuapp.com/). Every push to the branch *deployment* will automatically update that site. 

## Authors

* **Edith Emmings** - *Initial work* - [GitHub](https://github.com/edieemm)

See also the list of [contributors](https://github.com/edieemm/open-doors/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Prime Digital Academy
* Casie Siekman and Dev Jana

