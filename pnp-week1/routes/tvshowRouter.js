const express = require("express");
const tvshowRouter = express.Router();
const TvShow = require("../models/tvshow.js");

// Get All
tvshowRouter.get("/", (req, res, next) => {
  TvShow.find((err, tvshows) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(tvshows);
  });
});

// Post One
tvshowRouter.post("/", (req, res, next) => {
  const newTvShow = new TvShow(req.body);
  newTvShow.save((err, savedTvShow) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedTvShow);
  });
});

// Get One
tvshowRouter.get("/:tvshowId", (req, res, next) => {
  const tvshowId = req.params.tvshowId;
  const foundTvShow = tvshows.find((tvshow) => tvshow._id === tvshowId);
  if (!foundTvShow) {
    const error = new Error(`The item with id ${tvshowId} was not found.`);
    res.status(500);
    return next(error);
  }
  return res.status(200).send(foundTvShow);
});

// Get by genre
tvshowRouter.get("/search/genre", (req, res, next) => {
  const genre = req.query.genre;
  if (!genre) {
    const error = new Error("You must provide a genre");
    res.status(500);
    return next(error);
  }
  const filteredTvShows = tvshows.filter((tvshow) => tvshow.genre === genre);
  return res.status(200).send(filteredTvShows);
});

// Delete One
tvshowRouter.delete("/:tvshowId", (req, res, next) => {
     TvShow.findOneAndDelete({ _id: req.params.tvshowId }, (err, deletedItem) => {
          if(err){
               res.status(500)
               return next(err)
          }
     return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
   })
   })

// Update One
tvshowRouter.put("/:tvShowId", (req, res, next) => {
     TvShow.findOneAndUpdate(
       { _id: req.params.tvShowId },
       req.body,
       { new: true },
       (err, updatedTvShow) => {
         if (err) {
           res.status(500);
           return next(err);
         }
         return res.status(201).send(updatedTvShow);
       }
     );
   });

module.exports = tvshowRouter;
