import  { useState } from 'react';
import './App.css';
import TopicForm from './Components/TopicForm';
import ArticleList from './Components/ArticleList';


function App() {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (topic:string) => {
    setLoading(true);
    const response = await fetch('/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    if (!response.ok) {
      setError('Error occurred while fetching articles');
      setLoading(false);
      return;
    }
    const data = await response.json();
    if (data.articles.length === 0) {
      setError('No articles found for the topic');
      setLoading(false);
      return;
    }
    setArticles(data.articles.slice(0, 5)); // Display top 5 articles
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Medium Scraper</h1>
      <TopicForm onSubmit={handleSubmit} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ArticleList articles={articles} />
    </div>
  );
}

export default App;
