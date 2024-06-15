import  { useState, ChangeEvent, FormEvent } from 'react';

interface Props {
    onSubmit: (topic: string) => void;
}

function TopicForm({ onSubmit }: Props) {
    const [topic, setTopic] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('Please enter a topic');
            return;
        }
        setError('');
        onSubmit(topic);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTopic(e.target.value);
        setError(''); // Clear error message on change
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <input
                    className={`shadow appearance-none border ${error ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    type="text"
                    value={topic}
                    onChange={handleChange}
                    placeholder="Enter topic..."
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
            <div className="flex items-center justify-center sm:justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default TopicForm;
