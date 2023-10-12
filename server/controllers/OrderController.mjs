// PurchaseRequisitionController.mjs

import Order from '../models/Order.mjs';

export const addOrder = async (req, res) => {
    const {  purchaseRequisition, supplier } = req.body;

    try {
        const order = await Order.create({
            purchaseRequisition,
            supplier
        });
        console.log({ status: 'Success', order });
        res.json(order);
    } catch (err) {
        console.log({ status: 'Error', err });
    }
}