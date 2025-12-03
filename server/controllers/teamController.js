import Team from '../models/Team.js';

// @desc    Create a new team member
// @route   POST /api/team
// @access  Private/Admin
export const createTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.create(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find().sort({ order: 1, createdAt: -1 });
    res.json({ teamMembers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single team member by ID
// @route   GET /api/team/:id
// @access  Public
export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (teamMember) {
      res.json(teamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (teamMember) {
      Object.assign(teamMember, req.body);
      const updatedTeamMember = await teamMember.save();
      res.json(updatedTeamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (teamMember) {
      await teamMember.deleteOne();
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
