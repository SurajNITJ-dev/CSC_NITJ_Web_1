import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import NeuralNetwork from '../components/NeuralNetwork';

// --- 2. REUSABLE CYBER INPUT (UPDATED LABELS) ---
const CyberInput = ({ label, name, value, onChange, type = "text", placeholder }) => {
    return (
      <div className="group relative mb-8"> {/* Increased bottom margin for spacing */}
        
        {/* UPDATED LABEL: Bigger, Bolder, Brighter */}
        <label className="block text-xs md:text-sm font-bold uppercase tracking-widest text-cyan-400 mb-3 font-mono shadow-cyan-glow">
          {label}
        </label>

        <div className="relative">
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyan-500 transition-all group-hover:w-full group-hover:h-full group-hover:border-none group-hover:bg-cyan-500/5 rounded-sm pointer-events-none" />
          
          <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-[#050b14]/80 border-b border-gray-600 text-white px-4 py-4 font-mono text-sm md:text-base focus:outline-none focus:border-cyan-400 focus:bg-cyan-900/10 transition-all placeholder-gray-600 relative z-10"
          />
          
          {/* Animated Bottom Line */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-400 w-0 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#22d3ee]" />
        </div>
      </div>
    );
  };

// --- 3. MAIN EDIT PROFILE PAGE ---
const EditProfilePage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
    github: '',
    linkedin: '',
    rollNumber: '',
    branch: '',
    college: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || '',
          email: data.email || '', 
          role: data.role || '',   
          bio: data.bio || '',
          github: data.github || '',
          linkedin: data.linkedin || '',
          rollNumber: data.rollNumber || '',
          branch: data.branch || '',
          college: data.college || ''
        });
      })
      .catch((err) => {
        console.error("Failed to load profile data", err);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/update`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
    })
    .then(res => {
        if(res.ok) {
            setTimeout(() => {
                setSaving(false);
                navigate('/profile'); 
            }, 1000);
        } else {
            setSaving(false);
            alert("Failed to update profile.");
        }
    })
    .catch(err => {
        console.error(err);
        setSaving(false);
    });
  };

  return (
    <div className="bg-[#010714] text-white min-h-screen relative flex flex-col font-sans">
      
      <NeuralNetwork />

      <div className="relative z-10 flex-grow flex items-center justify-center py-24 px-6">
        
        <div className="w-full max-w-2xl bg-[#0a1628]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-wider text-white">
                        Edit <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Your Identity</span>
                    </h1>
                    <p className="text-xs font-mono text-gray-400 mt-2 tracking-widest">
                       
                    </p>
                </div>
                <div className="w-10 h-10 border border-cyan-500/30 rounded-lg flex items-center justify-center bg-cyan-900/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <div className="w-4 h-4 bg-cyan-400 rounded-sm animate-pulse" />
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Row 1: Basics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CyberInput 
                        label="Profile Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter your name"
                    />
                    <div className="opacity-60 pointer-events-none grayscale">
                        <CyberInput 
                            label="Email [LOCKED]" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                {/* Academic/College Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CyberInput 
                        label="Roll Number" 
                        name="rollNumber" 
                        value={formData.rollNumber} 
                        onChange={handleChange} 
                        placeholder="e.g. 22103045"
                    />
                    <CyberInput 
                        label="Branch" 
                        name="branch" 
                        value={formData.branch} 
                        onChange={handleChange} 
                        placeholder="e.g. CSE"
                    />
                    <CyberInput 
                        label="College" 
                        name="college" 
                        value={formData.college} 
                        onChange={handleChange} 
                        placeholder="e.g. NIT Jalandhar"
                    />
                </div>

                {/* Row 2: Bio */}
                <CyberInput 
                    label="Bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    placeholder="Brief description of your role..."
                />

                {/* Row 3: Socials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <CyberInput 
                        label="GitHub Link" 
                        name="github" 
                        value={formData.github} 
                        onChange={handleChange} 
                        placeholder="github.com/username"
                    />
                     <CyberInput 
                        label="LinkedIn" 
                        name="linkedin" 
                        value={formData.linkedin} 
                        onChange={handleChange} 
                        placeholder="linkedin.com/in/username"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-10 pt-6 border-t border-white/10">
                    <button 
                        type="button" 
                        onClick={() => navigate('/profile')}
                        className="flex-1 py-4 rounded-xl border border-gray-600 text-gray-400 font-mono text-xs font-bold tracking-[0.2em] hover:bg-white/5 transition-colors uppercase cursor-pointer"
                    >
                        Abort
                    </button>
                    
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="flex-1 py-4 rounded-xl bg-cyan-500 text-[#010714] font-mono text-xs font-bold tracking-[0.2em] hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {saving ? (
                            <>
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce" />
                                Processing...
                            </>
                        ) : 'Save Configuration'}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;