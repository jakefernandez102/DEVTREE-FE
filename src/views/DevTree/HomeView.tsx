import Header from "../../components/Header"
import SearchForm from "../../components/SearchForm"

const HomeView = () => {
  return (
    <>
      <Header/>

      <main
        className='bg-gray-100 py-10 min-h-screen lg:bg-home lg:bg-home-xl bg-no-repeat bg-right-top'
      >
        <div className='max-w-5xl mx-auto mt-10'>
          <div className='lg:w-1/2 px-10 lg:p-0 space-y-6'>
            <h1 className='text-6xl font-black'>All your <span className='text-cyan-400 '>Social networks</span> by your links</h1>

            <p className='text-slate-800 text-xl'>Join to more than 200k devs sharing their social network, share your Facebook, TikTok, Instagram, Youtube, Github and more professional profiles</p>
          
            <SearchForm/>
          </div>
        </div>
      </main>
    </>
  )
}

export default HomeView
