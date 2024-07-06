import {collection, doc, setDoc, getDoc, deleteDoc, getCountFromServer} from 'firebase/firestore'
import {db} from "../app/configurations/firebase-config";
import {CATEGORY_COLLECTION, PRODUCT_COLLECTION} from "../app/utils/constants";
import {CategoryType, ProductType} from "../app/utils/types";
import {getRandomNumber} from "../app/utils/tools";
import productConfig from "../app/configurations/products-config.json"
import products from "../components/navigators/Products";
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";

const prodColl = collection(db, PRODUCT_COLLECTION)
const categoryColl = collection(db, CATEGORY_COLLECTION)

export const addProduct = async (product: ProductType) => {
    product.id = getRandomNumber(10000, 99999).toString()
    const ref = doc(prodColl, product.id)
    await setDoc(ref, product)
}

export const addCategory = async (category: CategoryType) => {
    const ref = doc(categoryColl, category.name)
    await setDoc(ref, category)
}

export const removeProduct = async (id: string) => {
    const ref = doc(prodColl, id)
    await deleteDoc(ref)
}

export const removeCategory = async (name: string) => {
    const ref = doc(categoryColl, name)
    await deleteDoc(ref)
}

export async function isCategoryExists(category: string) {
    const ref = doc(categoryColl,category)
    return (await getDoc(ref)).exists()
}

export const setProducts = async () => {
    let count = (await getCountFromServer(prodColl)).data().count
    if (count === 0) {
        const products: ProductType[] = productConfig.map(pc => ({
            img: pc.name + ".jpg",
            title: pc.name,
            category: pc.name.split('-')[0],
            unit: pc.unit,
            cost: pc.cost
        }))
        for (let i = 0; i < products.length; i++) {
            const temp = await isCategoryExists(products[i].category)
            if (!temp) await addCategory({name:products[i].category})
            await addProduct(products[i])
            count ++;
        }
    }
    return count
}

export const getProductsFB = ():Observable<ProductType[]> => {
//svyazhis' s collection prodColl v DB i verni po itogu Observable
    return collectionData(prodColl) as Observable<ProductType[]>
}