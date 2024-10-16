const Category = require('../models/Category')
const Subcategory = require('../models/SubCategory')


const addSubcategory = async (req, res) => {
  const { categoryId, name } = req.body;
  try {
      const category = await Category.findById(categoryId);
      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }
      // Create a new subcategory
      const subcategory = new Subcategory({ name });
      await subcategory.save();
      category.subcategories.push(subcategory._id);
      await category.save();
      res.status(201).json(subcategory);
  } catch (error) {
      res.status(500).send("Internal Server Error");
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    try{
      const category = await Category.findOneAndUpdate(
        { subcategories: req.params.id }, 
        { $pull: { subcategories: req.params.id } }, 
        { new: true }
      );
    }catch(error){
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
    addSubcategory,
    deleteSubcategory,
}