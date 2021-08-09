const express = require("express");
const router = express.Router();
const { User } = require("../models");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      status: 'success',
      result: users.length,
      response: {
        data: users
      }
    })

    return res.send(users);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    return res.send(user);
  } catch (error) {
    console.log("Error: ", err);
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

    return res.send(user);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    await user.destroy();

    return res.send({
      message: "User was deleleted",
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
