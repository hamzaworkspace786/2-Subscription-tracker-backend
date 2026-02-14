import dayjs from 'dayjs';
import { serve } from "@upstash/workflow/express"; // ✅ Standard ESM import
import Subscription from '../models/subscription.model.js';
// import { sendReminderEmail } from '../utils/send-email.js'

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    // 1. Check if subscription exists and is active
    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    // 2. Stop if renewal date has already passed
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    // 3. Loop through reminders (7 days before, 5 days before, etc.)
    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        // Logic:
        // If the reminder date is in the future, we sleep until then.
        // Once we wake up (or if the date is today), we trigger the email.

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        // ✅ FIX: Removed the strictly "isSame" check.
        // If we passed the sleep above, or if the date is today, we trigger the reminder.
        // We just verify we haven't missed it by weeks (optional, but good safety).
        if (dayjs().isAfter(reminderDate.subtract(1, 'day'))) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
    }
});

// --- HELPER FUNCTIONS ---

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date.toString()}`);
    await context.sleepUntil(label, date.toDate());
};

// ✅ FIX: Added 'subscription' to arguments
const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        // Uncomment when ready
        // await sendReminderEmail({
        //     to: subscription.user.email,
        //     type: label,
        //     subscription,
        // });
    });
};