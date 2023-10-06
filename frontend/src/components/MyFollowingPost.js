import React, { useState, useEffect } from "react";
import "./MyFollowingPost.css"

export default function MyFollowingPost() {
    const [followersCount, setFollowersCount] = useState(7);

    const handleFollowClick = async (followerName) => {
        try {
        const response = await fetch('http://localhost:5000/api/incrementFollowersCount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ followerName }),
             });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            
            setFollowersCount(prevCount => prevCount + 1);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    useEffect(() => {
        const fetchFollowersCount = async () => {
            try {
    const response = await fetch('http://localhost:5000/api/followersCount');
                if (!response.ok) {
     throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFollowersCount(data.followersCount);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchFollowersCount();
    }, []);

    const externalImages = [
        "/img/elon.jpg",
        "/img/elon2.jpg",
        "/img/elon3.jpg",
        "/img/elon4.jpg",
        "/img/elon5.jpg",
        "/img/elon6.jpg",
        "/img/elon7.jpg",
    ];

    return (
        <div className="home">
        <div>
            <h2>followings: {followersCount}</h2>
        </div>
        <center>
            <table>
                <thead>
                    <tr>
                     <th>Name</th>
                        <th>Image</th>
                        <th>Follow me</th>
                    </tr>
                </thead>
                <tbody>
                    {externalImages.map((image, index) => (
                        <tr key={index}>
                            <td>{`Follower ${index + 8}`}</td>
                            <td>
                                <img
                                    src={image}
                                    alt={`follower ${index + 1}`}
                                    className="avatar" // Add the 'avatar' class here
                                    style={{ height: '50px', width: '50px' }}
                                />
                            </td>
                            <td>
       <button onClick={() => handleFollowClick(`Follower ${index + 8}`)} style={{ background: 'red' }}>Follow Me</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </center>
    </div>
);
}
