
import logo from '../../assets/logo.jpg'
const Footer = () => {

    return (
        <>
            <div className=' text-white grid grid-cols-4  bg-[rgb(28,27,27)] p-5 '>
                <div>
                    <img src={logo} alt='' className=' w-60 h-auto ' />
                    <h2 className=' font-bold text-xl mb-3'>Hệ thống giày số 1 Hà Nội</h2>
                    <p>Hotline : 0982970419</p>
                    <p>Store1 : 96 Trần Hào, PY</p>
                    <p>Store2 : 27 Phạm Ngọc Thảo , Tân Phú</p>
                </div>
                <div>

                    <h2 className=' font-bold text-xl mb-3'>Hỗ trợ</h2>
                    <p>7 cách bảo quản giày thể thao tốt nhất</p>
                    <p>Giữ "phong độ" cho Sneaker trắng sáng ra sao</p>
                    <p>9 kĩ thuật làm đẹp da cho U30</p>
                </div>
                <div>
                    <h2 className=' font-bold text-xl mb-3'>Thông tin</h2>
                    <p>Hỗ trợ</p>
                    <p>Chính sách đổi trả</p>
                    <p>Bảo mật</p>
                    <p>Liên hệ</p>
                    <p>Hệ thống cửa hàng</p>
                </div>

            </div>
        </>
    )
}
export default Footer;