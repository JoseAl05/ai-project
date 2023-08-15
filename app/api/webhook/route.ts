import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

export async function POST(req:Request){
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let stripeEvent: Stripe.Event;

    try {
        stripeEvent = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error:any) {
        return new NextResponse(`Webhook Error: ${error.message}`,{ status: 400 });
    }

    const stripeSession = stripeEvent.data.object as Stripe.Checkout.Session;

    if(stripeEvent.type === 'checkout.session.completed'){
        const subscription = await stripe.subscriptions.retrieve(
            stripeSession.subscription as string,
        );

        if(!stripeSession?.metadata?.userId){
            return new NextResponse('User ID is required',{ status: 400 });
        }

        await prismadb.userSubscription.create({
            data:{
                userId: stripeSession?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            }
        })
    }

    if(stripeEvent.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
            stripeSession.subscription as string,
        );

        await prismadb.userSubscription.update({
            where:{
                stripeSubscriptionId:subscription.id,
            },
            data:{
                stripePriceId:subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                )
            }
        })
    }

    return new NextResponse(null, { status: 200 });
}