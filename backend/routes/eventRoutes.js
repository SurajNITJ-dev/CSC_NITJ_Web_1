import express from "express";
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from "../controllers/eventController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Publicly accessible but optionally protected to check roles
router.route("/").get(getEvents).post(protect, isAdmin, createEvent);
router.route("/:id").put(protect, isAdmin, updateEvent).delete(protect, isAdmin, deleteEvent);

export default router;