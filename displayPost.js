// displayPosts.js

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayPosts(posts) {
    const postsBody = document.getElementById('posts-body');
    postsBody.innerHTML = ''; // Clear existing content

    posts.forEach(post => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.tags}</td>
            <td>${post.category}</td>
            <td>${post.postType}</td>
            <td>${new Date(post.publishDate).toLocaleDateString()}</td>
            <td>${post.content}</td>
        `;

        postsBody.appendChild(row);
    });
}