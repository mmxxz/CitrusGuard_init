import { HelpCircle } from 'lucide-react';

interface Faq {
  question: string;
  answer: string;
}

interface FaqListProps {
  faqs: Faq[];
}

export default function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 pb-4">
          <h3 className="font-medium mb-2 flex items-center">
            <HelpCircle className="w-5 h-5 text-green-600 mr-2" />
            {faq.question}
          </h3>
          <p className="text-gray-600 ml-7">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}