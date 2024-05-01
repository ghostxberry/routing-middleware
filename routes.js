const express = require("express"); 
const router = new express.Router();
const ExpressError = require("./expressError")
const items = require("./fakeDb")
const Item = require("./item")

router.get('/', (req, res) => {
    res.send({ items })
});

router.post('/', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {

        throw new ExpressError('Name and price are required', 400);
    }
    
    const newItem = new Item(name, price);

    items.push(newItem);

    res.status(201).json({ message: 'Item added successfully', item: newItem });
});

router.get("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404)
    }
    res.json({ item: foundItem })
  })

  router.patch("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    res.json({ item: foundItem })
  })
  

  router.delete("/:name", function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Deleted" })
  })

 module.exports = router;