import  { useState } from 'react';
import { Spinner, Box, Heading, Center, Alert } from '@chakra-ui/react';
import './App.css';
import TopicForm from './Components/TopicForm';
import ArticleList from './Components/ArticleList';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState([]); // Adjust type according to your Article interface
  const [error, setError] = useState<string>('');

  const handleSubmit = async (topic: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Error occurred while fetching articles');
      }

      const data = await response.json();
      if (data.articles.length === 0) {
        throw new Error('No articles found for the topic');
      }

      setArticles(data.articles.slice(0, 10)); // Display top 5 articles
      setError('');
    } catch (error) {
      setError('Error occurred while fetching articles');
      alert('Error occurred while fetching articles'); // Display error message in an alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="App" bg="gray.100" minHeight="100vh" p={8}>
      <Center>
        <Heading as="h1" size="2xl" mb={8} color="purple.700" fontWeight="extrabold">
          Medium Scraper
        </Heading>
      </Center>

      <Box maxW="5xl" mx="auto" bg="white" rounded="xl" shadow="md" p={8} mb={8}>
        <TopicForm onSubmit={handleSubmit} />
      </Box>

      {loading && (
        <Center>
          <Spinner size="xl" color="purple.700" />
          <Box ml={4}>
            <p className="text-purple-700">Loading...</p>
          </Box>
        </Center>
      )}

      {error && (
        <Center>
          <Alert status="error" maxW="5xl" mt={4} rounded="lg">
            {error}
          </Alert>
        </Center>
      )}

      <Box maxW="5xl" mx="auto" bg="white" rounded="xl" shadow="md" p={8}>
        <ArticleList articles={articles} />
      </Box>
    </Box>
  );
}

export default App;
