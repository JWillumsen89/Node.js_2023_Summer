document.querySelectorAll('.code-snippet').forEach(el => {
    const lines = el.innerHTML.split('\n');
    el.innerHTML = lines
        .map(line => {
            if (line.trim().startsWith('//')) {
                // Full comment line
                return '<span class="full-comment-line">' + line + '</span>';
            } else if (line.includes('//')) {
                // Inline comment
                const parts = line.split('//');
                return parts[0] + '<span class="inline-comment">//' + parts[1] + '</span>';
            } else {
                return line;
            }
        })
        .join('\n');
});
