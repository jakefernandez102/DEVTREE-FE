
const NotFoundView = () => {


  return (
    <>
      <div className="py-[10rem] w-[40rem]  bg-slate-600 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
            <div className="max-w-md">
                <div className="text-5xl text-center pb-5 text-red-400 font-dark font-bold">404</div>
                  <p
                    className="text-2xl text-white md:text-3xl font-light leading-normal"
                    style={{ fill: 'white' }}
                  >Sorry we couldn't find this page. </p>
          </div>
            <div className="max-w-lg">
            <img src="/404.svg" alt="Not found image" />
          </div>
          
        </div>
      </div>
    </>
  )
}

export default NotFoundView