const express = require('express');
const agendaController = require('./../controllers/agendaController');

const router = express.Router();

router
  .route('/')
  .get(agendaController.getAllAgendas)
  .post(agendaController.createAgenda);

router
  .route('/:id')
  .get(agendaController.getAgenda)
  .patch(agendaController.updateAgenda)
  .delete(agendaController.deleteAgenda);

module.exports = router;
