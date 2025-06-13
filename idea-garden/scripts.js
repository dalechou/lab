const ideaFiles = [
  'ideas/asdf.txt',
  // Add more as needed
];

const ideaList = document.getElementById('ideaList');

Promise.all(ideaFiles.map(file =>
  fetch(file).then(resp => resp.text())
)).then(contents => {
  ideaList.innerHTML = '';

  contents.forEach(text => {
    const lines = text.trim().split('\n');
    const title = lines[0] || 'Untitled';
    const date = lines[1] || '';
    const body = lines.slice(2).join('\n');

    const div = document.createElement('div');
    div.className = 'idea';
    div.innerHTML = `
      <h2>${title}</h2>
      <small>${date}</small>
      <pre>${body}</pre>
    `;
    ideaList.appendChild(div);
  });
}).catch(err => {
  ideaList.innerHTML = 'Error loading ideas.';
  console.error(err);
});
