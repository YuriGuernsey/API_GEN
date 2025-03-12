import { useState } from 'react';
import axios from 'axios';

const CreateApi: React.FC = () => {
  const [description, setDescription] = useState('');
  const [currentSpec, setCurrentSpec] = useState<string | null>(null);
  const [userConfirmation, setUserConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/generate-api', { description });
      setCurrentSpec(response.data.apiSpec);
      setUserConfirmation(false); // Reset confirmation state
    } catch (err) {
      setError('Error generating API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefineApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/generate-api', { currentSpec });
      setCurrentSpec(response.data.apiSpec);
    } catch (err) {
      setError('Error refining API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const storeConfirmedApi = async (apiSpec: string) => {
    try {
      // Store API spec (e.g., in the database)
      const response = await axios.post('/api/store-api', { apiSpec });
      console.log('API stored successfully');
    } catch (err) {
      console.error('Error storing API', err);
    }
  };

  const handleConfirmApi = () => {
    setUserConfirmation(true);
    //@ts-ignore
    storeConfirmedApi(currentSpec)
    alert('API confirmed and will be created.');
    // Here you can proceed with storing the confirmed API spec or any other step
  };

  return (
    <div>
      <h2>Create and Confirm API</h2>
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your API (e.g., Create an API for managing dogs)"
        rows={4}
        className="form-input"
      />
      
      <button onClick={handleGenerateApi} disabled={loading}>
        {loading ? 'Generating...' : 'Generate API'}
      </button>

      {error && <p>{error}</p>}
      
      {currentSpec && !userConfirmation && (
        <div>
          <h3>API Spec Generated</h3>
          <pre>{currentSpec}</pre>

          <button onClick={handleRefineApi} disabled={loading}>
            {loading ? 'Refining...' : 'Refine API'}
          </button>
          
          <button onClick={handleConfirmApi} disabled={loading}>
            {loading ? 'Confirming...' : 'Confirm API'}
          </button>
        </div>
      )}

      {userConfirmation && (
        <div>
          <h3>API Confirmed</h3>
          <p>Your API is confirmed. It will now be created.</p>
        </div>
      )}
    </div>
  );
};

export default CreateApi;
