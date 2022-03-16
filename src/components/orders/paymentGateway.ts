import { IPaymentGateway } from "./orderPort";
import { PaymentInput } from "./orderDTO";
import Stripe from "stripe";

export class StripePayment implements IPaymentGateway {

    private stripeClient: Stripe

    constructor() {
        this.stripeClient = new Stripe(process.env.STRIPE_SECRET!, {
            apiVersion: "2020-08-27"
        });
    }

    async pay(input: PaymentInput): Promise<string> {
        const { paymentMethodId, payAmount } = input;
        const result = await this.stripeClient.paymentIntents.create({
            amount: payAmount,
            currency: "USD",
            payment_method: paymentMethodId,
            confirm: true
        });
        return result.id;
    }

}