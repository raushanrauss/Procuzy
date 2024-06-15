import { useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import './App.css';
import TopicForm from './Components/TopicForm';
import ArticleList from './Components/ArticleList';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (topic: string) => {
    setLoading(true);
    try {
      const response = await fetch('/scrape', {
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

      setArticles(data.articles.slice(0, 5)); // Display top 5 articles
      setError('');
    } catch (error) {
      setError(error.message);
      alert(error.message); // Display error message in an alert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8">Medium Scraper</h1>

      <TopicForm onSubmit={handleSubmit} />
      {loading && (
        <div className="flex items-center justify-center">
          <Spinner size="xl" color="purple.700" />
          <p className="text-purple-700 ml-4">Loading...</p>
        </div>
      )}
      {error && !loading }
      <ArticleList articles={articles} />
    </div>
  );
}

export default App;
