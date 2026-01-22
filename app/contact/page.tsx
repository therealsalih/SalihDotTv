import { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for project inquiries and collaborations.',
};

const contactInfo = [
  {
    label: 'Email',
    value: 'hello@motion.design',
    href: 'mailto:hello@motion.design',
  },
  {
    label: 'Location',
    value: 'Los Angeles, CA',
    href: null,
  },
  {
    label: 'Availability',
    value: 'Open for projects',
    href: null,
  },
];

const socialLinks = [
  { label: 'Vimeo', href: 'https://vimeo.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
];

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="py-12 md:py-20">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <AnimatedText text="Let's Talk" />
          </h1>
          <p className="text-xl text-muted max-w-2xl">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing together.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <section>
            <ContactForm />
          </section>

          {/* Contact Info */}
          <section className="space-y-12">
            {/* Info */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                Contact Info
              </h2>
              <dl className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm text-muted mb-1">{item.label}</dt>
                    <dd>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground hover:text-accent transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-foreground">{item.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Social */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                Follow Me
              </h2>
              <ul className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-full text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6">
                FAQ
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">What's your typical process?</h3>
                  <p className="text-muted text-sm">
                    I start with understanding your goals, then move through
                    concept, storyboarding, design, animation, and final delivery.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">What are your rates?</h3>
                  <p className="text-muted text-sm">
                    Rates vary based on project scope. Get in touch with details
                    about your project for a custom quote.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">What's your availability?</h3>
                  <p className="text-muted text-sm">
                    I'm currently accepting new projects. Lead times vary based on
                    project complexity.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
