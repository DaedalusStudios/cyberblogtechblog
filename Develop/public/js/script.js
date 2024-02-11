document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.delete-comment').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // be completely sure
            if (confirm('Are you sure you want to delete this comment?')) {
            const commentId = this.getAttribute('data-comment-id');
            fetch(`/api/comment/${commentId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Error deleting comment');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.delete-post').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // be completely sure
            if (confirm('Are you sure you want to delete this post?')) {
            const commentId = this.getAttribute('data-post-id');
            fetch(`/api/post/${commentId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Error deleting post');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        });
    });
});