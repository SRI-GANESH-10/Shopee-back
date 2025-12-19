import Order from "../models/orderModel";
import { sendAdminOrderMail } from "../config/sendAdminOrderMail";

export const createOrder = async (req:any, res:any) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      items: req.body.items,
      address: req.body.address,
      totalAmount: req.body.total,
      paymentMethod: req.body.paymentMethod,
    });

    // ✅ Send email AFTER saving order
    await sendAdminOrderMail(order);

    res.status(201).json({
      success: true,
      orderId: order._id,
    });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
