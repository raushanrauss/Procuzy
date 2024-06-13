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
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={topic}
                onChange={handleChange}
                placeholder="Enter topic..."
            />
            <button type="submit">Search</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default TopicForm;
