const Category = require('../models/Category')

const getCategories = async (req, res) => {
    try {
      const categories = await Category.find()
      .populate({
        path: 'subcategories',
        select: 'name', // Only select the name field of the subcategories
      });
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const addCategory = async (req, res) => {
    try{
      Item = new Category({name:req.body.name});
      await Item.save();
      res.status(201).send(Item);
    }catch (err){
      res.status(400).send(err);
    }
  };
  const deleteCategory = async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };

  module.exports = {
    getCategories,
    addCategory,
    deleteCategory,
  }