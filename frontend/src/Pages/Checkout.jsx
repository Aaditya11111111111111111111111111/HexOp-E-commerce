import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Checkout.css"; 
import { ReactComponent as MailIcon } from "../Components/Assets/mail.svg"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        zipcode: "",
        address: "",
        paymentMethod: "Cash-on-Delivery",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Hide form & show animation

        try {
            const response = await fetch("http://localhost:4000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            setTimeout(() => {
                setIsSubmitting(false); // for showing alert after animation
                if (response.ok) {
                    toast.success("Order placed successfully! Check your email.");
                    setIsFormVisible(true); // for showing the form again after success
                } else {
                    toast.error("Failed to place the order. Try again.");
                }
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while placing the order.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="checkout-container">
            {!isSubmitting ? (
                <>
                    <h2>Checkout</h2>
                    {isFormVisible ? (
                        <>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="zipcode"
                                    placeholder="Zip Code"
                                    value={formData.zipcode}
                                    onChange={handleChange}
                                    required
                                />
                                <textarea
                                    name="address"
                                    placeholder="Full Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                <div className="payment-options">
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="Cash-on-Delivery"
                                            checked={formData.paymentMethod === "Cash-on-Delivery"}
                                            onChange={handleChange}
                                        />
                                        Cash-on-Delivery
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="Online"
                                            checked={formData.paymentMethod === "Online"}
                                            onChange={handleChange}
                                            disabled
                                        />
                                        Online Payment (Currently unavailable)
                                    </label>
                                </div>

                                <button type="submit">Place Order</button>
                            </form>
                            {/* Show the payment unavailability message below the form */}
                            <p className="payment-warning">
                                Online payment method is temporarily unavailable. Please choose Cash-on-Delivery.
                            </p>
                        </>
                    ) : (
                        <div className="success-message">
                            <h3>Your order has been placed successfully!</h3>
                        </div>
                    )}
                </>
            ) : (
                <div className="mail-animation">
                    {/*For adding emails motion in circular path */}
                    <MailIcon className="floating-mail" />
                </div>
            )}

            {/* ToastContainer to display alerts */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Checkout;
