import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendAdminOrderMail = async (order: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER?.trim(),
      pass: process.env.EMAIL_PASS?.trim(),
    },
  });

  const itemsHtml = order.items
    .map(
      (item: any) => `
      <tr style="border-bottom:1px solid #e0e0e0;">
        <td style="padding:8px;">${item.name}</td>
        <td style="padding:8px; text-align:center;">${item.quantity}</td>
        <td style="padding:8px; text-align:right;">₹${item.price}</td>
      </tr>
    `
    )
    .join("");

  const mailOptions = {
    from: `"My Store" <${process.env.EMAIL_USER?.trim()}>`,
    to: process.env.ADMIN_EMAIL?.trim(),
    subject: `🛒 New Order Received (#${order._id})`,
    html: `
    <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background-color:#000; color:#fff; padding:20px; text-align:center;">
        <h1 style="margin:0; font-size:24px;">New Order Received</h1>
      </div>

      <!-- Customer Info -->
      <div style="padding:20px;">
        <h2 style="margin-top:0; color:#555;">Customer Details</h2>
        <p style="margin:4px 0;"><strong>Name:</strong> ${order.address.name}</p>
        <p style="margin:4px 0;"><strong>Phone:</strong> ${order.address.phone}</p>

        <h2 style="color:#555;">Delivery Address</h2>
        <p style="margin:4px 0;">
          ${order.address.street},<br/>
          ${order.address.city} - ${order.address.pincode}
        </p>

        <h2 style="color:#555;">Order Items</h2>
        <table style="width:100%; border-collapse:collapse; margin-top:10px;">
          <thead>
            <tr style="background-color:#f5f5f5; text-align:left;">
              <th style="padding:8px;">Item</th>
              <th style="padding:8px; text-align:center;">Qty</th>
              <th style="padding:8px; text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h2 style="margin-top:20px; color:#555;">Total Amount</h2>
        <p style="font-size:18px; font-weight:bold; margin:4px 0;">₹${order.totalAmount}</p>
      </div>

      <!-- Footer -->
      <div style="background-color:#f5f5f5; text-align:center; padding:15px; font-size:12px; color:#888;">
        &copy; ${new Date().getFullYear()} My Store. All rights reserved.
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order email sent for order #${order._id}`);
  } catch (error) {
    console.error("Failed to send order email:", error);
  }
};
