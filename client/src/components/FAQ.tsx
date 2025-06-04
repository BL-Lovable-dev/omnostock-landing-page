import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "When will OmnoStock be available?",
      answer: "We're in stealth mode and launching soon. Early access subscribers will be the first to know and get priority access to the platform."
    },
    {
      question: "Who is this built for?",
      answer: "OmnoStock is designed for modern operators, global brands, and VC-backed companies who need inventory management that scales with their ambitions."
    },
    {
      question: "What makes this different?",
      answer: "Built by operators who've managed 500M+ SKUs at scale. We understand the real pain points and have designed a solution that thinks globally from day one."
    },
    {
      question: "Will there be integrations?",
      answer: "Absolutely. We're building with a global, integration-first approach. Modern brands use best-in-class tools, and OmnoStock will connect seamlessly with your existing stack."
    },
    {
      question: "Is this enterprise-ready?",
      answer: "Yes. While we're launching with a focus on growth-stage companies, the platform is built to handle enterprise-scale inventory complexity from the ground up."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Questions? We've got <span className="gradient-text-accent">answers</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about OmnoStock and what we're building.
          </p>
        </div>

        <div className="glass-effect-strong rounded-2xl p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200/50 rounded-xl px-6 hover-glow transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <div className="inline-flex items-center gap-4">
            <span className="text-sm text-slate-500">Reach out on</span>
            <div className="flex items-center gap-3">
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium">
                LinkedIn
              </a>
              <span className="text-slate-300">•</span>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;