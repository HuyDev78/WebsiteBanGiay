
import new1 from '../../assets/new1.png'
import new2 from '../../assets/new2.png'
import new3 from '../../assets/new3.png'

const New = () => {
    return (
        <>
            <div className=' w-full h-auto bg-[rgb(28,27,27)] text-white mt-15 p-5'>
                <p>.</p>
                <h1 className=' text-2xl text-center font-bold mt-2'>TIN TỨC MỚI NHẤT</h1>
                <div className=' grid grid-cols-3 gap-10 max-w-[70%] mx-auto mt-10'>
                    <div className=' h-auto text-center'>
                        <img src={new1} alt='' className='' />
                        <h3 className=' text-xl font-bold my-5'>7 cách bảo vệ giày thể thao tốt nhất</h3>
                        <a className=' text-green-500'>Xem thêm</a>
                    </div>
                    <div className=' h-auto text-center'>
                        <img src={new2} alt='' className='' />
                        <h3 className=' text-xl font-bold my-5'>Giữ "phong độ" cho Sneaker trắng sáng ra sao</h3>
                        <a className=' text-green-500'>Xem thêm</a>
                    </div>
                    <div className=' h-auto text-center'>
                        <img src={new3} alt='' className='' />
                        <h3 className=' text-xl font-bold my-5'>9 kĩ thuật làm đẹp da .........cho U30</h3>
                        <a className=' text-green-500'>Xem thêm</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default New;

