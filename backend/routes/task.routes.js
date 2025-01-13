import express from 'express'
import { createTask, deleteTaskById, getAllTasks, getTasks, updateTaskById,TaskStats } from '../controllers/task.controller.js'
const router = express.Router()
import verifyAuth from "../middlewares/verifyAuth.js";

router.post('/',verifyAuth, createTask)
router.get('/',verifyAuth, getTasks)
router.put('/:id',verifyAuth, updateTaskById)
router.delete('/:id',verifyAuth, deleteTaskById)
router.get('/stats',verifyAuth, TaskStats)



export default router;