const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please enter a goal")
    }
    const goals = await Goal.create({
        "user": req.user.id,
        "text": req.body.text,
        "completed": req.body.completed
    })

    res.status(201).send({
        message: "Goal Created",
        data: {
            "id": goals.user,
            "user": req.user.name,
            "text": goals.text,
            "completed": goals.completed,
        }
    });
})

const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find({ user: req.user.id });

    res.status(200).send(goals);
});

const updateGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(404)
        throw new Error("Goal not found")
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        res.send(401)
        throw new Error("User not Authorized")
    }
    

    if (goal.user.toString() !== req.user.id) {
        res.send(401)
        throw new Error("User not Authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).send({ message: `Goal ${req.params.id} Updated`, data: updatedGoal });
});

const deleteGoals = asyncHandler(async (req, res) => {

    // const goal = await Goal.findById(req.params.id);
    // if (!goal) {
    //     res.status(404)
    //     throw new Error("Goal not found")
    // }
    // await goal.remove();

    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
        res.status(404)
        throw new Error("Goal not found")
    }
    const user = await User.findById(req.user.id)

    if (!user) {
        res.send(401)
        throw new Error("User not Authorized")
    }
    

    if (goal.user.toString() !== req.user.id) {
        res.send(401)
        throw new Error("User not Authorized")
    }
    res.status(200).send({ message: `Goal ${req.params.id} Deleted` });
});


module.exports = {
    setGoals,
    getGoals,
    updateGoals,
    deleteGoals
}