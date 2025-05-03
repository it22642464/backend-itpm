import express from 'express';
import {
  getAllWasteCollections,
  getAllUserWasteCollections,
  getWasteCollection,
  createWasteCollection,
  updateWasteCollection,
  updateWasteCollectionStatus,
  deleteWasteCollection
} from '../controllers/wasteCollectionRequestController.js';

const router = express.Router();

// GET all waste collection records
router.get("/", getAllWasteCollections);

// GET all waste collection records for a user
router.get("/user", getAllUserWasteCollections);

// GET a single waste collection record
router.get("/:id", getWasteCollection);

// POST/Create a new waste collection record 
router.post("/", createWasteCollection);

// PUT/Update a waste collection record 
router.put("/:id", updateWasteCollection);

// PUT/Update the status of a waste collection record
router.put("/:id/status", updateWasteCollectionStatus);

// DELETE a waste collection record 
router.delete("/:id", deleteWasteCollection);

export default router;