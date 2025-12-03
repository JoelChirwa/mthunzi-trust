import Partner from '../models/Partner.js';

// @desc    Create a new partner
// @route   POST /api/partners
// @access  Private/Admin
export const createPartner = async (req, res) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all partners
// @route   GET /api/partners
// @access  Public
export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1, createdAt: -1 });
    res.json({ partners });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single partner by ID
// @route   GET /api/partners/:id
// @access  Public
export const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      res.json(partner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a partner
// @route   PUT /api/partners/:id
// @access  Private/Admin
export const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      Object.assign(partner, req.body);
      const updatedPartner = await partner.save();
      res.json(updatedPartner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a partner
// @route   DELETE /api/partners/:id
// @access  Private/Admin
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      await partner.deleteOne();
      res.json({ message: 'Partner removed' });
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
