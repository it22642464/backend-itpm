 
import mongoose from 'mongoose';
import WasteCollection from '../models/wasteCollectionRequstModel.js';

// GET all waste collection records
export const getAllWasteCollections = async (req, res) => {
    try {
        const records = await WasteCollection.find().sort({ createdAt: 1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching records: " + error.message });
    }
};

// GET all waste collection records by user
export const getAllUserWasteCollections = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required to fetch user requests" });
        }

        const records = await WasteCollection.find({ email }).sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching user records: " + error.message });
    }
};

// GET a single waste collection record
export const getWasteCollection = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid waste collection ID format" });
        }

        const record = await WasteCollection.findOne({ _id: id, user: req.user._id });

        // Check if record exists
        if (!record) {
            return res.status(404).json({ message: "Waste collection record not found" });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the record: " + error.message });
    }
};

// POST/Create a new waste collection record
export const createWasteCollection = async (req, res) => {
    try {
        const { name, email, phone, address, city, date, time, wasteType } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !address || !city || !date || !time || !wasteType) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Additional validation for email and phone format
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // Create the request
        const record = await WasteCollection.create({ ...req.body });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the record: " + error.message });
    }
};

// DELETE a waste collection record
export const deleteWasteCollection = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid waste collection ID format" });
        }

        const record = await WasteCollection.findByIdAndDelete(id);

        // Check if record exists
        if (!record) {
            return res.status(404).json({ message: "Waste collection record not found" });
        }

        res.status(200).json({ message: "Waste collection record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the record: " + error.message });
    }
};

// UPDATE a waste collection record
export const updateWasteCollection = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid waste collection ID format" });
        }

        // Remove the user check since we're not using authentication
        const record = await WasteCollection.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true }
        );

        // Check if record exists
        if (!record) {
            return res.status(404).json({ message: "Waste collection record not found" });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the record: " + error.message });
    }
};

// UPDATE a waste collection record status
export const updateWasteCollectionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid waste collection ID format" });
        }

        // Check if status is valid
        if (!["Pending", "Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Remove the user check since we're not using authentication
        const record = await WasteCollection.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true }
        );

        // Check if record exists
        if (!record) {
            return res.status(404).json({ message: "Waste collection record not found" });
        }

        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the record: " + error.message });
    }
};
