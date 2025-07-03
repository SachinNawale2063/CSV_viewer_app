
import axios from 'axios';
import './Upload.css';

const Upload = ({ onUpload }) => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      onUpload(res.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <div className="upload-container">
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
};

export default Upload;
