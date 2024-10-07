const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
	name: String,
});
module.exports = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);