import ChartPanel from "../components/ChartPanel"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-hanami">
            🌸 Projeto Hanami
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <ChartPanel />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

