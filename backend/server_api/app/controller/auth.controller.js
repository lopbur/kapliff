const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  // Save user to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        })
        .then(roles => {
          user.setRoles(roles).then(() => {
            res.send({
              success: true,
              message: 'User was registered successfully!'
            });
            return;
          });
        })
      } else {
        // Set user role 1
        user.setRoles([1]).then(() => {
          res.send({
            success: true,
            message: 'User was registered successfully!'
          });
          return;
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
      return;
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({
          success: false,
          message: 'User not found.'
        })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          success: false,
          message: 'Invalid password!'
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          success: true,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          }
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        success: false,
        message: err.message
      });
    });
};