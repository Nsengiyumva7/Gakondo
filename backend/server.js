import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';
import adminsRoute from './routes/adminsRoute.js';
import usersRoute from './routes/usersRoute.js';
import diseasesRoute from './routes/diseasesRoute.js';
import medecineRoute from './routes/medecineRoute.js';
import activityRoute from './routes/activityRoute.js';
import holidaysRoute from './routes/holidayRoute.js';
import accountsRoute from './routes/accountRoute.js';
import eventsRoute from './routes/eventsRoute.js';
import projectsRoute from './routes/projectsRoute.js';


const app = express();

//this is for post method
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//router
app.use('/api/seed/', seedRouter);
app.use('/api/admins/', adminsRoute);
app.use('/api/users/', usersRoute);
app.use('/api/diseases/', diseasesRoute);
app.use('/api/medecine/', medecineRoute);
app.use('/api/activities/', activityRoute);
app.use('/api/holiday/', holidaysRoute);
app.use('/api/accounts/', accountsRoute);
app.use('/api/events/', eventsRoute);
app.use('/api/projects/', projectsRoute);

//connection with db
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to DB!')
}).catch((error) => {
    console.log(error.message);
})

//create port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});