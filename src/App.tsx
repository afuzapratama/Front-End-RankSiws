import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Search, User } from 'lucide-react';
import type { Student } from './types';
import RewardBanner from './RewardBanner';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/students/withTotalScores`);
        if (!response.ok) {
          throw new Error('Failed to fetch students data');
        }
        const data = await response.json();
        // Sort students by points in descending order
        const sortedStudents = data.sort((a: Student, b: Student) => b.points - a.points);
        setStudents(sortedStudents);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case 1:
        return <Medal className="w-8 h-8 text-gray-300" />;
      case 2:
        return <Medal className="w-8 h-8 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-purple-400" />;
    }
  };

  const getRankName = (index: number) => {
    if (index < 3) return "Big Three";
    if (index < 6) return "Elite";
    if (index < 10) return "Champion";
    return "Warrior";
  };

  const filteredStudents = searchTerm
    ? students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : students.slice(0, 10); // Only show top 10 when not searching

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading rankings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Rankings</h2>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://siswa.b-cdn.net/images-removebg-preview.png" alt="Logo Sekolah" className="w-10 h-10" />
            <div>
              <h1 className="text-1xl font-bold text-white">SMK/SMA YAPIM MARELAN</h1>
              <p className="text-gray-400 text-xs">
                Raih poin belajar sebanyak-banyaknya dan tunjukkan semangat juangmu!
              </p>
            </div>
          </div>
          <img src="https://siswa.b-cdn.net/Logo-NATAMA.png" alt="Logo Sekolah" className="w-15 h-7" />
        </div>
      </div>
    </header>
    

      {/* Tambahkan komponen lain di sini */}

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search all students..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <p className="text-gray-400 mt-2 text-sm">
            Showing all matches. Clear search to see top 10 rankings.
          </p>
        )}
      </div>

      {/* Student List */}
      <div className="container mx-auto px-4 pb-8">
        <div className="space-y-6">
          {filteredStudents.map((student) => {
            const globalRank = students.findIndex(s => s.id === student.id);
            return (
              <div
                key={student.id}
                className={`bg-gray-800 rounded-lg p-4 flex items-center justify-between transform transition-all duration-200 hover:bg-gray-750
                  ${globalRank < 3 ? 'scale-105 border-2 border-purple-500 shadow-xl' : ''}
                `}
              >
                {/* Rank Number */}
                <div className={`absolute -left-3 -top-3 w-8 h-8 rounded-full flex items-center justify-center font-bold
                  ${globalRank < 3 ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                  {globalRank + 1}
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {globalRank < 10 ? (
                      <img
                        src={student.image}
                        alt={student.name}
                        className={`w-16 h-16 rounded-full object-cover border-2 
                          ${globalRank < 3 ? 'border-purple-500 w-20 h-20' : 'border-gray-600'}`}
                      />
                    ) : (
                      <div className={`w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center`}>
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2">
                      {getRankIcon(globalRank)}
                    </div>
                  </div>
                  <div>
                    <h2 className={`font-semibold ${globalRank < 3 ? 'text-2xl' : 'text-xl'}`}>
                      {student.name}
                    </h2>
                    <p className={`${globalRank < 3 ? 'text-purple-400' : 'text-gray-400'}`}>
                      {getRankName(globalRank)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${globalRank < 3 ? 'text-3xl text-purple-400' : 'text-2xl text-gray-300'}`}>
                    {student.points}
                  </div>
                  <div className="text-gray-400">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <RewardBanner />
    </div>
  );
}

export default App;