# ABG Web Application 
Code Repository for .NET Core 3.1 and Angular 
## System Requirement/Download
- Visual Studio (2022 for Mac)
- Visual Studio Code 
- Node.js
## How to Run 
- Clone Repository by running 
`git clone https://github.com/cieh09/ABG.git 
`
Or you can also clone via Visual Studio. 
![alt text](https://i.imgur.com/FKwbhVJ.png)
- Set up database using MySQLWorkbench by running sql script dump file
- I'm running on localhost. The user is root. Password is 12345. Post is 3308. You can change this connection string in appsettings.json file to whatever your local database is running on. 
- Build and Run the application
- If you cloned everything and used Visual Studio Code 2022 for Mac, You should run the project without downloading or add any packages. In case of any bugs, you can Add/re-add required NuGet Package. Depending on the machine that you are running on, you may have to re-add a few NuGet packages. You can get so by going Add --> NuGet Packages if you are using Visual Studio. And you can run the frontend code separately with the following in command line or terminal on your machine or inside IDE (I'm using Visual Studio). 
- If you are using another IDE and you may need to set up the frontend separately, then you can run the following commands to set up the frontend: 
`
npm i 
npm i -g @angular/cli@8.3.29
ng build
`
