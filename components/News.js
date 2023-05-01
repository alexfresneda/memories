export default function News({ article }) {
  return (
    <a href={article.url} target="_blank">
      <div className="flex items-center justify-between space-x-1 px-4 py-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-800">
        <div className="space-y-0.5">
          <h6 className="text-sm font-medium">{article.title}</h6>
          <p className="text-xs text-gray-500">{article.source.name}</p>
        </div>
        <img className="rounded-xl" width="70" src={article.urlToImage} />
      </div>
    </a>
  );
}
