fetch("http://localhost:3000/api/courses")
  .then((res) => res.json())
  .then((data)=>console.log(data))

