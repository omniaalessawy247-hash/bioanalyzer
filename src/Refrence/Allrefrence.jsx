 import React, { useState } from 'react';
 import Allnavbar from '../Home/Allnavbar';
 import Allfooter from '../Home/Allfooter';
 
 function Allrefrence() {
   const [filter, setFilter] = useState('');
 
   
   const filterBooks = (category) => {
     setFilter(category);
   };
 
   return (
     <div>
       <Allnavbar />
       <br></br>
       <br></br>
       <br></br>
       
 
       <header className="page-header text-center py-5">
         <h1 className="page-title">References</h1>
         <p className="page-description">Explore books, articles, and research papers in Bioinformatics.</p>
         {/* شريط البحث */}
         <input type="text" placeholder="Search for books, articles..." className="search-bar" />
       </header>
 
       {/* فلاتر التصنيف */}
       <div className="filters container py-4 text-center">
         <button onClick={() => filterBooks('books')} className="filter-btn">Books</button>
         <button onClick={() => filterBooks('articles')} className="filter-btn">Articles</button>
         <button onClick={() => filterBooks('papers')} className="filter-btn">Research Papers</button>
       </div>
 
       {/* قسم الكتب */}
       <section className="reference-category books-section container py-5">
         <h2 className="category-title">Books</h2>
         <div className="book-list">
           <div className="book-item">
             <p className="book-title">Bioinformatics: Sequence and Genome Analysis</p>
             <p className="book-description">This book provides a comprehensive guide to sequence analysis and genome assembly.</p>
           </div>
           <div className="book-item">
             <p className="book-title">Introduction to Bioinformatics</p>
             <p className="book-description">A beginner-friendly guide to the basics of bioinformatics and computational biology.</p>
           </div>
         </div>
       </section>
 
       {/* قسم المقالات */}
       <section className="reference-category articles-section container py-5">
         <h2 className="category-title">Articles</h2>
         <ul className="category-list">
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6330853/" className="article-link" target="_blank" rel="noopener noreferrer">Impact of Machine Learning in Bioinformatics</a></li>
           <li><a href="https://www.nature.com/articles/s41592-018-0004-0" className="article-link" target="_blank" rel="noopener noreferrer">Bioinformatics Tools for Genomic Data Analysis</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568387/" className="article-link" target="_blank" rel="noopener noreferrer">Bioinformatics in Personalized Medicine</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6353199/" className="article-link" target="_blank" rel="noopener noreferrer">Advances in Genomics and Precision Medicine</a></li>
           <li><a href="https://www.nature.com/articles/s41592-019-0621-0" className="article-link" target="_blank" rel="noopener noreferrer">Next-Generation Sequencing in Bioinformatics</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6718669/" className="article-link" target="_blank" rel="noopener noreferrer">Big Data in Bioinformatics</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6483777/" className="article-link" target="_blank" rel="noopener noreferrer">The Role of Bioinformatics in Drug Discovery</a></li>
           <li><a href="https://www.nature.com/articles/s41592-018-0169-9" className="article-link" target="_blank" rel="noopener noreferrer">Computational Approaches in Disease Genomics</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6784317/" className="article-link" target="_blank" rel="noopener noreferrer">Bioinformatics in Cancer Research</a></li>
           <li><a href="https://www.nature.com/articles/s41592-020-0789-3" className="article-link" target="_blank" rel="noopener noreferrer">The Use of AI in Bioinformatics</a></li>
         </ul>
       </section>
 
       {/* قسم الأبحاث */}
       <section className="reference-category papers-section container py-5">
         <h2 className="category-title">Research Papers</h2>
         <ul className="category-list">
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568387/" className="paper-link" target="_blank" rel="noopener noreferrer">Bioinformatics in Personalized Medicine</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6330853/" className="paper-link" target="_blank" rel="noopener noreferrer">Genomic Data Analysis using Deep Learning</a></li>
           <li><a href="https://www.nature.com/articles/s41592-018-0004-0" className="paper-link" target="_blank" rel="noopener noreferrer">Tools and Techniques in Bioinformatics</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5741104/" className="paper-link" target="_blank" rel="noopener noreferrer">Single-Cell RNA-Seq in Cancer Research</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6938663/" className="paper-link" target="_blank" rel="noopener noreferrer">Deep Learning in Bioinformatics</a></li>
           <li><a href="https://www.nature.com/articles/s41592-019-0535-x" className="paper-link" target="_blank" rel="noopener noreferrer">Challenges in Genomic Data Analysis</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6743279/" className="paper-link" target="_blank" rel="noopener noreferrer">Machine Learning in Bioinformatics: A Review</a></li>
           <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5730862/" className="paper-link" target="_blank" rel="noopener noreferrer">The Future of Computational Biology</a></li>
           <li><a href="https://www.nature.com/articles/s41592-019-0713-x" className="paper-link" target="_blank" rel="noopener noreferrer">Single-Cell Analysis in Bioinformatics</a></li>
           <li><a href="https://www.nature.com/articles/s41592-019-0623-y" className="paper-link" target="_blank" rel="noopener noreferrer">Applications of Bioinformatics in Drug Development</a></li>
         </ul>
       </section>
 
       <Allfooter />
     </div>
   );
 }
 
 export default Allrefrence;
 