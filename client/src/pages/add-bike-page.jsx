import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBikeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    engine: '',
    power: '',
    seatHeight: '',
    weight: '',
    images: [''],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.images[0]) {
      alert('Please provide at least one image URL.');
      return;
    }

    const payload = {
      id: Date.now().toString(),
      brand: formData.brand,
      model: formData.model,
      year: parseInt(formData.year),
      price: parseFloat(formData.price),
      stats: {
        engine: formData.engine,
        power: formData.power,
        seatHeight: formData.seatHeight,
        weight: formData.weight,
      },
      images: formData.images.filter((img) => img.trim() !== ''),
    };

    try {
      const res = await fetch('http://localhost:5024/bikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to add bike.');

      navigate('/');

      setFormData({
        brand: '',
        model: '',
        year: '',
        price: '',
        engine: '',
        power: '',
        seatHeight: '',
        weight: '',
        images: [''],
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting form.');
    }
  };

  return (
    <div
      className="container mt-5 pt-4"
      style={{ width: '70%', height: '80%' }}
    >
      <h1 className="text-center mb-5">Add a Motorcycle</h1>
      <form
        className="shadow p-3 mb-5 bg-body-tertiary rounded"
        onSubmit={handleSubmit}
      >
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <div className="mb-3 flex-fill">
            <label className="form-label">Brand:</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              onFocus={(e) => e.target.classList.add('border-primary')}
              onBlur={(e) => e.target.classList.remove('border-primary')}
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 flex-fill">
            <label className="form-label">Model:</label>
            <input
              type="text"
              name="model"
              className="form-control"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 flex-fill">
            <label className="form-label">Year:</label>
            <input
              type="number"
              name="year"
              className="form-control"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <strong>Price (€/day):</strong>
          </label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <h4 className="text-center">Bike Stats</h4>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <div className="mb-3 flex-fill">
            <label className="form-label">Engine:</label>
            <input
              type="text"
              name="engine"
              className="form-control"
              value={formData.engine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 flex-fill">
            <label className="form-label">Power:</label>
            <input
              type="text"
              name="power"
              className="form-control"
              value={formData.power}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 flex-fill">
            <label className="form-label">Seat Height:</label>
            <input
              type="text"
              name="seatHeight"
              className="form-control"
              value={formData.seatHeight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 flex-fill">
            <label className="form-label">Weight:</label>
            <input
              type="text"
              name="weight"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h4>Images</h4>
        {formData.images.map((url, idx) => (
          <div className="mb-3" key={idx}>
            <label className="form-label">Image URL {idx + 1}</label>
            <input
              type="url"
              className="form-control"
              value={url}
              required={idx === 0}
              onChange={(e) => handleImageChange(idx, e.target.value)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addImageField}
          className="btn btn-secondary mb-3"
        >
          Add Another Image
        </button>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit Bike
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBikeForm;
