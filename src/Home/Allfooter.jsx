import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { IoIosHelpCircle } from 'react-icons/io';

function Allfooter() {
    return (
        <footer className="bg-gradient text-white py-5" style={{ backgroundColor:  '#004d4d' }}>
            <div className="container text-center">
                <h2 className="mb-4">Explore DNA & RNA Sequence Analysis</h2>
    
                <h5>Connect with Us</h5>
                <div className="mb-3">
                    <a href="https://wa.me/01140339077" className="text-white mx-2 hover-effect" aria-label="WhatsApp">
                        <FaWhatsapp size={24} /> 
                    </a>
                    <a href="#" className="text-white mx-2 hover-effect" aria-label="Facebook">
                        <FaFacebookF size={24} />
                    </a>
                    <a href="#" className="text-white mx-2 hover-effect" aria-label="Instagram">
                        <FaInstagram size={24} />
                    </a>
                    <a href="#" className="text-white mx-2 hover-effect" aria-label="Twitter">
                        <FaTwitter size={24} />
                    </a>
                    <a href="#" className="text-white mx-2 hover-effect" aria-label="GitHub">
                        <FaGithub size={24} />
                    </a>
                </div>

                

                <h5>Need Help?</h5>
                <div className="mb-4">
                    <a href="#" className="text-white mx-3"><IoIosHelpCircle size={20} /> Contact Support</a>
                    <a href="#" className="text-white mx-3">FAQ</a>
                    <a href="#" className="text-white mx-3">Live Chat</a>
                </div>

                <p className="mt-4">© 2024 BioTools. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Allfooter;
