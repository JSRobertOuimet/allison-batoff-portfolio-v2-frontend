export function emailTemplate({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>You have a new email!</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #ffffff; font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <!-- Header -->
                <div style="padding: 32px 32px 0 32px;">
                    <h1 style="font-size: 24px; color: #111827; margin: 0 0 32px 0; line-height: 1.2;">
                        You have a new email!
                    </h1>
                </div>
                <!-- Content -->
                <div style="padding: 0 32px 32px 32px;">
                    <!-- Contact Info Card -->
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                        <div style="margin-bottom: 16px;">
                            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em;">Name</p>
                            <p style="margin: 0; font-size: 16px; color: #111827;">${name}</p>
                        </div>
                        <div style="margin-bottom: 16px;">
                            <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.05em;">Email</p>
                            <p style="margin: 0; font-size: 16px; color: #111827;">
                                <a href="mailto:${email}" style="color: #111827; text-decoration: underline; text-decoration-color: #d1d5db; text-underline-offset: 2px;">${email}</a>
                            </p>
                        </div>
                    </div>
                    <!-- Message -->
                    <div style="margin-bottom: 32px;">
                        <h3 style="font-size: 18px; font-weight: 700; color: #111827; margin: 0 0 16px 0;">Message</h3>
                        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; white-space: pre-wrap; font-size: 16px; line-height: 1.6; color: #374151;">${message}</div>
                    </div>
                    <!-- Footer -->
                    <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
                        <p style="margin: 0; font-size: 14px; color: #6b7280; text-align: center;">
                            This message was sent from the contact form on 
                            <a href="https://allisonbatoff.com" style="color: #111827; text-decoration: underline; text-decoration-color: #d1d5db; text-underline-offset: 2px;">allisonbatoff.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
}
