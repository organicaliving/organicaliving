/**
 * Help-center content module — the single data source for all /help routes.
 *
 * Policy specifics that had not been confirmed internally were formerly marked
 * as placeholders so they could be swapped for real commitments before launch.
 * All copy is original and grounded in Organica Living's vitamin/supplement
 * voice. Contact: care@organicaliving.com.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type HelpBlock =
  | { kind: "p"; text: string }
  | { kind: "steps"; items: string[] }
  | { kind: "faq"; items: { q: string; a: string }[] }
  | { kind: "callout"; text: string };

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  blocks: HelpBlock[];
};

export type HelpCategory = {
  slug: string;
  title: string;
  blurb: string;
  icon?: string;
  articles: HelpArticle[];
};

// ---------------------------------------------------------------------------
// Category: orders-shipping
// ---------------------------------------------------------------------------

const ordersShipping: HelpCategory = {
  slug: "orders-shipping",
  title: "Orders & Shipping",
  blurb: "Everything from placing your first order to tracking your package at the door.",
  icon: "📦",
  articles: [
    {
      slug: "placing-an-order",
      title: "How to place an order",
      summary: "A quick walkthrough of the checkout steps on organicaliving.com.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Browse the shop and add your chosen products to the cart.",
            "Click the cart icon in the top-right corner to review your items.",
            "Click 'Checkout' and enter your shipping address.",
            "Choose a shipping method and enter your payment details.",
            "Review your order summary, then click 'Place Order'.",
            "You will receive an order confirmation email within a few minutes.",
          ],
        },
        {
          kind: "p",
          text: "If you do not receive a confirmation email within 30 minutes, check your spam folder or contact us at care@organicaliving.com and we will look into it right away.",
        },
      ],
    },
    {
      slug: "tracking-your-order",
      title: "Tracking your order",
      summary: "Find your tracking number and follow your shipment in real time.",
      blocks: [
        {
          kind: "p",
          text: "Once your order leaves our facility you will receive a shipping confirmation email containing your tracking number and a direct link to the carrier's tracking page. Click that link at any time to see the latest scan updates.",
        },
        {
          kind: "p",
          text: "If you created an account, you can also view live tracking under My Orders → Order Details. Tracking information may take up to 24 hours to appear after the label is generated.",
        },
        {
          kind: "callout",
          text: "Can't find your tracking email? Email care@organicaliving.com with your order number and we will send the tracking link directly.",
        },
      ],
    },
    {
      slug: "shipping-times-and-costs",
      title: "Shipping times & costs",
      summary: "Delivery windows and what you can expect to pay for shipping.",
      blocks: [
        {
          kind: "faq",
          items: [
            {
              q: "How long does standard shipping take?",
              a: "Standard orders typically arrive within 5–7 business days after processing.",
            },
            {
              q: "Is there an expedited option?",
              a: "Expedited shipping (2–3 business days) is available at checkout for an additional fee.",
            },
            {
              q: "Do I qualify for free shipping?",
              a: "Orders over $50 receive free standard shipping — this threshold is also displayed at checkout.",
            },
            {
              q: "How long does order processing take?",
              a: "Most orders are processed and handed to the carrier within 1–2 business days of being placed. Orders placed on weekends or public holidays are processed on the next business day.",
            },
          ],
        },
      ],
    },
    {
      slug: "international-shipping",
      title: "International shipping",
      summary: "What to know about ordering outside the United States.",
      blocks: [
        {
          kind: "p",
          text: "We currently ship to Canada, the United Kingdom, Australia, and select destinations across Europe. International orders may be subject to customs duties, import taxes, and local fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in our shipping rates.",
        },
        {
          kind: "p",
          text: "Delivery times for international shipments vary by destination but generally range from 10–21 business days after dispatch. Customs processing can occasionally extend this window.",
        },
        {
          kind: "callout",
          text: "If your country is not shown as an available destination at checkout, email care@organicaliving.com — we will let you know when your region becomes available.",
        },
      ],
    },
    {
      slug: "changing-or-canceling-an-order",
      title: "Changing or canceling an order",
      summary: "How to modify or cancel before your order ships.",
      blocks: [
        {
          kind: "p",
          text: "Because we process orders quickly, there is a short window to make changes or cancel. If you need to update your shipping address, swap a product, or cancel entirely, contact us at care@organicaliving.com as soon as possible and include your order number in the subject line.",
        },
        {
          kind: "p",
          text: "Once an order has been handed to the carrier we are unable to intercept it. If it has already shipped, please see our returns policy for next steps after delivery.",
        },
        {
          kind: "callout",
          text: "Act fast — email care@organicaliving.com immediately after placing the order for the best chance of making a change.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Category: subscriptions
// ---------------------------------------------------------------------------

const subscriptions: HelpCategory = {
  slug: "subscriptions",
  title: "Subscriptions",
  blurb: "Manage your Subscribe & Save plan — skip, pause, change frequency, or cancel any time.",
  icon: "🔄",
  articles: [
    {
      slug: "how-subscribe-and-save-works",
      title: "How Subscribe & Save works",
      summary: "Get a discount on every order when you subscribe to a recurring delivery.",
      blocks: [
        {
          kind: "p",
          text: "Subscribe & Save lets you lock in a discount on any Organica Living product and receive automatic refills on a schedule that works for you. You choose the delivery frequency at checkout — we handle the rest.",
        },
        {
          kind: "p",
          text: "Your payment method is charged automatically before each renewal. You will receive an email reminder 3–5 days before every billing date so you have time to skip, adjust, or cancel if your needs change.",
        },
        {
          kind: "callout",
          text: "Subscribe & Save members receive a 15% discount on every order, applied automatically at each renewal.",
        },
      ],
    },
    {
      slug: "skip-pause-cancel",
      title: "Skipping, pausing, or canceling",
      summary: "You are never locked in — manage your subscription any time from your account.",
      blocks: [
        {
          kind: "p",
          text: "You have full control over your subscription with no cancellation fees or penalties. All changes can be made from the Subscriptions section of your account dashboard.",
        },
        {
          kind: "steps",
          items: [
            "Sign in to your account at organicaliving.com.",
            "Go to My Account → Subscriptions.",
            "Select the subscription you want to manage.",
            "Choose 'Skip next order', 'Pause', or 'Cancel' and confirm your selection.",
          ],
        },
        {
          kind: "p",
          text: "To avoid being charged for the next cycle, changes must be made at least 24 hours before your next scheduled billing date. If you miss that window, the order will process normally and you can return it under our standard returns policy.",
        },
      ],
    },
    {
      slug: "change-delivery-frequency",
      title: "Changing your delivery frequency",
      summary: "Switch from monthly to every two months (or any other cadence) in your account.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Sign in to your account at organicaliving.com.",
            "Go to My Account → Subscriptions.",
            "Select the subscription you want to adjust.",
            "Click 'Change frequency' and pick the new interval from the dropdown.",
            "Save your selection — your next billing date will update automatically.",
          ],
        },
        {
          kind: "p",
          text: "Available frequencies are every 1, 2, or 3 months. If you need a custom cadence, contact care@organicaliving.com and we will see what we can do.",
        },
      ],
    },
    {
      slug: "subscription-billing-timing",
      title: "Subscription billing & renewal timing",
      summary: "Understand when you are charged and when your order ships.",
      blocks: [
        {
          kind: "faq",
          items: [
            {
              q: "When will my card be charged?",
              a: "Your card is charged on your renewal date, which is set to the same day of the month as your original subscription purchase. You will receive a heads-up email 3–5 days before it processes.",
            },
            {
              q: "When does my order ship after renewal?",
              a: "Subscription renewals are processed and dispatched within 1–2 business days of the billing date.",
            },
            {
              q: "What happens if my payment fails?",
              a: "We will attempt to retry the charge and notify you by email. Please update your payment method in My Account → Payment Methods to avoid a gap in your supply.",
            },
          ],
        },
      ],
    },
    {
      slug: "subscription-discount",
      title: "Your subscription discount",
      summary: "How much you save and where the discount applies.",
      blocks: [
        {
          kind: "p",
          text: "The Subscribe & Save discount applies to the product's regular price and is shown clearly at checkout and on the subscription confirmation email. The discount is applied to every recurring order for as long as the subscription remains active.",
        },
        {
          kind: "p",
          text: "Subscribe & Save members receive a 15% discount on every recurring order. Promotional codes cannot typically be stacked with the subscription discount unless a promotion explicitly states otherwise.",
        },
        {
          kind: "callout",
          text: "Your discount is locked in for the life of your subscription — it does not change even if the regular price changes.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Category: returns-refunds
// ---------------------------------------------------------------------------

const returnsRefunds: HelpCategory = {
  slug: "returns-refunds",
  title: "Returns & Refunds",
  blurb: "Our hassle-free policy and how to start a return or get help with a wrong or damaged item.",
  icon: "↩️",
  articles: [
    {
      slug: "return-policy",
      title: "Our return policy",
      summary: "What is covered, what is not, and the time window for returns.",
      blocks: [
        {
          kind: "p",
          text: "We want you to be completely satisfied with every order. If you are not happy with your purchase for any reason, you may return it within 30 days of the delivery date for a full refund.",
        },
        {
          kind: "p",
          text: "To be eligible for a return, the product must be unused and in original packaging (opened only if defective or damaged). For hygiene reasons, opened products may only be returned if they are defective or damaged.",
        },
        {
          kind: "callout",
          text: "Subscription orders follow the same policy. If you forgot to skip and received an unwanted renewal, contact us within 30 days and we will make it right.",
        },
      ],
    },
    {
      slug: "how-to-start-a-return",
      title: "How to start a return",
      summary: "Step-by-step instructions for initiating a return.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Email care@organicaliving.com with subject line 'Return Request — Order #[your order number]'.",
            "Include your reason for returning and whether you would like a refund or an exchange.",
            "Our team will respond within 1–2 business days with a return authorisation and shipping instructions.",
            "Pack the item securely and attach the return label (or ship to the address provided).",
            "Once we receive and inspect the return, we will process your refund or ship your replacement.",
          ],
        },
        {
          kind: "p",
          text: "Please do not ship items back before receiving return authorisation — unrequested returns cannot be tracked and may be lost.",
        },
      ],
    },
    {
      slug: "refund-timing",
      title: "How long does a refund take?",
      summary: "Timelines for getting your money back after a return is processed.",
      blocks: [
        {
          kind: "p",
          text: "Once we receive your returned item and confirm it meets the return criteria, your refund will be processed within 3–5 business days. The refund is issued to the original payment method used at checkout.",
        },
        {
          kind: "p",
          text: "After we issue the refund, your bank or card provider may take an additional 3–10 business days to post the credit to your account, depending on their processing times.",
        },
        {
          kind: "callout",
          text: "If it has been more than 15 business days since we confirmed your return and you have not seen the refund, email care@organicaliving.com with your order number and we will investigate.",
        },
      ],
    },
    {
      slug: "damaged-or-wrong-item",
      title: "Received a damaged or wrong item?",
      summary: "What to do if your order arrives damaged or contains the wrong product.",
      blocks: [
        {
          kind: "p",
          text: "We are sorry about that — it should not happen, and we will fix it promptly. Please email care@organicaliving.com within 14 days of delivery with your order number and a photo of the damage or the wrong item.",
        },
        {
          kind: "p",
          text: "We will either reship the correct item at no charge or issue a full refund, whichever you prefer. You will not need to return a damaged product.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Category: products-usage
// ---------------------------------------------------------------------------

const productsUsage: HelpCategory = {
  slug: "products-usage",
  title: "Products & Usage",
  blurb: "Directions, timing, storage, allergens, certifications, and safety guidance for every formula.",
  icon: "💊",
  articles: [
    {
      slug: "how-to-take-each-formula",
      title: "Directions for each formula",
      summary: "Serving sizes and how to take every Organica Living product.",
      blocks: [
        {
          kind: "faq",
          items: [
            {
              q: "Optimus D3 (adult)",
              a: "Take 1 enteric-coated softgel daily with a meal. The lemon-infused coating eliminates aftertaste and aids absorption.",
            },
            {
              q: "Optimus D3 Mini (kids)",
              a: "Give 1 orange bear-shaped gummy daily. Suitable for children — always follow the age guidance on the label.",
            },
            {
              q: "Omega 1000",
              a: "Take 1 enteric-coated softgel daily with food. The enteric coating bypasses stomach acid to support optimal absorption and prevent fishy burps.",
            },
            {
              q: "Multi Pro",
              a: "Take 1 capsule daily with a meal. The colorful granules inside are sustained-release for steady nutrient uptake throughout the day.",
            },
            {
              q: "Bloom (prenatal)",
              a: "Take 1 strawberry gummy daily. Contains L-5-Methyltetrahydrofolate (bioactive folate), Choline, and 260mg Omega-3 DHA. Consult your healthcare provider before and during use.",
            },
            {
              q: "Sleep Pro+",
              a: "Take the directed serving 30–60 minutes before bedtime. Do not drive or operate heavy machinery after taking.",
            },
            {
              q: "Glow Pro",
              a: "Take the directed serving daily with water, preferably with a meal.",
            },
            {
              q: "Meno Pro",
              a: "Take the directed serving daily. Results from phyto-estrogen formulas are typically experienced gradually over several weeks of consistent use.",
            },
            {
              q: "Vision Pro",
              a: "Take the directed serving daily with a meal.",
            },
          ],
        },
        {
          kind: "callout",
          text: "Always follow the directions printed on your product's label. The directions above are a general guide and may be superseded by the label.",
        },
      ],
    },
    {
      slug: "timing-and-best-practices",
      title: "Timing & best practices",
      summary: "When to take vitamins for the best experience.",
      blocks: [
        {
          kind: "p",
          text: "Most Organica Living formulas are best taken with food, which supports absorption and minimises the chance of an unsettled stomach. Fat-soluble vitamins — D3 and Omega-3 — absorb best alongside a meal that contains some dietary fat.",
        },
        {
          kind: "p",
          text: "Consistency matters more than perfect timing. Taking your supplement at the same time each day (breakfast, lunch, or dinner) makes it easier to build a lasting habit. If you miss a day, simply resume your normal schedule the next day — do not double up.",
        },
        {
          kind: "p",
          text: "Sleep Pro+ is the exception: take it in the evening, 30–60 minutes before you intend to sleep, and avoid driving or operating machinery afterwards.",
        },
      ],
    },
    {
      slug: "storage-and-shelf-life",
      title: "Storage & shelf life",
      summary: "How to store your supplements to keep them effective.",
      blocks: [
        {
          kind: "p",
          text: "Store all Organica Living products in a cool, dry place away from direct sunlight and out of reach of children. A bathroom cabinet is convenient but can be humid — a kitchen cupboard or bedside drawer typically works better.",
        },
        {
          kind: "p",
          text: "Our vitamins and supplements do not need to be refrigerated. The 'Best By' date is printed on the bottom of each bottle. For best results, use the product before this date.",
        },
        {
          kind: "callout",
          text: "If your product changes color, smell, or texture before the Best By date, stop using it and contact care@organicaliving.com.",
        },
      ],
    },
    {
      slug: "allergens-and-certifications",
      title: "Allergens & certifications",
      summary: "What is (and is not) in our formulas, and our certification marks.",
      blocks: [
        {
          kind: "p",
          text: "All Organica Living products are 100% Vegan Certified and gelatin-free. Capsule shells and gummy bases use plant-derived alternatives (vegan capsules, pectin-based gummies) — no animal by-products. Formulas are also Non-GMO verified and gluten-free.",
        },
        {
          kind: "p",
          text: "Omega 1000 is sourced from Halal-permitted fish with scales — salmon, sardines, and mackerel. It excludes shellfish and bottom-feeders. The Halal Certified mark applies across the full range.",
        },
        {
          kind: "p",
          text: "Every batch is manufactured in an FDA-registered, cGMP-certified facility and independently third-party tested for purity, potency, and label accuracy before it ships.",
        },
        {
          kind: "callout",
          text: "If you have a specific allergen concern not addressed above, email care@organicaliving.com with the product name and we will share the full allergen disclosure for that formula.",
        },
      ],
    },
    {
      slug: "safety-and-fda-disclaimer",
      title: "Safety, health claims & FDA disclaimer",
      summary: "Important context on supplement use and regulatory status.",
      blocks: [
        {
          kind: "callout",
          text: "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.",
        },
        {
          kind: "p",
          text: "Organica Living products are dietary supplements — they are designed to support a balanced diet and healthy lifestyle, not to replace them. Food supplements should not be used as a substitute for a varied diet.",
        },
        {
          kind: "p",
          text: "If you are taking prescription medications, have a diagnosed health condition, or are under the care of a physician, please consult your healthcare provider before starting any new supplement. Supplements can interact with medications, and your doctor is best placed to advise based on your individual health picture.",
        },
        {
          kind: "p",
          text: "Do not exceed the recommended serving size printed on the label. More is not always better when it comes to vitamins and minerals — staying within the directed amount is the safest approach.",
        },
      ],
    },
    {
      slug: "pregnancy-and-children",
      title: "Pregnancy, breastfeeding & children",
      summary: "Guidance for parents-to-be and little ones.",
      blocks: [
        {
          kind: "p",
          text: "Bloom is our dedicated prenatal formula, providing bioactive folate (L-5-Methyltetrahydrofolate), Choline, Iron, and 260mg Omega-3 DHA in a strawberry gummy designed to support pre-conception, pregnancy, and breastfeeding. Always consult your midwife or OB-GYN before starting Bloom or any supplement during pregnancy.",
        },
        {
          kind: "p",
          text: "Optimus D3 Mini is formulated for children, providing a child-appropriate blend of nine nutrients in an orange bear-shaped gummy. Adult formulas are not recommended for children unless the label specifically states suitability for that age group.",
        },
        {
          kind: "callout",
          text: "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Always seek professional medical advice for health decisions during pregnancy and for children.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Category: account-payments
// ---------------------------------------------------------------------------

const accountPayments: HelpCategory = {
  slug: "account-payments",
  title: "Account & Payments",
  blurb: "Sign in help, password resets, payment methods, and keeping your account details up to date.",
  icon: "👤",
  articles: [
    {
      slug: "signing-in",
      title: "Signing in to your account",
      summary: "How to log in and what to do if you cannot access your account.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Go to organicaliving.com and click 'Sign In' in the top-right corner.",
            "Enter the email address and password you used when creating your account.",
            "Click 'Sign In'. You will be taken to your account dashboard.",
          ],
        },
        {
          kind: "p",
          text: "If the 'Sign In' button does not appear, you may already be signed in — look for your name or account icon in the navigation. If you checked out as a guest you will need to create an account before you can sign in.",
        },
        {
          kind: "callout",
          text: "Problems signing in? Email care@organicaliving.com with the email address on your account and we will help you regain access.",
        },
      ],
    },
    {
      slug: "reset-password",
      title: "Resetting your password",
      summary: "How to recover access if you have forgotten your password.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Go to the Sign In page and click 'Forgot password?'.",
            "Enter the email address associated with your account and click 'Send reset link'.",
            "Check your inbox (and spam folder) for an email from Organica Living.",
            "Click the reset link in the email — it will take you to a page where you can choose a new password.",
            "Enter and confirm your new password, then click 'Save'. You will be signed in automatically.",
          ],
        },
        {
          kind: "p",
          text: "Reset links expire after 60 minutes. If yours has expired, simply request a new one. If the email never arrives, check your spam folder or contact care@organicaliving.com.",
        },
      ],
    },
    {
      slug: "update-payment-method",
      title: "Updating your payment method",
      summary: "Add a new card or change the card on file for future orders and subscriptions.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Sign in to your account at organicaliving.com.",
            "Go to My Account → Payment Methods.",
            "Click 'Add payment method' and enter your new card details.",
            "Mark the new card as your default if you would like it used for future orders and subscription renewals.",
            "Optionally remove the old card once the new one is saved.",
          ],
        },
        {
          kind: "callout",
          text: "Update your payment method before your next subscription billing date to avoid failed renewals.",
        },
      ],
    },
    {
      slug: "update-address",
      title: "Updating your shipping address",
      summary: "Change your default delivery address or edit an address before an order ships.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Sign in and go to My Account → Addresses.",
            "Click 'Edit' next to the address you want to change, or 'Add new address' to save an additional one.",
            "Update the fields and click 'Save'.",
          ],
        },
        {
          kind: "p",
          text: "Address changes in your account apply to future orders only. To change the address on an order that has already been placed but not yet shipped, email care@organicaliving.com immediately with your order number.",
        },
      ],
    },
    {
      slug: "accepted-payment-methods",
      title: "Accepted payment methods",
      summary: "What payment types we accept at checkout.",
      blocks: [
        {
          kind: "p",
          text: "We accept all major credit and debit cards — Visa, Mastercard, American Express, and Discover — as well as digital wallets including Apple Pay and Google Pay on compatible devices and browsers.",
        },
        {
          kind: "p",
          text: "All transactions are processed securely. Card details are never stored on our servers — payments are handled by our PCI-compliant payment processor.",
        },
        {
          kind: "callout",
          text: "If your preferred payment method is not listed, email care@organicaliving.com and we will let you know if support is planned.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Category: about-contact
// ---------------------------------------------------------------------------

const aboutContact: HelpCategory = {
  slug: "about-contact",
  title: "About Us & Contact",
  blurb: "Our story, certifications, how to get in touch, and pointers for practitioners, press, and wholesale.",
  icon: "🌿",
  articles: [
    {
      slug: "who-we-are",
      title: "Who we are",
      summary: "The Organica Living story and what drives our formulas.",
      blocks: [
        {
          kind: "p",
          text: "Organica Living is a vitamin and supplement brand based in Atlanta, GA. Our tagline — 'nature is our thing' — sums up how we think about nutrition: powerful, plant-forward formulas that are transparent about every ingredient, grounded in research, and manufactured to the highest standards.",
        },
        {
          kind: "p",
          text: "We have been formulating since 2016, and every product we make is manufactured in the United States in an FDA-registered, cGMP-certified facility. We believe you should know exactly what you are taking and why.",
        },
        {
          kind: "p",
          text: "Our range spans daily essentials (Optimus D3, Omega 1000, Multi Pro), life-stage formulas (Bloom prenatal, Meno Pro, Optimus D3 Mini for kids), and targeted wellness (Sleep Pro+, Glow Pro, Vision Pro). All are 100% Vegan Certified, Halal Certified, Non-GMO verified, and third-party tested.",
        },
      ],
    },
    {
      slug: "certifications-and-testing",
      title: "Certifications & quality testing",
      summary: "The marks behind every Organica Living product and how we earn them.",
      blocks: [
        {
          kind: "p",
          text: "Every Organica Living formula carries a set of certifications we are proud to hold: 100% Vegan Certified, Halal Certified, Non-GMO Verified, Gluten-Free, and manufactured under cGMP (Current Good Manufacturing Practice) guidelines. Our facility is also FDA-registered, CE Marked, ISO Certified, and HACCP Certified.",
        },
        {
          kind: "p",
          text: "Third-party testing is not optional for us — every batch is independently tested for purity (heavy metals, microbes, contaminants), potency (active levels match the label), and label accuracy (allergens and certifications are verified, not assumed). You can ask care@organicaliving.com for batch-specific Certificates of Analysis.",
        },
      ],
    },
    {
      slug: "how-to-reach-us",
      title: "How to reach us",
      summary: "Contact options and what to expect when you get in touch.",
      blocks: [
        {
          kind: "p",
          text: "The fastest way to reach the Organica Living team is by email: care@organicaliving.com. We aim to respond to all enquiries within 1–2 business days.",
        },
        {
          kind: "p",
          text: "When you email us, include your order number (if relevant), the product name, and as much detail as possible — this helps us resolve your question in a single reply rather than back-and-forth exchanges.",
        },
        {
          kind: "callout",
          text: "We do not operate a live chat or phone line at this time. Email care@organicaliving.com for the quickest response.",
        },
      ],
    },
    {
      slug: "practitioner-press-wholesale",
      title: "Practitioners, press & wholesale",
      summary: "How to enquire about professional, media, or bulk purchase opportunities.",
      blocks: [
        {
          kind: "p",
          text: "Healthcare practitioners interested in recommending or stocking Organica Living products are welcome to reach out to us at care@organicaliving.com with the subject line 'Practitioner Enquiry'. We will share current practitioner program details if available.",
        },
        {
          kind: "p",
          text: "Members of the media and content creators seeking product information, samples, or interview requests can email care@organicaliving.com with the subject line 'Press Enquiry'.",
        },
        {
          kind: "p",
          text: "Wholesale and retail partnership enquiries should be sent to care@organicaliving.com with the subject line 'Wholesale Enquiry'. Please include your business name, location, and the products you are interested in carrying.",
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Master list
// ---------------------------------------------------------------------------

export const HELP_CATEGORIES: HelpCategory[] = [
  ordersShipping,
  subscriptions,
  returnsRefunds,
  productsUsage,
  accountPayments,
  aboutContact,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getCategory(slug: string): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug);
}

export function getArticle(
  cat: string,
  art: string,
): { category: HelpCategory; article: HelpArticle } | undefined {
  const category = getCategory(cat);
  if (!category) return undefined;
  const article = category.articles.find((a) => a.slug === art);
  if (!article) return undefined;
  return { category, article };
}

export function allArticleParams(): { category: string; article: string }[] {
  return HELP_CATEGORIES.flatMap((c) =>
    c.articles.map((a) => ({ category: c.slug, article: a.slug })),
  );
}
