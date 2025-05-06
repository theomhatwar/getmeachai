import connectDb from '@/db/connectDb';
import User from '@/models/User';

export default async function CreatorsPage() {
  await connectDb();

  // Fetch all users with username, profilepic, and email
  const users = await User.find({}, 'username profilepic email');

  // Filter to get only one user per unique email
  const uniqueUsersMap = new Map();
  users.forEach(user => {
    if (!uniqueUsersMap.has(user.email)) {
      uniqueUsersMap.set(user.email, user);
    }
  });

  const uniqueUsers = Array.from(uniqueUsersMap.values());

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {uniqueUsers.map(user => (
        <a
          href={`/${user.username}`}
          key={user._id}
          className="border p-4 rounded hover:shadow text-center"
        >
          <img
            src={user.profilepic || '/default-avatar.png'}
            alt={user.username}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
          />
          <h2 className="text-lg font-bold">{user.username}</h2>
        </a>
      ))}
    </div>
  );
}
