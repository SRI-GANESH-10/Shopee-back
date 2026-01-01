import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAdminOrderMail = async (order: any) => {
  try {
    await resend.emails.send({
      from: "My Store <orders@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `🛒 New Order (#${order._id})`,
      html: `
        <h2>New Order Received</h2>
        <p><b>Name:</b> ${order.address.name}</p>
        <p><b>Phone:</b> ${order.address.phone}</p>
        <p><b>Total:</b> ₹${order.totalAmount}</p>
      `,
    });

    console.log("✅ Email sent via Resend");
  } catch (error) {
    console.error("❌ Resend email failed:", error);
  }
};
