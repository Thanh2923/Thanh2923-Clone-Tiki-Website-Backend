const userService = require('../services/userService');


const userController = {
   
 getUsers : async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUsersById : async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId)
      const users = await userService.getUsersById(userId);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
 
  createUser : async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
      const newUser = await userService.createUser(data);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
 
  updateUser: async (req, res) => {
    const userId = req.user.id;
    const { name, phone, address, email } = req.body;
  
    try {
      const updateUserData = { name, phone, address };

      if (email) {
        updateUserData.email = email;
      }
  
      const updatedUser = await userService.updateUser(userId, updateUserData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  
 
  deleteUser : async (req, res) => {
    const userId = req.params.id;
    try {
      await userService.deleteUser(userId);
      res.status(200).json({ message: `User with ID ${userId} has been deleted` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
}

module.exports = userController