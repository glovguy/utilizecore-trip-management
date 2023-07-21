# README

## Todo

- [x] User login
  - [x] User model {email, fullname}
  - [x] login page functionality, upsert, gives session cookie
- [x] CRUD trips
  - [x] Add webpack / react
  - [x] Trips dashboard with list
  - [x] Trips model {status, owner, assignee, location, eta, ETC, start_time, end_time}
  - [x] Proper actions display on dashboard
  - [x] Trip create endpoint (modal)
    - [x] Modal display
    - [x] Create API call
    - [x] Current user in payload
    - [x] assignee selection
    - [x] Address
    - [x] ETA, ETC datetime selector
  - [x] list/get trips
  - [x] edit trip assignee (modal)
    - [x] Modal display
    - [x] Edit API call
    - [x] Display edit button only to assignees/owners
    - [x] assignee re-selection
- [x] Assignees seed script
- [ ] Front end polish
  - [ ] Login page
  - [x] Trip review page
  - [x] Trip create modal
  - [x] Trip reassign modal

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

To seed the test users, run:

```bash
bundle exec rake db:seed
```

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
