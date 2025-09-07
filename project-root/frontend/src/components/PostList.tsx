import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post, CreatePostData, User } from '../types';
import { postApi, userApi } from '../services/api';
import './PostList.css';

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<CreatePostData>({
    userId: 1,
    title: '',
    body: '',
  });

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [postsData, usersData] = await Promise.all([
        postApi.getAll(),
        userApi.getAll()
      ]);
      setPosts(postsData);
      setUsers(usersData);
    } catch (err) {
      setError('Veriler yüklenirken hata oluştu');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ userId: 1, title: '', body: '' });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    try {
      const newPost = await postApi.create(formData);
      setPosts([...posts, newPost]); 
      resetForm();
    } catch (err) {
      showError('Post oluşturulurken hata oluştu');
      console.error('Error:', err);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    
    setError(null); 
    try {
      console.log('Updating post:', editingPost.id, 'with data:', formData);
      const updatedPost = await postApi.update(editingPost.id, formData);
      console.log('Updated post from backend:', updatedPost);
      
      await fetchData();
      resetForm();
    } catch (err) {
      showError('Post güncellenirken hata oluştu');
      console.error('Error:', err);
    }
  };

  
  const handleDeletePost = async (id: number) => {
    if (!window.confirm('Bu postu silmek istediğinizden emin misiniz?')) return;
    
    setError(null); 
    try {
      await postApi.delete(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      showError('Post silinirken hata oluştu');
      console.error('Error:', err);
    }
  };

  
  const startEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      userId: post.userId,
      title: post.title,
      body: post.body || '',
    });
    setShowForm(true);
  };

 
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  if (loading) {
    return <div className="loading">Posts Are Loading...</div>;
  }

  return (
    <div className="post-list">
      <div className="header">
        <div className="header-left">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            ← Return Homepage
          </button>
          <h1>Posts</h1>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create New Post
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingPost ? 'Post Düzenle' : 'Yeni Post'}</h2>
            <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
              <div className="form-group">
                <label>Kullanıcı:</label>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) })}
                  required
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.username})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Başlık:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>İçerik:</label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingPost ? 'Güncelle' : 'Ekle'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p><strong>Yazar:</strong> {getUserName(post.userId)}</p>
            <p><strong>User ID:</strong> {post.userId}</p>
            <p><strong>Post ID:</strong> {post.id}</p>
            {post.body && (
              <p className="post-body">{post.body}</p>
            )}
            <div className="post-actions">
              <button 
                className="btn btn-small btn-primary"
                onClick={() => startEdit(post)}
              >
                Düzenle
              </button>
              <button 
                className="btn btn-small btn-danger"
                onClick={() => handleDeletePost(post.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && !loading && (
        <div className="empty-state">
          <p>Henüz post yok. İlk postu ekleyin!</p>
        </div>
      )}
    </div>
  );
};

export default PostList;