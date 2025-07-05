import React, { useEffect, useState, FormEvent } from 'react'; 
import { useForm, usePage } from '@inertiajs/react';

type MessagePair = {
    message: string;
    reply?: string;
};

export default function Chatbot() {
    const { props } = usePage<any>();
    const { data, setData, post, processing } = useForm({
        message: '',
    });

    const [chatHistory, setChatHistory] = useState<MessagePair[]>([]);
    const latestReply = props.reply;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;

        // أضف رسالة المستخدم فقط بدون الرد
        setChatHistory((prev) => [
            ...prev,
            { message: data.message }
        ]);

        post('/chatbot', {
            onSuccess: () => {
                setData('message', '');
            }
        });
    };

    useEffect(() => {
        // عندما يصل رد جديد، حدّث آخر رسالة بدون رد في التاريخ
        if (
            latestReply &&
            chatHistory.length > 0 &&
            !chatHistory[chatHistory.length - 1].reply
        ) {
            const updatedHistory = [...chatHistory];
            updatedHistory[updatedHistory.length - 1].reply = latestReply;
            setChatHistory(updatedHistory);
        }
    }, [latestReply]);

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-2xl space-y-6">

                {/* سجل المحادثات */}
                <div className="space-y-4">
                    {chatHistory.map((item, index) => (
                        <div key={index} className="space-y-2">
                            {/* رسالة المستخدم */}
                            <div className="bg-[#1e1e1e] p-4 rounded-lg self-end text-right w-fit max-w-full ml-auto">
                                <p className="text-sm text-gray-300">أنت:</p>
                                <p className="text-base">{item.message}</p>
                            </div>

                            {/* الرد */}
                            {item.reply && (
                                <div className="bg-[#1a1a1a] p-4 rounded-lg self-start text-right w-fit max-w-full mr-auto border border-green-500">
                                    <p className="text-sm text-green-400 font-bold">الرد:</p>
                                    <p className="text-base text-white">{item.reply}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* صندوق الإدخال */}
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex items-center gap-2 bg-[#1e1e1e] p-3 rounded-lg border border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
                        <textarea
                            rows={1}
                            className="flex-1 bg-transparent text-white resize-none focus:outline-none"
                            placeholder="اكتب شيئًا..."
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition"
                        >
                            {processing ? '...' : 'إرسال'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
