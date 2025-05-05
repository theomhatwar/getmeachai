import connectDb from '@/db/connectDb'
import User from '@/models/User'

export default async function CreatorsPage() {
  // Connect to the database
  await connectDb();

  // Fetch users with their username and image
  const users = await User.find({}, 'username image'); // Only fetch the username and image

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {users.map(user => (
        <a href={`/${user.username}`} key={user._id} className="border p-4 rounded hover:shadow">
          <img
            src={user.image || '/default-avatar.png'} // Use a default avatar if no image exists
            alt={user.username}
            className="w-16 h-16 rounded-full mb-2" // Make it round and of fixed size
          />
          <h2 className="text-lg font-bold">{user.username}</h2> {/* Display the username */}
        </a>
      ))}
    </div>
  );
}
