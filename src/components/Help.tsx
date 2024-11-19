import { HelpCircle, Book, MessageCircle, ExternalLink } from 'lucide-react';

export default function Help() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">帮助与支持</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Book className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold">使用文档</h2>
          </div>
          <p className="text-gray-600 mb-4">
            查看详细的使用指南，了解如何更好地使用 CitrusGuard。
          </p>
          <a href="#" className="text-green-600 hover:text-green-700 flex items-center">
            查看文档
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-lg font-semibold">联系支持</h2>
          </div>
          <p className="text-gray-600 mb-4">
            需要帮助？我们的支持团队随时为您服务。
          </p>
          <a href="#" className="text-green-600 hover:text-green-700 flex items-center">
            联系我们
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">常见问题</h2>
        <div className="space-y-4">
          {[
            {
              question: "病害检测的准确率如何？",
              answer: "我们的 AI 模型在提供清晰图片的情况下，对常见柑橘病害的识别准确率可达 90% 以上。"
            },
            {
              question: "对图片质量有什么要求？",
              answer: "为获得最佳效果，请使用光线充足、对焦清晰的图片，并确保病害部位清晰可见。从多个角度拍摄可以提高识别准确率。"
            },
            {
              question: "可以离线使用吗？",
              answer: "基础功能支持离线使用，但病害检测需要网络连接以确保分析准确性。"
            },
            {
              question: "如何提高检测准确率？",
              answer: "1. 确保拍摄光线充足\n2. 对准病害部位\n3. 保持相机稳定清晰\n4. 提供多个角度的图片"
            },
            {
              question: "支持哪些病害类型？",
              answer: "目前支持检测常见的柑橘病害，包括黄龙病、溃疡病、疮痂病等，以及主要的虫害和营养缺乏症状。"
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="font-medium mb-2 flex items-center">
                <HelpCircle className="w-5 h-5 text-green-600 mr-2" />
                {faq.question}
              </h3>
              <p className="text-gray-600 ml-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}