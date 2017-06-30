# Llop
Polls made easy
Llop is a multi-feature web application that assists users in decision making using a simple voting poll interface. This project incorporates JavaScript, HTML, CSS, jQuery, AJAX front-end skills, and Node, Express, PostgresSQL, and Knex back-end skills. 

## Features
1. Users can create a poll by entering a valid email address as well as their name.
2. Poll creators must enter a question and at least two options in order to successfully create a poll.
3. Upon poll creation, two links are generated: to the results page and the voting page. These links are then sent to the poll creator via email.
4. Poll creators can then share the voting link with their friends to invite them to the poll.
5. On the poll page, voters can rank their choices using the drag and drop feature.
6. When a vote has been submitted, the poll creator will receive an email with the vote detail and a link to the results page.

## Getting Started 
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Create a `.env` file and put in configurations according to `.example.env` (you need a valid sendgrid API key to get the email feature working).
3. Start the web server using the `npm run local` command. The app will be served as you configurated.
4. Go to the address in your browser.
5. Alternatively go to <http://llop.herokuapp.com/>.

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
