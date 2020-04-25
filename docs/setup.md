1. Run the following commands:
```
npm init -y
npm install mongodb
npm install express
npm install 
```
2. Create .gitignore, and add the following:
```
node_modules/*
```

3. Call the following Heroku Commands:
```
heroku login
heroku create
```

4. Create Procfile with the following command:
```
web: node server-main.js
```

5. Modify server-main.ts with:
```javascript
theServer.listen(process.env.PORT);
```

6. Compile all .ts files as .js files with the command:
```
tsc html/client.ts html/chart-creation.ts mongo-database.ts myserver-post.ts server-main.ts
```

7. On the Heroku website, link github repo to given Heroku Link (from 3) and enable auto-deploy.

8. Modify  client.ts with:
```javascript
const url = "https://cryptic-eyrie-49046.herokuapp.com/uwallet";
```

9. Compile client.ts file as client.js with the command:
```
tsc html/client.ts
```

10. Push all changes to github (origin master).

11. Navigate to https://cryptic-eyrie-49046.herokuapp.com/ to see webpage. 