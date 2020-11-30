const db = require('../models');
const e = require('express');
const Post = db.posts;
const Op = db.Sequelize.Op;



exports.create = (req, res) => {
  // Check validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a post
  const post = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    category: req.body.category,
    view: 0
  };

  // Save post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    });
};

exports.findAll = (req, res) => {
  const searchKey = req.query.s;
  const condition = searchKey ? {
    [Op.or]: [
      { title: { [Op.like]: `%${searchKey}%` } },
      { content: { [Op.like]: `%${searchKey}%`} }
    ],
  } : null;
  const _offset = req.query.offset ? req.query.offset *=1 : null;
  const _limit = req.query.limit ? req.query.limit *=1 : null;

  Post.findAll({
    where: condition,
    offset: _offset,
    limit: _limit
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Error retrieving post with id: ${id} (${err})`
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating posts with id= " + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was delete successfully."
        });
      } else {
        res.send({
          message: `Cannot delete post with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete post with id= " + id
      })
    })
}

exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        message: `${nums} Posts were delete successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all posts'
      });
    });
};