const User = require('../models').User;

module.exports = {
   create(req, res) {      
        return User
            .create({            
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobile: req.body.hardwaretype,            
                password: req.body.password            
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
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
        return User
            .update({        
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobile: req.body.hardwaretype,            
                password: req.body.password             
            }, {
	            where: { id: req.body.id }
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
   },
};
