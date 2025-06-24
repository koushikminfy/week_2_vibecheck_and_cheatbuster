const User = require('../models/user.model');
const { z } = require('zod');

// Enhanced validation schema for search by email OR name
const searchUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional()
}).refine(data => data.email || data.name, {
  message: "Either email or name must be provided"
});

const searchUser = async (req, res) => {
  try {
    // Validate input
    const validatedData = searchUserSchema.parse(req.query);
    
    let query = {};
    
    if (validatedData.email) {
      query.email = validatedData.email;
    } else if (validatedData.name) {
      // Search by first name or last name (case-insensitive)
      query.$or = [
        { firstName: { $regex: validatedData.name, $options: 'i' } },
        { lastName: { $regex: validatedData.name, $options: 'i' } }
      ];
    }
    
    const user = await User.findOne(query);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.json({ 
      success: true, 
      user 
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid input', 
        errors: error.errors 
      });
    }
    
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-__v');
    res.json({ 
      success: true, 
      users,
      count: users.length 
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports = {
  searchUser,
  getAllUsers
};