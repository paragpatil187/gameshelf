'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function EditGame({ params }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    genres: '',
    price: '',
    imageUrl: '',
    previewVideo: '',
    description: '',
    rating: '',
    isFeatured: false,
    isPopular: false,
    screenshots: '',
  });

  useEffect(() => {
    async function fetchGame() {
      try {
        const res = await fetch(`/api/admin/games/${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch game');

        setGame(data);
        setForm({
          title: data.title || '',
          genres: (data.genres || []).join(', '),
          price: data.price || '',
          imageUrl: data.imageUrl || '',
          previewVideo: data.previewVideo || '',
          description: data.description || '',
          rating: data.rating || '',
          isFeatured: data.isFeatured || false,
          isPopular: data.isPopular || false,
          screenshots: (data.screenshots || []).join(', '),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchGame();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        rating: parseFloat(form.rating),
        genres: form.genres.split(',').map((g) => g.trim()),
        screenshots: form.screenshots.split(',').map((s) => s.trim()),
      };

      const res = await fetch(`/api/admin/games/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update game');
      }

      router.push('/admin/games');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!game) return <p className="p-4 text-red-500">Game not found</p>;

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Game</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div>
            <label className="block mb-1">Genres (comma separated)</label>
            <input name="genres" value={form.genres} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1">Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <div>
            <label className="block mb-1">Rating</label>
            <input type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1">Image URL</label>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1">Preview Video URL</label>
            <input name="previewVideo" value={form.previewVideo} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">Screenshots (comma separated URLs)</label>
            <input name="screenshots" value={form.screenshots} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" rows="4" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            <label>Featured</label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
            <label>Popular</label>
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Update Game
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
