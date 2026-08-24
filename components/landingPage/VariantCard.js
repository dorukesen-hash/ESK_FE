import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Context/AppContext";
import Image from "next/image";
import Link from "next/link";
import icon from "../../assets/ESK_icon.png";
import Loading from "@/components/Loading";
import {allVariantsInCategories} from "@/hooks/service";

export default function VariantCard({ id }) {
    const { state } = useContext(AppContext);
    const { categories } = state;
    const [item, setItem] = useState(null);

    const allVariants = allVariantsInCategories(categories);

    useEffect(() => {
        setItem(findVariantById(id));
        function findVariantById(variantId) {
            return allVariants.find(v => v.id === variantId);
        }
    }, [allVariants,id]);

    if (!item) return  <div
        className="w-full h-full scale-25 flex items-center justify-center">
        <Loading />
    </div>;

    // Her öğenin subcategoryId'si bellidir; bu id'den doğrudan kendi subcategory'ine ulaşılır
    let category = null;
    let subcategory = null;
    for (const c of categories) {
        const found = (c?.subcategories || []).find(s => s.id === item.subcategoryId);
        if (found) {
            category = c;
            subcategory = found;
            break;
        }
    }
    const product = item.productId
        ? subcategory?.products?.find(p => p.id === item.productId)
        : null;

    // Kart görseli: subcategory_images listesinin 0. indeksindeki image'in url'i
    const subcategoryImageUrl = subcategory?.subcategory_images?.[0]?.image?.url;

    function slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-");
    }

    const categorySlug = slugify(category?.name || "category");
    const subcategorySlug = slugify(subcategory?.name || "subcategory");
    const productSlug = product ? slugify(product.title) : null;
    const variantSlug = slugify(item.title);

    const href = `/products/${categorySlug}/${subcategorySlug}` +
        (productSlug ? `/${productSlug}` : "") +
        `/${variantSlug}`;



    return (
        <div
            className="flex flex-col items-center justify-between overflow-hidden p-1 tablet:px-[36px] tablet:py-[18px]
                border-[2px] border-border-gray border-b-[8px] border-b-[#E9636C] rounded-t-[12px]
                max-h-[558px] max-w-[444px] aspect-[444/558] w-full"
            >
            <Image
                src={subcategoryImageUrl ? `https://cdn.enesdorukesen.com.tr/${subcategoryImageUrl}` : icon}
                alt="Variant Image"
                width={290}
                height={290}
                className="aspect-[330/306] w-[85%] object-contain object-center"
            />
            <div className="flex flex-col items-start w-full">
                <h3 className="text-[16px] tablet:text-[22px] font-bold line-clamp-1">{item.title}</h3>
                <h3 className="text-[12px] tablet:text-[18px] line-clamp-1">{item.stock}</h3>
                <p className="text-[20px] tablet:text-[28px] text-text-blue font-semibold">${item?.one_four_units} <span className="text-[12px] tablet:text-[18px]">/ {item.unit}</span></p>
            </div>
            <Link
                href={href}
                className="text-[12px] tablet:text-[18px] tablet:h-[64px] w-full text-center content-center rounded-xl border-[2px] hover:bg-custom-blue hover:text-white font-semibold focus:outline-none cursor-pointer bg-white text-text-blue"
            >
                Shop Now
            </Link>
        </div>
    );
}
