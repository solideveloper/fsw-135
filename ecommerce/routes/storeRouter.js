const express = require('express');
const storeRouter = express.Router();
const Inventory = require('../models/inventory.js');


// Get All
storeRouter.get("/", (req, res, next) => {
    Inventory.find((err, items) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

// Post One
storeRouter.post("/", (req, res, next) => {
  const newInventory = new Inventory(req.body)
  newInventory.save((err, savedInventory) => {
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedInventory)
  })
})

// Get One
storeRouter.get("/:inventoryId", (req, res, next) => {
    Inventory.findOne(
        { _id: req.params.inventoryId },
        (err, oneItem) => {
            if(err) {
                res.send(500)
                return next(err)
            }
            return res.status(200).send(oneItem)
        }
    )
})

// Delete One
storeRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
        { _id: req.params.inventoryId }, 
        (err, deletedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.name} from the database.`)
    })
})

// Update One
storeRouter.put("/:inventoryId", (req, res, next) => {
  Inventory.findOneAndUpdate(
      { _id: req.params.inventoryId },
      req.body, 
      { new: true },
      (err, updatedItem) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedItem)
      }
    )
})


module.exports = storeRouter;