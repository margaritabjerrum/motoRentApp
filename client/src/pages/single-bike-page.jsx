import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleBikePage() {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [noteLength, setNoteLength] = useState(0);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const response = await fetch(`http://localhost:5024/bikes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bike');
        }
        const data = await response.json();
        setBike(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    console.log('Form Data:', data);

    setShowAlert(true);

    form.reset();
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (!bike)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="text-primary" role="status">
          <span>Bike not found</span>
        </div>
      </div>
    );

  return (
    <>
      <main class="vh-100 d-flex justify-content-center align-items-center">
        <section>
          <div class="container">
            <div class="row border shadow p-3 mt-5 mb-5 bg-body-tertiary rounded d-flex flex-wrap">
              <div class="col d-flex justify-content-center align-items-center border-end">
                <div id="carouselExample" class="carousel slide">
                  <div
                    className="carousel-inner"
                    style={{ objectFit: 'cover' }}
                  >
                    {bike.images.map((image, index) => (
                      <div
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        key={index}
                      >
                        <img
                          src={image}
                          class="img-fluid"
                          alt="bike picture"
                          style={{
                            aspectRatio: '1.42',
                            width: '1',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="col d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-1 text-center">
                  {bike.brand} {bike.model}
                </h1>
                <p>
                  <strong>Engine:</strong> {bike.stats.engine}
                </p>
                <p>
                  <strong>Year:</strong> {bike.year}
                </p>
                <p>
                  <strong>Power:</strong> {bike.stats.power}
                </p>
                <p>
                  <strong>Weight:</strong> {bike.stats.weight}
                </p>
                <p>
                  <strong>Price:</strong> {bike.price}€ per day
                </p>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#contactModal"
                >
                  Contact the owner
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          {/* Modal */}
          <div
            className="modal fade"
            id="contactModal"
            tabIndex="-1"
            aria-labelledby="contactModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="contactModalLabel">
                    Contact the Owner
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        required
                        name="fullName"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        name="email"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="rentalDate" className="form-label">
                        Desired Rental Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="rentalDate"
                        name="date"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="notes" className="form-label">
                        Additional Notes:
                      </label>
                      <textarea
                        className="form-control"
                        id="notes"
                        rows="3"
                        name="notes"
                        onInput={(e) => setNoteLength(e.target.value.length)}
                      />
                      <p className="text-muted">{noteLength} characters</p>
                    </div>

                    <div class="d-flex gap-3">
                      <button
                        type="button"
                        class="btn btn-secondary flex-fill"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success flex-fill"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  {showAlert && (
                    <div className="alert alert-success mt-3" role="alert">
                      Your request has been sent!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SingleBikePage;
