 import React, { useRef } from 'react';
import Allnavbar from '../Home/Allnavbar';
import Allfooter from '../Home/Allfooter';

function Allbio() {
  // تحديد الأقسام باستخدام ref
  const introSectionRef = useRef(null);
  const applicationsSectionRef = useRef(null);
  const keyConceptsSectionRef = useRef(null);
  const toolsTechSectionRef = useRef(null);
  const learningPathSectionRef = useRef(null);

  // دالة التمرير إلى القسم
  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: 'smooth', // تمكين التمرير السلس
    });
  };

  return (
    <div>
      <Allnavbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Welcome to Biomedical Informatics!</h1>
          <p className="hero-description">
            Biomedical Informatics is revolutionizing healthcare through data-driven insights and technology. Explore how data transforms healthcare, research, and medical practice.
          </p>
          <button 
            className="start-learning-btn" 
            onClick={() => scrollToSection(introSectionRef)} // التمرير إلى القسم التالي عند الضغط على الزر
          >
            Start Learning
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introSectionRef} className="intro-section">
      <div class="center-container">
  <h2 class="introh2">What is Biomedical Informatics?</h2>
</div>

        <div className="intro-video">
    <iframe
      width="100%"
      height="500px"
      src="https://www.youtube.com/embed/7j3atzpjh2c?si=7eeo-luczZKjfzM4"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
        <p class="intro-paragraph">
  Biomedical Informatics is the interdisciplinary field that combines the study of biology, computer science, and information technology to optimize healthcare delivery and medical research.
  It leverages data analysis, machine learning, and computational models to solve complex problems in medicine, such as predicting diseases, optimizing treatments, and improving patient care.
</p>

<div class="intro-images">
  <div class="image-section">
    <img src="img/medical-research.jpg" alt="Medical Research" class="intro-image" />
  </div>
  <div class="image-section">
    <img src="img/healthcare.png" alt="Healthcare Data" class="intro-image" />
  </div>
</div>


      </section>

      {/* Applications Section */}
      <section ref={applicationsSectionRef} className="applications-section">
      <div class="center-container">
  <h2 class="introh2"> Applications of Biomedical Informatics</h2>
</div>
       
        <p className='par'>
          Biomedical Informatics has a vast array of applications that directly impact healthcare and medical research. Some key areas of application include:
        </p>
        <div className="applications-grid">
          <div className="application">
            <img src="img/Genomics.png" alt="Genomics" />
            <h3>Genomics</h3>
            <p>
              Genomics refers to the study of an organism's complete set of genes. In healthcare, genomics helps us understand genetic predispositions to diseases, identify genetic markers, and develop personalized treatments.
              It is an essential part of precision medicine.
            </p>
          </div>
          <div className="application">
            <img src=" img/Clinical Informatics.png" alt="Clinical Informatics" />
            <h3>Clinical Informatics</h3>
            <p>
              Clinical Informatics uses patient data to improve clinical care. By integrating data from electronic health records (EHRs), clinical informatics helps optimize treatment plans, reduce errors,
              and improve patient outcomes. It also aids in managing healthcare workflows and decision support systems.
            </p>
          </div>
          <div className="application">
            <img src="img/Drug Discovery.png" alt="Drug Discovery" />
            <h3>Drug Discovery</h3>
            <p>
              Data-driven drug discovery utilizes computational models to predict the interactions between drugs and biological targets. Machine learning algorithms analyze vast datasets of molecular and
              clinical trial data to accelerate drug development, making it faster and more cost-effective.
            </p>
          </div>
          <div className="application">
            <img src=" img/Healthcare Analytics.png" alt="Healthcare Analytics" />
            <h3>Healthcare Analytics</h3>
            <p>
              Healthcare analytics involves analyzing large datasets to derive actionable insights for healthcare providers. It helps in predicting patient outcomes, reducing costs, improving operational efficiency,
              and identifying patterns in disease outbreaks.
            </p>
          </div>
        </div>
      </section>

      {/* Key Concepts Section */}
      <section ref={keyConceptsSectionRef} className="key-concepts-section animated-section">
  <div class="center-container">
  <h2 class="introh2"> Key Concepts</h2>
</div>
  <p className="section-description">
    Below are some essential concepts within Biomedical Informatics that form the backbone of the field:
  </p>
  <div className="concepts-grid">
    <div className="concept animated-card">
      <h3 className="concept-title">DNA Sequencing</h3>
      <p className="concept-description">
        DNA sequencing is a method used to determine the order of nucleotides in a DNA molecule. It allows scientists to analyze genetic variation, which is crucial in identifying genetic disorders, understanding the
        genetic basis of diseases, and creating personalized medicine strategies.
      </p>
    </div>
    <div className="concept animated-card">
      <h3 className="concept-title">Machine Learning in Healthcare</h3>
      <p className="concept-description">
        Machine learning (ML) in healthcare involves training algorithms to make predictions or decisions based on healthcare data. From predicting patient deterioration to detecting diseases in medical imaging, ML
        can revolutionize the way healthcare is delivered by improving accuracy, efficiency, and patient outcomes.
      </p>
    </div>
    <div className="concept animated-card">
      <h3 className="concept-title">Big Data Analytics</h3>
      <p className="concept-description">
        Big data analytics refers to the process of analyzing vast amounts of healthcare data, often from multiple sources. The insights gained from big data analytics enable healthcare providers to improve patient care,
        optimize resource allocation, and enhance operational efficiencies.
      </p>
    </div>
  </div>
</section>

{/* Tools & Technologies Section */}
<section ref={toolsTechSectionRef} className="tools-tech-section animated-section">
  <div class="center-container">
  <h2 class="introh2"> Tools & Technologies</h2>
</div>
  <p className="section-description">
    Biomedical Informatics relies on a wide range of tools and technologies that help in data analysis, visualization, and research. These include programming languages, specialized libraries, and platforms designed
    for computational biology.
  </p>
  <div className="tools-list">
    <div className="tool animated-card">
      <img src="img/python.png" alt="Python" className="tool-icon" />
      <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="tool-link">Python</a>
      <p className="tool-description">
        Python is a popular programming language in biomedical informatics due to its extensive libraries for data analysis (Pandas, NumPy), machine learning (TensorFlow, scikit-learn), and bioinformatics (Biopython).
      </p>
    </div>
    <div className="tool animated-card">
      <img src="img/R.png" alt="R" className="tool-icon" />
      <a href="https://www.r-project.org/" target="_blank" rel="noopener noreferrer" className="tool-link">R</a>
      <p className="tool-description">
        R is widely used for statistical analysis and data visualization. In biomedical informatics, R is often used for analyzing genomic data and conducting epidemiological studies.
      </p>
    </div>
    <div className="tool animated-card">
      <img src="img/Bioconductor.png" alt="Bioconductor" className="tool-icon" />
      <a href="https://www.bioconductor.org/" target="_blank" rel="noopener noreferrer" className="tool-link">Bioconductor</a>
      <p className="tool-description">
        Bioconductor is an open-source software project that provides tools for the analysis and comprehension of genomic data. It is specifically designed for bioinformatics and computational biology tasks.
      </p>
    </div>
  </div>
</section>


     {/* Learning Path Section */}
<section ref={learningPathSectionRef} className="learning-path-section">
  <div className="learning-path-center-container">
    <div class="center-container">
  <h2 class="introh2">  Your Learning Path</h2>
</div>
  </div>
  <div className="learning-path-path-content">
    <p className="learning-path-description">
      To master Biomedical Informatics, follow these steps to gain a comprehensive understanding of the field:
    </p>
    <ul className="learning-path-list">
      <li><strong>Step 1:</strong> Start with the fundamentals of data science and programming. Learn Python or R for data analysis.</li>
      <li><strong>Step 2:</strong> Study genomics and its applications in healthcare, focusing on the importance of DNA sequencing and genetic research.</li>
      <li><strong>Step 3:</strong> Delve into clinical informatics to understand how medical data is used for patient care optimization.</li>
      <li><strong>Step 4:</strong> Learn about healthcare analytics and how big data is shaping modern medicine.</li>
      <li><strong>Step 5:</strong> Explore machine learning algorithms and how they can be applied to healthcare challenges.</li>
    </ul>
  </div>
</section>


      <Allfooter />
    </div>
  );
}

export default Allbio;
