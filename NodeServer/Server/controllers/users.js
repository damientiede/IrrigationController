const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports = {
   create(req, res) {   
        User.findOne({ where: { Email: req.body.email } }).then(function (user) {
            if (user) {
                return res.status(200).send('User already exists');                
            }
            // create new user
            const salt = bcrypt.genSaltSync();
            const encryptedPassword = bcrypt.hashSync(req.body.password, salt);   
            console.log(encryptedPassword);
            return User
                .create({            
                    FirstName: req.body.firstName,
                    LastName: req.body.lastName,
                    Email: req.body.email,
                    Mobile: req.body.mobile,            
                    Password: encryptedPassword,
                    Salt: salt       
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
        });
   },
   single(req, res) {
        return User
            .findById(req.params.id)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        const salt = bcrypt.genSaltSync();
        console.log(salt);        
        const encryptedPassword = bcrypt.hashSync(req.body.password , salt);
        return User
            .update({        
                FirstName: req.body.firstName,
                LastName: req.body.lastName,                
                Mobile: req.body.mobile,            
                Password: encryptedPassword             
            }, {
	            where: { Email: req.body.email }
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
   },
   login(req, res) {
        console.log(req.body);         
        User.findOne({ where: { Email: req.body.email } }).then(function (user) {
            if (!user) {
                res.status(401).send('{error: Unknown email}');                
            }
            const encryptedPassword = bcrypt.hashSync(req.body.password, user.Salt);
            if (encryptedPassword != user.Password) {
                res.status(401).send('{error: Password incorrect}');
            } else {
                res.status(200).send();
            }
        })
   },

};
