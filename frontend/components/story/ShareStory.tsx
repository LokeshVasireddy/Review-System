"use client";

import React,{useState} from 'react'
import {CompanyType} from '@/type'
import {useRouter} from 'next/navigation'
import Select from 'react-select'
import { handleRequest } from '../utils/apiRequest';
import { BASE_API_URL } from '@/server';
import axios from 'axios';
import { useEffect } from 'react';
import { Briefcase, FileText, Heart, User } from 'lucide-react';
import { Building2 } from 'lucide-react';


const ShareStory = () => {
  // state variables
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[]>([]);

  // formdata for our backend request
  const [formData, setFormData] = useState({
    vibe: "neutral",
    companyName: "",
    isAnonymous: false,
    name: "",
    userType: "individual customer",
    title: "",
    story: "",
  });
  const router = useRouter();
  const companyOptions = companies.map((c) => ({
    label: c.name,
    value: c.name,
  }));

  // Vibe options
  const vibeOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "positive", label: "Positive" },
    { value: "negative", label: "Negative" },
  ];
  const userTypeOptions = [
    { value: "individual customer", label: "Individual Customer" },
    { value: "business customer", label: "Business Customer" },
    { value: "bank employee", label: "Bank Employee" },
    { value: "former employee", label: "Former Employee" },
    { value: "investor", label: "Investor" },
    { value: "other", label: "Other" },
  ];
  //function to handle form changes
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};
  // fetch our company from backend
useEffect(() => {
  const fetchCompanies = async () => {
    const companyReq = async () => 
      await axios.get(`${BASE_API_URL}/companies/all`);
    
    const result = await handleRequest(companyReq, setIsLoading);
    
    if (result?.data.status === "success") {
      setCompanies(result.data.data.companies);
    }
  };
  fetchCompanies();
}, []);

//submit handler for our form
const handleSubmit = async (e: React.FormEvent) => {    
    e.preventDefault();
}
  return (
    <div className="min-h-screen mt-10 bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Share Your Banking Experience
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1 text-gray-700">
                <Heart className="inline w-4 h-4 mr-2" />
                Vibe
            </label>
            <Select
              name="vibe"
              options={vibeOptions}
              value={{
                value: formData.vibe,
                label: formData.vibe.charAt(0).toUpperCase() + formData.vibe.slice(1),
              }}
              onChange={(selected) => 
                setFormData({ ...formData, vibe: selected?.value || "neutral" })
              }
              isSearchable={false}
            />
            </div>
            <div>
            <label className="block font-medium mb-1 text-gray-700">
                <Building2 className="inline w-4 h-4 mr-2" />
                Company
            </label>
            <Select
                options={companyOptions}
                value={companyOptions.find(
                (opt) => opt.value === formData.companyName
                )}
                onChange={(selected) =>
                setFormData({ ...formData, companyName: selected?.value || "" })
                }
                placeholder="Select a company"
                isSearchable
            />
            </div>
            {/* Anonymous Toggle */}
                <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleChange}
                />
                <label className="text-gray-700">Post Anonymously</label>
                </div>
                {/* Name field - only show if not anonymous */}
                {!formData.isAnonymous && (
                <div>
                    <label className="block font-medium mb-1 text-gray-700">
                    <User className="inline w-4 h-4 mr-2" />
                    Your Name
                    </label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className="w-full border px-3 py-2 rounded"
                    />
                </div>
                )}
                <div>
                    <label className="block font-medium mb-1 text-gray-700">
                    <Briefcase className="inline w-4 h-4 mr-2" />
                    User Type
                    </label>
                    <Select
                    name="userType"
                    options={userTypeOptions}
                    value={{
                        value: formData.userType,
                        label: formData.userType
                        .split(" ")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" "),
                    }}
                        onChange={(selected) => {
                        setFormData({
                        ...formData,
                        userType: selected?.value || "individual customer",
                        })
                    }}
                    isSearchable
                    />
                </div>
                {/* Title */}
                <div>
                <label className="block font-medium mb-1 text-gray-700">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Story Title
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="One-line summary of your story"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                </div>
                
        </form>
      </div>
    </div>
  );

};

export default ShareStory
