const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">Last Updated: March 13, 2026</p>
          </div>

          {/* Intro */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-muted-foreground leading-relaxed space-y-4">
            <p>
              Thank you for using <strong className="text-foreground">Postzest</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). This Privacy Policy explains how we collect, use, and protect your personal and non-personal information when you use our website and services.
            </p>
            <p>
              By accessing or using Postzest, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use our service.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">

            {/* Section 1 */}
            <Section title="1. Information We Collect">
              <SubSection title="1.1 Personal Data">
                <p className="text-muted-foreground mb-3">We may collect the following personal information:</p>
                <ul className="space-y-2">
                  <ListItem label="Name">to personalize your experience and communicate with you.</ListItem>
                  <ListItem label="Email Address">to send account notifications, updates, and support communication.</ListItem>
                  <ListItem label="Payment Information">to securely process subscriptions or purchases (if applicable).</ListItem>
                  <ListItem label="Social Media Authentication Tokens">when you connect your social media accounts to Postzest to enable posting and account management.</ListItem>
                </ul>
              </SubSection>

              <SubSection title="1.2 Non-Personal Data">
                <p className="text-muted-foreground mb-3">
                  We may collect non-personal information using cookies and similar technologies, including:
                </p>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and usage patterns</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  This data helps us improve the performance, security, and usability of our platform.
                </p>
              </SubSection>
            </Section>

            {/* Section 2 */}
            <Section title="2. Purpose of Data Collection">
              <p className="text-muted-foreground mb-3">We collect and use your data for the following purposes:</p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Creating and managing your Postzest account</li>
                <li>Enabling social media integrations and cross-platform posting</li>
                <li>Processing payments and subscriptions</li>
                <li>Providing customer support</li>
                <li>Sending important service updates and notifications</li>
                <li>Improving our platform and user experience</li>
              </ul>
            </Section>

            {/* Section 3 */}
            <Section title="3. Social Media API Integrations">
              <p className="text-muted-foreground mb-4">
                Postzest allows users to connect and manage their social media accounts using official platform APIs. When you connect a social media account, you authorize Postzest to access limited account information necessary for posting and managing content.
              </p>
              <p className="text-muted-foreground mb-3">These platforms may include services such as:</p>
              <div className="flex flex-wrap gap-2">
                {["LinkedIn", "YouTube", "Instagram", "Facebook", "Tik Tok", "Threads", "Bluesky"].map((platform) => (
                  <span
                    key={platform}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mt-4">
                Your interaction with these services is also subject to their respective terms and privacy policies.
              </p>
            </Section>

            {/* Section 4 */}
            <Section title="4. Third-Party Privacy Policies">
              <p className="text-muted-foreground">
                Because Postzest integrates with external platforms, your data may also be processed according to the privacy policies of those services. For example, if you connect a YouTube account, your use of the service will also be governed by the policies of Google and the terms of YouTube.
              </p>
            </Section>

            {/* Section 5 */}
            <Section title="5. Data Sharing">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                <p className="text-foreground font-medium">
                  We do <strong>not sell or rent your personal data</strong> to third parties.
                </p>
              </div>
              <p className="text-muted-foreground mb-3">Your information may only be shared when necessary for:</p>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                <li>Enabling social media posting through connected platforms</li>
                <li>Processing payments through secure payment providers</li>
                <li>Complying with legal obligations</li>
              </ul>
            </Section>

            {/* Section 6 */}
            <Section title="6. Children's Privacy">
              <p className="text-muted-foreground">
                Postzest is not intended for individuals under the age of 13. We do not knowingly collect personal data from children.
              </p>
            </Section>

            {/* Section 7 */}
            <Section title="7. Updates to This Privacy Policy">
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. When we make changes, we will update the <strong className="text-foreground">Last Updated</strong> date and may notify users via email or platform notifications.
              </p>
            </Section>

            {/* Section 8 */}
            <Section title="8. Contact Information">
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or how your data is handled, please contact us at:
              </p>
              <a
                href="mailto:support@postzest.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors"
              >
                support@postzest.com
              </a>
            </Section>

            {/* Section 9 */}
            <Section title="9. Data Protection and Security">
              <p className="text-muted-foreground mb-4">
                We take the protection of your data seriously and implement industry-standard security practices, including:
              </p>
              <ul className="space-y-2">
                <ListItem label="Encryption">OAuth tokens and sensitive data are encrypted both in transit and at rest.</ListItem>
                <ListItem label="Secure Authentication">Access to connected accounts is protected through secure authentication mechanisms.</ListItem>
              </ul>
              <p className="text-muted-foreground mt-4">
                While we strive to protect your information using commercially acceptable means, no system can guarantee absolute security.
              </p>
            </Section>

          </div>

          {/* Footer note */}
          <div className="mt-10 text-center border-t border-border pt-8">
            <p className="text-muted-foreground text-sm">
              By using <strong className="text-foreground">Postzest</strong>, you agree to the terms described in this Privacy Policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─── Helper Components ─────────────────────────────────────── */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card border border-border rounded-2xl p-8">
    <h2 className="text-xl font-semibold text-foreground mb-5">{title}</h2>
    {children}
  </div>
);

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-base font-semibold text-foreground mb-3">{title}</h3>
    {children}
  </div>
);

const ListItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <li className="flex gap-2 text-muted-foreground">
    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
    <span>
      <strong className="text-foreground">{label}</strong> – {children}
    </span>
  </li>
);

export default PrivacyPolicy;