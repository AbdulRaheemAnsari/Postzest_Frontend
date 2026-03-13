const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                            Terms of Service
                        </h1>
                        <p className="text-muted-foreground text-sm">Last Updated: March 13, 2026</p>
                    </div>

                    {/* Intro */}
                    <div className="bg-card border border-border rounded-2xl p-8 mb-8 text-muted-foreground leading-relaxed space-y-4">
                        <p>
                            Welcome to <strong className="text-foreground">Postzest</strong>!
                        </p>
                        <p>
                            These Terms of Service (&quot;Terms&quot;) govern your use of the Postzest website and services. By accessing or using our platform, you agree to comply with these Terms. If you do not agree with these Terms, please do not use our services.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-6">

                        {/* Section 1 */}
                        <Section title="1. Description of Postzest">
                            <p className="text-muted-foreground">
                                Postzest is a platform that allows users to manage and publish content across multiple social media platforms from a single dashboard. Users can connect their social media accounts, create posts, and publish or schedule content to multiple platforms.
                            </p>
                        </Section>

                        {/* Section 2 */}
                        <Section title="2. Third-Party Platform Terms">
                            <p className="text-muted-foreground mb-4">
                                Postzest integrates with third-party social media platforms using their official APIs. When you use Postzest to interact with these platforms, you also agree to comply with their respective terms of service.
                            </p>
                            <p className="text-muted-foreground mb-3">These platforms may include:</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["LinkedIn", "YouTube", "Instagram", "Facebook", "X"].map((platform) => (
                                    <span
                                        key={platform}
                                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                                    >
                                        {platform}
                                    </span>
                                ))}
                            </div>
                            <p className="text-muted-foreground">
                                Your use of these services through Postzest is subject to their individual terms and policies.
                            </p>
                        </Section>

                        {/* Section 3 */}
                        <Section title="3. User Data and Privacy">
                            <p className="text-muted-foreground mb-3">
                                To provide our services, we may collect and store user data including:
                            </p>
                            <ul className="space-y-1 text-muted-foreground list-disc list-inside mb-4">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Payment information (if applicable)</li>
                                <li>Social media authentication tokens</li>
                            </ul>
                            <p className="text-muted-foreground">
                                For detailed information on how your data is handled, please review our{" "}
                                <a
                                    href="/privacy-policy"
                                    className="text-primary hover:underline underline-offset-4 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </Section>

                        {/* Section 4 */}
                        <Section title="4. Non-Personal Data Collection">
                            <p className="text-muted-foreground">
                                Postzest uses cookies and similar technologies to collect non-personal information such as browser type, device information, and usage patterns. This data helps us improve the performance and user experience of the platform.
                            </p>
                        </Section>

                        {/* Section 5 */}
                        <Section title="5. Ownership and Content Rights">
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                                <p className="text-foreground font-medium">
                                    Users retain <strong>full ownership</strong> of the content they create and publish through Postzest. Postzest does not claim ownership of your content.
                                </p>
                            </div>
                            <p className="text-muted-foreground">
                                By connecting your social media accounts to Postzest, you grant us limited permission to access and publish content on your behalf through the connected platforms.
                            </p>
                        </Section>

                        {/* Section 6 */}
                        <Section title="6. Refund Policy">
                            <p className="text-muted-foreground mb-4">
                                If Postzest offers paid plans or subscriptions, users may request a refund within{" "}
                                <strong className="text-foreground">24 hours of purchase</strong>.
                            </p>
                            <p className="text-muted-foreground mb-4">
                                To request a refund, please contact:
                            </p>
                            <a
                                href="mailto:support@postzest.com"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors"
                            >
                                support@postzest.com
                            </a>
                            <p className="text-muted-foreground mt-4">
                                Refund requests after this period may not be eligible.
                            </p>
                        </Section>

                        {/* Section 7 */}
                        <Section title="7. Children's Privacy">
                            <p className="text-muted-foreground">
                                Postzest is not intended for individuals under the age of 13. We do not knowingly collect personal data from children.
                            </p>
                        </Section>

                        {/* Section 8 */}
                        <Section title="8. Updates to the Terms">
                            <p className="text-muted-foreground">
                                We may update these Terms from time to time to reflect changes in our services or legal requirements. Users may be notified of significant changes via email or through platform notifications.
                            </p>
                        </Section>

                        {/* Section 9 */}
                        <Section title="9. Governing Law">
                            <p className="text-muted-foreground">
                                These Terms shall be governed and interpreted in accordance with applicable international laws unless otherwise required by local regulations.
                            </p>
                        </Section>

                        {/* Section 10 */}
                        <Section title="10. Contact Information">
                            <p className="text-muted-foreground mb-4">
                                If you have any questions or concerns regarding these Terms of Service, please contact us:
                            </p>
                            <a
                                href="mailto:support@postzest.com"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 font-medium hover:bg-primary/20 transition-colors"
                            >
                                support@postzest.com
                            </a>
                        </Section>

                    </div>

                    {/* Footer note */}
                    <div className="mt-10 text-center border-t border-border pt-8">
                        <p className="text-muted-foreground text-sm">
                            Thank you for using <strong className="text-foreground">Postzest</strong>.
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

export default TermsOfService;
