import Vacancy from '../models/Vacancy.js';

// @desc    Create a new vacancy
// @route   POST /api/vacancies
// @access  Private/Admin
export const createVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.create(req.body);
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all vacancies
// @route   GET /api/vacancies
// @access  Public
export const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({ createdAt: -1 });
    res.json({ vacancies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single vacancy by ID
// @route   GET /api/vacancies/:id
// @access  Public
export const getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (vacancy) {
      res.json(vacancy);
    } else {
      res.status(404).json({ message: 'Vacancy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a vacancy
// @route   PUT /api/vacancies/:id
// @access  Private/Admin
export const updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (vacancy) {
      Object.assign(vacancy, req.body);
      const updatedVacancy = await vacancy.save();
      res.json(updatedVacancy);
    } else {
      res.status(404).json({ message: 'Vacancy not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a vacancy
// @route   DELETE /api/vacancies/:id
// @access  Private/Admin
export const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (vacancy) {
      await vacancy.deleteOne();
      res.json({ message: 'Vacancy removed' });
    } else {
      res.status(404).json({ message: 'Vacancy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
