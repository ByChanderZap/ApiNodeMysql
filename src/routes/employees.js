const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM employees', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }
        if(err){
            console.log(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    mysqlConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }
        if(err){
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const { id, name, salary } = req.body;

    const query = `
        CALL empleoyeeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(err){
            console.log(err);
        }
        if(!err){
            res.json({Status:'Employeed saved'}); 
        }
    });
});

router.put('/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;

    const query = 'CALL empleoyeeAddOrEdit(?, ?, ?)';

    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Employee Updated'});
        }else{
            console.log(err); 
        }
    });
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id = ?', [id], (err, rows, fields) => {
        if(!err){
            res.json({status:'Employee deleted'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;