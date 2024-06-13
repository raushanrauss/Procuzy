

interface Article {
    title: string;
    author: string;
    url: string;
}

interface Props {
    articles: Article[];
}

function ArticleList({ articles }: Props) {
    return (
        <div>
            <h2>Top 5 Articles</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title} - {article.author}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArticleList;
