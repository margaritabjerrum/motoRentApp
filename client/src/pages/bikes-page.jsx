import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BikesPage() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showScrollInfo, setShowScrollInfo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollInfo(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5024/bikes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBikes(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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

  return (
    <>
      <header>
        <h1 className="pt-4 mt-5 mb-4 text-center">Choose your ride</h1>
      </header>
      <main className="pb-4 mb-5">
        <div class="container">
          <div className="d-flex flex-wrap gap-3 justify-content-start justify-content-center">
            {bikes.map((bike) => (
              <div
                className="card"
                onMouseEnter={(e) => e.currentTarget.classList.add('shadow')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('shadow')}
                style={{ width: '18rem', padding: '0px' }}
                key={bike.id}
              >
                <img
                  src={bike.images[0]}
                  className="card-img-top"
                  alt={`${bike.brand} ${bike.model}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {bike.brand} {bike.model}
                  </h5>
                  <p className="card-text">
                    <strong>Year:</strong> {bike.year}
                    <br />
                    <strong>Power:</strong> {bike.stats.power}
                    <br />
                    <strong>Weight:</strong> {bike.stats.weight}
                    <br />
                    <strong>Price:</strong> {bike.price}€ per day
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/bikes/${bike.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {showScrollInfo && (
        <div
          className="alert alert-info alert-dismissible position-fixed bottom-0 start-0 mb-4 ms-4 w-auto shadow fade show"
          role="alert"
          style={{ zIndex: 1055 }}
        >
          Tip: Click "View Details" to see more and contact the owner!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowScrollInfo(false)}
          ></button>
        </div>
      )}
    </>
  );
}

export default BikesPage;
