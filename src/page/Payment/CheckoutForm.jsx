/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CheckoutForm.css'
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const CheckoutForm = ({ entryFee }) => {
    const price = parseFloat(entryFee?.entryFee)
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, price])
    console.log(clientSecret);
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe} className=" text-sm md:text-lg btn bg-primary hover:bg-secondary">
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;