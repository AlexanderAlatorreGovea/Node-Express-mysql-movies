const express = require("express");
const router = express.Router();
const { User } = require("../models");

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await User.findAll();
  try {
    res.status(200).json({
      status: 'success',
      result: users.length,
      response: {
        data: users
      }
    })
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if(!user) {
      return new Error(`No document found with that ID with status ${404}`)
    }

    res.status(200).json({
      status: 'success',
      response: {
        data: user
      }
    })
  } catch (error) {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).send({
      message: "Please provide your first name, last name and email",
    });
  }

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
    });

    res.status(201).json({
      status: 'success',
      response: {
        data: user
      }
    });

  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error (`No document found with that ID, status ${404}`) 
  }

  try {
    await user.destroy();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return res.status(500).send({
      message:
        error.message ||
        "Some error occurred while deleting this item, please try again.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const { id } = req.params;

  try {
    const user = await User.update(req.body, {
      where: {
        id
      }
    });
    
    if(!user) {
      return res.send({
        message: "No user found"
      })
    }


    res.send(user);
  } catch (error) {
    return res.status(500).send({
      message:
        error.message ||
        "Some error occurred while updating this item, please try again.",
    });
  }
});

module.exports = router;
