import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context
  return (
    <Layout>
		{loading && <Loader />}
			{/* {order.filter(obj => obj.userid == userid).length} */}
		{order.filter(obj => obj.userid == userid).length > 0 ?
			(<>
			<div className=" h-full pt-10">
				{
					order.filter(obj => obj.userid == userid).map((order) => {
						// order.cartItems.map()
						return (<>
							<div class="inline-flex items-center justify-center w-full">
								<hr class="w-2/4 h-px bg-gray-200 border-0 dark:bg-gray-700" style={{ backgroundColor: mode === 'dark' ? '#9ca3af' : '', }}/>
								<span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2" style={{ backgroundColor: mode === 'dark' ? 'rgb(17, 24, 39)' : '', color: mode === 'dark' ? 'white' : '', }}>{order.date}</span>
							</div>
							<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
								{
									order.cartItems.map((item) => {
										return (
										<div className="rounded-lg md:w-2/3 mt-5">
											<div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
											<img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
											<div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
												<div className="mt-5 sm:mt-0">
												<h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
												<p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
												<p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
												</div>
											</div>
											</div>
										</div>
										)
									})
								}
							</div>
						</>)
					})
				}
			</div>
			</>)
			:
			(
			<h2 className=' text-center tex-2xl' style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>Not Order</h2>
			)
		}
		</Layout>
	)
}

export default Order
