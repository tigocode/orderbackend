const express = require('express');
const router =  express.Router();

const Users = require('./modules/users');
const Esfericas = require('./modules/esfericas');
const Toricas = require('./modules/toricas');
const Multifocal = require('./modules/multifocal');
const ClearOrder = require('./modules/clearOrder');

router.post('/users', Users.Create);
router.get('/esfericas', Esfericas.Index);
router.get('/toricas', Toricas.Index);
router.get('/multifocal', Multifocal.Index);
router.delete('/clearorder', ClearOrder.Delete);

module.exports = router;
