const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const unicornModel = require('./models/unicorns.js');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/search', async (req, res) => {
    console.log(req.body);
    if (req.body.type === 'nameSearch') {
        var selectionArgument = {}
        if (req.body.name)
            selectionArgument = {
                name: req.body.name
            }

        var projectionArgument = {};
        if (req.body.projections.name == true && req.body.projections.weight == false) {
            projectionArgument = {
                "name": 1,
                "_id": 0
            };
        } else if (req.body.projections.name == false && req.body.projections.weight == true) {
            projectionArgument = {
                "weight": 1,
                "_id": 0
            };
        } else if (req.body.projections.name == true && req.body.projections.weight == true) {
            projectionArgument = {
                "name": 1,
                "weight": 1,
                "_id": 0
            };
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    } else if (req.body.type === 'weightSearch') {
        var selectionArgument = {}
        if (req.body.weight)
            selectionArgument = {
                weight: req.body.weight
            }

        var projectionArgument = {};
        if (req.body.projections.name == true && req.body.projections.weight == false) {
            projectionArgument = {
                "name": 1,
                "_id": 0
            };
        } else if (req.body.projections.name == false && req.body.projections.weight == true) {
            projectionArgument = {
                "weight": 1,
                "_id": 0
            };
        } else if (req.body.projections.name == true && req.body.projections.weight == true) {
            projectionArgument = {
                "name": 1,
                "weight": 1,
                "_id": 0
            };
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    } else if (req.body.type === 'foodSearch') {
        var selectionArgument = {}
        if (req.body.food)
            selectionArgument = {
                favoriteFood: req.body.food
            }

        var projectionArgument = {};
        if (req.body.projections.name == true && req.body.projections.weight == false) {
            projectionArgument = {
                "name": 1,
                "_id": 0
            };
        } else if (req.body.projections.name == false && req.body.projections.weight == true) {
            projectionArgument = {
                "weight": 1,
                "_id": 0
            };
        } else if (req.body.projections.name == true && req.body.projections.weight == true) {
            projectionArgument = {
                "name": 1,
                "weight": 1,
                "_id": 0
            };
        }
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    }
});


module.exports = app;