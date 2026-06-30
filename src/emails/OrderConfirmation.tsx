import { Html, Head, Body, Container, Heading, Text, Section, Row, Column, Hr } from "@react-email/components";
import { formatPrice } from "@/lib/format";

export function OrderConfirmation({
  orderId, email, lines, totalCents,
}: {
  orderId: string;
  email: string;
  lines: { name: string; quantity: number; lineCents: number }[];
  totalCents: number;
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#fcfcf7", fontFamily: "Arial, sans-serif", color: "#1a1a1a" }}>
        <Container style={{ padding: "24px" }}>
          <Heading style={{ fontWeight: 300 }}>Thank you for your order</Heading>
          <Text>Order {orderId} — a confirmation was sent to {email}.</Text>
          <Hr />
          <Section>
            {lines.map((l, i) => (
              <Row key={i}>
                <Column>{l.name} × {l.quantity}</Column>
                <Column align="right">{formatPrice(l.lineCents)}</Column>
              </Row>
            ))}
          </Section>
          <Hr />
          <Row>
            <Column><Text style={{ fontWeight: 600 }}>Total</Text></Column>
            <Column align="right"><Text style={{ fontWeight: 600 }}>{formatPrice(totalCents)}</Text></Column>
          </Row>
          <Text style={{ fontSize: "12px", color: "#5e5e5e" }}>
            These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
