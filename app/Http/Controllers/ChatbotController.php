<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatbotController extends Controller
{
    public function show()
    {
        return Inertia::render('Chatbot', [
            'reply' => null,
        ]);
    }

    public function handle(Request $request)
    {
        $message = trim($request->input('message'));

        $previousMessage = session('previous_message', null);
        $previousReply = session('previous_reply', null);

        // ردود بناءً على كلمات مفتاحية
        if (stripos($message, 'مرحبا') !== false) {
            $reply = 'أهلاً! كيف يمكنني مساعدتك اليوم؟';
        } elseif (stripos($message, 'php') !== false) {
            $reply = 'PHP هي لغة برمجة شائعة لتطوير الويب.';
        } elseif (stripos($message, 'laravel') !== false) {
            $reply = 'لارافيل هو إطار عمل PHP قوي وسهل الاستخدام.';
        } elseif (stripos($message, 'تعليم') !== false) {
            $reply = 'التعليم هو أساس بناء المجتمعات';
        } elseif (stripos($message, 'مدرسة') !== false) {
            $reply = 'المدرسة هي المكان الأول لتلقي العلم';
        } elseif (stripos($message, 'طيران') !== false) {
            $reply = 'الطيران هو أسرع وسيلة للتنقل بين المدن والدول';
        } else {
            $reply = 'عذراً، لست متأكدًا كيف أساعد في هذا.';
        }

        // إذا نفس الرسالة السابقة، نعيد الرد السابق
        if ($previousMessage !== null && mb_strtolower($message) === mb_strtolower($previousMessage)) {
            $reply = $previousReply;
        } else {
            session()->put('previous_message', $message);
            session()->put('previous_reply', $reply);
        }

        return Inertia::render('Chatbot', [
            'reply' => $reply,
        ]);
    }
}
