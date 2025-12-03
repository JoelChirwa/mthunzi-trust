import Partner from '../models/Partner.js';
import Blog from '../models/Blog.js';
import Team from '../models/Team.js';
import Vacancy from '../models/Vacancy.js';

// @desc    Get dashboard stats
// @route   GET /api/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const partnersCount = await Partner.countDocuments();
    const blogsCount = await Blog.countDocuments();
    const teamCount = await Team.countDocuments();
    const vacanciesCount = await Vacancy.countDocuments();

    res.json({
      partners: partnersCount,
      blogs: blogsCount,
      team: teamCount,
      vacancies: vacanciesCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
