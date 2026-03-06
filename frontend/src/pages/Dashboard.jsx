import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [noteForm, setNoteForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/notes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data.data || []);
      }
    } catch (err) {
      toast.error('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId 
      ? `http://localhost:5000/api/v1/notes/${editingId}`
      : 'http://localhost:5000/api/v1/notes';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(noteForm),
      });

      if (res.ok) {
        toast.success(editingId ? 'Note updated!' : 'Note created!');
        setNoteForm({ title: '', content: '' });
        setEditingId(null);
        fetchNotes();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Operation failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (note) => {
    setNoteForm({ title: note.title, content: note.content });
    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/v1/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        toast.success('Note deleted');
        fetchNotes();
      }
    } catch (err) {
      toast.error('Failed to delete note');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleCreateOrUpdate} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            {editingId ? 'Edit Note' : 'Create New Note'}
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={noteForm.title}
            onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <textarea
            placeholder="Content"
            value={noteForm.content}
            onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors font-medium"
            >
              {editingId ? 'Update Note' : 'Save Note'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setNoteForm({ title: '', content: '' });
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <p className="col-span-full text-center text-gray-400 py-10">No notes yet. Create one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
              <h4 className="text-xl font-bold text-gray-800 mb-2 truncate">{note.title}</h4>
              <p className="text-gray-600 mb-4 flex-grow whitespace-pre-wrap">{note.content}</p>
              
              {user.role === 'admin' && note.user && (
                <div className="mb-4 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  <span className="font-semibold">Created by:</span> {note.user.name} ({note.user.email})
                </div>
              )}

              <div className="flex justify-between items-center mt-auto pt-4 border-t">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
