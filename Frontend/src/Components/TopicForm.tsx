import  { useState, ChangeEvent, FormEvent } from 'react';
import { useToast, Input, Button } from '@chakra-ui/react';

interface Props {
    onSubmit: (topic: string) => void;
}

function TopicForm({ onSubmit }: Props) {
    const [topic, setTopic] = useState<string>('');
    const toast = useToast();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!topic.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter a topic',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        onSubmit(topic);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTopic(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <Input
                    type="text"
                    value={topic}
                    onChange={handleChange}
                    placeholder="Enter topic..."
                    variant="flushed"
                    isInvalid={!topic.trim()}
                />
            </div>
            <Button
                type="submit"
                colorScheme="blue"
                size="md"
                borderRadius="md"
                _hover={{ bg: 'blue.700' }}
            >
                Search
            </Button>
        </form>
    );
}

export default TopicForm;
