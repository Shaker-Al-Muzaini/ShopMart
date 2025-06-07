import { EcomLayout } from '@/layouts/ecom-layout';
import BannerAndSlider from '@/components/ecommerce/HomePage/BannerAndSlider';
import BestSeller from '@/components/ecommerce/HomePage/BestSeller';
import SpecialOffer from '@/components/ecommerce/HomePage/SpecialOffer';
import Brand from '@/components/ecommerce/HomePage/Brand';
import Blog from '@/components/ecommerce/HomePage/Blog';

export default function Home() {

    return (
        <EcomLayout>
            <BannerAndSlider/>
            <BestSeller/>
            <SpecialOffer/>
            <Brand/>
            <Blog/>
        </EcomLayout>
    );
}
