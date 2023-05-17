import express from 'express'
import Projects from '../models/projectsModel.js';

const projectsRoute = express.Router();

//get all projects
projectsRoute.get('/all', async(req, res) => {
    const projects = await Projects.find();
    res.send(projects);
});

projectsRoute.post('/add', async(req, res) => {

    const newProject = new Projects({
        clientNameId: req.body.clientNameId,
        clientName: req.body.clientName,
        service: req.body.service,
        address: req.body.address,
        gender: req.body.gender,
        phone: req.body.phone,
        method: req.body.method,
        project: req.body.project,
        projectCost: req.body.projectCost,
        payment: req.body.payment,
        status: req.body.status
       
    });

    const project = await newProject.save();
    res.send({
        
        clientNameId: project.clientNameId,
        clientName: project.clientName,
        service: project.service,
        address: project.address,
        gender: project.gender,
        phone: project.phone,
        method: project.method,
        project: project.project,
        projectCost: project.projectCost,
        payment: project.payment,
        status: project.status
    })

});

export default projectsRoute;