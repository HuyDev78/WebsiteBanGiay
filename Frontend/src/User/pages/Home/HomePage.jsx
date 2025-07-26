
import Header from '../../components/header'
import Button from '../../components/button'
import Tittle from '../../components/tittle'
import ProductList from '../../pages/Product/ProductList'
import New from '../../components/new'
import System from '../../components/system'
import Footer from '../../components/footer'
const HomePage = () => {
    return (
        <>
            <div className=' bg-black'>
                <Header />
                <div className=' w-full h-50 p-7'>
                    <div className=' flex flex-row items-center justify-center'>
                        <Button tittle={'Giày Nam'} />
                        <Button tittle={'Giày Nữ'} />
                        <Button tittle={'Giày Đôi'} />
                    </div>
                </div>
                <Tittle />
                <ProductList />
                <New />
                <System />
                <Footer />

            </div>


        </>
    )
}

export default HomePage;