import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "../../styles/Job/Job.css"; 

Modal.setAppElement('#root');

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    const [filters, setFilters] = useState({
        region: '',
        jobType: '',
        experience: '',
        education: '',
        search: ''
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/data`);
                console.log('API Response:', response.data);

                const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                console.log('Parsed Data:', parsedData);

                if (parsedData && parsedData.jobs && Array.isArray(parsedData.jobs.job)) {
                    setJobs(parsedData.jobs.job);
                } else {
                    console.error('Invalid data format', parsedData);
                    setJobs([]);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setJobs([]);
            }
        };

        fetchJobs();
    }, []);

    const formatLocation = (location) => {
        const locations = location.split(',').map(loc => loc.split(' &gt; ').map(part => part.trim()));
        if (locations.length > 0) {
            const primaryLocation = locations[0].join(' ');
            const remainingLocationsCount = locations.length - 1;
            if (remainingLocationsCount > 0) {
                return `${primaryLocation} 그 외 지역 ${remainingLocationsCount}개`;
            }
            return primaryLocation;
        }
        return location.trim();
    };

    const openModal = (url) => {
        setModalUrl(url);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalUrl('');
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const filteredJobs = jobs.filter(job => {
        return (
            (filters.region === '' || job.position.location.name.includes(filters.region)) &&
            (filters.jobType === '' || job.position.title.includes(filters.jobType)) &&
            (filters.experience === '' || job.position["experience-level"].name.includes(filters.experience)) &&
            (filters.education === '' || job.position["required-education-level"].name.includes(filters.education)) &&
            (filters.search === '' || job.position.title.includes(filters.search) || job.company.detail.name.includes(filters.search))
        );
    });

    return (
        <div>
            <div className="filter-container">
                <select name="region" onChange={handleFilterChange}>
                    <option value="">지역별</option>
                    <option value="서울">서울</option>
                    <option value="경기">경기</option>
                    <option value="인천">인천</option>
                </select>
                <select name="jobType" onChange={handleFilterChange}>
                    <option value="">산업별</option>
                    <option value="개발">개발</option>
                    <option value="디자인">디자인</option>
                    <option value="마케팅">마케팅</option>
                </select>
                <select name="experience" onChange={handleFilterChange}>
                    <option value="">경력</option>
                    <option value="신입">신입</option>
                    <option value="경력">경력</option>
                </select>
                <select name="education" onChange={handleFilterChange}>
                    <option value="">학력</option>
                    <option value="고졸">고졸</option>
                    <option value="대졸">대졸</option>
                </select>
                <input 
                    type="text" 
                    name="search" 
                    placeholder="제목, 회사명 검색" 
                    onChange={handleFilterChange} 
                />
                <button onClick={() => setFilters({ region: '', jobType: '', experience: '', education: '', search: '' })}>검색</button>
            </div>
            <ul className="job-list">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <li key={index} className="job-item" onClick={() => openModal(job.url)}>
                            <div className="job-header">
                                <h2 className="job-title">{job.position.title}</h2>
                                <span className="company-link">{job.company.detail.name}</span>
                            </div>
                            <div className="job-details">
                                <span className="job-location"><i className="fas fa-map-marker-alt"></i> {formatLocation(job.position.location.name)}</span>
                                <span className="job-industry"><i className="fas fa-industry"></i> {job.position.industry.name}</span>
                                <span className="job-experience"><i className="fas fa-briefcase"></i> {job.position["experience-level"].name}</span>
                                <span className="job-education"><i className="fas fa-graduation-cap"></i> {job.position["required-education-level"].name}</span>
                                <span className="job-salary"><i className="fas fa-dollar-sign"></i> {job.salary.name}</span>
                                <span className="job-expiration-date"><i className="fas fa-calendar-times"></i> {new Date(job["expiration-timestamp"] * 1000).toLocaleDateString()}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No job listings available.</p>
                )}
            </ul>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Job Details"
                className="job-modal"
                overlayClassName="job-modal-overlay"
            >
                <button onClick={closeModal} className="close-modal-btn">Close</button>
                <iframe src={modalUrl} title="Job Details" className="job-modal-iframe"></iframe>
            </Modal>
        </div>
    );
};

export default Job;
