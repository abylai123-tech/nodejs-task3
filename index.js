const http = require('http');

let students = [];

http.createServer((request,response) => {
  console.log(request.url,request.method);
  // Метод GET
  if(request.url.startsWith('/student')); {
    if (request.method == 'GET') {
      students.push(request.url.slice(1));
      response.statusCode = 200;
      response.end(`<h1>Hello students!</h1>`)
    }
    // Метод POST
      else if(request.method == 'POST') {
        students.push(request.url.slice(1));
        console.log(students);
        response.end('<h1>Students added</h1>')
      }
    // Метод DELETE
      else if(request.method == 'DELETE') {
        let name = request.url.substring(9);
        
        let foundStudent = students.find(students => students == name);

        if(foundStudent) {
          students = students.filter(students => students !== name);
          response.statusCode = 200;
          response.end(`<h1>Student ${name} deleted </h1>`)
        } else {
          response.statusCode = 404;
          response.end('Student not found');
        }
      }
  }
}).listen(3000);
