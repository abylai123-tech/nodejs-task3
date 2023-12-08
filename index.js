const http=require('http')

let student=[]

http.createServer((request,response)=>{

  console.log(request.url)
  
  if(request.url=='/student'){
    response.statusCode=200;
    response.end('<h1>hello student</h1>');
  }
  else if(request.url=='/student/num'){
    response.statusCode=200;
    response.end('<h1>hello student num</h1>');
  }
  else if(request.url=="/teacher"){
    response.statusCode=200;
    response.end('<h1>hello teacher</h1>');
  }
  else{
    response.statusCode=404
    response.end('<h1>NotFound</h1>');
  }

//  if(request.method=='POST'){
//   student.push(request.url.slice(1))
//   console.log(student)
//   response.end('<h1>студент добавлен</h1>')
//  }

//  else if(request.method=='GET'){
//   console.log(student)          
//   response.end(`<h1>${student[request.url.slice(1)]}</h1>`)
//  }
}).listen(3000);
