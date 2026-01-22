import app from "./app"

app.listen(3333, () => {
  console.log("🚀 Backend rodando em http://localhost:3333")
  console.log("📚 Swagger em http://localhost:3333/api/docs")
})
