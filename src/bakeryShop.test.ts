/**
 * @jest-environment node
 */

import {getRandomNumber} from "./app/utils/tools";
import {addCategory, isCategoryExists, removeCategory, setProducts} from "./firebase/firebaseDBService";
import productConfig from "./app/configurations/products-config.json"

test('getRandomNumber test', () => {
    expect(getRandomNumber(1, 1)).toEqual(1)
});

test('getRandomNumber test2', () => {
    expect(getRandomNumber(1, 10)).toBeLessThanOrEqual(10)
});
test('count of products', () => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    setProducts().then(count => expect(count).toEqual(productConfig.length))
});
test('cake category exists', async () => {
    let res = await isCategoryExists("cake")
    expect(res).toBeTruthy()
});

const categories: string[] = productConfig.map(item =>
    item.name.split('-')[0])

test('random category', async () => {
    let category = categories[getRandomNumber(0, categories.length)]
    let res = await isCategoryExists(category)
    expect(res).toBeTruthy()
});

test('remove category', async () => {
    let categoryToRemove = 'bread'
    await removeCategory(categoryToRemove)
    expect(await isCategoryExists(categoryToRemove)).toBeFalsy()
    await addCategory({name: categoryToRemove})
})

test('add category', async () => {
    let categoryToAdd = 'pasta'
    await addCategory({name: categoryToAdd})
    expect(await isCategoryExists(categoryToAdd)).toBeTruthy()
    await removeCategory(categoryToAdd)
})

test('all categories exists Promise.all', async () => {
    let temp: any[] = categories
    expect(await Promise.all(temp.map((el, index) => temp[index] = isCategoryExists(el)))
        .then(array => array.map((res, index) => array[index] = res)
            .every(el => el === true)).catch(e => console.log(e.message)))
        .toBeTruthy()
})
