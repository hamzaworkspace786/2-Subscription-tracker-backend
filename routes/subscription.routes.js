import { Router } from 'express'

const subscriptionRouter = new Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));
subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET Subscriptions Details' }));
subscriptionRouter.post('/', (req, res) => res.send({ title: 'Create subscriptions' }));
subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'Update subscriptions' }));
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'Delete subscriptions' }));
subscriptionRouter.get('./users/:id' ,(req, res) => res.send({title : 'Get User Subscriptions'}))
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'Cancel subscription' }));
subscriptionRouter.put('/upcoming-renewals', (req, res) => res.send({ title: 'Get Upcoming subscriptions' }));


export default subscriptionRouter;