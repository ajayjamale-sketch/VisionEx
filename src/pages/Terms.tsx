import { useScrollTop } from '@/hooks/useScrollTop';
import { FileText } from 'lucide-react';

const TERMS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using the VisionEx platform ("Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use the Service. These terms constitute a legally binding agreement between you and VisionEx Inc.',
  },
  {
    title: '2. Platform Access & License',
    content: 'Subject to these terms and payment of applicable fees, VisionEx grants you a limited, non-exclusive, non-transferable license to access and use the Service for your internal business purposes. You may not resell, sublicense, or provide access to the Service to third parties without written consent.',
  },
  {
    title: '3. Acceptable Use',
    content: 'You agree not to: violate any applicable laws or regulations; process visual data without proper consent from identifiable individuals; use the facial recognition features in jurisdictions where prohibited; attempt to reverse engineer the AI models; use the Service for surveillance that violates privacy rights; or introduce malicious code or attempt to breach security.',
  },
  {
    title: '4. Data Ownership & Processing',
    content: 'You retain ownership of all data you submit to the Service ("Customer Data"). You grant VisionEx a limited license to process Customer Data solely to provide the Service. VisionEx will not use Customer Data to train base AI models without explicit written agreement. You are responsible for ensuring you have the right to process any visual data submitted.',
  },
  {
    title: '5. Service Availability & SLA',
    content: 'VisionEx targets 99.9% uptime for Enterprise plans (as defined in applicable SLAs). Starter and Professional plans receive commercially reasonable uptime efforts without formal SLA commitments. Scheduled maintenance will be communicated with at least 48 hours notice where possible.',
  },
  {
    title: '6. Payment & Billing',
    content: 'Subscription fees are billed in advance. Annual plans are non-refundable except as required by law. Overage charges are billed in arrears. Prices may change with 30 days notice. Failure to pay may result in suspension of access. Enterprise contracts are governed by separate order forms.',
  },
  {
    title: '7. Intellectual Property',
    content: 'VisionEx retains all rights, title, and interest in the Service, including all AI models, algorithms, software, and documentation. Nothing in these terms transfers any VisionEx IP to you. You retain ownership of your Customer Data and any custom models trained solely on your data.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'To the maximum extent permitted by law, VisionEx shall not be liable for indirect, incidental, special, or consequential damages. Our total liability arising from or related to these terms shall not exceed the fees paid by you in the 12 months preceding the claim.',
  },
  {
    title: '9. Termination',
    content: 'Either party may terminate this agreement with 30 days written notice. VisionEx may suspend or terminate access immediately for material breach, non-payment, or violation of acceptable use policies. Upon termination, you may export your data within 30 days before it is deleted.',
  },
  {
    title: '10. Governing Law',
    content: 'These terms are governed by the laws of the State of California, United States. Any disputes shall be resolved through binding arbitration in San Francisco, CA, except where prohibited by law. Enterprise customers may negotiate alternative dispute resolution terms.',
  },
];

export default function Terms() {
  useScrollTop();

  return (
    <div className="page-transition min-h-screen bg-background">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-4">
            <FileText className="w-3.5 h-3.5" /> Legal
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Terms of <span className="text-gradient-indigo-cyan">Service</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            Please read these terms carefully before using the VisionEx platform.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: March 1, 2025 · Effective: March 1, 2025</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {TERMS.map(({ title, content }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-heading text-lg font-bold text-foreground mb-3">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border border-indigo-500/20">
            <h3 className="font-heading font-semibold text-foreground mb-2">Questions about these terms?</h3>
            <p className="text-sm text-muted-foreground">Contact our legal team at <strong>legal@visionex.ai</strong>. Enterprise customers can negotiate custom terms through their account manager.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
