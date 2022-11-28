# Getting Started

Assessment - Aniruddh

## Setup

The first thing to do is to clone the repository:

```sh
$ git clone https://github.com/Ani1411/assignment.git
$ cd assignment
```

This project is divided into two parts:
1. Backend (Django)
2. Frontend (ReactJs)

### Getting Started with Backend 

Move to `backend` directory and create a virtual environment to install dependencies in and activate it:

```sh
$ cd backend
$ virtualenv venv
$ source venv/bin/activate
```

Then install the dependencies:

```sh
(venv)$ pip install -r requirements.txt
```

Once `pip` has finished downloading the dependencies. Start the server using following command:
```sh
(venv)$ python manage.py runserver
```
And in your browser navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to check if its running.

Now, the backend is working. We get started with frontend.

### Getting Started with Frontend
Move to `frontend` directory from the `assignment` folder.\
And install node dependencies:

```sh
$ cd frontend
$ npm install
```

Once `npm` has finished downloading the dependencies. Start the react server using following command:

```sh
$ npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


```sh
$ npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
