const express = require("express");
const router = express.Router();
const Subscriber = require('../models/subscriber')

// List all Subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers) 
  } catch (err){
    res.status(500).json({message: err.message})
  }
});

// Get Subscriber by ID
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber)
});

// Create Subscriber
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
    // subscribeDate: req.body.subscribeDate
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
});
// Update Subscriber by ID
router.patch('/:id', (req, res) => {

})
// Delete Subscriber by ID
router.delete('/:id', getSubscriber, async (req, res) => {
  console.log('delete endpoint triggered');
  console.log('received id: ', req.params.id);
  console.log('subscriber found: ', res.subscriber);
  try {
    await res.subscriber.deleteOne()
    res.json({message: 'Deleted subscriber'})
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({message: 'Cannot find subscriber'})
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
  res.subscriber = subscriber
  next()
}

module.exports = router;
