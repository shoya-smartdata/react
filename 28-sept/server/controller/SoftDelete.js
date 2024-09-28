
import User from "../Model/User.js";


export const softDeleteUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    user.deletedAt = new Date();
    await user.save();

    res.json({ message: 'User soft deleted successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error soft deleting user', error });
  }
};
