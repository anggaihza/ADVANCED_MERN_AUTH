import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verifiction"
        })

        console.log("Email send successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "ce55a341-a478-4945-878e-45b7a70c637c",
            template_variables: {
                template_variables: {
                    "company_info_name": "Auth Company",
                    "name": name
                }
            }
        })

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error)

        throw new Error(`Error sending welcome email: ${error}`)
    }
}