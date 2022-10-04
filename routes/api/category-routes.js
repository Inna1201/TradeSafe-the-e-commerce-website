const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.json(allCategories)
  } catch (err) {
    res.status(500).json(err);
  }
  // Category.findAll({include : [{model: Product }]}).then(dbData => res.json(dbData)).catch(err => res.json(err))
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.json(oneCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, { where: { id: req.params.id } });
    res.json(updatedCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy( { where: { id: req.params.id } });               
    res.json(deleteCategory)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
