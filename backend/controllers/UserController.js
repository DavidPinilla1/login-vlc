const { User,Token,Sequelize } = require('../models');
const { Op } =Sequelize;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserController = {
    async register(req, res) {
        try {
            req.body.role = "user";
            const hash = await bcrypt.hash(req.body.password, 9);
            req.body.password = hash;
            const user = await User.create(req.body);
            res.status(201).send({
                user,
                message: 'Usuario creado satisfactoriamente'
            });
        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Ha habido un problema al tratar de registrar el usuario'
            })
        }

    },
    async login(req, res) {
        try {
            const user = await User.findOne({where:{
                email: req.body.email
                } 
            });
            if (!user) {
                return res.status(401).send({  message: 'Email o contraseña incorrectas' });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password );
            if (!isMatch) {
                return res.status(401).send({ message: 'Email o contraseña incorrectas' });
            }
            const token = jwt.sign({id:user.id},'secretitos');
            await Token.create({ token, UserId:user.id });
            res.send({ message: 'Bienvenid@ ' + user.name, user,token });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Ha habido un problema al tratar de conectarse' })

        }
    },
    getInfo(req,res){
        res.send(req.user)
    },
    async logout(req,res){
        try {
            await Token.destroy({
                where:{ [Op.and]:[
                    {UserId:req.user.id},
                    {token:req.headers.authorization}
                ] }
            });
            res.send({message:'Desconectado con éxito'})
        } catch (error) {
            console.log(error)
            res.status(500).send({message:'hubo un problema al tratar de desconectarte'})
        }
    }

}

module.exports = UserController