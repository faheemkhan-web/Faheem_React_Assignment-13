import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);
    const topRef = useRef(null);

    // Task 1: Fetch Data using useEffect
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Task 4: Use useRef for Input Focus - Auto focus on load
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        // Filter users based on search term
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase()) ||
            user.address.city.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    // Task 5: Add Focus Button
    const handleFocusInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // Task 6: Scroll to Top
    const handleScrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Task 7: Loading State
    if (loading) {
        return <div>Loading...</div>;
    }

    // Task 8: Error Handling
    if (error) {
        return <div>Failed to fetch users: {error}</div>;
    }

    return (
        <div ref={topRef} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>User Directory</h1>

            {/* Task 3: Create Search Input */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search user..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                        padding: '10px',
                        width: '300px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
                <button
                    onClick={handleFocusInput}
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Focus Input
                </button>
                <button
                    onClick={handleScrollToTop}
                    style={{
                        padding: '10px 20px',
                        marginLeft: '10px',
                        fontSize: '16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Scroll to Top
                </button>
            </div>

            {/* Task 2: Display User List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {filteredUsers.map(user => (
                    <div
                        key={user.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <p>{user.address.city}</p>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && searchTerm && (
                <p>No users found matching "{searchTerm}"</p>
            )}
        </div>
    );
}

export default App;