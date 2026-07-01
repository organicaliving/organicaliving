import { Html, Head, Body, Container, Heading, Text, Section, Hr } from "@react-email/components";

/** Internal notification email for a contact-form submission. */
export function ContactMessage({
  name,
  email,
  topic,
  message,
}: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fcfcf7", fontFamily: "Arial, sans-serif", color: "#1a1a1a" }}>
        <Container style={{ padding: "24px" }}>
          <Heading style={{ fontWeight: 300 }}>New contact message</Heading>
          <Text style={{ margin: "4px 0" }}>
            <strong>Topic:</strong> {topic}
          </Text>
          <Text style={{ margin: "4px 0" }}>
            <strong>From:</strong> {name} &lt;{email}&gt;
          </Text>
          <Hr />
          <Section>
            <Text style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{message}</Text>
          </Section>
          <Hr />
          <Text style={{ fontSize: "12px", color: "#5e5e5e" }}>
            Reply directly to this email to respond to {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
