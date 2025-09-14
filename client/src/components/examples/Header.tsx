import Header from '../Header';

export default function HeaderExample() {
  // Mock user data for demonstration
  const mockUser = {
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@example.com",
    profileImageUrl: null
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading font-semibold mb-4">Logged Out State</h3>
        <Header isAuthenticated={false} />
      </div>
      
      <div>
        <h3 className="font-heading font-semibold mb-4">Logged In State</h3>
        <Header isAuthenticated={true} user={mockUser} />
      </div>
    </div>
  );
}