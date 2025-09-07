import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="homepage-container">
        <h1 className="homepage-title">Welcome to User & Post Management</h1>
        <p className="homepage-description">
          Manage users and their posts with full CRUD operations
        </p>
        
        <div className="homepage-links">
          <div className="link-card">
            <h2>👥 Users</h2>
            <p>View, create, edit, and delete users</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/users')}
            >
              Go to Users
            </button>
          </div>
          
          <div className="link-card">
            <h2>📝 Posts</h2>
            <p>View, create, edit, and delete posts</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/posts')}
            >
              Go to Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;