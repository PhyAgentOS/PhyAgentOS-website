import { Quote } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function Testimonials() {
  const t = useT();
const testimonials = [
  { quote: t.testimonials.items[0].quote, author: t.testimonials.items[0].author, role: t.testimonials.items[0].role, avatar: 'H' },
  { quote: t.testimonials.items[1].quote, author: t.testimonials.items[1].author, role: t.testimonials.items[1].role, avatar: 'C' },
  { quote: t.testimonials.items[2].quote, author: t.testimonials.items[2].author, role: t.testimonials.items[2].role, avatar: 'D' },
];
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.testimonials.label}
              title={t.testimonials.title}
              highlight={t.testimonials.highlight}
              description={t.testimonials.description}
            />
          </ScrollReveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group relative h-full p-6 sm:p-8 rounded-3xl bg-brand-bg-secondary border border-brand-border hover:border-brand-accent/30 transition-all duration-500 shadow-card hover:shadow-card-hover overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent/[0.03] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 shadow-glow-soft">
                      <Quote className="w-5 h-5 text-brand-accent" />
                    </div>

                    <p className="text-brand-text-secondary leading-relaxed mb-8 flex-grow text-base">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-6 border-t border-brand-border">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-brand-accent-dark font-display font-bold text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-text">{testimonial.author}</p>
                        <p className="text-xs text-brand-text-tertiary">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
