const express = require('express');
const uuid = require('uuid');
const router = express.Router();
// gets data from Members.js
const members = require('../../Members');

// Gets all members
router.get('/', (req, res) => {
    res.json(members); // res.json allows us to return json
});

// get single member
router.get('/:id', (req, res) => { // :id is a URL parameter
    // some runs the boolean checkand returns true or false, checks if at least one element in array passes test
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (found) {
        // we also automatically return a 200 status code
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        // return the proper HTTP code 400 for a bad request
        res.status(400).json({ msg: `No member with id of ${req.params}` });
    }
    
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // checks for proper input
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email'});
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => { // :id is a URL parameter
    // some runs the boolean checkand returns true or false, checks if at least one element in array passes test
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (found) {
        // we also automatically return a 200 status code
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member updated', member });
            }
        })
    } else {
        // return the proper HTTP code 400 for a bad request
        res.status(400).json({ msg: `No member with id of ${req.params}` });
    }
    
});

// Delete Member
router.delete('/:id', (req, res) => { // :id is a URL parameter
    // some runs the boolean checkand returns true or false, checks if at least one element in array passes test
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (found) {
        // we also automatically return a 200 status code
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        // return the proper HTTP code 400 for a bad request
        res.status(400).json({ msg: `No member with id of ${req.params}` });
    }
    
});

module.exports = router;