## A React + Redux / Django Rest Framework authentication example

### Functionality:

* [x] Login with JWT
* [x] middleware for JWT refresh if expiring
* [x] Registration
* [x] Dynamic navbar switching when user logs in / logs out
* [x] Password Change
* [x] Screen size responsive components & Navbar


### How to use:

- Clone the repo
#### Frontend
1. cd frontend && npm install
2. enter your backend url in actions/backendUrl.js or add an environment variable named REACT_APP_DEV_URL 
3. npm start
#### Backend
1. cd backend, create a virtualenv, activate it and install -r requirements/local.txt
2. python manage.py makemigrations custom_user , python manage.py migrate , createsuperuser
3. python manage.py runserver


