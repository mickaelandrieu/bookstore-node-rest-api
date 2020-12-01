# Book Store Node.js (Express.js) REST API

## Installation

```
git clone https://github.com/mickaelandrieu/bookstore-node-rest-api.git
cd bookstore-node-rest-api
npm i
```

## Endpoints

### Books

* `/books`
* `/books/<isbn>`

### Users

* `/users`
* `/users/<mail>`

### Book Store management

* `/borrow/<mail>/<isbn>`: borrow a book from the book store as an user
* `/bring-back/<mail>/<isbn>`: bring back a book to the book store as an user

## Deploy on Heroku

Create [an account on Heroku](https://signup.heroku.com/) (Free/Hobby tiers is enough) and install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

Then, execute the following instruction in the `bookstore-node-rest-api` folder:

```
heroku login
heroku create
git push heroku master
```