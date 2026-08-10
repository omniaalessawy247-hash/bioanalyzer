import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { FaUpload, FaCogs, FaDownload } from 'react-icons/fa';
import {
  FaCloudUploadAlt,
  FaKeyboard,
  FaMicroscope,
  FaRandom,
  FaFileCsv,
  FaTable,
  FaDna,
  FaFlask,
  FaCube,
  FaProjectDiagram,
  FaSitemap,
  FaArrowRight,
} from 'react-icons/fa';
 

// Quick-glance toolkit chips — icon + one short label only.
// Deliberately NOT detailed here; the full breakdown lives on the About page.
const TOOLKIT_CHIPS = [
  { icon: <FaDna />, label: 'DNA / RNA Analysis' },
  { icon: <FaMicroscope />, label: 'ORF Scanner' },
  { icon: <FaFlask />, label: 'Protein Physicochemistry' },
  { icon: <FaCube />, label: '3D Structure & Folding' },
  { icon: <FaSitemap />, label: 'PSSM · HMM · Viterbi' },
  { icon: <FaProjectDiagram />, label: 'Sequence Alignment' },
  { icon: <FaTable />, label: 'PDB Viewer' },
  { icon: <FaFileCsv />, label: 'CSV Export' },
];

function Allhome() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="allhome">
      {/* Full-Screen Video Section */}
      <div style={{ width: '100%', height: '750px', overflow: 'hidden', marginTop: '20px' }}>
        <video
          className="video-fluid bio-video"
          src="img/about.mp4"
          alt="DNA and RNA Analysis"
          style={{
            width: '100%',
            height: '90%',
            objectFit: 'cover',
            boxShadow: '0 8px 20px rgba(0, 50, 0, 0.9)',
            borderRadius: '13px',
            transition: 'all 0.3s ease-in-out',
          }}
          autoPlay
          loop
          muted
        />
      </div>

      <div className="bio-analyzer-section">
        <h1 className="bio-analyzer-title">Welcome to BioAnalyzer</h1>
        <div className="bio-analyzer-content">
          {/* Text Column */}
          <div className="bio-analyzer-text">
            <p>
              Upload a FASTA, FASTQ, or PDB file — or just paste a sequence — and BioAnalyzer takes care of the rest:
              nucleotide stats, protein physicochemistry, 3D-structure visualization, and a real bioinformatics
              toolkit, all in one place. Every result is ready to export as CSV.
            </p>
            <a href="/about" className="bio-analyzer-cta">
              See everything it can do <FaArrowRight />
            </a>
          </div>

          {/* Image Column */}
          <div className="bio-analyzer-image">
            <img src="img/image.png" alt="BioAnalyzer" />
          </div>
        </div>

        {/* Compact toolkit strip — icons + one-word labels only, no descriptions */}
        <div className="toolkit-strip">
          {TOOLKIT_CHIPS.map((chip, i) => (
            <div className="toolkit-chip" key={i}>
              <span className="toolkit-chip-icon">{chip.icon}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <Container className="features-section my-5">
        <h2 className="text-center features-title">Explore Our Key Features</h2>
        <Row className="mt-4 text-center features-row">
          <Col className="feature-item">
            <FaCloudUploadAlt size={50} color="#007bff" />
            <h4 style={{ marginTop: '10px' }}>File Upload</h4>
            <p>Upload FASTA, FASTQ, or PDB files for instant analysis.</p>
          </Col>
          <Col className="feature-item">
            <FaKeyboard size={50} color="#007bff" />
            <h4 style={{ marginTop: '10px' }}>Manual Sequence Input</h4>
            <p>Paste your DNA, RNA, or protein sequence directly for a quick analysis.</p>
          </Col>
          <Col className="feature-item">
            <FaMicroscope size={50} color="#007bff" />
            <h4 style={{ marginTop: '10px' }}>Deep Sequence Analysis</h4>
            <p>GC/AT content, ORF scanning, protein properties, and 3D structure — all in one run.</p>
          </Col>
        </Row>
        <Row className="mt-4 text-center features-row">
          <Col className="feature-item">
            <FaRandom size={50} color="#007bff" />
            <h4 style={{ marginTop: '10px' }}>Random Sequence Generation</h4>
            <p>Generate random DNA or RNA sequences for testing and research purposes.</p>
          </Col>
          <Col className="feature-item">
            <FaFileCsv size={50} color="#007bff" />
            <h4 style={{ marginTop: '10px' }}>CSV Download</h4>
            <p>Export your results to a CSV file for further analysis or sharing.</p>
          </Col>
          <Col className="feature-item">
            <FaTable size={50} color="#007bff" />
            <h4 style={{ marginTop: '10px' }}>Formatted Display</h4>
            <p>View results in a clean, readable layout built for fast scanning.</p>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      <Container className="how-it-works-section my-5">
        <h2 className="text-center how-it-works-title">How It Works</h2>
        <Row className="mt-4 text-center how-it-works-row">
          <Col className="how-it-works-item">
            <div className="how-it-works-icon">
              <FaUpload size={40} />
            </div>
            <h4>Step 1: Upload or Input Your Sequence</h4>
            <p>Upload a FASTA/FASTQ/PDB file or paste your sequence directly into the text area.</p>
          </Col>
          <Col className="how-it-works-item">
            <div className="how-it-works-icon">
              <FaCogs size={40} />
            </div>
            <h4>Step 2: Click "Analyze"</h4>
            <p>Click the "Analyze" button to process your sequence and run the full analysis.</p>
          </Col>
          <Col className="how-it-works-item">
            <div className="how-it-works-icon">
              <FaDownload size={40} />
            </div>
            <h4>Step 3: View and Download Results</h4>
            <p>View your results in real-time and download them as a CSV file whenever you need them.</p>
          </Col>
        </Row>
      </Container>

      {/* Subscribe Section */}
      <div
        style={{
          backgroundColor: '#f4f7fa',
          padding: '40px 20px',
          textAlign: 'center',
          marginBottom: '30px',
          borderRadius: '10px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 1.5s',
        }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '15px' }}>
          Subscribe to Our Updates
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '25px', color: '#555' }}>
          Get the latest news and features delivered to your inbox.
        </p>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px',
              width: '300px',
              marginRight: '10px',
              border: '1px solid #ddd',
              borderRadius: '30px',
              fontSize: '1rem',
              transition: 'border-color 0.3s',
              marginBottom: '10px',
            }}
          />
          <Button
            variant="primary"
            onClick={handleSubscribe}
            style={{
              padding: '12px 40px',
              fontSize: '1.1rem',
              borderRadius: '30px',
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              color: 'white',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Subscribe
          </Button>
        </div>

        {subscribed && (
          <div
            style={{
              marginTop: '20px',
              fontSize: '1.2rem',
              color: '#28a745',
            }}
          >
            Thank you for subscribing! You'll receive the latest updates soon.
          </div>
        )}
      </div>
    </div>
  );
}

export default Allhome;