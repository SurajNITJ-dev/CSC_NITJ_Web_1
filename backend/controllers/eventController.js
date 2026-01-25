import Event from "../models/Event.js";

// @desc    Get all events (Public sees Published, Admin sees all)
export const getEvents = async (req, res) => {
  try {
    const filter = req.user && req.user.role === 'admin' ? {} : { status: "Published" };
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve events" });
  }
};

// @desc    Create a new event (Admin Only)
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;
    const event = new Event({
      title,
      description,
      date,
      time,
      createdBy: req.user._id,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: "Invalid event data" });
  }
};

// @desc    Update event status/details (Admin Only)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      event.title = req.body.title || event.title;
      event.status = req.body.status || event.status;
      event.date = req.body.date || event.date;
      
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// @desc    Delete event (Admin Only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.deleteOne();
      res.json({ message: "Event removed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Deletion failed" });
  }
};