import { createLazyFileRoute } from '@tanstack/react-router'
import RollingGallery from '../components/RollingGallery'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="relative">
            <h1 className=" font-black text-5xl text-center translate-y-[130px]">
                Hello, I'm
                <br className="block sm:hidden" /> Oscar Yiu
            </h1>
            <RollingGallery autoplay pauseOnHover />
        </div>
    )
}
