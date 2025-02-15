import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import Navigation from '../components/Navigation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'path' | 'challenge';
  link: string;
}

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const searchContent = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate some results
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: 'Cybersecurity Fundamentals',
            description: 'Master the essential concepts and foundations of cybersecurity',
            type: 'path',
            link: '/cybersecurity-fundamentals'
          },
          {
            id: '2',
            title: 'PowerShell Analysis Challenge',
            description: 'Analyze a suspicious PowerShell command and investigate its role in a system compromise.',
            type: 'challenge',
            link: '/challenges/powershell-logs'
          }
        ].filter(result => 
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );

        setResults(mockResults);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchContent();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navigation darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-4 mb-8">
          <SearchIcon className="w-8 h-8 text-primary-blue" />
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>

        {query && (
          <p className="text-gray-400 mb-8">
            Showing results for "{query}"
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result) => (
              <Link
                key={result.id}
                to={result.link}
                className="block bg-primary-dark/30 rounded-lg p-6 border border-primary-blue/20 hover:border-primary-blue transition"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    result.type === 'path' 
                      ? 'bg-primary-blue/20 text-primary-blue' 
                      : 'bg-primary-red/20 text-primary-red'
                  }`}>
                    {result.type === 'path' ? 'Learning Path' : 'Challenge'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
                <p className="text-gray-400">{result.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No results found for "{query}"</p>
            <p className="text-sm text-gray-500">
              Try searching with different keywords or browse our{' '}
              <Link to="/learning-paths" className="text-primary-blue hover:text-secondary-blue">
                learning paths
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;