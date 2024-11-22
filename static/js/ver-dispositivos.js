document.getElementById('table').addEventListener('click', function(event) {
    const row = event.target.closest('tr');
    if (row) {
        window.location.href=informacionDispositivoUrl+row.id;
    }
    
});
