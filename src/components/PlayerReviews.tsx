'use client'
import { useState } from 'react';

interface Review {
    content: string;
    author: string;
}

interface PlayerReviewsProps {
    title: string;
    reviews: Review[];
    submitReviewLabel: string;
    nameLabel: string;
    reviewLabel: string;
    submitButtonLabel: string;
}

export default function PlayerReviews({ title, reviews, submitReviewLabel, nameLabel, reviewLabel, submitButtonLabel }: PlayerReviewsProps) {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 这里添加提交评论的逻辑
        console.log('Submitted review:', { name, review });
        setName('');
        setReview('');
    };

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
                <div className="space-y-4">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow">
                            <p className="text-gray-600 mb-4">&ldquo;{review.content}&rdquo;</p>
                            <p className="text-gray-800 font-semibold">- {review.author}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="mt-12 bg-white p-6 rounded-lg shadow">
                    <h3 className="text-2xl font-bold mb-4">{submitReviewLabel}</h3>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">{nameLabel}</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="review" className="block text-gray-700 font-bold mb-2">{reviewLabel}</label>
                        <textarea
                            id="review"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        {submitButtonLabel}
                    </button>
                </form>
            </div>
        </section>
    );
}
