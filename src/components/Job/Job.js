import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "../../styles/Job/Job.css";

Modal.setAppElement('#root');

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');
    const [dropdowns, setDropdowns] = useState({
        region: false,
        jobType: false,
        experience: false,
        education: false
    });

    const [filters, setFilters] = useState({
        region: [],
        jobType: [],
        experience: [],
        education: [],
        search: ''
    });

    const [tempFilters, setTempFilters] = useState({
        region: [],
        jobType: [],
        experience: [],
        education: []
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
        setTempFilters(prevFilters => {
            const updatedFilter = [...prevFilters[name]];
            if (updatedFilter.includes(value)) {
                updatedFilter.splice(updatedFilter.indexOf(value), 1);
            } else {
                updatedFilter.push(value);
            }
            return {
                ...prevFilters,
                [name]: updatedFilter
            };
        });
    };

    const toggleDropdown = (name) => {
        setDropdowns({
            region: false,
            jobType: false,
            experience: false,
            education: false,
            [name]: !dropdowns[name]
        });
        setTempFilters(filters); 
    };

    const applyFilters = (name) => {
        setFilters(tempFilters);
        toggleDropdown(name);
    };

    const resetFilters = (name) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: []
        }));
        setTempFilters(prevTempFilters => ({
            ...prevTempFilters,
            [name]: []
        }));
    };

    const filteredJobs = jobs.filter(job => {
        return (
            (filters.region.length === 0 || filters.region.some(region => job.position.location.name.includes(region))) &&
            (filters.jobType.length === 0 || filters.jobType.some(jobType => job.position.title.includes(jobType))) &&
            (filters.experience.length === 0 || filters.experience.some(experience => job.position["experience-level"].name.includes(experience))) &&
            (filters.education.length === 0 || filters.education.some(education => job.position["required-education-level"].name.includes(education))) &&
            (filters.search === '' || job.position.title.includes(filters.search) || job.company.detail.name.includes(filters.search))
        );
    });

    const getFilterCount = (filterName) => filters[filterName].length;

    return (
        <div>
            <div className="filter-search">
                <div className="filter-container">
                    <div className="filter-group">
                        <button onClick={() => toggleDropdown('region')}>
                            지역별 {getFilterCount('region') > 0 && `(${getFilterCount('region')})`}
                        </button>
                        {dropdowns.region && (
                            <div className="dropdown">
                                <label><input type="checkbox" name="region" value="서울전체" onChange={handleFilterChange} checked={tempFilters.region.includes('서울전체')} /> 서울전체</label>
                                <label><input type="checkbox" name="region" value="강남구" onChange={handleFilterChange} checked={tempFilters.region.includes('강남구')} /> 강남구</label>
                                <label><input type="checkbox" name="region" value="강동구" onChange={handleFilterChange} checked={tempFilters.region.includes('강동구')} /> 강동구</label>
                                <div className="dropdown-buttons">
                                    <button onClick={() => applyFilters('region')}>적용하기</button>
                                    <button onClick={() => resetFilters('region')}>초기화</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="filter-group">
                        <button onClick={() => toggleDropdown('jobType')}>
                            산업별 {getFilterCount('jobType') > 0 && `(${getFilterCount('jobType')})`}
                        </button>
                        {dropdowns.jobType && (
                            <div className="dropdown">
                                <label><input type="checkbox" name="jobType" value="개발" onChange={handleFilterChange} checked={tempFilters.jobType.includes('개발')} /> 개발</label>
                                <label><input type="checkbox" name="jobType" value="디자인" onChange={handleFilterChange} checked={tempFilters.jobType.includes('디자인')} /> 디자인</label>
                                <label><input type="checkbox" name="jobType" value="마케팅" onChange={handleFilterChange} checked={tempFilters.jobType.includes('마케팅')} /> 마케팅</label>
                                <div className="dropdown-buttons">
                                    <button onClick={() => applyFilters('jobType')}>적용하기</button>
                                    <button onClick={() => resetFilters('jobType')}>초기화</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="filter-group">
                        <button onClick={() => toggleDropdown('experience')}>
                            경력 {getFilterCount('experience') > 0 && `(${getFilterCount('experience')})`}
                        </button>
                        {dropdowns.experience && (
                            <div className="dropdown">
                                <label><input type="checkbox" name="experience" value="신입" onChange={handleFilterChange} checked={tempFilters.experience.includes('신입')} /> 신입</label>
                                <label><input type="checkbox" name="experience" value="경력" onChange={handleFilterChange} checked={tempFilters.experience.includes('경력')} /> 경력</label>
                                <label><input type="checkbox" name="experience" value="신입/경력" onChange={handleFilterChange} checked={tempFilters.experience.includes('신입/경력')} /> 신입/경력</label>
                                <label><input type="checkbox" name="experience" value="경력무관" onChange={handleFilterChange} checked={tempFilters.experience.includes('경력무관')} /> 경력무관</label>
                                <div className="dropdown-buttons">
                                    <button onClick={() => applyFilters('experience')}>적용하기</button>
                                    <button onClick={() => resetFilters('experience')}>초기화</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="filter-group">
                        <button onClick={() => toggleDropdown('education')}>
                            학력 {getFilterCount('education') > 0 && `(${getFilterCount('education')})`}
                        </button>
                        {dropdowns.education && (
                            <div className="dropdown">
                                <label><input type="checkbox" name="education" value="학력무관" onChange={handleFilterChange} checked={tempFilters.education.includes('학력무관')} /> 학력무관</label>
                                <label><input type="checkbox" name="education" value="고등학교졸업" onChange={handleFilterChange} checked={tempFilters.education.includes('고등학교졸업')} /> 고등학교졸업</label>
                                <label><input type="checkbox" name="education" value="대학졸업(2,3년)" onChange={handleFilterChange} checked={tempFilters.education.includes('대학졸업(2,3년)')} /> 대학졸업(2,3년)</label>
                                <label><input type="checkbox" name="education" value="대학졸업(4년)" onChange={handleFilterChange} checked={tempFilters.education.includes('대학졸업(4년)')} /> 대학졸업(4년)</label>
                                <label><input type="checkbox" name="education" value="석사졸업" onChange={handleFilterChange} checked={tempFilters.education.includes('석사졸업')} /> 석사졸업</label>
                                <label><input type="checkbox" name="education" value="박사졸업" onChange={handleFilterChange} checked={tempFilters.education.includes('박사졸업')} /> 박사졸업</label>
                                <div className="dropdown-buttons">
                                    <button onClick={() => applyFilters('education')}>적용하기</button>
                                    <button onClick={() => resetFilters('education')}>초기화</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="search-container">
                    <input type="text" name="search" placeholder="제목, 회사명 검색" onChange={handleFilterChange} />
                    <button onClick={() => setFilters({ region: [], jobType: [], experience: [], education: [], search: '' })}>검색</button>
                </div>
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
