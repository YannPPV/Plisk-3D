const stripe = require('stripe')(process.env.STRIPE_API);
const basketModel = require('../models/basketsModels');
const userModel = require('../models/usersModels');

const getBasket = async (idUser) => {
  const basket = await basketModel.getBasket(idUser);
  return basket;
};

const createLineItem = async (id, Items = []) => {
  const basket = await getBasket(id);
  basket.forEach((elt) => {
    Items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: elt.name,
        },
        unit_amount: Math.round(elt.price * 100),
      },
      quantity: elt.quantity,
    });
  });
  return Items;
};

const createSession = async (req, res) => {
  try {
    const lineItems = await createLineItem(req.idUser);
    if (lineItems.length !== 0) {
      const email = await userModel.getUserEmailByIdUser(req.idUser);
      const session = await stripe.checkout.sessions.create({
        client_reference_id: req.idUser,
        customer_email: email,
        success_url: `${process.env.FRONT_URL}/succes`,
        cancel_url: `${process.env.FRONT_URL}/cancel`,
        line_items: lineItems,
        mode: 'payment',
      });
      return res.json(session);
    }
    return res.status(400).json({ message: 'le panier est vide' });
  } catch (error) {
    return res.status(500).json({ message: 'une erreur est survenue', error: error.message });
  }
};

const webhook = async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    if (event.type === 'checkout.session.completed') {
      const idUser = event.data.object.client_reference_id;
      // création de la commande de l'utilisateur avec idUser
      console.log("id de l'user :", { idUser });
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(400).json({ message: 'une erreur est survenue', error: error.message });
  }
};

module.exports = {
  createSession,
  webhook,
};
