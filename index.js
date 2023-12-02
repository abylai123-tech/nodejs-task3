const http = require('http');
const fs = require('fs').promises;

const filename = 'students.json';
let students = [];

async function readStudentsFromFile() {
  try {
    const data = await fs.readFile(filename, 'utf-8');
    students = JSON.parse(data);
  } catch (error) {
    students = [];
  }
}

async function writeStudentsToFile() {
    await fs.writeFile(filename, JSON.stringify(students, null, 2), 'utf-8');
  }
  
const server = http.createServer(async (request, response) => {
  if (request.method === 'POST') {
    let data = '';

    request.on('data', chunk => {
      data += chunk;
    });

    request.on('end', async () => {
      const studentName = data.trim();
      students.push(studentName);
      await writeStudentsToFile();
      console.log(students);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<h1>OK</h1>');
    });
  } else if (request.method === 'GET') {
    const index = parseInt(request.url.slice(1));

    await readStudentsFromFile();

    if (students.length > 0 && index >= 0 && index < students.length) {
      const studentName = students[index];
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(studentName);
    } else {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1>Not found</h1>');
    }
  } else if (request.method === 'DELETE') {
    const studentNameToDelete = request.url.slice(1);

    if (students.includes(studentNameToDelete)) {
      students = students.filter(student => student !== studentNameToDelete);
      await writeStudentsToFile();
      console.log(students);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<h1>OK</h1>');
    } else {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1>Not found</h1>');
    }
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>Not found</h1>');
  }
});

const port = 3000;

server.listen(port, async () => {
  await readStudentsFromFile();
  console.log(`Server is running on port ${port}`);
});