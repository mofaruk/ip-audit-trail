## IP Audit Trail

This project aims to develop a robust and secure API for managing IP addresses. The API will provide functionalities for creating, updating, and viewing IP addresses, as well as maintaining an audit log of all actions performed.

### System Requirements
- Docker >18.x

### Installation
1. Clone the git repository
   ```bash
   git clone git@github.com:mofaruk/ip-audit-trail.git
   ```
3. Create the environment files from example file
   ```bash
    cd ip-audit-trail
    cp auth-service/.env.example auth-service/.env
    cp backend/.env.example backend/.env
    cp mysql/.env.example mysql/.env
    cp mongo/.env.example mongo/.env
    cp api-gateway/.env.example api-gateway/.env
    cp frontend/.env.example frontend/.env.local
   ```

5. Configure each environment variables on the environment files
   - For `backend/.env` put the database credential from `mongo/.env` . Example:  
     ```env
      DB_CONNECTION=mongob
      DB_HOST=mongo
      DB_PORT=27017
      DB_DATABASE=appmongodb
      DB_USERNAME=root
      DB_PASSWORD=Root1234
     ```
   - For `auth-service/.env` put the database credential from `mysql/.env`. Example:
     ```env
      DB_CONNECTION=mysql
      DB_HOST=mysql-ip-audit
      DB_PORT=3306
      DB_DATABASE=appdb
      DB_USERNAME=appuser
      DB_PASSWORD=Pass1234
     ```
   - Add this variable `MSERVICE_AUTH_HOST=http://auth-service:8000/` `backend/.env` file
   - Generate a secrate key with following command and update the `ENCRYPTION_SECRET_KEY` variable on `frontend/.env.(local|production)` file  
     ```bash
     node -p "require('crypto').randomBytes(24).toString('base64url')"
     ```
7. To build and run the project use `docker compose` command, use `-d` option running in backgroud (detached mode)  
   ```bash
   docker compose up
   ```

### Usage
- In local environment use `http://localhost:3000` for frontend.

### API Documentation
You'll get the API documentation here: [https://documenter.getpostman.com/view/12872228/2sAXqzWdTm](https://documenter.getpostman.com/view/12872228/2sAXqzWdTm)

### Future Improvement Plan
1. Currently the emails are send from `Auth` microservice, `mail` microservice should be separated from `Auth` microservice.
2. Logging and monitoring service should be implemented.
3. UX should be improved.
4. Test coverage and code coverage should be increased.
5. API pagination not functional at this moment, this should be implemented.
6. CORS Headers and other headers should be implemented to make this application more secure.
7. I18n should be implemented for multi-langual users.

