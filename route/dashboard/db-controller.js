const express = require('express');
const router = express.Router();
const db = require('../../config/db-functions');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const { ensureAuthenticated } = require('../../config/auth');
const passport = require('passport');

const subject_controller = require('./subject-controller')

router.get('/db/subject/*', subject_controller )
router.post('/db/subject/*', subject_controller )


router.get( '/db/home', ensureAuthenticated, function( req, res ) {
    
    var deptos = [], cursos = []; 
     // res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    const get_qtd_cursos = "SELECT * FROM curso;";
    const get_deptos = "SELECT * FROM departamento;";


        db.getRecords( get_qtd_cursos, (result) => {
	        cursos = result.rows;
	        db.getRecords( get_deptos, (result) => {
	            deptos = result.rows;
	            res.render( './page/db/home', { title: "PPC Choice - Dashboard", cursos: cursos, deptos:  deptos, user: req.user });
	        })
        })


});


module.exports = router;