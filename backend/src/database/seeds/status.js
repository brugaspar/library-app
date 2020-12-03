const moment = require('moment');

exports.seed = function (knex) {
  return knex('status').del()
    .then(function () {
      return knex('status').insert([
        { name: 'Disponível', created_at: moment().format('YYYY-MM-DD HH:mm:ss'), updated_at: moment().format('YYYY-MM-DD HH:mm:ss') },
        { name: 'Emprestado', created_at: moment().format('YYYY-MM-DD HH:mm:ss'), updated_at: moment().format('YYYY-MM-DD HH:mm:ss') }
      ]);
    });
};
