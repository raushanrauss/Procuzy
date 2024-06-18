import React, { useState } from 'react';

interface Article {
    title: string;
    author: string;
    url: string;
    publishedDate: string;
}

interface Props {
    articles: Article[];
}

const ArticleList: React.FC<Props> = ({ articles }) => {
   
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;


    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
 
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold px-4 py-2 bg-gray-200">{currentPage<2 ? "Top 5 Articles" :"Articles"}</h2>
            <ul className="divide-y divide-gray-200">
                {currentArticles.map((article, index) => (
                    <li key={index} className="px-4 py-3">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="block text-black-600 hover:no-underline">
                            <span className="text-lg font-semibold">{article.title}</span> - <span className="text-gray-600">{article.author}</span> <br />
                            <span>{article.publishedDate}</span>
                        </a>
                    </li>
                ))}
            </ul>
          
          { currentArticles.length > 0 && <div className="flex justify-center space-x-2 py-4">
               
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-200 px-3 py-1 rounded-md"
                >
                    Previous
                </button>
           
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastArticle >= articles.length}
                    className="bg-gray-200 px-3 py-1 rounded-md"
                >
                    Next
                </button>
            </div> } 
        </div>
    );
};

export default ArticleList;
