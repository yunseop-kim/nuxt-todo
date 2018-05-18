const models = require('../../models');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  models.Todo.findAll().then(function (todos) {
    res.status(200).json({
      title: 'Sequelize: Express Example',
      todos
    });
  });
});

router.post('/', function (req, res) {
  models.Todo.create({
    text: req.body.text
  }).then(function () {
    res.redirect('/');
  });
});

router.delete('/:id', function (req, res) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/');
  });
});

module.exports = router;
