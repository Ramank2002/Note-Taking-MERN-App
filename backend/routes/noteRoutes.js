const express = require("express");
const { getNotes, createNote, getNoteById, DeleteNote, UpdateNote } = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect,createNote);

router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);

module.exports = router;
// router.route("/create").post(protect, CreateNote);
// router
//   .route("/:id")
//   .get()
//   .delete()
//   .put();

// router.route('/').get(getNotes);
