const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json());

const unicornModel = require('./models/unicorns');

// handle search requests
app.post('/search', async (req, res) => {
  console.log(req.body);
  if (req.body.type === 'nameSearch') {
    var selectionArgument = {}
    if (req.body.filter && req.body.filter.name) {
      selectionArgument = { name: req.body.filter.name }
    }
    var projectionArgument = {}
    if (req.body.projectionFilters && req.body.projectionFilters.name && !req.body.projectionFilters.weight) {
      projectionArgument = { "name": 1, "_id": 0 }
    } else if (req.body.projectionFilters && !req.body.projectionFilters.name && req.body.projectionFilters.weight) {
      projectionArgument = { "weight": 1, "_id": 0 }
    } else if (req.body.projectionFilters && req.body.projectionFilters.name && req.body.projectionFilters.weight) {
      projectionArgument = { "name": 1, "weight": 1, "_id": 0 }
    }
    const result = await unicornModel.find(selectionArgument, projectionArgument);

    res.json(result);
  } else if (req.body.type === 'weightSearch') {
    var selectionArgument = {}
    if (req.body.filter && req.body.filter.weight) {
      selectionArgument = { weight: req.body.filter.weight }
    }
    var projectionArgument = {}
    if (req.body.projectionFilters && req.body.projectionFilters.weight && !req.body.projectionFilters.name) {
      projectionArgument = { "weight": 1, "_id": 0 }
    } else if (req.body.projectionFilters && !req.body.projectionFilters.weight && req.body.projectionFilters.name) {
      projectionArgument = { "name": 1, "_id": 0 }
    } else if (req.body.projectionFilters && req.body.projectionFilters.name && req.body.projectionFilters.weight) {
      projectionArgument = { "name": 1, "weight": 1, "_id": 0 }
    }
    const result = await unicornModel.find(selectionArgument, projectionArgument);

    res.json(result);
  } else if (req.body.type === 'foodSearch') {
    const foodList = req.body.filter && req.body.filter.food ? req.body.filter.food.$in : [];
    const selectionArgument = {
      loves: { $all: foodList }
    };
    var projectionArgument = {};
    if (req.body.projectionFilters && req.body.projectionFilters.weight && !req.body.projectionFilters.name) {
        projectionArgument = { "weight": 1, "_id": 0 }
      } else if (req.body.projectionFilters && !req.body.projectionFilters.weight && req.body.projectionFilters.name) {
        projectionArgument = { "name": 1, "_id": 0 }
      } else if (req.body.projectionFilters && req.body.projectionFilters.name && req.body.projectionFilters.weight) {
        projectionArgument = { "name": 1, "weight": 1, "_id": 0 }
      }
    const result = await unicornModel.find(selectionArgument, projectionArgument);
    res.json(result);
  }
  
});

module.exports = app;
