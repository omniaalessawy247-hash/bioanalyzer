import React, { useState } from 'react';
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Form, Button } from 'react-bootstrap';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import {
  FaFileUpload,
  FaChartLine,
  FaFileExport,
  FaDna,
  FaSearch,
  FaFlask,
  FaCube,
  FaCogs,
  FaProjectDiagram,
  FaAtom,
  FaChevronDown,
  FaCheckCircle,
} from 'react-icons/fa';
import Allnavbar from '../Home/Allnavbar';
import Allfooter from '../Home/Allfooter';
 

// ═══════════════════════════════════════════════════════════════
//  FULL FEATURE CATALOG — mirrors every capability in BioAnalyzer.jsx
// ═══════════════════════════════════════════════════════════════

const FEATURE_CATEGORIES = [
  {
    id: 'input',
    icon: <FaFileUpload />,
    color: '#21e0b0',
    title: 'Sequence Input & File Handling',
    tagline: 'Bring your data in however it already exists',
    points: [
      'Paste a raw DNA, RNA, or protein sequence directly into the analyzer box',
      'Upload FASTA files (.fa / .fasta) — headers are parsed and the sequence is extracted automatically',
      'Upload FASTQ files (.fastq / .fq) — both the sequence and the per-base quality scores are read',
      'Upload PDB structure files (.pdb) for full 3D structure parsing',
      'Automatic detection of sequence type: nucleotide (DNA/RNA) vs. protein',
      'Built-in random DNA / RNA sequence generator for quickly testing the tool',
      'One-click Clear button to reset the workspace',
    ],
  },
  {
    id: 'nucleotide',
    icon: <FaDna />,
    color: '#3ec7e0',
    title: 'DNA & RNA Analysis',
    tagline: 'Everything about the raw nucleotide sequence',
    points: [
      'Sequence length and automatic DNA vs. RNA classification',
      'GC content %, AT/AU content %, and AT/GC ratio',
      'Melting temperature (Tm) — Wallace rule for short primers, GC-weighted formula for longer sequences',
      'Full nucleotide distribution chart (A / T / C / G / U percentages)',
      'Complementary strand generation',
      'Reverse complement generation',
      'DNA → RNA conversion (T → U)',
      'FASTQ quality-score track display when a .fastq file is uploaded',
    ],
  },
  {
    id: 'orf',
    icon: <FaSearch />,
    color: '#f5b544',
    title: 'ORF Scanner',
    tagline: 'Find every protein-coding region automatically',
    points: [
      'Scans the full sequence for every AUG start codon',
      'Extends each candidate to the nearest in-frame stop codon (UAA, UAG, UGA)',
      'Reports start position, end position, nucleotide length and codon count for every Open Reading Frame found',
      'Shows the resulting amino-acid length for each ORF, ready to feed into protein analysis',
    ],
  },
  {
    id: 'protein',
    icon: <FaFlask />,
    color: '#9b7bf0',
    title: 'Protein & Amino Acid Analysis',
    tagline: 'A full physicochemical workup of the translated protein',
    points: [
      'Summary dashboard: length, molecular weight (Da/kDa), isoelectric point (pI), GRAVY hydropathy index',
      'Aliphatic index and instability index, with a stable/unstable verdict',
      'Net charge at pH 7, count of basic (K/R/H) vs. acidic (D/E) residues',
      'Extinction coefficient and A280/MW absorptivity ratio (Pace method)',
      'Estimated disulfide-bond count from cysteine content',
      'Average side-chain flexibility (Bhaskaran–Ponnuswamy) and bulkiness (Zimmerman)',
      'Codon-by-codon translation map, color-coded by amino-acid chemical group',
      'Amino-acid composition bar chart with counts and percentages',
      'Hydrophobicity breakdown on the Kyte–Doolittle scale, plus a sliding-window (9 aa) hydrophobicity profile',
      'Chemical-group classification: Nonpolar, Polar, Aromatic, Acidic, Basic — with distribution charts',
      'Full physicochemical parameter table with plain-language notes for every value',
      'Profile charts for hydrophobicity, flexibility, bulkiness, and molecular weight per residue',
      'Single-letter and three-letter sequence views, color-coded by chemical group',
    ],
  },
  {
    id: 'structure',
    icon: <FaCube />,
    color: '#f2596b',
    title: '3D Structure & Folding',
    tagline: 'From flat sequence to folded protein, visualized',
    points: [
      'Interactive diagram of the four levels of protein folding — primary, secondary, tertiary, quaternary — annotated with your own sequence\'s stats',
      'AlphaFold pipeline explainer: Input → MSA search → Pair embedding → Evoformer (48 blocks) → Structure Module (8 blocks) → 3D output, including the recycling loop',
      'Pseudo-3D backbone visualization of the first residues, colored by chemical group, with N- and C-terminus markers',
      'Heuristic secondary-structure prediction (α-helix / β-sheet / random coil) from hydrophobicity, proline and glycine content',
      'pLDDT-style confidence chart per residue with Very High / High / Low / Very Low confidence bands',
      'Residue–residue contact map estimating which parts of the chain sit close together',
    ],
  },
  {
    id: 'tools',
    icon: <FaCogs />,
    color: '#f5b544',
    title: 'Bioinformatics Toolkit',
    tagline: 'Real sequence-analysis algorithms, not just definitions',
    points: [
      'PSSM (Position-Specific Scoring Matrix) builder from a pasted multiple sequence alignment — per-position log-odds scores against background amino-acid frequency, with the dominant residue per column',
      'Profile HMM builder — derives Match / Insertion / Deletion states from the alignment\'s gap pattern, with emission and transition probabilities for every state',
      'Viterbi algorithm — runs dynamic programming in log-space to find the single most probable state path of a query sequence through the built HMM',
      'Pairwise sequence alignment with the BLOSUM62 substitution matrix: Smith–Waterman for local alignment and Needleman–Wunsch for global alignment, both reporting alignment score and percent identity',
    ],
  },
  {
    id: 'pdb',
    icon: <FaProjectDiagram />,
    color: '#4f8ff0',
    title: 'PDB Structure Viewer',
    tagline: 'Inspect real deposited structures chain by chain',
    points: [
      'Parses uploaded .pdb files for protein name, source organism, chain list, atom count, and residue count',
      'Per-chain residue sequence view, color-coded by amino-acid chemical group',
      'Per-chain amino-acid composition statistics with counts and percentages',
      'Chain switcher to move between every chain found in a multi-chain structure',
    ],
  },
  {
    id: 'export',
    icon: <FaFileExport />,
    color: '#3ecf7e',
    title: 'Export & Reporting',
    tagline: 'Take your results wherever you need them',
    points: [
      'One-click CSV export bundling sequence length, type, GC/AT content, and melting temperature',
      'Protein sequence, molecular weight, isoelectric point, GRAVY index and aliphatic index included',
      'Instability index, extinction coefficient, and net charge at pH 7 included',
      'Full amino-acid-by-amino-acid composition breakdown included, ready for a spreadsheet or lab notebook',
    ],
  },
];

function FeatureAccordionCard({ cat, isOpen, onToggle }) {
  return (
    <div className={`baf-card ${isOpen ? 'baf-card-open' : ''}`} style={{ '--baf-accent': cat.color }}>
      <button
        className="baf-card-header"
        onClick={() => onToggle(cat.id)}
        aria-expanded={isOpen}
        aria-controls={`baf-panel-${cat.id}`}
      >
        <span className="baf-icon-wrap">{cat.icon}</span>
        <span className="baf-header-text">
          <span className="baf-title">{cat.title}</span>
          <span className="baf-tagline">{cat.tagline}</span>
        </span>
        <span className={`baf-chevron ${isOpen ? 'baf-chevron-open' : ''}`}>
          <FaChevronDown />
        </span>
      </button>
      <Collapse in={isOpen}>
        <div id={`baf-panel-${cat.id}`}>
          <ul className="baf-point-list">
            {cat.points.map((p, i) => (
              <li key={i}>
                <FaCheckCircle className="baf-check" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  );
}

function Allabout() {
  const [openDNA, setOpenDNA] = useState(false);
  const [openRNA, setOpenRNA] = useState(false);
  const [openProtein, setOpenProtein] = useState(false);
  const [openFeature, setOpenFeature] = useState('input');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };

  const toggleFeature = (id) => {
    setOpenFeature((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <Allnavbar />

      {/* Full-Screen Video Section */}
      <div style={{ width: '100%', height: '750px', overflow: 'hidden', marginTop: '20px' }}>
        <video
          className="video-fluid bio-video"
          src="img/ddna.mp4"
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

      <section
        className="about-tool-section"
        style={{ padding: '40px 20px', backgroundColor: '#f8f9fa', borderRadius: '10px', margin: '20px 0' }}
      >
        <Row className="align-items-center">
          <Col md={6} style={{ padding: '20px' }}>
            <h1
              className="about-tool-title"
              style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#003366' }}
            >
              What is BioAnalyzer?
            </h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555' }}>
              BioAnalyzer is an all-in-one bioinformatics workspace for DNA, RNA, protein and PDB structure data.
              Paste a sequence or drop in a FASTA, FASTQ or PDB file and it instantly runs nucleotide statistics,
              ORF detection, full protein physicochemistry, 3D-folding visualization, an AlphaFold-style pipeline
              explainer, a real bioinformatics toolkit (PSSM, profile HMM, Viterbi decoding, BLOSUM62 alignment),
              and a PDB chain-by-chain structure viewer — with every result exportable to CSV. It's built to make
              genomic and proteomic analysis approachable for students and rigorous enough for real research.
            </p>
          </Col>

          <Col md={6} className="text-center">
            <video
              className="video-fluid bio-video"
              src=" img/dnaaaa.mp4"
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
          </Col>
        </Row>
      </section>

      <Container>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#003366',
          }}
        >
          Features of BioAnalyzer
        </h2>
        <Row>
          <Col md={4} className="text-center mb-4">
            <div
              style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              className="feature-box"
            >
              <FaFileUpload size={50} color="#007bff" />
              <h4 style={{ marginTop: '20px', fontWeight: '600' }}>Sequence Uploading</h4>
              <p style={{ color: '#555', marginTop: '10px' }}>
                Easily upload FASTA, FASTQ and PDB files, or paste a sequence, for in-depth analysis.
              </p>
            </div>
          </Col>

          <Col md={4} className="text-center mb-4">
            <div
              style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              className="feature-box"
            >
              <FaChartLine size={50} color="#007bff" />
              <h4 style={{ marginTop: '20px', fontWeight: '600' }}>Detailed Analysis</h4>
              <p style={{ color: '#555', marginTop: '10px' }}>
                Nucleotide stats, ORF scanning, full protein physicochemistry, 3D-structure views and a real
                bioinformatics toolkit — PSSM, HMM, Viterbi and BLOSUM62 alignment.
              </p>
            </div>
          </Col>

          <Col md={4} className="text-center mb-4">
            <div
              style={{
                padding: '30px',
                borderRadius: '10px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              className="feature-box"
            >
              <FaFileExport size={50} color="#007bff" />
              <h4 style={{ marginTop: '20px', fontWeight: '600' }}>Export Results</h4>
              <p style={{ color: '#555', marginTop: '10px' }}>
                Download every computed result in CSV format for further research or documentation.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ═══════════════════════════════════════════════════════
          FULL FEATURE BREAKDOWN — every tab/tool inside BioAnalyzer
      ═══════════════════════════════════════════════════════ */}
      <section className="baf-section">
        <Container>
          <div className="baf-section-head">
            <span className="baf-eyebrow">
              <FaAtom /> Inside the analyzer
            </span>
            <h2 className="baf-section-title">Every Tool, Tab and Calculation — Explained</h2>
            <p className="baf-section-sub">
              BioAnalyzer is organized into focused modules. Tap any card below to see exactly what it computes.
            </p>
          </div>

          <div className="baf-grid">
            {FEATURE_CATEGORIES.map((cat) => (
              <FeatureAccordionCard
                key={cat.id}
                cat={cat}
                isOpen={openFeature === cat.id}
                onToggle={toggleFeature}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Difference Section Between DNA, RNA, and Proteins */}
      <div className="difference-section" style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', color: '#003366' }}>
            DNA, RNA, and Proteins: A Comparative Overview
          </h2>
          <Row>
            {/* DNA Section */}
            <Col md={4} className="mb-4">
              <Button
                onClick={() => setOpenDNA(!openDNA)}
                aria-controls="collapse-DNA"
                aria-expanded={openDNA}
                style={{ width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px' }}
              >
                <div className="icon-text">
                  <img src="img/icon1.png" alt="DNA Icon" className="icon" />
                  <span className="text">DNA</span>
                </div>
              </Button>
              <Collapse in={openDNA}>
                <div id="collapse-DNA" style={{ marginTop: '10px' }}>
                  <p>
                    <strong>Structure:</strong> DNA (Deoxyribonucleic Acid) consists of two long chains
                    (polynucleotides) that coil around each other to form a double helix structure. Each strand is
                    composed of repeating units called nucleotides, which consist of three components: a phosphate
                    group, a deoxyribose sugar molecule, and a nitrogenous base. The four nitrogenous bases that make
                    up the genetic code are Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). These bases pair
                    specifically: A with T, and C with G. These pairs are held together by hydrogen bonds, with A and
                    T forming two hydrogen bonds and C and G forming three hydrogen bonds. The sequence of these bases
                    encodes genetic information.
                  </p>
                  <p>
                    <strong>Function:</strong> DNA carries the genetic instructions necessary for the development,
                    functioning, growth, and reproduction of all living organisms. It serves as a blueprint for all
                    biological processes by encoding the instructions for protein synthesis. These proteins are
                    essential for various cellular functions, including catalyzing metabolic reactions and
                    constructing cellular structures.
                  </p>
                  <p>
                    <strong>Role:</strong> DNA is the hereditary material in living organisms, passing genetic
                    information from one generation to the next during reproduction. In cell division, DNA
                    replication ensures that each daughter cell receives a copy of the genetic material. It also
                    plays a critical role in cellular activities by producing RNA, which then directs protein
                    synthesis. DNA is foundational to biology and is crucial in fields like genomics and
                    biotechnology.
                  </p>
                </div>
              </Collapse>
            </Col>

            {/* RNA Section */}
            <Col md={4} className="mb-4">
              <Button
                onClick={() => setOpenRNA(!openRNA)}
                aria-controls="collapse-RNA"
                aria-expanded={openRNA}
                style={{ width: '100%', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px' }}
              >
                <img src="img/icon3.png" alt="DNA Icon" className="icon" />
                <span className="text">RNA</span>
              </Button>
              <Collapse in={openRNA}>
                <div id="collapse-RNA" style={{ marginTop: '10px' }}>
                  <p>
                    <strong>Structure:</strong> RNA (Ribonucleic Acid) is a single-stranded molecule made up of
                    nucleotides, which consist of a ribose sugar, phosphate group, and nitrogenous bases. The four
                    bases in RNA are Adenine (A), Uracil (U), Cytosine (C), and Guanine (G). Unlike DNA, RNA uses
                    Uracil instead of Thymine. The RNA strand can fold into complex shapes and forms secondary
                    structures, contributing to its diverse functions.
                  </p>

                  <p>
                    <strong>Function:</strong> RNA plays a key role in protein synthesis, acting as an intermediary
                    between DNA and the ribosome, where proteins are made. There are several types of RNA:
                    <ul>
                      <li>
                        <strong>mRNA (Messenger RNA)</strong>: Carries the genetic information copied from DNA to the
                        ribosome, where proteins are synthesized.
                      </li>
                      <li>
                        <strong>tRNA (Transfer RNA)</strong>: Transports amino acids to the ribosome for protein
                        assembly, matching them to the appropriate mRNA codon.
                      </li>
                      <li>
                        <strong>rRNA (Ribosomal RNA)</strong>: Part of the ribosome's structure and plays a crucial
                        role in the catalytic activity that joins amino acids together to form proteins.
                      </li>
                    </ul>
                    Additionally, RNA is involved in gene regulation, splicing, and editing of RNA transcripts, which
                    allows cells to produce the right amount and types of proteins needed.
                  </p>

                  <p>
                    <strong>Role:</strong> RNA is essential in the flow of genetic information, often referred to as
                    the "central dogma" of molecular biology. It helps decode the genetic instructions in DNA into
                    the functional products (proteins) that the cell needs to perform various activities.
                    Additionally, RNA can act as a catalyst in certain biological processes, and some RNA molecules,
                    like ribozymes, have enzymatic functions. RNA also plays a central role in the regulation of gene
                    expression and is key in processes like RNA interference, which controls the expression of genes
                    at the post-transcriptional level.
                  </p>
                </div>
              </Collapse>
            </Col>

            {/* Protein Section */}
            <Col md={4} className="mb-4">
              <Button
                onClick={() => setOpenProtein(!openProtein)}
                aria-controls="collapse-Protein"
                aria-expanded={openProtein}
                style={{ width: '100%', backgroundColor: '#ffc107', color: 'white', border: 'none', padding: '10px' }}
              >
                <img src="img/icon2.png" alt="DNA Icon" className="icon" />
                <span className="text">Protein</span>
              </Button>
              <Collapse in={openProtein}>
                <div id="collapse-Protein" style={{ marginTop: '10px' }}>
                  <p>
                    <strong>Structure:</strong> Proteins are made up of amino acids linked in specific sequences to
                    form polypeptides. These chains fold into 3D shapes that are essential for their function. The
                    structure includes primary, secondary, tertiary, and sometimes quaternary levels of organization.
                  </p>

                  <p>
                    <strong>Function:</strong> Proteins perform a wide range of functions, such as:
                    <ul>
                      <li>
                        <strong>Enzymes:</strong> Catalyze chemical reactions.
                      </li>
                      <li>
                        <strong>Antibodies:</strong> Fight infections.
                      </li>
                      <li>
                        <strong>Structural Proteins:</strong> Provide support in tissues like skin, hair, and bones.
                      </li>
                      <li>
                        <strong>Transport Proteins:</strong> Carry oxygen, nutrients, and other molecules.
                      </li>
                    </ul>
                  </p>

                  <p>
                    <strong>Role:</strong> Proteins are essential for metabolism, immune defense, cellular repair,
                    and growth. They help maintain the body's function and structure by supporting key biological
                    processes, from energy production to cell division.
                  </p>
                </div>
              </Collapse>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="genomic-history-section">
        <h1 className="genomic-history-title">A Brief History of Genomic Analysis</h1>
        <p className="genomic-history-description">
          Genomic analysis has evolved significantly over the decades, with key milestones shaping modern genetics:
        </p>
        <Container>
          <Row className="align-items-stretch">
            <Col md={4} className="genomic-history-item">
              <img src="img/dna_discovery.jpg" alt="DNA Discovery" className="genomic-history-image" />
              <h4>DNA Discovery (1953)</h4>
              <p>Watson and Crick's double helix model revolutionized genetics.</p>
            </Col>
            <Col md={4} className="genomic-history-item">
              <img src="img/human_genome_project.jpg" alt="Human Genome Project" className="genomic-history-image" />
              <h4>Human Genome Project (1990-2003)</h4>
              <p>Mapped the entire human genome, enhancing our understanding of human health and diseases.</p>
            </Col>
            <Col md={4} className="genomic-history-item">
              <img
                src="img/next_gen_sequencing.jpg"
                alt="Next-Generation Sequencing"
                className="genomic-history-image"
              />
              <h4>Next-Generation Sequencing (2005-Present)</h4>
              <p>Enabled rapid, cost-effective genome sequencing, accelerating genomic research.</p>
            </Col>
          </Row>
          <Row className="align-items-stretch">
            <Col md={4} className="genomic-history-item">
              <img src="img/fasta.avif" alt="FASTA/FASTQ Formats" className="genomic-history-image" />
              <h4>FASTA/FASTQ Formats</h4>
              <p>Standardized sequence data storage, making analysis more efficient.</p>
            </Col>
            <Col md={4} className="genomic-history-item">
              <img src="img/cell.jpeg" alt="Single-Cell Genomics" className="genomic-history-image" />
              <h4>Single-Cell Genomics (2010-Present)</h4>
              <p>Enabled in-depth studies of individual cells, advancing personalized medicine and health research.</p>
            </Col>
          </Row>
        </Container>

        <section
          className="bioanalyzer-applications-section"
          style={{ padding: '60px 20px', borderRadius: '10px', boxShadow: ' 0 0 8px rgba(53, 40, 167, 0.5);' }}
        >
          <h1
            className="bioanalyzer-applications-title"
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#003366',
              marginBottom: '30px',
              textTransform: 'uppercase',
            }}
          >
            Practical Applications of BioAnalyzer
          </h1>
          <Container>
            <Row>
              <Col md={4} className="bioanalyzer-application-item">
                <img src="img/icon4.png" alt="Genetic Research" className="bioanalyzer-icon" />
                <h4 style={{ color: '#003366', marginTop: '10px' }}>Genetic Research</h4>
                <p style={{ color: '#555' }}>
                  BioAnalyzer helps researchers study genes linked to diseases, identifying mutations for early
                  diagnosis and treatment strategies, aiding in the development of precision medicine.
                  <br />
                  <strong>Reference:</strong>{' '}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5573065/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Genomic Analysis in Disease Research
                  </a>
                </p>
              </Col>
              <Col md={4} className="bioanalyzer-application-item">
                <img src="img/icon5.png" alt="Gene Therapy" className="bioanalyzer-icon" />
                <h4 style={{ color: '#003366', marginTop: '10px' }}>Gene Therapy</h4>
                <p style={{ color: '#555' }}>
                  BioAnalyzer supports the design of gene therapies by analyzing mutations and allowing researchers
                  to explore gene-editing technologies like CRISPR to treat genetic disorders.
                  <br />
                  <strong>Reference:</strong>{' '}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7790133/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gene Therapy and CRISPR
                  </a>
                </p>
              </Col>
              <Col md={4} className="bioanalyzer-application-item">
                <img src="img/icon6.png" alt="Industrial Applications" className="bioanalyzer-icon" />
                <h4 style={{ color: '#003366', marginTop: '10px' }}>Industrial Applications</h4>
                <p style={{ color: '#555' }}>
                  In agriculture and drug production, BioAnalyzer is used to improve crop resilience and develop
                  therapeutic proteins, supporting the creation of bio-based products and solutions.
                  <br />
                  <strong>Reference:</strong>{' '}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6521413/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Industrial Biotechnology and Genomic Tools
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="case-studies-section">
          <h1 className="case-studies-title">Case Studies</h1>
          <Container>
            <Row>
              <Col md={4} className="case-study-item">
                <h4>Study 1: Genomic Analysis in Disease Mutation Discovery</h4>
                <p>
                  Genomic analysis has played a significant role in identifying mutations that cause diseases. A
                  prominent example is the discovery of mutations associated with inherited disorders like cystic
                  fibrosis and Duchenne muscular dystrophy. By sequencing genomes of affected families, researchers
                  have pinpointed the responsible genetic variations, enabling early diagnosis and targeted
                  treatments.
                </p>
                <p>
                  <strong>Reference:</strong> -{' '}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5566087/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Genomic insights into inherited disorders
                  </a>
                  .
                </p>
              </Col>

              <Col md={4} className="case-study-item">
                <h4>Study 2: The 100,000 Genomes Project</h4>
                <p>
                  The UK's 100,000 Genomes Project is one of the largest genomic studies aimed at understanding rare
                  diseases. By sequencing the genomes of patients with rare genetic disorders, scientists have
                  identified new genes and mutations that cause these conditions. The project has provided insights
                  into the genetic basis of over 4,000 rare diseases and is transforming healthcare through
                  precision medicine.
                </p>
                <p>
                  <strong>Reference:</strong> -{' '}
                  <a
                    href="https://www.genomicsengland.co.uk/the-100000-genomes-project"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    100,000 Genomes Project Overview
                  </a>
                  .
                </p>
              </Col>

              <Col md={4} className="case-study-item">
                <h4>Study 3: Genomic Sequencing of Viruses (SARS-CoV-2)</h4>
                <p>
                  During the COVID-19 pandemic, genomic sequencing of SARS-CoV-2 has been essential in tracking
                  mutations of the virus. By sequencing the viral genome, scientists have been able to identify new
                  variants, such as the Delta and Omicron variants, helping health authorities implement better
                  measures for controlling transmission. Genomic sequencing continues to play a crucial role in
                  vaccine development and pandemic management.
                </p>
                <p>
                  <strong>Reference:</strong> -{' '}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7453355/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    SARS-CoV-2 Genomic Sequencing
                  </a>
                  .
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section
          className="future-challenges-section"
          style={{ padding: '60px 20px', borderRadius: '10px', boxShadow: ' 0 0 10px rgba(49, 54, 176, 0.899)' }}
        >
          <h1
            className="future-challenges-title"
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#003366',
              marginBottom: '30px',
              textTransform: 'uppercase',
            }}
          >
            Future Challenges in Genomic Analysis
          </h1>
          <Container>
            <Row>
              <Col md={4} className="future-challenge-item">
                <h4 style={{ color: '#003366', marginBottom: '20px' }}>Handling Large Data Volumes</h4>
                <p style={{ color: '#555' }}>
                  With the increasing scale of genomic data, processing and storing massive datasets has become one
                  of the biggest challenges. Efficient data storage, fast retrieval, and scalable computational
                  models are needed to handle these large datasets effectively, especially as sequencing
                  technologies improve and generate more data.
                </p>
                <p style={{ color: '#555' }}>
                  <strong>Reference:</strong> -{' '}
                  <a
                    href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6558360/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Challenges in genomic data analysis
                  </a>
                  .
                </p>
              </Col>
              <Col md={4} className="future-challenge-item">
                <h4 style={{ color: '#003366', marginBottom: '20px' }}>Reducing Genomic Analysis Costs</h4>
                <p style={{ color: '#555' }}>
                  Despite advancements, genomic analysis remains expensive, especially for large-scale projects.
                  Reducing sequencing costs and the overall expenses of bioinformatics analysis is essential for
                  making genomics accessible to a broader range of researchers and healthcare providers, enabling
                  personalized medicine at a population scale.
                </p>
                <p style={{ color: '#555' }}>
                  <strong>Reference:</strong> -{' '}
                  <a href="https://www.nature.com/articles/s41586-019-1114-3" target="_blank" rel="noopener noreferrer">
                    Reducing genomic sequencing costs
                  </a>
                  .
                </p>
              </Col>
              <Col md={4} className="future-challenge-item">
                <h4 style={{ color: '#003366', marginBottom: '20px' }}>Integrating Artificial Intelligence</h4>
                <p style={{ color: '#555' }}>
                  AI and machine learning are becoming crucial in analyzing genomic data. Integrating AI models into
                  bioinformatics workflows can help identify patterns, predict genetic disorders, and automate data
                  analysis processes. However, ensuring AI algorithms are accurate, unbiased, and interpretable is a
                  key challenge.
                </p>
                <p style={{ color: '#555' }}>
                  <strong>Reference:</strong> -{' '}
                  <a
                    href="https://www.sciencedirect.com/science/article/pii/S2405452619302947"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AI in Genomic Data Analysis
                  </a>
                  .
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="contact-us-section" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h1
            className="contact-us-title"
            style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#003366', marginBottom: '30px' }}
          >
            Get in Touch
          </h1>
          <Container>
            <Row>
              <Col md={6}>
                <h4 style={{ color: '#003366', marginBottom: '20px' }}>Contact Form</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Your message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}>
                    Send Message
                  </Button>
                </Form>
              </Col>

              <Col md={6}>
                <h4 style={{ color: '#003366', marginBottom: '20px' }}>Contact Information</h4>
                <p style={{ color: '#555' }}>
                  <FaEnvelope /> Email: <a href="mailto:contact@bioanalyzer.com">contact@bioanalyzer.com</a>
                </p>
                <p style={{ color: '#555' }}>
                  <FaFacebook />{' '}
                  <a href="https://www.facebook.com/BioAnalyzer" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </p>
                <p style={{ color: '#555' }}>
                  <FaTwitter />{' '}
                  <a href="https://twitter.com/BioAnalyzer" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </p>
                <p style={{ color: '#555' }}>
                  <FaInstagram />{' '}
                  <a href="https://www.instagram.com/BioAnalyzer" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </section>

      <Allfooter />
    </div>
  );
}

export default Allabout;