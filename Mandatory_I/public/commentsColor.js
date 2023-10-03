function highlightCodeComments() {
    const codeSnippets = document.querySelectorAll('.code-snippet, .terminal-snippet');
    codeSnippets.forEach(snippet => {
        const lines = snippet.innerHTML.split('\n');
        if (snippet.classList.contains('code-snippet')) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim().startsWith('//')) {
                    lines[i] = lines[i].replace(/(\/\/.*)/, '<span class="full-comment-line">$1</span>');
                } else if (lines[i].includes('//')) {
                    lines[i] = lines[i].replace(/(\/\/.*)/, '<span class="inline-comment">$1</span>');
                }
            }
        } else if (snippet.classList.contains('terminal-snippet')) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim().startsWith('#')) {
                    lines[i] = lines[i].replace(/(#.*)/, '<span class="full-comment-line">$1</span>');
                } else {
                    lines[i] = lines[i].replace(/\b(cd|mkdir|ls|rm|npm|node)\b/g, '<span class="keyword">$1</span>');
                }
            }
        }
        snippet.innerHTML = lines.join('\n');
    });
}

document.addEventListener('DOMContentLoaded', highlightCodeComments);
