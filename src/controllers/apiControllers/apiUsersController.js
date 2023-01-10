let db = require('../../db/models');

let apiUsersController = {

    list: (req, res) => {

        db.User.findAndCountAll({
            offset: Number(req.query.page) * 10 || 0,
            limit: 10
        })

        
            .then((users) => {

                users.rows.forEach(user => {
                    user.setDataValue('endpoint', '/api/users/' + user.id);
                });

                let respuesta = {
                    meta: {
                        status: 200,
                        url: "/api/users",
                        page: req.query.page,
                        users_per_page: 10,
                        total_users: users.count,
                        total_pages: Math.ceil(users.count / 10)
                    },
                    data: users.rows
                }

                res.json(respuesta);
            })

            .catch(err => {
                res.json({
                    error: true
                })
            })
    },
    detail: (req, res) => {
        db.User.findOne({
                include: ['phone', 'address'],
                where: {
                    id: req.params.id
                }
            })
            .then(userDetail => {
                if (userDetail) {
                    userDetail.setDataValue('endpoint', '/api/users/' + userDetail.id);

                    let respuesta = {
                        meta: {
                            status: 200,
                            url: `/api/users/${userDetail.id}`
                        },
                        data: userDetail
                    }

                    res.json(respuesta);
                } else {
                    res.json('no-encontrado');
                }
            })
            .catch(errors => {
                console.log(errors);
                res.send('Error!!!');
            })

    },
    update: (req, res) => {
        db.User.update({
            name: req.body.name,
            last_name: req.body.lastname,
            cell_phone: req.body.cell_phone
            },
            {
            where: {
                id: req.params.id
            },
            include: [
                {association: 'phone'}
            ]
        })
        .then(user => {
            console.log(user)
            res.json({
                mesagge: "Edited"
            })
        })
    }
}

module.exports = apiUsersController;