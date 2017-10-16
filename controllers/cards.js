const FlashCard = require('../models/card');
const FlashCardSubject = require('../models/subject')

const parseRequestBody = (request, response) => {
  const flashCardData = request.body,
    title = flashCardData.title,
    body = flashCardData.body,
    subject = flashCardData.subject;

  if(!title){return response.status(422).json({ error: 'Please supply a title.'})}
  if(!body){return response.status(422).json({ error: 'Please supply a body.'})}
  if(!subject){return response.status(422).json({ error: 'Please supply a subject.'})}

  return { title, body, subject }
}

exports.create = (req, res, next) => {
  FlashCard.findOneAndUpdate(
    parseRequestBody(req, res),
    parseRequestBody(req, res), // Parse request for card details
    {upsert: true, new: true, runValidators: true }, // { Upsert} adds ^^ if no result in the collection. { new } returns the updated object in the response.
    (error, card) => {
      if(error || !card) return res.status(422).send({ message: "Could not update flash card" })

      // Get or create the card's subject and associate the card to that subject.
      FlashCardSubject.findOneAndUpdate(
        { name: req.body.subject },
        { name: req.body.subject },
        {upsert: true, new: true, runValidators: true},
        (error, subject) => {
          // TODO: There's probably a better way to add the card reference.
          if(!subject.cards.includes(card._id)){
            subject.cards.addToSet(card._id) // Add card reference to the subject's card property
            subject.save() // Update the subject
          }
          res.status(201).json({ card, subject })
        }
      )
    }
  )
};

exports.edit = (req, res, next) => {
  FlashCard.findOneAndUpdate({ _id: req.params.card_id }, parseRequestBody(req, res), { new: true }, (error, card) => {
    if(error) return res.status(422).send({ message: "Could not update flash card" })
    res.status(200).json({ card })
  })
}

exports.getAll = (req, res, next) => {
  FlashCard.find({}, function(err, cards) {
    if(cards.length > 0) cards[0].visible = true
    res.status(200).json({ cards });
  })
}

exports.get = (req, res, next) => {
  FlashCard.findOne({_id: req.params.card_id}, (error, card) =>{
    if(error) return res.status(404).send({error})
    res.status(200).json({ card })
  })
}

exports.filter = (req, res, next) => {
  FlashCard.find({subject: req.params.subject}, (error, cards) => {
    if(error) res.status(404).send({error})
    res.status(200).send({ cards })
  })
}

exports.delete = (req, res, next) => {
  FlashCard.remove({ _id: req.params.card_id }, (error) => {
    if(error) res.status(500).send({error})
    res.status(200).send({card_id: req.params.card_id})
  })
}