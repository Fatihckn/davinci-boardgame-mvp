import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, CreateUserData } from '../types';
import { userApi } from '../services/api';
import './UserList.css';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    username: '',
    email: '',
  });

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', username: '', email: '' });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    try {
      const newUser = await userApi.create(formData);
      setUsers([...users, newUser]); 
      resetForm();
    } catch (err) {
      showError('Kullanıcı oluşturulurken hata oluştu');
      console.error('Error:', err);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setError(null); 
    try {
      await userApi.update(editingUser.id, formData);
      await fetchUsers();
      resetForm();
    } catch (err) {
      showError('Kullanıcı güncellenirken hata oluştu');
      console.error('Error:', err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) return;
    
    setError(null); 
    try {
      await userApi.delete(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      showError('Kullanıcı silinirken hata oluştu');
      console.error('Error:', err);
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
    });
    setShowForm(true);
  };

  if (loading) {
    return <div className="loading">Users Are Loading...</div>;
  }

  return (
    <div className="user-list">
      <div className="header">
        <div className="header-left">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            ← Return Homepage
          </button>
          <h1>Users</h1>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create New User
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}</h2>
            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
              <div className="form-group">
                <label>Ad:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Kullanıcı Adı:</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-posta:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Güncelle' : 'Ekle'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
            <p><strong>E-posta:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <div className="user-actions">
              <button 
                className="btn btn-small btn-primary"
                onClick={() => startEdit(user)}
              >
                Düzenle
              </button>
              <button 
                className="btn btn-small btn-danger"
                onClick={() => handleDeleteUser(user.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="empty-state">
          <p>Henüz kullanıcı yok. İlk kullanıcıyı ekleyin!</p>
        </div>
      )}
    </div>
  );
};

export default UserList;