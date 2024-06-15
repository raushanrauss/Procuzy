
interface Article {
    title: string;
    author: string;
    url: string;
}

interface Props {
    articles: Article[];
}
function ArticleList({ articles }:Props) {
    return (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold px-4 py-2 bg-gray-200">Top 5 Articles</h2>
            <ul className="divide-y divide-gray-200">
                {articles.map((article, index) => (
                    <li key={index} className="px-4 py-3">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                            <span className="text-lg font-semibold">{article.title}</span> - <span className="text-gray-600">{article.author}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;
