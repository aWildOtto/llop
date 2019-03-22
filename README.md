# Llop
"Llop, polls made easy" is a voting poll web application that assists users in decision making. Llop offers a simple and intuitive user interface and useful features including email notification and link sharing. 

## Technologies used
This project uses JavaScript, HTML, CSS, jQuery, and AJAX in the front-end and Node, Express, PostgresSQL, and Knex in the back-end. 

## Features
1. Users can create a poll by entering a valid email address and their name.
2. Poll creators must enter a question and at least two options in order to successfully create a poll.
3. Two links will be generated and sent to the inbox of the poll creaters after a poll creation: one for the results page, one for the voting page.
4. Poll creators can share the voting link to get votes to the poll.
5. On the poll page, voters can rank their choices using the drag and drop interface.
6. When a vote has been submitted, the poll creator will receive an email that gives the voting detail and a link to the results page.

## Getting Started 
1. Fork this repository and create a local clone of your fork.
2. Install the dependencies(described at the end) using the `npm install` command.
3. Follow the format of `.env.example` and create a `.env` file. Enter the configurations in the `.env` file (you need to set up a postgres database for the project and a valid sendgrid API key for the email notification feature).
3. Start the web server using the `npm run local` command. The app will be served as it is configurated.
4. Go to the address `localhost:8080` in your browser or go to <http://llop.herokuapp.com/>.

## Screenshots
![Create user](https://github.com/aWildOtto/llop/blob/master/docs/createUser.png)
![Create poll page](https://github.com/aWildOtto/llop/blob/master/docs/createPoll.png)
![Create poll email](https://github.com/aWildOtto/llop/blob/master/docs/createPollEmail.png)
![Voter name](https://github.com/aWildOtto/llop/blob/master/docs/voterName.png)
![Voting page](https://github.com/aWildOtto/llop/blob/master/docs/votingPage.png)
![Voting email](https://github.com/aWildOtto/llop/blob/master/docs/votingEmail.png)
![Results page](https://github.com/aWildOtto/llop/blob/master/docs/resultsPage.png)

## Dev team
Otto Hu  
Donald Ma  
Ti Zhang  
Caitlin Quon

## Dependencies
- Node 5.10.x or above
- NPM 3.8.x or above
- Sendgrid: 1.9.2 
- Knex 0.1.0 or above
- Morgan 1.7.0 or above
- Nodemon 1.9.2 or above
- ejs 2.4.1 or above
- express 4.13.4 or above
- dotenv
