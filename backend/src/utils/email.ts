export function sendEmail(to: string, subject: string, body: string) {
  // In real app, integrate with email provider
  console.log(`Email to ${to}: ${subject}\n${body}`);
} 