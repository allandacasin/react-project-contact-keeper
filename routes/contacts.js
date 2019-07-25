const express = require('express');
const { check} = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth')


// @route GET api/contacts
// @desc GET all user' contacts
// @access Private
router.get('/', auth, async (req, res) => {

  try {

    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.json(contacts);
    
  } catch (error) {

    console.error(err.message);
    res.status(500).send('Server Error');
  }

});



// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post('/', auth, [

  check('name', 'Name is required.').not().isEmpty(),
  
  ], async (req, res) => {

  try {

    const {name, email, phone, type} = req.body;

    const user = req.user.id

    const contact = new Contact({

      name, email, phone, type, user

    });

    await contact.save();

    res.json(contact);
    
  } catch (error) {

    console.error(err.message);
    res.status(500).send('Server Error.')
  
  }

});




// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', auth, async (req, res) => {

  const {name, email, phone, type} = req.body;
  
  //Build contact object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;


  try {

    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Contact not found.'});

    if(contact.user.toString() !== req.user.id) {

      return res.status(404).json({ msg: 'Not authroized.'});
    }


    contact = await Contact.findByIdAndUpdate(req.params.id, 
      { $set: contactFields}, 
      { new: true}); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one. 
    
    res.json(contact);

  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server Error.');

  }

});


// @route DELETE api/users/:id
// @desc Delete contact
// @access Private
router.delete('/:id', auth, async (req, res) => {

  try {

    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: 'Contact not found.'});

    if(contact.user.toString() !== req.user.id) {

      return res.status(404).json({ msg: 'Not authroized.'});
    }


    contact = await Contact.findByIdAndRemove(req.params.id); //if new is set to true it returns the updated document, and if is set to false (default) it returns the old one. 
    
    res.send("Contact Removed.");
    
  } catch (err) {

    console.error(err.message);
    res.status(500).send('Server Error.');

  }

});


module.exports = router;
