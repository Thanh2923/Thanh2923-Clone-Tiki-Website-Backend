const { User } = require('../models');
const userService = {
  
    getAllUsers : async () =>{
        try {
            const users = await User.findAll({
              where: {
                flag: true  // Lọc các danh mục có flag = 1
              }
            });
            return users;
          } catch (error) {
            throw new Error('Error fetching users');
          }   
    },

    getUsersById : async (userId) =>{
        
      try {
          const users = await User.findAll({
            where: {
              id: userId,
              flag: true  // Lọc các danh mục có flag = 1
            }
          });
          return users;
        } catch (error) {
          throw new Error('Error fetching users');
        }   
  },

    createUser : async (data) => {
       console.log(data,"data")
        try {
          const newUser = await User.create(data);
          return newUser;
        } catch (error) {
          console.log(error)
          throw new Error('Error creating user');
        }
      },

       updateUser : async (userId, userData) => {
        try {
          const user = await User.findByPk(userId);
          if (!user) {
            throw new Error('User not found');
          }
      
         
      
          await user.update(userData);
          return user;
        } catch (error) {
          throw new Error('Error updating user');
        }
      },
     deleteUser : async (userId) => {
        try {
          const user = await User.findByPk(userId);
          if (!user) {
            throw new Error('User not found');
          }
          user.flag = false;
        await user.save();
          return userId; // Trả về ID của người dùng đã xóa
        } catch (error) {
          throw new Error('Error deleting user');
        }
      },
}

module.exports = userService
