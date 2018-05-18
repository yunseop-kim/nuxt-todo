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
    text: req.body.text,
    done: false
  }).then(() => {
    res.status(201).json({
      message: "Successfully Created."
    });
  })
});

router.put('/:id', function (req, res) {
  models.Todo.update({
    text: req.body.text,
    done: req.body.done
  }, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({
      message: "Successfully Created."
    });
  })
});

router.delete('/:id', function (req, res) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.status(204).send();
  });
});

module.exports = router;
