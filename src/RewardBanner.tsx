export default function RewardBanner() {
    const rewards = [
      { rank: 'Peringkat 1', prize: 'Free biaya sekolah selama sebulan' },
      { rank: 'Peringkat 2-3', prize: 'Gratis sesuatu (sesuaikan hadiah)' },
      { rank: 'Peringkat 4-7', prize: 'Hadiah gratis buku' },
      { rank: 'Peringkat 8-10', prize: 'Hadiah buku' }
    ];
  
    return (
      <div className="mt-5 bg-gray-800 text-white p-4 sm:p-6 rounded-2xl shadow-lg max-w-md sm:max-w-2xl mx-auto text-center">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">🎉 Hadiah Peringkat 🎉</h2>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
          {rewards.map((reward, index) => (
            <li key={index} className="bg-white text-gray-600 p-2 sm:p-3 rounded-lg shadow-md">
              <strong>{reward.rank}:</strong> {reward.prize}
            </li>
          ))}
        </ul>
      </div>
    );
  }
